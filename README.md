# @lacchain/gas-model-provider
Truffle Provider. Use it to sign transactions using the LACChain Gas Model.

## Install

```
$ npm install @lacchain/truffle-gas-model-provider
```

## Requirements
```
Node >= 12 
Web3 ^1.2.0
```

## General Usage

You can use this provider wherever a Web3 provider is needed, not just in Truffle. For Truffle-specific usage, see next section.

By default, the `GasModelProvider` will use the address of the first address that's generated from the mnemonic. If you pass in a specific index, it'll use that address instead.

### Instantiation

You can instantiate `gas-model-provider` with options passed in an object with
named keys. You can specify the following options in your object:

Parameters:

| Parameter           | Type | Default | Required | Description |
|---------------------| ---- | ------- | ----------- | -- |
| `mnemonic`          | `object\|string` | `null` | [ ] | Object containing `phrase` and `password` (optional) properties. `phrase` is a 12 word mnemonic string which addresses are created from. Alternately the value for mnemonic can be a string with your mnemonic phrase. |
| `privateKeys`       | `string[]` | `null` | [ ] | Array containing 1 or more private keys. |
| `providerOrUrl`     | `string\|object` | `null` | [x] | URI or Ethereum client to send all other non-transaction-related Web3 requests |
| `nodeAddress`       | `string` | `null` | [ ] | Node Address. |
| `expiration `       | `number` | `null` | [ ] | Expiration. |
| `addressIndex`      | `number` | `0` | [ ] | If specified, will tell the provider to manage the address at the index specified |
| `numberOfAddresses` | `number` | `1` | [ ] | If specified, will create `numberOfAddresses` addresses when instantiated |
| `shareNonce`        | `boolean` | `true` | [ ] | If `false`, a new WalletProvider will track its own nonce-state |
| `derivationPath`    | `string` | `"m/44'/60'/0'/0/"` | [ ] | If specified, will tell the wallet engine what derivation path should use to derive addresses. |
| `pollingInterval`   | `number` | `4000` | [ ] | If specified, will tell the wallet engine to use a custom interval when polling to track blocks. Specified in milliseconds. |
| `chainId`           | `number\|string` | `undefined` | [ ] | Specify to enable signed transactions that are EIP-155 compliant for major chains. |


To include in your truffle-config.js

```javascript
networks: {
    network_name: {
        provider: () => new GasModelProvider( PRIVATE_KEY, NODE_RPC, NODE_ADDRESS, EXPIRATION ),
        network_id: "*",
        gas: 115500000,
        gasPrice: 0,
        from: ADDRESS
    }
}
```

Where:
    - PRIVATE_KEY: is the Private Key of the ADDRESS
    - ADDRESS: is the Ethereum address of the tx sender
    - NODE_ADDRESS: is the Node Address in the Gas Model
    - EXPIRATION: is the expiration time in the Gas Model
    - RPC: is the RPC url of the writer node

Some other examples can be found below:

```javascript
const HDWalletProvider = require("@lacchain/truffle-gas-model-provider");
const Web3 = require("web3");
const mnemonicPhrase = "mountains supernatural bird..."; // 12 word mnemonic
let provider = new GasModelProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: "http://localhost:8545",
  nodeAddress: '0xd00e6624a73f88b39f82ab34e8bf2b4d226fd768',
  expiration: 1736394529
});

// Or, alternatively pass in a zero-based address index.
provider = new GasModelProvider({
  mnemonic: mnemonicPhrase,
  providerOrUrl: "http://localhost:8545",
  addressIndex: 5,
  nodeAddress: '0xd00e6624a73f88b39f82ab34e8bf2b4d226fd768',
  expiration: 1736394529
});

// Or, use your own hierarchical derivation path
provider = new GasModelProvider({
  mnemonic: mnemonicPhrase,
  providerOrUrl: "http://localhost:8545",
  numberOfAddresses: 1,
  shareNonce: true,
  derivationPath: "m/44'/137'/0'/0/",
  nodeAddress: '0xd00e6624a73f88b39f82ab34e8bf2b4d226fd768',
  expiration: 1736394529
});

// To make HDWallet less "chatty" over JSON-RPC,
// configure a higher value for the polling interval.
provider = new GasModelProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: "http://localhost:8545",
  pollingInterval: 8000,
  nodeAddress: '0xd00e6624a73f88b39f82ab34e8bf2b4d226fd768',
  expiration: 1736394529
});

// HDWalletProvider is compatible with Web3. Use it at Web3 constructor, just like any other Web3 Provider
const web3 = new Web3(provider);

// Or, if web3 is alreay initialized, you can call the 'setProvider' on web3, web3.eth, web3.shh and/or web3.bzz
web3.setProvider(provider)

// ...
// Write your code here.
// ...

// At termination, `provider.engine.stop()' should be called to finish the process elegantly.
provider.engine.stop();
```

**Note: If both mnemonic and private keys are provided, the mnemonic is used.**

## Copyright 2022 LACChain

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.