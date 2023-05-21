import { BigNumber, BigNumberish } from "ethers";

import { hexConcat } from "ethers/lib/utils";
import { BaseAccountAPI } from "@account-abstraction/sdk";

import {
  NinjaAccount,
  NinjaAccount__factory,
  NinjaAccountFactory,
  NinjaAccountFactory__factory,
} from "../../typechain-types";

export interface NinjaAccountApiParams {
  factoryAddress: string;
  verifierAddress: string;
  userId: string;
  groupIds: string[];
  salt: string;
}

export class NinjaAccountAPI extends BaseAccountAPI {
  factoryAddress: string;
  verifierAddress: string;
  userId: string;
  groupIds: string[];
  salt: string;

  accountContract?: NinjaAccount;
  factory?: NinjaAccountFactory;

  constructor(params: any) {
    super(params);
    this.factoryAddress = params.factoryAddress;
    this.verifierAddress = params.verifierAddress;
    this.userId = params.userId;
    this.groupIds = params.groupIds;
    this.salt = params.salt;
  }

  async _getAccountContract(): Promise<NinjaAccount> {
    if (this.accountContract == null) {
      this.accountContract = NinjaAccount__factory.connect(await this.getAccountAddress(), this.provider);
    }
    return this.accountContract;
  }

  async getAccountInitCode(): Promise<string> {
    if (this.factory == null) {
      if (this.factoryAddress != null && this.factoryAddress !== "") {
        this.factory = NinjaAccountFactory__factory.connect(this.factoryAddress, this.provider);
      } else {
        throw new Error("no factory to get initCode");
      }
    }

    return hexConcat([
      this.factory.address,
      this.factory.interface.encodeFunctionData("createAccount", [this.userId, this.groupIds, this.salt]),
    ]);
  }

  async getNonce(): Promise<BigNumber> {
    if (await this.checkAccountPhantom()) {
      return BigNumber.from(0);
    }
    const accountContract = await this._getAccountContract();
    return await accountContract.getNonce();
  }

  async encodeExecute(target: string, value: BigNumberish, data: string): Promise<string> {
    const accountContract = await this._getAccountContract();
    return accountContract.interface.encodeFunctionData("execute", [target, value, data]);
  }

  async signUserOpHash(userOpHash: string): Promise<string> {
    return "";
    // return await this.owner.signMessage(arrayify(userOpHash));
  }
}
