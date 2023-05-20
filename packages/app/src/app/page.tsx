"use client";

import {
  SismoConnectButton as SismoConnectButton,
  AuthType,
  SismoConnectClientConfig,
} from "@sismo-core/sismo-connect-react";
import { Press_Start_2P } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const pressStart2p = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

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
      <div className="bg-gradient-to-r from-custom-1 to-custom-2 text-white h-screen w-full flex flex-col items-center justify-center text-center text-white p-8">
        <div className="animate-fadeInOut backdrop-blur-md">
          <Image src="/ninja_transparent.png" alt="Ninja Wallet" width={240} height={240} className="object-cover" />
        </div>
        <h1 className={`${pressStart2p.className} text-4xl text-custom-4 font-bold`}>Ninja Wallet</h1>
        <h2 className={`${pressStart2p.className} text-xs text-custom-4 mt-4`}>
          Stealth Account Abstraction Wallet with Sismo
        </h2>
        <div className="mt-8">
          {!responseBytes && (
            <>
              <SismoConnectButton
                config={config}
                auth={{ authType: AuthType.VAULT }}
                signature={{ message: secret }}
                onResponse={async (response) => {
                  setSecret(response.signedMessage || "");
                }}
                onResponseBytes={async (bytes: string) => {
                  setResponseBytes(bytes);
                }}
              />
              <input
                type="text"
                className="mt-2 block w-full h-10 px-4 rounded-md border-gray-300 shadow-sm outline-none text-gray-800 text-xs"
                placeholder="Secret"
                onChange={(e) => {
                  setSecret(e.target.value);
                }}
              />
            </>
          )}

          {responseBytes && (
            <div className="relative bg-gradient-to-r from-custom-2 to-custom-1 rounded-lg py-6 px-8 text-left">
              <AiOutlineClose
                className="absolute top-2 right-2 text-white cursor-pointer"
                onClick={() => {
                  window.location.href = "/";
                }}
              />
              <div>
                <h2 className="text-md font-medium">Secret</h2>
                <p className="text-xs">{secret}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-md font-medium">Ethereum Address</h2>
                <p className="text-xs">{ethAddress}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-md font-medium">USDC Balance</h2>
                <p className="text-xs">{usdcBalance}</p>
              </div>
              <div className="mt-4">
                <label className="text-md font-medium">Transfer To</label>
                <input
                  type="text"
                  className="mt-2 block w-full h-10 px-4 rounded-md border-gray-300 shadow-sm outline-none text-gray-800 text-xs"
                  placeholder="Ethereum Address"
                />
                <button
                  onClick={() => {
                    console.log("onTransfer");
                  }}
                  className="mt-2 custom-3 border border-white text-white font-bold py-2 px-4 rounded-md w-full "
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
