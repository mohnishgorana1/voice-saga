import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
// import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <main className="min-h-screen w-full px-5 flex flex-wrap ">
        <div className="hidden md:block p-5 w-[20%] border-r-2 border-opacity-20 border-r-white-1">
          <LeftSidebar />
        </div>
        {/*  border border-pink-500 */}
        <section className="p-5 w-full md:w-[60%]">
          <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">

            <div className="flex h-16 items-center justify-between md:hidden">
              <Image src='/icons/logo.svg' width={13} height={13} alt="menu-icon" />
              <MobileNav />
            </div>

            <div className="flex flex-col md:pb-14 text-white-1">
              {/* <Toaster /> */}
              {children}
            </div>

          </div>
        </section>
        <div className="hidden md:block p-5 w-[20%] text-white-1 border-l-2 border-opacity-20 border-l-white-1">
          <RightSidebar />
        </div>
      </main>
    </div>
  );
}
