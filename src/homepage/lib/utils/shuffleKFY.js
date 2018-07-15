// @flow

export default function shuffleKFY<T>(array: T[]): T[] {
    const a = array.slice();
    let m = a.length;
    let t, i;

    // While there remain elements to shuffle
    while (m) {
        // Pick a random unshuffled element in the array
        i = Math.floor(Math.random() * (m -= 1));

        // Swap it with the current element
        t = a[m];
        a[m] = a[i];
        a[i] = t;
    }

    return a
}
