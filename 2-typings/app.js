'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function makeOrdinal(words) {
    const ORDINALS = {
        zero: 'zeroth',
        one: 'first',
        two: 'second',
        three: 'third',
        four: 'fourth',
        five: 'fifth',
        six: 'sixth',
        seven: 'seventh',
        eight: 'eighth',
        nine: 'ninth',
        ten: 'tenth',
        eleven: 'eleventh',
        twelve: 'twelfth',
        thirteen: 'thirteenth',
        fourteen: 'fourteenth',
        fifteen: 'fifteenth',
        sixteen: 'sixteenth',
        seventeen: 'seventeenth',
        eighteen: 'eighteenth',
        nineteen: 'nineteenth',
        twenty: 'twentieth',
        thirty: 'thirtieth',
        forty: 'fortieth',
        fifty: 'fiftieth',
        sixty: 'sixtieth',
        seventy: 'seventieth',
        eighty: 'eightieth',
        ninety: 'ninetieth',
        hundred: 'hundredth',
        thousand: 'thousandth',
        million: 'millionth',
        billion: 'billionth',
        trillion: 'trillionth',
        quadrillion: 'quadrillionth'
    };
    // Разделяем строку на отдельные слова
    const parts = words.split(/\s+/);
    // Последнее слово определяет порядок числительного
    const lastWord = parts.pop();
    // Проверяем наличие порядка для последнего слова
    if (lastWord && ORDINALS[lastWord]) {
        parts.push(ORDINALS[lastWord]);
    }
    else {
        parts.push(lastWord || '');
    }
    // Возвращаем соединённую строку
    return parts.join(' ');
}
function isFinite(value) {
    return (typeof value === 'number' &&
        value !== Infinity &&
        value !== -Infinity &&
        !Number.isNaN(value));
}
function isSafeNumber(value) {
    // Минимально и максимально возможные безопасные целые числа
    const MIN_SAFE_INTEGER = -(2 ** 53);
    const MAX_SAFE_INTEGER = 2 ** 53 - 1;
    // Проверяем, попадает ли значение в безопасный диапазон
    return Number.isInteger(value) && value >= MIN_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
}
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
    if (!isFinite(num)) {
        throw new TypeError(`Не является конечным числом: ${number} (${typeof number})`);
    }
    if (!isSafeNumber(num)) {
        throw new RangeError('Число выходит за пределы безопасной области!');
    }
    words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
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
//# sourceMappingURL=app.js.map