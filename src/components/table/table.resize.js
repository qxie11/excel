import { $ } from '../../core/dom';

export function resizeHandler($root, event) {
    return new Promise(resolve => {
        const $resizer = $(event.target),
            $parent = $resizer.closest('[data-type="resizable"]'),
            coords = $parent.getCoords(),
            type = $resizer.data.resize,
            sideProp = type === 'col' ? 'bottom' : 'right';
        let value;

        $resizer.css({
            opacity: 1,
            [sideProp]: '-5000px'
        });

        document.onmousemove = e => {
            if (type === 'col') {
                const delta = e.pageX - coords.right;
                value = coords.width + delta;
                $resizer.css({
                    left: value + 'px'
                })

            } else {
                const delta = e.pageY - coords.bottom;
                value = coords.height + delta;
                $resizer.css({
                    top: value + 'px'
                })
            }
        }

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;

            if (type === 'col') {
                $parent.css({
                    width: value + 'px'
                });
                $root
                    .findAll(`[data-col="${$parent.data.col}"]`)
                    .forEach(el => el.style.width = value + 'px');
            } else {
                $parent.css({
                    height: value + 'px'
                })
            }

            resolve({
                value,
                type,
                id: $parent.data[type]
            })

            $resizer.css({
                opacity: 0,
                top: type === 'row' && '100%',
                left: type === 'col' && '100%'
            });
        }
    })

}