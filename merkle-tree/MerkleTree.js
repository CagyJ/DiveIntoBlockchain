class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    getRoot() {
        return this.getTheFuckingRoot(this.leaves, this.concat, 0, this.leaves.length-1);
    }

    getTheFuckingRoot(leaves, concat, a, b) {
        if (a === b) {
            return leaves[a];
        }
        const mid = a + (b-a)/2;
        // odd
        if ((b-a+1)%2 === 1) {
            // 7, 11, 15, ...
            if (((b-a)/2)%2 === 1) {
                return concat(
                    this.getTheFuckingRoot(leaves, concat, a, mid),
                    this.getTheFuckingRoot(leaves, concat, mid+1,b)
                )
            } else { // 5, 9, ...
                return concat(
                    this.getTheFuckingRoot(leaves, concat, a, b-1),
                    leaves[b]
                );
            }
        } else {
            return concat(
                this.getTheFuckingRoot(leaves, concat, a, Math.floor(mid)), 
                this.getTheFuckingRoot(leaves, concat, Math.ceil(mid), b));
        }
    }

    getProof(i) {
        let proof = [];
        let layer = this.leaves;
        while (layer.length > 1) {
            let tmp = [];
            for (let j = 0; j < layer.length; j+=2) {
                let left = layer[j];
                let right = layer[j+1];
                if (!right) {
                    tmp.push(left);
                } else {
                    tmp.push(this.concat(layer[j], layer[j+1]));

                    // the current left or right is the one we want the proof
                    if (j === i || j + 1 === i) {
                        let isLeft = !(i % 2);
                        proof.push({
                            data: isLeft ? right : left,
                            left: !isLeft
                        });
                    }
                }
            }

            layer = tmp;
            i = Math.floor(i/2);
        }
        return proof;
    }
}

module.exports = MerkleTree;