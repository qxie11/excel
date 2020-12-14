import { defaultStyles, defaultTitle } from "../constans";

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    currentText: '',
    currentStyles: defaultStyles,
    title: defaultTitle,
    stylesState: {},
    opendedDate: new Date().toJSON()
};

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})


export function normalizeInitialState(state) {
    return state ? normalize(state) : { ...defaultState };
}