export class Page {
    constructor(params) {
        this.params = params;
    }

    getRoot() {
        throw new Error('Metod getRoot must be implomented');
    }

    afterRender() {

    }

    destroy() {

    }
}