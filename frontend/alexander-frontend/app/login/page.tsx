"use client";
import Link from "next/link";
import InputField from "@/components/InputField";
import UnderlineButton from "@/components/Buttons/UnderlineButton";
import TextButton from "@/components/TextButton";
import useLogin from "@/hooks/useLogin";

export default function Login() {
  const { user, loading, handleLogin } = useLogin();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const router = useRouter();
  // const [user, setUser] = useState(null);
  // // const [loading, setLoading] = useState(true);
  // const supabaseClient = createClientComponentClient();

  // useEffect(() => {
  //   async function getUser() {
  //     const {
  //       data: { user },
  //     } = await supabaseClient.auth.getUser();
  //     setUser(user);
  //     // setLoading(false);
  //   }

  //   getUser();
  // }, []);

  // const handleSignUp = async () => {
  //   const res = await supabaseClient.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${location.origin}/auth/callback`,
  //     },
  //   });
  //   setUser(res.data.user);
  //   setEmail("");
  //   setPassword("");
  //   router.refresh();
  //   const userData = res.data.user;
  //   try {
  //     // Let's check if there is any data inside our user object
  //     if (userData) {
  //       console.log(userData);
  //       // There is? Great! Lets retrieve the required data we need! (Specifically: id, email, created_at)
  //       const { id, email, created_at } = userData;
  //       console.log(id);
  //       if (id && email && created_at) {
  //         const { error: userError } = await supabase.from("users").insert([
  //           {
  //             user_id: id,
  //             user_email: email,
  //             user_created_at: created_at,
  //           },
  //         ]);

  //         if (userError) {
  //           console.log(
  //             "Failed to clone the user into 'users':",
  //             userError.message,
  //           );
  //         }

  //         console.log("Personal account cloned to table: 'users'!");
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Personal account couldn't be saved!:", error.message);
  //   }
  // };

  // const handleSignIn = async () => {
  //   const res = await supabaseClient.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (res.error) {
  //     // TODO: Add functionality to take usage of the TextInput validation props and alert the user with faulty input
  //   } else if (res.data.user) {
  //     setUser(res.data.user);
  //     setEmail("");
  //     setPassword("");
  //     router.refresh();
  //     router.push("/");
  //   }
  // };

  // const handleLogout = async () => {
  //   await supabaseClient.auth.signOut();
  //   setUser(null);
  //   router.refresh();
  // };

  // if (loading) {
  //   return <h4>Loading...</h4>;
  // }

  return (
    <section className="pattern fill-body flex items-center justify-center p-10 px-5 py-10">
      <div className="grid w-full max-w-screen-xl">
        <div className="flex w-full flex-col gap-8 rounded border-2 border-dark-500 bg-dark-100 px-5 py-10">
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
    </section>
  );

  // if (user) {
  //   return (
  //     <section className="mx-4 mb-12 mt-8 flex flex-1 items-center justify-center md:mx-12 md:mt-6">
  //       <ul className="border-dark-500 flex w-full max-w-2xl animate-fade-up flex-col gap-6 overflow-hidden rounded animate-ease-in-out md:gap-4 md:border-2 md:bg-dark-100 md:px-8 md:pb-14 md:pt-10">
  //         <li>
  //           <p className="text-grey">Already signed in!</p>
  //           <h3>Want to logout instead?</h3>
  //         </li>
  //         <li className="bg-orange h-[2px] rounded"></li>
  //         <li>
  //           <p className="text-grey">
  //             Seems like you're already signed in. If you want to sign out, you
  //             can press the Logout button below, or go back to the home page.
  //           </p>
  //         </li>
  //         <li className="grid grid-cols-2 gap-4 md:mt-4 md:gap-6">
  //           <Link
  //             aria-label="Go back"
  //             title="Go back"
  //             href="/"
  //             className="border-dark-500 hover:bg-dark-500 flex w-full items-center justify-center gap-3 rounded border-2 bg-dark-100 px-5 py-3 transition-colors duration-300 ease-in-out"
  //           >
  //             <h4>Go Back</h4>
  //           </Link>
  //           <ActionButton
  //             variant="outlined"
  //             label="Logout"
  //             title="Logout"
  //             name="Logout"
  //             toggle={handleLogout}
  //           />
  //         </li>
  //       </ul>
  //     </section>
  //   );
  // }

  // return (
  //   <section className="mx-4 mb-12 mt-8 flex items-center justify-center md:mx-12 md:mt-6">
  //     <ul className="border-dark-500 flex w-full max-w-2xl animate-fade-up flex-col gap-6 overflow-hidden rounded animate-ease-in-out md:gap-4 md:border-2 md:bg-dark-100 md:px-8 md:pb-14 md:pt-10">
  //       <li>
  //         <p className="text-grey">Welcome to,</p>
  //         <h3>OfficeBiteBook</h3>
  //       </li>
  //       <li className="bg-primary h-[2px] rounded"></li>
  //       <li>
  //         <p className="text-grey">
  //           Get started by creating an account or logging in with your existing
  //           one.
  //         </p>
  //       </li>
  //       <li>
  //         <TextInput
  //           variant="email"
  //           label="Email"
  //           name="Email"
  //           value={email}
  //           placeholder="user@email.com"
  //           valueChange={setEmail}
  //         />
  //       </li>
  //       <li>
  //         <TextInput
  //           variant="password"
  //           label="Password"
  //           name="Password"
  //           value={password}
  //           placeholder="••••••••••"
  //           valueChange={setPassword}
  //         />
  //       </li>
  //       <li className="mt-4 grid grid-cols-2 gap-4 md:gap-6">
  //         <ActionButton
  //           variant="outlined"
  //           title="Sign Up"
  //           label="Sign Up"
  //           name="Sign Up"
  //           toggle={handleSignUp}
  //         />
  //         <ActionButton
  //           variant="outlined"
  //           title="Login"
  //           label="Login"
  //           name="Login"
  //           toggle={handleSignIn}
  //         />
  //       </li>
  //       <li className="text-grey flex flex-col gap-2 md:mt-4 md:flex-row md:gap-4">
  //         <p className="underline underline-offset-2">Forgotten email?</p>
  //         <p className="underline underline-offset-2">Forgotten password?</p>
  //       </li>
  //     </ul>
  //   </section>
  // );
}
