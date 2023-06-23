export const USDtoEUR = (currency) => {
    const result = currency * 0.92;

    return result.toFixed(7);
}

export const EURtoUSD = (currency) => {
    const result = currency * 1.09;

    return result.toFixed(7);
}