import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv";
import { rpc } from "./lib/web3";
dotenv.config();

let mnemonic = "test ".repeat(11) + "junk";
if (process.env.MNEMONIC) {
  mnemonic = process.env.MNEMONIC;
}

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      forking: {
        url: rpc,
      },
    },
    mumbai: {
      url: rpc,
      accounts: { mnemonic },
    },
  },
};

export default config;
