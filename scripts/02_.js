import { ethers } from 'ethers';
import { config } from 'dotenv';
// import { bytecode } from '../bytecode/code1.js'
// import { abi } from '../abi/abi1.js'
import contractJson from '../json/MyToken.json' assert { type: 'json' };;
const abi = contractJson.abi;
const bytecode = contractJson.data.bytecode.object;
config()
// 部署合约

// uniswap sepolia testnet contract abi
const abiERC20 = [
  "constructor(string memory name_, string memory symbol_)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function mint(uint amount) external",
];
/***
 * 
 * 准备ERC20合约的字节码和ABI。
 * 因为ERC20的构造函数含有参数，因此我们必须把它包含在ABI中。
 * 合约的字节码可以从remix的编译面板中点击Bytecode按钮，把它复制下来，
 * 其中"object"字段对应的数据就是字节码。
 * 如果部署在链上的合约，你可以在etherscan的Contract页面的Contract Creation Code中找到。
 * 
 * 
 *  */

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
  // const contractERC20 = await factoryERC20.deploy("MyToken", "MTK")
  const contractERC20 = await factoryERC20.deploy()
  console.log(`合约地址: ${contractERC20.target}`);
  console.log("部署合约的交易详情")
  console.log(contractERC20.deploymentTransaction())
  console.log("\n等待合约部署上链")
  await contractERC20.waitForDeployment()
  // 也可以用 contractERC20.deployTransaction.wait()
  console.log("合约已上链")
}
main();
