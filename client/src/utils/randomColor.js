function randomColor() {
    let contrastColors = [
        '#dc1a14',
        '#be261a',
        '#a8291d',
        '#942a1e',
        '#54709e',
        '#4c648a',
        '#40516d',
        '#1466ef',
        '#1c5dcd',
        '#2255b0',
        '#244e99',
        '#4c7b33',
        '#466d31',
        '#3b582c',
        '#7b702d',
        '#6d632c',
        '#61592a',
        '#585128',
        '#41817f',
        '#407977',
        '#3c6b69',
        '#385f5e',
        '#355755',
        '#4b6ac8',
        '#3959ce',
        '#2b48d6',
        '#2332e2',
        '#be32a6',
        '#a43590',
        '#90357e',
        '#803370',
        '#806a69',
        '#755d5c',
        '#6c5351',
        '#654a48'
    ];
    let randomInt = Math.floor(Math.random() * contrastColors.length)
    return contrastColors[randomInt];
}

export default randomColor;