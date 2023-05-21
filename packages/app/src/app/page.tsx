"use client";

import { SismoConnectButton, AuthType, ClaimRequest, ClaimType } from "@sismo-core/sismo-connect-react";
import { useState } from "react";
import { Hero } from "@/components/Hero";
import { sismoConfig } from "@/lib/sismo";

export default function Home() {
  const [responseBytes, setResponseBytes] = useState("");
  const [secret, setSecret] = useState("");

  const gitcoinPassportClaim: ClaimRequest = {
    groupId: "0x1cde61966decb8600dfd0749bd371f12",
    value: 3,
    claimType: ClaimType.GTE,
    isOptional: true,
  };

  return (
    <main>
      <div className="bg-gradient-to-r from-custom-1 to-custom-2 text-white h-screen w-full flex flex-col items-center justify-center text-center p-8">
        <Hero />
        <div className="mt-8">
          {!responseBytes && (
            <>
              <SismoConnectButton
                config={sismoConfig}
                auth={{ authType: AuthType.VAULT }}
                claims={[gitcoinPassportClaim]}
                signature={{ message: secret || "default" }}
                onResponseBytes={async (bytes: string) => {
                  fetch;
                  setResponseBytes(bytes);
                }}
                callbackUrl={`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/callback/signin`}
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
