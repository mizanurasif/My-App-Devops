"use client";

import { useActionState, useState } from "react";

import { deleteUser, submitUser } from "./actions";
import { initialFormState, type UserRow } from "./types";

const emptyFields = { name: "", email: "", username: "" };

export function UserForm({ users }: { users: UserRow[] }) {
  const [state, formAction, pending] = useActionState(
    submitUser,
    initialFormState
  );
  const [selectedId, setSelectedId] = useState("");
  const [fields, setFields] = useState(emptyFields);
  const [handledAt, setHandledAt] = useState(0);

  // Clear the form once a new record is saved; keep it filled after an edit so
  // the row stays selected and can be tweaked again.
  if (state.at !== handledAt) {
    setHandledAt(state.at);
    if (state.status === "success" && state.intent === "save") {
      setFields(emptyFields);
      setSelectedId("");
    }
  }

  function selectUser(user: UserRow) {
    setSelectedId(user.id);
    setFields({
      name: user.name,
      email: user.email,
      username: user.username,
    });
  }

  function clearForm() {
    setSelectedId("");
    setFields(emptyFields);
  }

  const inputClass =
    "h-11 w-full rounded-lg border border-black/10 bg-white px-3.5 text-black outline-none transition-colors placeholder:text-zinc-400 focus:border-black/40 dark:border-white/15 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-white/50";
  const labelClass =
    "text-sm font-medium text-zinc-700 dark:text-zinc-300";

  return (
    <div className="flex flex-col gap-10">
      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={selectedId} />

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            className={inputClass}
            placeholder="Mizanur Asif"
            value={fields.name}
            onChange={(e) =>
              setFields((f) => ({ ...f, name: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={inputClass}
            placeholder="you@example.com"
            value={fields.email}
            onChange={(e) =>
              setFields((f) => ({ ...f, email: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            className={inputClass}
            placeholder="asif"
            value={fields.username}
            onChange={(e) =>
              setFields((f) => ({ ...f, username: e.target.value }))
            }
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-medium">
          <button
            type="submit"
            name="intent"
            value="save"
            disabled={pending}
            className="flex h-11 items-center justify-center rounded-full bg-black px-6 text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-300"
          >
            {pending ? "Working…" : "Save"}
          </button>
          <button
            type="submit"
            name="intent"
            value="edit"
            disabled={pending || !selectedId}
            className="flex h-11 items-center justify-center rounded-full border border-black/15 px-6 transition-colors hover:bg-black/5 disabled:opacity-40 dark:border-white/20 dark:hover:bg-white/10"
          >
            Edit
          </button>
          {selectedId ? (
            <button
              type="button"
              onClick={clearForm}
              className="text-zinc-500 underline underline-offset-4 hover:text-black dark:hover:text-zinc-50"
            >
              Cancel edit
            </button>
          ) : null}
        </div>

        {state.message ? (
          <p
            role="status"
            className={
              state.status === "error"
                ? "text-sm text-red-600 dark:text-red-400"
                : "text-sm text-emerald-600 dark:text-emerald-400"
            }
          >
            {state.message}
          </p>
        ) : null}

        {!selectedId ? (
          <p className="text-sm text-zinc-500">
            Pick a row below to load it into the form, then click Edit to update
            it.
          </p>
        ) : null}
      </form>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Saved users ({users.length})
        </h2>

        {users.length === 0 ? (
          <p className="mt-5 text-zinc-600 dark:text-zinc-400">
            Nothing saved yet.
          </p>
        ) : (
          <ul className="mt-5 flex flex-col gap-3">
            {users.map((user) => (
              <li
                key={user.id}
                className={`flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 transition-colors ${
                  user.id === selectedId
                    ? "border-black/40 bg-black/[.04] dark:border-white/50 dark:bg-white/[.06]"
                    : "border-black/[.08] bg-white dark:border-white/[.12] dark:bg-zinc-950"
                }`}
              >
                <button
                  type="button"
                  onClick={() => selectUser(user)}
                  className="flex-1 text-left"
                >
                  <span className="block font-medium text-black dark:text-zinc-50">
                    {user.name}
                  </span>
                  <span className="mt-1 block font-mono text-xs text-zinc-500">
                    @{user.username} · {user.email}
                  </span>
                </button>
                <form action={deleteUser}>
                  <input type="hidden" name="id" value={user.id} />
                  <button
                    type="submit"
                    className="text-sm text-zinc-500 underline underline-offset-4 hover:text-red-600 dark:hover:text-red-400"
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
