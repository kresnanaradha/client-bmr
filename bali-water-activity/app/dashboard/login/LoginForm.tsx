"use client";

import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { login, type LoginState } from "../actions";

const INITIAL_STATE: LoginState = { error: null, username: "" };

const inputClass =
  "w-full rounded-xl border border-[var(--aq-line)] bg-white px-4 py-3 text-sm text-[var(--aq-text)] outline-none transition-colors placeholder:text-[var(--aq-muted)]/50 focus:border-[var(--aq-aqua)] focus:ring-2 focus:ring-[var(--aq-aqua)]/15";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="username" className="mb-1.5 block text-xs font-semibold text-[var(--aq-text)]">
          Username
        </label>
        <input id="username" name="username" type="text" autoComplete="username" required autoFocus defaultValue={state.username} className={inputClass} />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-[var(--aq-text)]">
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </div>

      {state.error && (
        <p role="alert" className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700">
          <AlertCircle size={14} className="shrink-0" />
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="aq-btn w-full disabled:cursor-wait disabled:opacity-70">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
