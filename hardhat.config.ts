import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
// import "dotenv"
// import { configDotenv } from "dotenv";

// configDotenv();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "hardhat",
  paths: {
    artifacts: "./ui/src/artifacts"
  }
  // networks: {
  //   hardhat: {

  //   },
  //   sepolia: {
  //     url: process.env.ALCHEMY_SEPOLIA_RPC || "",
  //     accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  //   }
  // },
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // },
};

export default config;
