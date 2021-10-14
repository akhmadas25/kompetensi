function investment (year){
    const deposit = 350000000 * (3.5/100)
    const obligasi = 195000000 * (13/100)
    const sahamA = 227500000 * (14.5/100)
    const sahamB = 227500000 * (12.5/100)
    total = year * (deposit + obligasi + sahamA + sahamB)

    return total
}
console.log("Rp" + investment(2))