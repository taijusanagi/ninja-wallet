/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface NinjaAccountFactoryInterface extends utils.Interface {
  functions: {
    "accountImplementation()": FunctionFragment;
    "createAccount(uint256,bytes16[],uint256)": FunctionFragment;
    "getAddress(uint256,bytes16[],uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "accountImplementation"
      | "createAccount"
      | "getAddress"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "accountImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createAccount",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAddress",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "accountImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAddress", data: BytesLike): Result;

  events: {};
}

export interface NinjaAccountFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NinjaAccountFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    accountImplementation(overrides?: CallOverrides): Promise<[string]>;

    createAccount(
      userId: PromiseOrValue<BigNumberish>,
      groupIds: PromiseOrValue<BytesLike>[],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAddress(
      userId: PromiseOrValue<BigNumberish>,
      groupIds: PromiseOrValue<BytesLike>[],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  accountImplementation(overrides?: CallOverrides): Promise<string>;

  createAccount(
    userId: PromiseOrValue<BigNumberish>,
    groupIds: PromiseOrValue<BytesLike>[],
    salt: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAddress(
    userId: PromiseOrValue<BigNumberish>,
    groupIds: PromiseOrValue<BytesLike>[],
    salt: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    accountImplementation(overrides?: CallOverrides): Promise<string>;

    createAccount(
      userId: PromiseOrValue<BigNumberish>,
      groupIds: PromiseOrValue<BytesLike>[],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getAddress(
      userId: PromiseOrValue<BigNumberish>,
      groupIds: PromiseOrValue<BytesLike>[],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    accountImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    createAccount(
      userId: PromiseOrValue<BigNumberish>,
      groupIds: PromiseOrValue<BytesLike>[],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAddress(
      userId: PromiseOrValue<BigNumberish>,
      groupIds: PromiseOrValue<BytesLike>[],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    accountImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createAccount(
      userId: PromiseOrValue<BigNumberish>,
      groupIds: PromiseOrValue<BytesLike>[],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAddress(
      userId: PromiseOrValue<BigNumberish>,
      groupIds: PromiseOrValue<BytesLike>[],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
