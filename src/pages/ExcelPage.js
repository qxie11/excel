import { Excel } from '@/components/excel/excel';
import { Header } from '@/components/header/header';
import { Toolbar } from '@/components/toolbar/toolbar';
import { Formula } from '@/components/formula/formula';
import { Table } from '@/components/table/table';
import { rootReducer } from '@/redux/rootReducer';
import { createStore } from '@core/createStore';
import { Page } from '@core/Page';
import { debounce, storage } from '@core/utils';
import { normalizeInitialState } from '../redux/initialState';

function storageName(param) {
    return 'excel:' + param;
}

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString();
        const state = storage(storageName(params));
        const initialState = normalizeInitialState(state);
        const store = createStore(rootReducer, initialState);

        const stateListener = debounce(state => {
            storage(storageName(params), state);
        }, 300);

        store.subscribe(stateListener);

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        });

        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
    }
} 