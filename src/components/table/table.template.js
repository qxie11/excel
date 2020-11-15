const CODES = {
    A: 65,
    Z: 90
}

function createRow(index, content) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
    <div class="row" data-type="resizable">
        <div class="row-info">
        ${index ? index : ''}
        ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>
`
}

function createColumn(col, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createCell(_, col) {
    return `
        <div class="cell" contenteditable data-col="${col}">
             
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