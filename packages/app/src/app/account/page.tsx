"use client";

import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { ethers } from "ethers";

import { SismoConnectButton, AuthType, useSismoConnect } from "@sismo-core/sismo-connect-react";
import { Hero } from "@/components/Hero";
import { sismoConfig } from "@/lib/sismo";
import { HttpRpcClient } from "@account-abstraction/sdk";
import { NinjaAccountAPI } from "../../../../contracts/lib/account-abstraction/NinjaAccountAPI";
import { rpc } from "../../../../contracts/lib/web3";

import deployments from "../../../../contracts/deployments.json";
const { entryPointAddress, factoryAddress } = deployments;

const bundler = new HttpRpcClient(process.env.NEXT_PUBLIC_BUNDLER_API || "", entryPointAddress, 80001);

export default function Home() {
  const searchParams = useSearchParams();
  const { responseBytes } = useSismoConnect({ config: sismoConfig });
  const [ninjaAccountAPI, setNinjaAccountAPI] = useState<NinjaAccountAPI>();
  const [account, setAccount] = useState(ethers.constants.AddressZero);
  const [mode, setMode] = useState<"input" | "calc" | "sign" | "send">("input");
  const [to, setTo] = useState("");
  const [userOpHash, setUserOpHash] = useState("");
  const [userOp, setUserOp] = useState();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const salt = searchParams.get("salt");
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    if (!userId || !salt) {
      return;
    }
    const ninjaAccountAPI = new NinjaAccountAPI({
      entryPointAddress,
      factoryAddress,
      userId,
      salt,
      provider,
    });
    setNinjaAccountAPI(ninjaAccountAPI);
    ninjaAccountAPI.getAccountAddress().then((account) => {
      console.log("account", account);
      setAccount(account);
    });
  }, [searchParams]);

  useEffect(() => {
    if (!ninjaAccountAPI || !account || !ethers.utils.isAddress(to)) {
      return;
    }
    setMode("calc");
    ninjaAccountAPI.createUnsignedUserOp({ target: to, data: "0x" }).then((userOp) => {
      userOp = {
        ...userOp,
        callGasLimit: 1000000,
        preVerificationGas: 1000000,
      };
      console.log("userOp", userOp);
      ninjaAccountAPI.getUserOpHash(userOp).then((userOpHash) => {
        console.log("userOpHash", userOpHash);
        setUserOpHash(userOpHash);
        ethers.utils.resolveProperties(userOp).then((userOp) => {
          userOp = {
            ...userOp,
            maxFeePerGas: userOp.maxFeePerGas.toString(),
            maxPriorityFeePerGas: userOp.maxPriorityFeePerGas.toString(),
            nonce: userOp.nonce.toString(),
            verificationGasLimit: userOp.verificationGasLimit.toString(),
          };
          console.log("set user op in local storage");
          localStorage.setItem(userOpHash, JSON.stringify(userOp));
          setMode("sign");
        });
      });
    });
  }, [ninjaAccountAPI, account, to]);

  useEffect(() => {
    const userOpHash = searchParams.get("userOpHash");
    if (!ninjaAccountAPI || !responseBytes || !userOpHash) {
      return;
    }
    console.log("responseBytes", responseBytes);
    setMode("send");
    const userOpString = localStorage.getItem(userOpHash) || "";
    const userOp = JSON.parse(userOpString);
    userOp.signature = responseBytes;
    console.log("userOp", userOp);
    setUserOp(userOp);
  }, [ninjaAccountAPI, responseBytes, searchParams]);

  return (
    <main>
      <div className="bg-gradient-to-r from-custom-1 to-custom-2 text-white h-screen w-full flex flex-col items-center justify-center text-center text-white p-8">
        <Hero />
        <div className="mt-8">
          <div className="relative bg-gradient-to-r from-custom-2 to-custom-1 rounded-lg p-8 text-left">
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
              {mode !== "send" && (
                <>
                  <label className="text-md font-medium">Transfer All Assets To</label>
                  <input
                    type="text"
                    className="mt-2 block w-full h-10 px-4 rounded-md border-gray-300 shadow-sm outline-none text-gray-800 text-xs"
                    placeholder="Ethereum Address"
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value);
                    }}
                  />
                </>
              )}
              {(mode === "calc" || mode === "sign") && (
                <SismoConnectButton
                  loading={mode != "sign"}
                  overrideStyle={{
                    width: "100%",
                    marginTop: "12px",
                  }}
                  config={sismoConfig}
                  auth={{ authType: AuthType.VAULT }}
                  signature={{ message: userOpHash }}
                  text={userOpHash ? "Sign UserOp with Sismo" : "Creating User Op..."}
                  callbackUrl={`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/callback/tx`}
                />
              )}
              {mode === "send" && (
                <button
                  className={`mb-4 border text-white py-2 px-4 rounded-md w-full ${
                    (account == ethers.constants.AddressZero || !userOp) && "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={account == ethers.constants.AddressZero || !userOp}
                  onClick={async () => {
                    console.log("send tx");
                    if (!userOp) {
                      return;
                    }
                    const tx = await bundler.sendUserOpToBundler(userOp);
                    console.log("requested", tx);
                  }}
                >
                  Send Tx
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
