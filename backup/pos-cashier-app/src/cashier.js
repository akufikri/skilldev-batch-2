import { calculateGovementTax } from "./utils/tax.js";

const coffePrice = 25000
const finnalTax = calculateGovementTax(coffePrice)
console.log(finnalTax)