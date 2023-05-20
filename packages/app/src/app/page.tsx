"use client";

import {
  SismoConnectButton as SismoConnectButton,
  AuthType,
  SismoConnectClientConfig,
} from "@sismo-core/sismo-connect-react";
import { useState } from "react";
import { Hero } from "@/components/Hero";

export default function Home() {
  const [responseBytes, setResponseBytes] = useState("");
  const [secret, setSecret] = useState("");

  const config: SismoConnectClientConfig = {
    appId: "0x49c751f1595e8b3016096a7df01d2a96",
  };

  return (
    <main>
      <div className="bg-gradient-to-r from-custom-1 to-custom-2 text-white h-screen w-full flex flex-col items-center justify-center text-center p-8">
        <Hero />
        <div className="mt-8">
          {!responseBytes && (
            <>
              <SismoConnectButton
                config={config}
                auth={{ authType: AuthType.VAULT }}
                signature={{ message: secret || "default" }}
                onResponseBytes={async (bytes: string) => {
                  fetch;
                  setResponseBytes(bytes);
                }}
                callbackUrl={`${window.location.href}api/callback/signin`}
              />
              <input
                type="text"
                className="mt-2 block w-full h-10 px-4 rounded-md border-gray-300 shadow-sm outline-none text-gray-800 text-xs"
                placeholder="Secret"
                value={secret}
                onChange={(e) => {
                  setSecret(e.target.value);
                }}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
