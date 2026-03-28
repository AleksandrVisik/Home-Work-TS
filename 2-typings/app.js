'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const isFinite_1 = require("./isFinite");
const isSafeNumber_1 = require("./isSafeNumber");
const makeOrdinal_1 = require("./makeOrdinal");
const TEN = 10;
const ONE_HUNDRED = 100;
const ONE_THOUSAND = 1000;
const ONE_MILLION = 1_000_000;
const ONE_BILLION = 1_000_000_000; // 1 миллиард
const ONE_TRILLION = 1_000_000_000_000; // 1 триллион
const ONE_QUADRILLION = 1_000_000_000_000_000; // 1 квадриллион
const MAX = 9_007_199_254_740_992; // Максимальное безопасное число
// Массивы слов
const LESS_THAN_TWENTY = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];
const TENTHS_LESS_THAN_HUNDRED = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];
function toWords(number, asOrdinal) {
    let words;
    const num = parseInt(number.toString(), 10);
    if (!(0, isFinite_1.isFinite)({ value: num })) {
        throw new TypeError(`Не является конечным числом: ${number} (${typeof number})`);
    }
    if (!(0, isSafeNumber_1.isSafeNumber)(num)) {
        throw new RangeError('Число выходит за пределы безопасной области!');
    }
    words = generateWords(num);
    return asOrdinal ? (0, makeOrdinal_1.makeOrdinal)(words) : words;
}
function generateWords(number, words) {
    let remainder = 0;
    let word = "";
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    if (!words) {
        words = [];
    }
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }
    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];
    }
    else if (number < ONE_HUNDRED) {
        remainder = number % TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }
    }
    else if (number < ONE_THOUSAND) {
        remainder = number % ONE_HUNDRED;
        word = generateWords(Math.floor(number / ONE_HUNDRED)) + ' hundred';
    }
    else if (number < ONE_MILLION) {
        remainder = number % ONE_THOUSAND;
        word = generateWords(Math.floor(number / ONE_THOUSAND)) + ' thousand,';
    }
    else if (number < ONE_BILLION) {
        remainder = number % ONE_MILLION;
        word = generateWords(Math.floor(number / ONE_MILLION)) + ' million,';
    }
    else if (number < ONE_TRILLION) {
        remainder = number % ONE_BILLION;
        word = generateWords(Math.floor(number / ONE_BILLION)) + ' billion,';
    }
    else if (number < ONE_QUADRILLION) {
        remainder = number % ONE_TRILLION;
        word = generateWords(Math.floor(number / ONE_TRILLION)) + ' trillion,';
    }
    else if (number <= MAX) {
        remainder = number % ONE_QUADRILLION;
        word = generateWords(Math.floor(number / ONE_QUADRILLION)) + ' quadrillion,';
    }
    words.push(word);
    return generateWords(remainder, words);
}
console.log(toWords(25));
console.log(toWords(100500));
console.log(toWords(1));
console.log(toWords(-100));
