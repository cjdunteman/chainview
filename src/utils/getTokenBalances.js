// require("dotenv").config();
import { Network, Alchemy } from "alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export default async function GetTokenBalances(address, setTokenBalances) {
  //Feel free to switch this wallet address with another address
  const ownerAddress = address;

  // Get all token balances
  const data = await alchemy.core.getTokenBalances(ownerAddress);
  const tokenBalances = data.tokenBalances;

  // Iterate through all token balances
  for (let i = 0; i < tokenBalances.length; i++) {
    // Get metadata for current token
    const metadata = await alchemy.core.getTokenMetadata(
      tokenBalances[i].contractAddress
    );

    // Convert balance into readable value
    const value =
      tokenBalances[i].tokenBalance / Math.pow(10, metadata.decimals);

    tokenBalances[i].tokenBalance = value;
    tokenBalances[i].name = metadata.name;
    tokenBalances[i].symbol = metadata.symbol;
  }

  console.log(tokenBalances);

  setTokenBalances(tokenBalances);
  return tokenBalances;
}
