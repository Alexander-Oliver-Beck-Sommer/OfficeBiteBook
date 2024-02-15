"use client";
import Link from "next/link";
import InputField from "@/components/InputField";
import UnderlineButton from "@/components/Buttons/UnderlineButton";
import TextButton from "@/components/TextButton";
import useUser from "@/hooks/useUser";

export default function Login() {
  const { loading, handleLogin, isSession } = useUser();

  return (
    <section className="pattern fill-body flex items-center justify-center p-10 px-5 py-10">
      {!isSession ? (
        <div className="grid w-full max-w-screen-xl">
          <div className="flex w-full animate-fade-up flex-col gap-8 rounded border-2 border-dark-500 bg-dark-100 px-5 py-10 animate-ease-in-out">
            <div>
              <h2>Log in</h2>
              <h4 className="pt-2.5 text-grey">Welcome to OfficeBiteBook!</h4>
            </div>
            <form onSubmit={handleLogin}>
              <ul className="flex flex-col gap-5">
                <li>
                  <InputField
                    id="emailField"
                    label="Enter email"
                    name="Email"
                    type="email"
                    placeholder="name@email.com"
                    autoComplete="on"
                    required
                  />
                </li>
                <li>
                  <InputField
                    id="passwordField"
                    label="Enter password"
                    name="Password"
                    type="password"
                    placeholder="123456789"
                    autoComplete="on"
                    required
                  />
                </li>
                <li>
                  <UnderlineButton
                    className="text-sm"
                    label="Forgot password?"
                    direction="right"
                  />
                </li>
                <li className="mt-5">
                  <TextButton
                    type="submit"
                    className="w-full"
                    text="Log in"
                    label="Log in"
                    icon="arrow-right"
                  />
                </li>
              </ul>
            </form>

            <div className="flex justify-center gap-1 text-grey">
              <p className="text-sm">Not registered?</p>
              <Link href="/login/signup" aria-label="Go to sign up">
                <p className="border-b-2 pb-0.5 text-sm font-medium">
                  Sign up here
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="border"></div>
      )}
    </section>
  );
}
