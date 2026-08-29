export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  intent: "save" | "edit" | null;
  /** Bumped on every result so the client reacts even to repeated outcomes. */
  at: number;
};

export const initialFormState: FormState = {
  status: "idle",
  message: "",
  intent: null,
  at: 0,
};

export type UserRow = {
  id: string;
  name: string;
  email: string;
  username: string;
};
