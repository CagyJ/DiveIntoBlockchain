class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs
        this.outputUTXOs = outputUTXOs
    }
    execute() {
        var inputAmount = 0
        // check if any input has been spent already
        const isAnySpent = this.inputUTXOs.forEach(
            ip => {
                if (ip.spent === true) {
                    throw new Error("Already spent...")
                }
                inputAmount += ip.amount
            }
        )
        // calculate total output amount
        const outputAmount = this.outputUTXOs.reduce(
            (acc, op) => acc + op.amount,
            0
        )
        // check if the input is sufficient
        if (inputAmount < outputAmount) {
            throw new Error("No Sufficient Input")
        }
        // 
        this.fee = inputAmount - outputAmount
        // mark all inputs to be spent if success
        this.inputUTXOs.map(ip => ip.spend())
    }
}

module.exports = Transaction;