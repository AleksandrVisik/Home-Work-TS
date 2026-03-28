'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFinite = isFinite;
function isFinite({ value }) {
    return (typeof value === 'number' &&
        value !== Infinity &&
        value !== -Infinity &&
        !Number.isNaN(value));
}
