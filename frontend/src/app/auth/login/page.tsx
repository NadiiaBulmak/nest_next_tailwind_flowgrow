import AuthHeader from "@/components/AuthHeader";
import Image from "next/image";

export default function Login() {
  return (
    // <div className="flex min-h-screen items-center justify-center bg-bg-primary font-sans dark:bg-black">
    <main className="flex min-h-screen w-full max-w-7xl flex-col items-center bg-white dark:bg-black sm:items-start bg-zinc-50">
      <AuthHeader />
      <div className="flex w-full gap-3 px-8 flex-1">
        <div className="flex w-full max-w-[40%] rounded-xl flex-col items-center justify-end gap-6 px-8 py-8 sm:items-start bg-neutral-900">
          <div>
            <h1 className="text-3xl font-medium text-white">Deep work.</h1>
            <h1 className="text-3xl font-medium text-white">Real progress.</h1>
            <h1 className="text-3xl font-medium text-lime-300">Every day.</h1>
          </div>

          <p className="text-sm font-regular text-zinc-300 max-w-[70%]">Join thousands of focused minds building what matters.</p>

          <div className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-lime-500 text-black hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400"></div>
            <div className="w-2 h-2 rounded-full bg-zinc-300 text-black hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400"></div>
            <div className="w-2 h-2 rounded-full bg-zinc-300 text-black hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400"></div>
          </div>
        </div>
        <div className="flex w-full rounded-xl flex-col items-center justify-center gap-4 px-8 py-8 sm:items-start bg-white">
          <div>
            <h2 className="text-2xl font-medium text-black relative after:absolute after:left-0 after:w-4 after:h-4 after:bg-[url('/images/yellow.webp')] bg-contain">Welcome back.</h2>
            <p className="text-sm font-regular text-zinc-400">Log in to continue your focus journey.</p>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-8 py-6 text-sm font-regular text-zinc-400 dark:bg-black">
        <p>© FlowGrow. All rights reserved.</p>
        <p>flow.grow@email.com</p>
      </div>
    </main>
    // </div>
  );
}
