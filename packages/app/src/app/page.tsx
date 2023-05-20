"use client";

import {
  SismoConnectButton as _SismoConnectButton,
  AuthType,
  SismoConnectClientConfig,
} from "@sismo-core/sismo-connect-react";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [responseBytes, setResponseBytes] = useState("");

  const config: SismoConnectClientConfig = {
    appId: "0x49c751f1595e8b3016096a7df01d2a96",
  };

  return (
    <main>
      <div className="h-screen relative w-full flex flex-col items-center justify-center text-center text-white px-12">
        <div className="animate-fadeInOut backdrop-blur-md">
          <Image src="/ninja_transparent.png" alt="Ninja Wallet" width={240} height={240} className="object-cover" />
        </div>
        <h1 className="text-4xl font-bold">Ninja Wallet</h1>
        <h2 className="mt-4 text-2xl text-lg">Stealth Account Abstraction Wallet with Sismo</h2>
        <div className="mt-8">
          {!responseBytes && (
            <_SismoConnectButton
              config={config}
              auth={{ authType: AuthType.VAULT }}
              signature={{ message: "Your message" }}
              onResponseBytes={async (bytes: string) => {
                setResponseBytes(bytes);
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
