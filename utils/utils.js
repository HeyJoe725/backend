// Javascript program to calculate the
// standard deviation of an array
function standardDeviation(arr) {
    const n = arr.length;
    const mean = arr.reduce((a, b) => a + b) / n;
    return Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}


function mean(arr) {
    return arr.reduce((a, b) => a + b) / arr.length;
}




export { standardDeviation, mean };


