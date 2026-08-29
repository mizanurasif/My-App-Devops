"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

import { getDb } from "@/lib/mongodb";
import type { FormState } from "./types";

function result(
  status: "success" | "error",
  message: string,
  intent: "save" | "edit"
): FormState {
  return { status, message, intent, at: Date.now() };
}

export async function submitUser(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const intent = formData.get("intent") === "edit" ? "edit" : "save";
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim();

  if (!name || !email || !username) {
    return result("error", "Name, email and username are all required.", intent);
  }

  try {
    const users = (await getDb()).collection("User");

    if (intent === "edit") {
      if (!ObjectId.isValid(id)) {
        return result(
          "error",
          "Pick a user from the list below before clicking Edit.",
          intent
        );
      }

      const updated = await users.updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, email, username, updatedAt: new Date() } }
      );

      if (updated.matchedCount === 0) {
        return result("error", "That user no longer exists.", intent);
      }

      revalidatePath("/users");
      return result("success", `Updated ${username}.`, intent);
    }

    const inserted = await users.insertOne({
      name,
      email,
      username,
      createdAt: new Date(),
    });

    revalidatePath("/users");
    return result(
      "success",
      `Saved ${username} · ${inserted.insertedId.toString()}`,
      intent
    );
  } catch (error) {
    return result(
      "error",
      error instanceof Error ? error.message : "Database error.",
      intent
    );
  }
}

export async function deleteUser(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "").trim();
  if (!ObjectId.isValid(id)) return;

  const users = (await getDb()).collection("User");
  await users.deleteOne({ _id: new ObjectId(id) });
  revalidatePath("/users");
}
