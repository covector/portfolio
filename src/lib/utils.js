/** 
 * @param {number} t current value
 * @param {number} a start of range
 * @param {number} b end of range
*/
export function progressIn(t, a, b) {
    if (t <= a) { return 0; }
    if (t >= b) { return 1; }
    return (t - a) / (b - a);
}

/**
 * @param {number} a 0 maps to a
 * @param {number} b 1 maps to b
 * @param {number} t current value (0-1)
*/
export function lerp(a, b, t) {
    return a + (b - a) * t;
}