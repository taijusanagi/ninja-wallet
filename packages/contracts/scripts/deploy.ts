import { ethers } from "hardhat";
import { DeterministicDeployer } from "@account-abstraction/sdk";
import { NinjaAccountFactory__factory, SismoVerifier__factory } from "../typechain-types";
import { appId } from "../lib/sismo";

import * as fs from "fs";
import * as path from "path";

async function main() {
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
  }
  await deterministicDeployer.deterministicDeploy(verifierDeploymentCode);
  console.log("Verifier at", verifierAddress);

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
  }
  await deterministicDeployer.deterministicDeploy(factorDeploymentCode);
  console.log("Factory at", factoryAddress);

  fs.writeFileSync(
    path.join(__dirname, `../deployments.json`),
    JSON.stringify({
      entryPointAddress,
      factoryAddress,
      verifierAddress,
    })
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
