"use client";

import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { ethers } from "ethers";

import Image from "next/image";

import { SismoConnectButton, AuthType, useSismoConnect } from "@sismo-core/sismo-connect-react";
import { Hero } from "@/components/Hero";
import { sismoConfig } from "@/lib/sismo";
import { HttpRpcClient } from "@account-abstraction/sdk";
import { NinjaAccountAPI } from "../../lib/account-abstraction/NinjaAccountAPI";
import { rpc } from "../../../../contracts/lib/web3";

import deployments from "../../../../contracts/deployments.json";
import { gitcoinPassportGroupId } from "../../../../contracts/lib/sismo";
const { entryPointAddress, factoryAddress, verifierAddress, paymasterAddress } = deployments;

export default function Home() {
  const searchParams = useSearchParams();
  const { responseBytes } = useSismoConnect({ config: sismoConfig });
  const [ninjaAccountAPI, setNinjaAccountAPI] = useState<NinjaAccountAPI>();
  const [account, setAccount] = useState(ethers.constants.AddressZero);
  const [balance, setBalance] = useState(ethers.BigNumber.from("0"));
  const [mode, setMode] = useState<"input" | "calc" | "sign" | "send">("input");
  const [to, setTo] = useState("");
  const [userOpHash, setUserOpHash] = useState("");
  const [userOp, setUserOp] = useState<any>();

  const [isOpen, setIsOpen] = useState(false);

  const [requestId, setRequestId] = useState("Loading");

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    const userId = searchParams.get("userId");
    const groupIds = searchParams.get("groupIds");
    const salt = searchParams.get("salt");
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    if (!userId || !salt) {
      return;
    }
    const ninjaAccountAPI = new NinjaAccountAPI({
      entryPointAddress,
      factoryAddress,
      verifierAddress,
      userId,
      groupIds: Array.isArray(groupIds) ? groupIds : [groupIds].filter((v) => v),
      salt,
      provider,
    });
    setNinjaAccountAPI(ninjaAccountAPI);
    ninjaAccountAPI.getAccountAddress().then((account) => {
      console.log("account", account);
      setAccount(account);
      provider.getBalance(account).then((balance) => {
        setBalance(balance);
      });
    });
  }, [searchParams]);

  useEffect(() => {
    if (!ninjaAccountAPI || !account || !ethers.utils.isAddress(to)) {
      return;
    }

    console.log("ninjaAccountAPI.groupIds", ninjaAccountAPI.groupIds);
    setMode("calc");
    ninjaAccountAPI.createUnsignedUserOp({ target: to, data: "0x" }).then((userOp) => {
      userOp = {
        ...userOp,
        paymasterAndData: ninjaAccountAPI.groupIds.includes(gitcoinPassportGroupId) ? paymasterAddress : "0x",
        callGasLimit: ethers.utils.hexlify(100000),
        preVerificationGas: ethers.utils.hexlify(100000),
        verificationGasLimit: ethers.utils.hexlify(1000000),
      };
      console.log("userOp", userOp);
      ninjaAccountAPI.getUserOpHash(userOp).then((userOpHash) => {
        console.log("userOpHash", userOpHash);
        setUserOpHash(userOpHash);
        ethers.utils.resolveProperties(userOp).then((userOp) => {
          userOp = {
            ...userOp,
            maxFeePerGas: ethers.utils.hexlify(userOp.maxFeePerGas),
            maxPriorityFeePerGas: ethers.utils.hexlify(userOp.maxPriorityFeePerGas),
            nonce: ethers.utils.hexlify(userOp.nonce),
            verificationGasLimit: ethers.utils.hexlify(userOp.verificationGasLimit.toString()),
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
          <div className="relative bg-gradient-to-r from-custom-2 to-custom-1 rounded-lg p-6 text-left max-w-md">
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
              <h2 className="text-md font-medium">ETH Balance</h2>
              <p className="mt-1 text-xs">0 ETH</p>
            </div>
            <div className="mt-4">
              <h2 className="text-md font-medium">USDC Balance (dummy)</h2>
              <p className="mt-1 text-xs">100 USDC</p>
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
                <>
                  <div className="mt-4">
                    <h2 className="text-md font-medium">Call data</h2>
                    <p className="mt-1 text-xs break-all">{userOp.callData}</p>
                  </div>
                  <div className="mt-4">
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
                        openModal();
                        const bundler = new HttpRpcClient(
                          process.env.NEXT_PUBLIC_BUNDLER_API || "",
                          entryPointAddress,
                          80001
                        );
                        const requestId = await bundler.sendUserOpToBundler(userOp);
                        console.log("requestId", requestId);
                        setRequestId(requestId);
                      }}
                    >
                      Send Tx
                    </button>
                    {isOpen && (
                      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 text-gray-800">
                        <div className="bg-white rounded-md shadow-lg w-80">
                          <div className="p-4">
                            <div className="animate-fadeInOut backdrop-blur-md flex items-center justify-center">
                              <Image
                                src="/ninja_transparent.png"
                                alt="Ninja Wallet"
                                width={120}
                                height={120}
                                className="object-cover"
                              />
                            </div>
                            <p className="text-sm font-medium text-center">Your AA Tx is sent...</p>
                            <div className="mt-4">
                              <button
                                className={`border py-2 px-4 rounded-md w-full`}
                                onClick={() => {
                                  window.location.href = "/";
                                }}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="mt-4">
              <p
                className="mt-1 text-xs text-right text-blue-500 hover:text-blue-700 underline cursor-pointer"
                onClick={() => {
                  alert("not implemented");
                }}
              >
                Connect dApps with Wallet Connect
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
