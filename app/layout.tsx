import type { Metadata } from "next";
import { Mali } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Progress from "./Progress";
import QueryProvider from "./QueryProvider";

const mali = Mali({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wonderland M",
  description: "Game Mobile 2D Animation Classic RPG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body className={mali.className}>
          <Head>
            <meta property="og:image" content="<generated>" />
            <meta property="og:image:type" content="<generated>" />
            <meta property="og:image:width" content="<generated>" />
            <meta property="og:image:height" content="<generated>" />
            <meta name="twitter:image" content="<generated>" />
            <meta name="twitter:image:type" content="<generated>" />
            <meta name="twitter:image:width" content="<generated>" />
            <meta name="twitter:image:height" content="<generated>" />
          </Head>
          <main className="flex min-h-screen flex-col bg-[url('/bg.png')] bg-cover bg-center overflow-hidden relative">
            <div className="absolute w-full bottom-0 flex justify-between px-10">
              <Image
                alt="char-1"
                src="/char-1.png"
                width={1348}
                height={4294}
                className="w-full max-w-[260px] translate-y-[10%] hidden lg:block max-h-[90vh] object-contain object-center"
              />
              <Image
                alt="char-2"
                src="/char-2.png"
                width={1360}
                height={3957}
                className="w-full max-w-[300px] translate-y-[10%] hidden lg:block max-h-[90vh] object-contain object-center"
              />
              <div className="h-[50vh] left-0 w-full bottom-0 absolute bg-gradient-to-t from-white to-[#ffffff00] via-[#ffffff80]" />
            </div>
            <div className="relative w-fit mx-auto mt-14 flex justify-center items-center pointer-events-none">
              <Image
                alt="Flare"
                src="/flare.png"
                width={500}
                height={500}
                className="absolute min-w-[300%] "
              />
              <Image
                alt="logo"
                src="/wdl_logo.png"
                width={350}
                height={136}
                className="w-full max-w-[320px] xl:max-w-[600px] relative"
              />
            </div>
            <Image
              alt="Head line"
              src="/head_line.png"
              width={914}
              height={134}
              className="w-full max-w-[500px] relative mx-auto my-6 px-2"
            />
            <div className="relative">{children}</div>
            <Progress />
            <div className="w-full relative">
              <div className="w-full max-w-[1600px] p-4 py-2 flex items-center gap-8 justify-end">
                <Image
                  alt="bgs logo"
                  src="/bgs-logo.png"
                  width={315}
                  height={151}
                  className="max-w-[70px] w-[20vw]"
                />
                <Image
                  alt="chinese gamer logo"
                  src="/chinese-gamer-logo.png"
                  width={1733}
                  height={1233}
                  className="max-w-[50px] w-[15vw]"
                />
              </div>
            </div>
          </main>
        </body>
      </QueryProvider>
    </html>
  );
}
