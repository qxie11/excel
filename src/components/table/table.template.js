const CODES = {
    A: 65,
    Z: 90
}

function createRow(index, content) {
    return `
    <div class="row">
        <div class="row-info">${index}</div>
        <div class="row-data">${content}</div>
    </div>
`
}

function createColumn(col) {
    return `
        <div class="column">
            ${col}
        </div>
    `
}

function createCell() {
    return `
        <div class="cell" contenteditable>
            
        </div>
    `
}

function toChar(_, ind) {
    return String.fromCharCode(CODES.A + ind);
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createColumn)
        .join('');

    rows.push(createRow('', cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell)
            .join('');

        rows.push(createRow(i + 1, cells));
    }

    return rows.join('');
}