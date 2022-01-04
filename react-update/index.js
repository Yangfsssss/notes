import { Comp1 } from './comp1';
import { clearDom, domStore } from './dom-store';
export function generateUIInterface() {
    if (domStore.firstRender !== true) {
        clearDom();
    }
    var doms = domStore.getDoms().map(function (domCreator) {
        if (typeof domCreator !== 'function') {
            throw new Error('dom-creator must be a function');
        }
        return domCreator();
    });
    doms.map(function (element) { return document.body.appendChild(element); });
    domStore.setWorkingDoms(doms);
    domStore.firstRender = false;
}
export var render = function (domCreatorFn) {
    domStore.setDoms(domCreatorFn());
};
render(Comp1);
generateUIInterface();
