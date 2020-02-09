export function findParameters(measurements) {
    const mean = measurements.map(result => {
        return meanCount([result.temp1, result.temp2, result.temp3, result.temp4])
    })
    return {
        min: Math.min(...mean).toFixed(2),
        minDate : measurements[mean.indexOf(Math.min(...mean))].date,
        max: Math.max(...mean).toFixed(2),
        maxDate : measurements[mean.indexOf(Math.max(...mean))].date,
        mean: meanCount(mean).toFixed(2)
    }
}

function meanCount(numbers) {
    return numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
}
