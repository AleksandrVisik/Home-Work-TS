'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOrdinal = makeOrdinal;
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
//# sourceMappingURL=makeOrdinal.js.map