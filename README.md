# Dive Into Blockchain

The road to Blockchain Development🃏


### ECDSA Node 🗳️
The first-week assignment from Alchemy University  [link](./ecdsa-node/)

**Introduction**: The project has a client to allow to transfer any funds from one account to another account, so it's a centralized project rather than a decentralized one.

**Aim**: practice the knowledge of public key cryptography, hashes, and digital signatures.

**Upgrade History**:
1. [Init](https://github.com/CagyJ/DiveIntoBlockchain/commit/af5a1939f1d4bf91bb89fb960f5f4eb7daeddf19): the user can use the address to transfer. There is no public key or private key at all.
2. [Public Key Dominance](https://github.com/CagyJ/DiveIntoBlockchain/commit/d4ca5727c7c276a465df793422c79e11b9c36d79): the user uses the private key from the client side, and the front end will generate the public key when sending the request to the server, whether getting the balance or transferring. The back end uses the public key as the key to point to the user's balance rather than the fake address. (Be careful that the address right now is the public key)
   - Lib Requirements: 
     - [ethereum-cryptography](https://github.com/ethereum/js-ethereum-cryptography)
     - [noble-secp256k1](https://github.com/paulmillr/noble-secp256k1)
   - Public/Private Key pairs for test: [public-keys](ecdsa-node/public-keys.txt)
3. [Introduce Signature](https://github.com/CagyJ/DiveIntoBlockchain/commit/84376f5f9811e7ee8e6a26f0d0bc99db4bb7e6e5): the private key is still used, but the signature will be sent while requesting a transfer. And the server will recover the public key from the signature.


**Future TODO**:
- use the last 20 bytes as the wallet address rather than the public key


### UTXO Model 💸
Mocking UTXO (Unspent Transaction Outputs) model that Biscoin uses.

The transaction here is differ from account-based model (what the bank usually does).
- Usually have many inputs and outputs
- Each coin is unique (Fun fact that Bitcoin is the first NFT collection technically)
- During transactions
  - Before transactions, all inputs should be un-spent, and it should be greater than the output (actually the sum of all outputs)
  - The difference between the inputs and outputs is the transaction fee (actually not, some of it should be back to the payer, only a very small amount goes into the miner's pocket)
- After successful transaction, all inputs are marked as 'spent'


### Merkle Tree 🌳
It is a data-storing structure based on Binary Tree, which allows us to make efficient verifications. 

A Merkle Tree is a collection of hashes reduced to a single hash, and supports to verify whether a single piece of data belongs in the tree without having all of the data. For example, if the Merkle Tree is like this:
```
      Root
     /    \
    ABCD   E
    / \    |
   AB  CD  E
  / \  / \ |
  A B  C D E
```
What we want to prove is 'C' in the root, and if we create the root from 'C': Hash(Hash(AB + Hash(C + D)) + E), there are only three hashes we need to know: 'AB', 'D' and 'E'. Be careful that the order in which they should be combined is relevant, and the reverse doesn't make the same hash.

Therefore, if the hash of the collocation we made from 'C' is equal to the hash of the original Root, then we can say 'C' is in the tree.

In this implementation of Merkle Tree, the hash of the root can be gotten via `getRoot()` method, and `getProof()` method getting an index returns the respective orderly proof. 
- The structure of the proof is an array, including objects that look like this:
  ```
  {data: 'C', left: true}
  ```
- For the example above, the proof should be
  ```
  [
    {data: 'D', left: false},
    {data: 'AB', left: true},
    {data: 'E', left: false}
  ]
  ```

There is a util method for verification called `verifyProof()`, which accepts four arguments:
- `proof`: the array of objects
- `node`: what we want to prove
- `root`: the valid root
- `concat`: the method used to combine the nodes
It combines the `node` with the proof in order to get a root, then verify whether these two roots are equal.