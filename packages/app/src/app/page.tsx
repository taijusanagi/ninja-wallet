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
  const [secret, setSecret] = useState("ninja");
  const [ethAddress, setETHAddress] = useState("0x387B58A25B9ea973a562afB09670A272F3A29D9A");
  const [usdcBalance, setUSDCBalance] = useState("100");

  const config: SismoConnectClientConfig = {
    appId: "0x49c751f1595e8b3016096a7df01d2a96",
  };

  return (
    <main>
      <div className="bg-gradient-to-r from-custom-1 to-custom-2 text-white h-screen w-full flex flex-col items-center justify-center text-center text-white p-12">
        <div className="animate-fadeInOut backdrop-blur-md">
          <Image src="/ninja_transparent.png" alt="Ninja Wallet" width={240} height={240} className="object-cover" />
        </div>
        <h1 className="text-4xl font-bold">Ninja Wallet</h1>
        <h2 className="mt-4 text-2xl text-lg">Stealth Account Abstraction Wallet with Sismo</h2>
        <div className="mt-4">
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

          {responseBytes && (
            <div className="bg-gradient-to-r from-custom-2 to-custom-1 rounded-lg p-8 text-left">
              <div>
                <h2 className="text-md font-bold">Secret</h2>
                <p className="text-xs">{secret}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-md font-bold">Ethereum Address</h2>
                <p className="text-xs">{ethAddress}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-md font-bold">USDC Balance</h2>
                <p className="text-xs">{usdcBalance}</p>
              </div>
              <div className="mt-4">
                <label className="text-md font-bold">Transfer To</label>
                <input
                  type="text"
                  className="mt-2 block w-full h-10 px-4 rounded-md border-gray-300 shadow-sm outline-none text-gray-800 text-xs"
                  placeholder="Ethereum Address"
                />
                <button
                  onClick={() => {
                    console.log("onTransfer");
                  }}
                  className="mt-4 custom-3 border border-custom-4 text-white font-bold py-2 px-4 rounded-md w-full "
                >
                  Transfer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
