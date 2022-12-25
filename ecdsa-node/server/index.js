const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "044ec73105d4829013e531dc32adcdaf42dd2bfbb7a6a0c8f2d9695b5cb871d23b059a1b37ed9566540e21ac462175f0111319a30c439a742016f44d23b3cf4c73": 100,
  "0411d91e5cdff0232883182e10733ce7923d8d37ebe803757bd851bfa097a902798bb5c09263828e9d9e71fd194ae1afd6f39a6d9eb7591781ab106f0e40af7916": 50,
  "0496c391f1bd1da253dffa2c942d2b3e0bdb5707f328ed0f7aa09e3635346d8449a4258865f9e94f00f2a4f66e5257363229150518f8bdd571496c155a2a836f89": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO get a signature from client side, and recover the public key from it
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
