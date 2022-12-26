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