import type { Metadata } from "next";
import { connection } from "next/server";

import { getDb } from "@/lib/mongodb";
import { UserForm } from "./user-form";
import type { UserRow } from "./types";

export const metadata: Metadata = {
  title: "Users",
  description: "Create and edit user records stored in MongoDB.",
};

async function listUsers(): Promise<UserRow[]> {
  // Never prerender this at build time — it needs the live database.
  await connection();

  const docs = await (await getDb())
    .collection("User")
    .find({})
    .sort({ _id: -1 })
    .toArray();

  return docs.map((doc) => ({
    id: doc._id.toString(),
    name: String(doc.name ?? ""),
    email: String(doc.email ?? ""),
    username: String(doc.username ?? ""),
  }));
}

export default async function UsersPage() {
  let users: UserRow[] = [];
  let dbError: string | null = null;

  try {
    users = await listUsers();
  } catch (error) {
    dbError = error instanceof Error ? error.message : "Cannot reach MongoDB.";
  }

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-2xl px-6 py-20 sm:px-10">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Users
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Stored in the <code className="font-mono">User</code> collection of the{" "}
          <code className="font-mono">user-account</code> database.
        </p>

        {dbError ? (
          <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-600 dark:text-red-400">
            Could not read from MongoDB: {dbError}
          </p>
        ) : null}

        <div className="mt-10">
          <UserForm users={users} />
        </div>
      </main>
    </div>
  );
}
