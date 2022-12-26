import { useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak"
import { utf8ToBytes } from "ethereum-cryptography/utils"
import * as secp from "ethereum-cryptography/secp256k1"

function hashMessage(message) {
  const toBytes = utf8ToBytes(message)
  return keccak256(toBytes)
}

async function signMessage(hashMsg, privateKey) {
  return await secp.sign(hashMsg, privateKey, { recovered: true })
}

function Transfer({ address, privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const msg = address + "send $$" + sendAmount + "$$ to" + recipient
    const hashMsg = hashMessage(msg)
    const [signature, recoveryBit] = await signMessage(hashMsg, privateKey)

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        senderSignature: signature,
        msg: msg,
        recoveryBit: recoveryBit,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type a public key"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
