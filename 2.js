function sortArray(arr){
    const temp = [arr[1], arr[0], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[17], arr[8], arr[9], arr[18], arr[11], arr[10], arr[12], arr[13], arr[15], arr[16], arr[14] ]
    const newArr = temp.join("")

    return newArr
}

console.log(sortArray(["u", "D", "m", "b", "w", "a", "y", "s", "i", "s", "w", "a", "e", "s", "e", "o", "m", " ", " "]))