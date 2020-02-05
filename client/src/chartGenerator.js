export const dataChartGenerator = measurements => {
    return measurements.map(measurement => {
        const { temp1, temp2, temp3, temp4, date } = measurement;
        let meanTemperature = (temp1 + temp2 + temp3 + temp4) / 4;
        return {
            x: new Date(date),
            y: meanTemperature
        }
    })
}