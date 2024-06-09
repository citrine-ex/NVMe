function FORMATTER(val, precision = 3) {
    let x = new Decimal(val)

    if (x.gte(998)) {
        let exp = new Decimal.floor(Decimal.log10(x))
        let mant = new Decimal.abs(Decimal.div(x, Decimal.pow(10, exp)))

        return mant.toFixed(3) + "E" + exp
    }
    return x.toFixed(precision)
}

