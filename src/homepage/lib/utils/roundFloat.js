// @flow

export default function roundFloat(number: number, digit: number): number {
    const digitAdj = digit < 0 ? 0 : digit;  // Make sure rounding digit is valid
    const r = 10 ** digitAdj;
    return Math.round(number * r) / r
}
