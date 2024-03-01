1. connect to Ethereum with RPC Provider and send transaction
   - [Wallet](https://docs.ethers.org/v6/api/wallet/#Wallet)
   > A Wallet manages a single private key which is used to sign 
   > transactions, messages and other common payloads.
   
   > 钱包管理一个私钥，用于签署交易、消息和其他常见有效负载。 
   >
   - [Signer](https://docs.ethers.org/v6/api/providers/#Signer)
   - [TransactionRequest](https://docs.ethers.org/v6/api/providers/#TransactionRequest)
   - [TransactionResponse](https://docs.ethers.org/v6/api/providers/#TransactionResponse)
   - [TransactionReceipt](https://docs.ethers.org/v6/api/providers/#TransactionReceipt)
   - 

2. deploy contract
   - [ContractFactory](https://docs.ethers.org/v6/api/contract/#ContractFactory)
   > 从获取编译后的合约JSON中获取实例化合约的abi/bytecode
   > contracts/artifacts/MyToken.json

   > without constructor params
   > 参数可能在合约中已经写死了
   > const contractERC20 = await factoryERC20.deploy()
   > with constructor params
   > 参数要与合约中的构造函数参数一一对应


TODO:
1. 批量创建钱包
2. 单一转账
3. 多对多转账
4. uniswap testbet swap
5. bridge
6. lending
