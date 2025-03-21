# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ignition/modules/UsiCat.ts
```
```shell
cd ui
npm install
npm run dev
```
In order to use with IPFS you need to create .env.local file with the following variables:
VITE_PINATA_JWT=yourtoken
VITE_GATEWAY_URL=yourgateway