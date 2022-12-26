import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1"
import {toHex} from "ethereum-cryptography/utils"

function Wallet({ address, setAddress, privateKey, setPrivateKey, balance, setBalance }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    // just make public key as address right now
    const address = toHex(secp.getPublicKey(privateKey))
    setAddress(address)
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type your private key" value={privateKey} onChange={onChange}></input>
      </label>

      <label>
        Address: {address.slice(0, 10)}...
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
