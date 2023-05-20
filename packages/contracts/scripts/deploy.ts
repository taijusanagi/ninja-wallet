import { ethers } from "hardhat";
import { DeterministicDeployer } from "@account-abstraction/sdk";
import { NinjaAccountFactory__factory } from "../typechain-types";

import * as fs from "fs";
import * as path from "path";

async function main() {
  const deterministicDeployer = new DeterministicDeployer(ethers.provider);
  const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
  const factoryDeploymentArgument = ethers.utils.defaultAbiCoder.encode(["address"], [entryPointAddress]);
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
    })
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
