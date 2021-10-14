function investment (year){
    const saldoAwal = 1000000000
    const saldoDeposit = 350000000
    const investObligasi = (saldoAwal - saldoDeposit)*(30/100)
    const investSahamA = (saldoAwal - saldoDeposit)*(35/100)
    const investSahamB = saldoAwal - saldoDeposit - investObligasi - investSahamA

    const profitDeposit = saldoDeposit * (3.5/100)
    const profitObligasi = investObligasi * (13/100)
    const profitSahamA = investSahamA * (14.5/100)
    const profitSahamB = investSahamB * (12.5/100)
    total = saldoAwal + (year * (profitDeposit + profitObligasi + profitSahamA + profitSahamB))

    return total
}
console.log("Rp" + investment(2))