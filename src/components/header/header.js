import { ExcelComponent } from "@core/ExcelComponent";
import { changeTitle } from "@/redux/actions";
import { defaultTitle } from "../../constans";
import { $ } from "../../core/dom";
import { debounce } from "../../core/utils";

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        })
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle;
        return `<input type="text" class="input" value="${title}">
                <div>
                    <div class="button">
                        <i class="material-icons">delete</i>
                    </div>
                    <div class="button">
                        <i class="material-icons">exit_to_app</i>
                    </div>
                </div>`
    }

    prepare() {
        this.onInput = debounce(this.onInput, 150);
    }

    onInput(event) {
        const $target = $(event.target);
        this.$dispatch(changeTitle($target.text()));
    }
} 