import { useState } from 'react';
import { createWalletClient, http } from 'viem'
import { hardhat } from "viem/chains";

const ConnectWallet = () => {
  const client = createWalletClient({
    chain: hardhat,
    transport: http("http://172.22.124.70:8545")
  });

  const [accounts, setAccounts] = useState(String);


  (async () => {
    const [temp] = await client.getAddresses();
    setAccounts(temp);
  })();

  return (
    <div className="p-6 max-w-md mx-auto mt-10 shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="w-6 h-6">💰</span> List account
      </h2>
      <h5>{accounts}</h5>
      <button onClick={()=> {
        
      }}>
        Get balance
      </button>
    </div>
  );
};

export default ConnectWallet;
