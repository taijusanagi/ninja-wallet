import { ethers } from "hardhat";
import { expect } from "chai";
import { EntryPoint__factory } from "@account-abstraction/contracts";
import { NinjaAccountAPI } from "../lib/account-abstraction/NinjaAccountAPI";
import deployments from "../deployments.json";

describe("NinjaAccountAPI", () => {
  const { entryPointAddress } = deployments;

  const fixture = async () => {
    const [signer] = await ethers.getSigners();
    const entryPoint = EntryPoint__factory.connect(entryPointAddress, signer);
    const NinjaAccountFactory = await ethers.getContractFactory("NinjaAccountFactory");
    const ninjaAccountFactory = await NinjaAccountFactory.deploy(entryPointAddress);
    await ninjaAccountFactory.deployed();
    const ninjaAccountAPI = new NinjaAccountAPI({
      entryPointAddress: entryPointAddress,
      factoryAddress: ninjaAccountFactory.address,
      userId: 0,
      salt: 0,
      provider: ethers.provider,
    });
    return { signer, entryPoint, ninjaAccountAPI };
  };

  it("getAccountAddress", async function () {
    const { ninjaAccountAPI } = await fixture();
    const accountAddress = await ninjaAccountAPI.getAccountAddress();
    expect(accountAddress).not.eq(ethers.constants.AddressZero);
  });

  it("CreateUnsignedUserOperation", async function () {
    const { signer, entryPoint, ninjaAccountAPI } = await fixture();
    const accountAddress = await ninjaAccountAPI.getAccountAddress();
    await signer.sendTransaction({ to: accountAddress, value: ethers.utils.parseEther("1") });
    const userOp = await ninjaAccountAPI.createUnsignedUserOp({
      data: "0x",
      target: ethers.constants.AddressZero,
    });
    userOp.signature = "0x";
    await entryPoint.handleOps([userOp], signer.address);
  });
});
