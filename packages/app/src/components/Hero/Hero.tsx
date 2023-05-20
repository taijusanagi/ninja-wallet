import { Press_Start_2P } from "next/font/google";
import Image from "next/image";

const pressStart2p = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export const Hero = () => {
  return (
    <>
      <div className="animate-fadeInOut backdrop-blur-md">
        <Image src="/ninja_transparent.png" alt="Ninja Wallet" width={240} height={240} className="object-cover" />
      </div>
      <h1 className={`${pressStart2p.className} text-4xl text-custom-4 font-bold`}>Ninja Wallet</h1>
      <h2 className={`${pressStart2p.className} text-xs text-custom-4 mt-4`}>
        Stealth Account Abstraction Wallet with Sismo
      </h2>
    </>
  );
};
