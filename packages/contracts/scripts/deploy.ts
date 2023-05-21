import { ethers } from "hardhat";
import { DeterministicDeployer } from "@account-abstraction/sdk";
import {
  NinjaAccountFactory__factory,
  SismoVerifier__factory,
  GitcoinPassportPaymaster__factory,
} from "../typechain-types";
import { appId, gitcoinPassportGroupId } from "../lib/sismo";

import * as fs from "fs";
import * as path from "path";

async function main() {
  const [signer] = await ethers.getSigners();
  const deterministicDeployer = new DeterministicDeployer(ethers.provider);

  const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

  const verifierDeploymentArgument = ethers.utils.defaultAbiCoder.encode(["bytes16"], [appId]);
  const verifierDeploymentCode = ethers.utils.solidityPack(
    ["bytes", "bytes"],
    [SismoVerifier__factory.bytecode, verifierDeploymentArgument]
  );

  const verifierAddress = DeterministicDeployer.getAddress(verifierDeploymentCode);
  if (await deterministicDeployer.isContractDeployed(verifierAddress)) {
    console.log("Verifier already deployed at", verifierAddress);
  } else {
    await deterministicDeployer.deterministicDeploy(verifierDeploymentCode);
    console.log("Verifier at", verifierAddress);
  }

  const factoryDeploymentArgument = ethers.utils.defaultAbiCoder.encode(
    ["address", "address"],
    [entryPointAddress, verifierAddress]
  );
  const factorDeploymentCode = ethers.utils.solidityPack(
    ["bytes", "bytes"],
    [NinjaAccountFactory__factory.bytecode, factoryDeploymentArgument]
  );
  const factoryAddress = DeterministicDeployer.getAddress(factorDeploymentCode);
  if (await deterministicDeployer.isContractDeployed(factoryAddress)) {
    console.log("Factory already deployed at", factoryAddress);
  } else {
    await deterministicDeployer.deterministicDeploy(factorDeploymentCode);
    console.log("Factory at", factoryAddress);
  }

  const paymasterDeploymentArgument = ethers.utils.defaultAbiCoder.encode(
    ["address", "bytes16"],
    [entryPointAddress, gitcoinPassportGroupId]
  );
  const paymasterDeploymentCode = ethers.utils.solidityPack(
    ["bytes", "bytes"],
    [GitcoinPassportPaymaster__factory.bytecode, paymasterDeploymentArgument]
  );

  const paymasterAddress = DeterministicDeployer.getAddress(paymasterDeploymentCode);
  if (await deterministicDeployer.isContractDeployed(paymasterAddress)) {
    console.log("Paymaster already deployed at", paymasterAddress);
  } else {
    await deterministicDeployer.deterministicDeploy(paymasterDeploymentCode);
    console.log("Paymaster at", paymasterAddress);
  }

  const paymasterContract = new ethers.Contract(paymasterAddress, GitcoinPassportPaymaster__factory.abi, signer);
  const deposit = await paymasterContract.getDeposit();
  if (deposit.lt(ethers.utils.parseEther("0.05"))) {
    console.log("paymaster deposit is less than 0.05");
    const tx = await paymasterContract.deposit({
      value: ethers.utils.parseEther("0.1"),
    });
    await tx.wait();
    console.log("depositted 0.1");
  } else {
    console.log("paymaster deposit is more than 0.1");
  }

  fs.writeFileSync(
    path.join(__dirname, `../deployments.json`),
    JSON.stringify({
      entryPointAddress,
      factoryAddress,
      verifierAddress,
      paymasterAddress,
    })
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
