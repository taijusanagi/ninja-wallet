"use client";

import {
  SismoConnectButton as SismoConnectButton,
  AuthType,
  SismoConnectClientConfig,
} from "@sismo-core/sismo-connect-react";

import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Hero } from "@/components/Hero";

export default function Home() {
  const [account, setAccount] = useState("0x387B58A25B9ea973a562afB09670A272F3A29D9A");
  const [useOpHash, setUserOpHash] = useState("");

  const config: SismoConnectClientConfig = {
    appId: "0x49c751f1595e8b3016096a7df01d2a96",
  };

  return (
    <main>
      <div className="bg-gradient-to-r from-custom-1 to-custom-2 text-white h-screen w-full flex flex-col items-center justify-center text-center text-white p-8">
        <Hero />
        <div className="mt-8">
          <div className="relative bg-gradient-to-r from-custom-2 to-custom-1 rounded-lg py-4 px-8 text-left">
            <AiOutlineClose
              className="absolute top-4 right-4 text-white cursor-pointer"
              onClick={() => {
                window.location.href = "/";
              }}
            />
            <div className="mt-4">
              <h2 className="text-md font-medium">Stealth Account</h2>
              <p className="mt-1 text-xs">{account}</p>
            </div>
            <div className="mt-4">
              <SismoConnectButton
                overrideStyle={{
                  width: "100%",
                }}
                config={config}
                auth={{ authType: AuthType.VAULT }}
                signature={{ message: useOpHash }}
                onResponseBytes={async (bytes: string) => {}}
                text="Send Transaction"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
