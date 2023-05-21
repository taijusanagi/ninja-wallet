/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  SismoConnectHelper,
  SismoConnectHelperInterface,
} from "../../../../../../@sismo-core/sismo-connect-solidity/contracts/libs/utils/SismoConnectHelper";

const _abi = [
  {
    inputs: [
      {
        internalType: "enum AuthType",
        name: "authType",
        type: "uint8",
      },
    ],
    name: "AuthTypeNotFoundInVerifiedResult",
    type: "error",
  },
] as const;

const _bytecode =
  "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220978aad346b211c8afde2b38438e0f3114ccd16bfe45d3efa6589d0e8b373cd6864736f6c63430008130033";

type SismoConnectHelperConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SismoConnectHelperConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SismoConnectHelper__factory extends ContractFactory {
  constructor(...args: SismoConnectHelperConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SismoConnectHelper> {
    return super.deploy(overrides || {}) as Promise<SismoConnectHelper>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SismoConnectHelper {
    return super.attach(address) as SismoConnectHelper;
  }
  override connect(signer: Signer): SismoConnectHelper__factory {
    return super.connect(signer) as SismoConnectHelper__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SismoConnectHelperInterface {
    return new utils.Interface(_abi) as SismoConnectHelperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SismoConnectHelper {
    return new Contract(address, _abi, signerOrProvider) as SismoConnectHelper;
  }
}
