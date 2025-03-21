// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const UsiCatModule = buildModule("UsiCatModule", (m) => {
  const deployer = m.getAccount(0);
  const usiCat = m.contract("UsiCat", [deployer]);
  // const usiCat = m.contract("UsiCat");
  m.call(usiCat, "count");
  return { usiCat };
});

export default UsiCatModule;
