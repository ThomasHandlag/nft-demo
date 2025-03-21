import './App.css'
import { createPublicClient, http, getContract, createWalletClient, formatEther, parseEther } from 'viem'
import { useEffect, useState } from 'react';
import { hardhat } from 'viem/chains';
import { getBalance } from 'viem/actions';
import Usicat from "./artifacts/contracts/UsiCat.sol/UsiCat.json";
import NFTImage from './widgets/NFTImage';
import { pinata } from './utils/config';

const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const client = createPublicClient({
    batch: {
      multicall: true,
    },
    chain: hardhat,
    transport: http("http://127.0.0.1:8545")
  });

  const [account, setAccount] = useState<String>();

  const walletClient = createWalletClient({
    account: account,
    chain: hardhat,
    transport: http()
  });

  const [balance, setBalance] = useState<String>();
  const [file, setFile] = useState<File>();
  const [count, setCount] = useState(0);
  const [nftFiles, setNFTFiles] = useState([]);

  const contract = getContract({ abi: Usicat.abi, address: address, client: walletClient });

  const getNFTFiles = async () => {
    const res = await pinata.files.public.list();
    const cids = res.files.map((file: any) => file.cid);
    setNFTFiles(cids);
  };


  const getCount = async () => {
    const count = await contract.read.count();
    if (count) {
      setCount(parseInt(count));
      setNFTFiles(nftFiles.slice(0, parseInt(count)));
    }
  };


  const load = async () => {
    const [temp] = await walletClient.getAddresses();
    const mon = await getBalance(client, { address: temp });
    setAccount(temp);
    setBalance(formatEther(mon));
    getNFTFiles();
  };

  useEffect(() => {
    load();
  }, [count]);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    setFile(file);
  };


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (file) {
      const upload = await pinata.upload.public.file(file);
      const [res] = await contract.write.payToMint([account, upload.cid], { value: parseEther("0.1") });
      getCount();
    }
  };

  return (
    <div className="w-full h-screen">
      <header className="bg-gray-800 text-white text-center p-4">
        <h4>NFT</h4>
      </header>
      <div className="flex justify-between">
        <div className="w-9/12">
          <div className="h-[200px] bg-gray-300 p-4 flex-row flex justify-between">
            <button className="border-2 rounded-2xl h-[60px] flex-none p-3 border-amber-200 bg-gray-800 text-white" onClick={(event) => {
              handleSubmit(event);
            }} >Mint NFT</button>
            <input onChange={(event) => { handleFileChange(event) }} type="file" name="file" id="file" className="flex-none h-[60px] p-4 rounded-2xl border-amber-200 bg-gray-800 text-white" />
            <img src={file ? URL.createObjectURL(file) : ""} alt="" className="w-[100px] h-[100px] shrink" />
          </div>
          <div className='p4 border-2 border-b-gray-700'>
            {nftFiles.map((cid: any, index: number) => {
              return <NFTImage key={index} cid={cid} tokenId={index} />
            }
            )}
          </div>
        </div>
        <div className="col-span-2 p-4 h-screen w-3/12 truncate overflow-hidden shadow-2xl border border-gray-300">
          <div>Address: {account}</div>
          <div>Balance: {parseInt(balance)} ETH</div>
        </div>
      </div>
    </div>
  )
}

export default App
