"use client";
import { useFormState } from "react-dom";
import { login } from "./login";
export default function LoginPage() {
  const [state, formAction] = useFormState(login, { message: "" });
  return (
    <div className="bg-neutral-700 h-screen flex items-center">
      <form className="mx-auto bg-white p-4 rounded-2xl" action={formAction}>
        <div className="m-4">
          <label className="sr-only">Username</label>
          <input
            className="border-solid border border-gray-400 rounded px-2 py-3"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
        </div>
        <div className="m-4">
          <label className="sr-only">Password</label>
          <input
            className="border-solid border border-gray-400 rounded px-2 py-3"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="m-4 flex items-center">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-3"
            type="submit"
          >
            Sign in
          </button>
        </div>
        {state?.message && (
          <div className="m-4 flex items-center text-red-600">
            <div>{state.message}</div>
          </div>
        )}
      </form>
    </div>
  );
}
