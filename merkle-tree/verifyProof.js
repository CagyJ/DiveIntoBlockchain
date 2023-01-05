function verifyProof(proof, node, root, concat) {
    let newRoot;
    for (let i = 0; i < proof.length; i++) {
      let left;
      let right;
      if (proof[i].left) {
        left = proof[i].data;
        right = i===0 ? node : newRoot;
      } else {
        left = i===0 ? node : newRoot;
        right = proof[i].data;
      }
      newRoot = concat(left, right);
    }
    return newRoot === root;
  }
  
  module.exports = verifyProof;
  