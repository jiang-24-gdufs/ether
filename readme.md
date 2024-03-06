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

3. erc20 token 
   - deploy erc20 token
   - mint erc20 token
   - transfer erc20 token
   - approve erc20 token

4. [erc20.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/ERC20.sol)
   - name & symbol
      name: 这是代币的全名。
      symbol: 这是代币的简称。
   - mint & balanceOf & transfer
      mint: 为指定地址创建指定数量的代币。
      balanceOf: 返回指定地址的余额。
      transfer: 从调用者的地址向指定地址转移指定数量的代币。
         _transfer(_msgSender(), recipient, amount);
         [_update()](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/token/ERC20/ERC20.sol#L188C14-L188C21)

   - approve & allowance & transferFrom
      > A给B授权token从A的账户中转账token
      > B连接合约，调用transferFrom方法，从A的账户中转账token

   - _msgSender() 定义在[Context](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/utils/Context.sol)
      返回调用者的地址。这是一个内部函数，不应该被重写。
  


TODO:
1. 批量创建钱包
2. 单一转账
3. 多对多转账
4. uniswap testbet swap
5. bridge
6. lending
