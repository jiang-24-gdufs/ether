import { ethers } from 'ethers';
import { config } from 'dotenv';
// console.log(ethers);
config();
async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const provider = new ethers.InfuraProvider(
    network,
    process.env.INFURA_API_KEY
  );
  // Creating a signing account from a private key
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

  // Creating and calling the transaction object
  const callTx = await signer.call({
    to: "0x876612e30c9E928701a2FDD639C663B368ff6A95",
    value: ethers.parseUnits("0.0001", "ether"),
  });
  console.log("Calling transaction...", callTx);
  // Creating and sending the transaction object
  const tx = await signer.sendTransaction({
    to: "0x876612e30c9E928701a2FDD639C663B368ff6A95",
    value: ethers.parseUnits("0.001", "ether"),
  });
  console.log("Mining transaction...");
  console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
  // Waiting for the transaction to be mined
  const receipt = await tx.wait();
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}

main();

