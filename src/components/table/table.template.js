import { toInlineStyles } from "@/core/utils";
import { defaultStyles } from "@/constans";
import { parse } from "@core/parse";

const CODES = {
    A: 65,
    Z: 90
},
    DEFAULT_WIDTH = 120,
    DEFAULT_HEIGHT = 24;

function toChar(_, ind) {
    return String.fromCharCode(CODES.A + ind);
}

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFrom(state) {
    return function (col, index) {
        return {
            col,
            index,
            width: getWidth(state.colState, index)
        }
    }
}

function createRow(index, content, state) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '',
        height = getHeight(state, index);
    return `
    <div
        class="row"
        data-type="resizable"
        data-row="${index}"
        style="height: ${height}"
        >
        <div class="row-info">
        ${index ? index : ''}
        ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>
`
}

function createColumn({ col, index, width }) {
    return `
        <div
            class="column"
            data-type="resizable"
            data-col="${index}"
            style="width: ${width}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createCell(state, row) {
    return function (_, col) {
        const id = `${row}:${col}`;
        const data = state.dataState[id];
        const styles = toInlineStyles({
            ...defaultStyles,
        }, state.stylesState[id]
        );
        return `
        <div
            class="cell"
            contenteditable
            data-col="${col}"
            data-type="cell"
            data-row="${row}"
            data-id="${id}"
            data-value="${data || ''}"
            style="${styles}; width: ${getWidth(state.colState, col)}"
            >${parse(data) || ''}</div>
    `;
    }
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(createColumn)
        .join('');

    rows.push(createRow('', cols, {}));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(state, row))
            .join('');

        rows.push(createRow(row + 1, cells, state.rowState));
    }

    return rows.join('');
}
