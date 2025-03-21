import { useEffect, useState } from "react";
import { createPublicClient, getContract, http } from "viem";
import { hardhat } from "viem/chains";
import Usicat from "../artifacts/contracts/UsiCat.sol/UsiCat.json";
import { pinata } from "../utils/config";


export default function NFTImage({ tokenId, cid }) {
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const client = createPublicClient({
        chain: hardhat,
        transport: http("http://127.0.0.1:8545")
    });

    const contract = getContract({ abi: Usicat.abi, address: address, client: client });

    const [isMinted, setIsMinted] = useState(false);

    const getMintedStatus = async () => {
        if (cid) {
            const result = await contract.read.isContentOwned([cid]);
            setIsMinted(result);
        }
    };

    const [uri, setUri] = useState<String>();

    const getURI = async () => {
        if (cid) {
            const result = await pinata.gateways.public.convert(cid);
            setUri(result);
        }
    };


    useEffect(() => {
        getMintedStatus();
        getURI();
    }, []);

    return (
        <div key={tokenId} className="w-[200px] h-[200px]">
            <img src={uri ?? null} alt="image" />
            {isMinted ? <p>Minted</p> : <p>Not minted</p>}
        </div>
    )
}