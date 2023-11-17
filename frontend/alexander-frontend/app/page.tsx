// import DeployButton from '../components/DeployButton'
// import AuthButton from '../components/AuthButton'
// import { createClient } from '@/utils/supabase/server'
// import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps'
// import SignUpUserSteps from '@/components/SignUpUserSteps'
// import Header from '@/components/Header'
// import { cookies } from 'next/headers'

import ShortContent from "@/components/Content/ShortContent";
import WideContent from "@/components/Content/WideContent";

export default async function Home() {
  // const cookieStore = cookies()

  // const canInitSupabaseClient = () => {
  //   // This function is just for the interactive tutorial.
  //   // Feel free to remove it once you have Supabase connected.
  //   try {
  //     createClient(cookieStore)
  //     return true
  //   } catch (e) {
  //     return false
  //   }
  // }

  // const isSupabaseConnected = canInitSupabaseClient()

  return (
    // <div className="flex-1 w-full flex flex-col gap-20 items-center">
    //   <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
    //     <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
    //       <DeployButton />
    //       {isSupabaseConnected && <AuthButton />}
    //     </div>
    //   </nav>

    //   <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
    //     <Header />
    //     <main className="flex-1 flex flex-col gap-6">
    //       <h2 className="font-bold text-4xl mb-4">Next steps</h2>
    //       {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
    //     </main>
    //   </div>

    //   <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
    //     <p>
    //       Powered by{' '}
    //       <a
    //         href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
    //         target="_blank"
    //         className="font-bold hover:underline"
    //         rel="noreferrer"
    //       >
    //         Supabase
    //       </a>
    //     </p>
    //   </footer>
    // </div>
    <section>
      <p>
        Ea fugiat sit proident culpa. Eiusmod cupidatat deserunt tempor sunt
        laborum aliquip eiusmod aliquip magna qui commodo enim. Voluptate dolor
        irure minim nisi adipisicing deserunt irure esse eiusmod ipsum do dolor
        sint.
      </p>
      <WideContent ariaLabel="This is a wide content component!">
          <p>Wide Content!</p>
      </WideContent>
      <ShortContent ariaLabel="This a short content component">
        <p>Short Content!</p>
      </ShortContent>
    </section>
  );
}
