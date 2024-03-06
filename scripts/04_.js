import { ethers } from 'ethers';
import { config } from 'dotenv';
// import contractJson from '../json/MyToken.json' assert { type: 'json' };;
import { abi } from '../abi/abi2.js';
import { bytecode } from '../bytecode/code2.js';
config()
// 调用已部署到合约

async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const provider = new ethers.InfuraProvider(
    network,
    process.env.INFURA_API_KEY
  );
  // Creating a signing account from a private key
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

  console.log("合约已上链 0xecC87320dDe6A3cD7f2E2D00Be9bf0AaA397f0c3")

  // get contract instance 
  const contractERC20_got = new ethers.Contract(
    '0xecC87320dDe6A3cD7f2E2D00Be9bf0AaA397f0c3',
    abi,
    signer
  );

  // approve
  const spender = "0x876612e30c9E928701a2FDD639C663B368ff6A95";
  // const tx3 = await contractERC20_got.approve(spender, 1000);
  // await tx3.wait();
  // console.log(`allowance ${await contractERC20_got.allowance(signer.address, spender)} to ${spender}`)

  // 将合约连接到新的签名者
  const signer2 = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY_2, provider);
  const contractWithSigner = contractERC20_got.connect(signer2);

  // transferFrom
  const tx =await contractWithSigner.transferFrom(signer.address, '0xd419bED1e0Ddba7CA64E884Fa4bd9217A6751a46', 1);
  
  // 等待交易被挖矿
  const receipt = await tx.wait();
  console.log('Transaction was mined in block', receipt.blockNumber);
  console.log(`allowance ${await contractERC20_got.allowance(signer.address, spender)} to ${spender}`)
}
main();
