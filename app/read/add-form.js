"use client";

import { useFormState, useFormStatus } from "react-dom";
import { postName } from "@/app/actions";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

export default function AddForm() {
  const [state, formAction] = useFormState(postName, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="todo">Enter Name</label>
      <input type="text" id="createName" name="createName" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
