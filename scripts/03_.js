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

  const factoryERC20 = new ethers.ContractFactory(abi, bytecode, signer);

  // 1. 利用contractFactory部署ERC20代币合约
  console.log("\n1. 利用contractFactory部署ERC20代币合约")
  // 部署合约，填入constructor的参数
  // const contractERC20 = await factoryERC20.deploy()
  // console.log(`合约地址: ${contractERC20.target}`);
  // console.log("部署合约的交易详情")
  // console.log(contractERC20.deploymentTransaction())
  // console.log("\n等待合约部署上链")
  // await contractERC20.waitForDeployment()
  // 也可以用 contractERC20.deployTransaction.wait()
  console.log("合约已上链 0xecC87320dDe6A3cD7f2E2D00Be9bf0AaA397f0c3")


  // get contract instance 
  const contractERC20_got = new ethers.Contract(
    '0xecC87320dDe6A3cD7f2E2D00Be9bf0AaA397f0c3',
    abi,
    signer
  );

  // console.log(contractERC20_got)

  console.log(`合约名称: ${await contractERC20_got.name()}`)
  console.log(`合约代号: ${await contractERC20_got.symbol()}`)

  const getBalanceOfSigner = async () => {
    const balance = await contractERC20_got.balanceOf(signer.address);
    console.log(balance.toString())
  }
  // amount
  const amount = 1000
  const formatEtherAmount = ethers.formatEther(1000);
  console.log(`formatEther 1000 => ${formatEtherAmount}`)
  // parseEther value must be a string
  const parseEtherAmount = ethers.parseEther(amount.toString());
  console.log(`parseEther 1000 => ${parseEtherAmount}`)
  // mint

  console.log(`mint ${parseEtherAmount} to ${signer.address}`)
  const tx = await contractERC20_got.mint(signer.address, parseEtherAmount);
  await tx.wait();
  await getBalanceOfSigner();

  // transfer
  const toAddress = "0x876612e30c9E928701a2FDD639C663B368ff6A95";
  // Convert 100 Ether to wei
  const wei = ethers.parseEther('100');
  const tx2 = await contractERC20_got.transfer(toAddress, wei);
  console.log(`transfer ${wei} to ${toAddress}`);
  await tx2.wait();
  await getBalanceOfSigner();
}
main();
