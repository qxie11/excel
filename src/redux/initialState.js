import { defaultStyles, defaultTitle } from "../constans";
import { storage } from "../core/utils";

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    currentText: '',
    currentStyles: defaultStyles,
    title: defaultTitle,
    stylesState: {}
};

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export const initialState = storage('excel-state') ?
    normalize(storage('excel-state'))
    : defaultState;