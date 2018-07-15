// @flow

export default function rearrangeArray<T>(array: T[]): T[] {
    // Select a random position to rearrange the array
    let j = Math.floor(Math.random() * (array.length - 1));

    let i = array.length;
    const a = [];

    while (i) {
        a.push(array[j]);
        j = j === array.length - 1 ? 0 : j + 1;
        i -= 1;
    }

    return a
}
