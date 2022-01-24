import { Comp1 } from './comp1';
import { clearDom, domStore } from './dom-store';

export function generateUIInterface() {
	if (domStore.firstRender !== true) {
		clearDom();
	}

	const doms = domStore.getDoms().map((domCreator) => {
		if (typeof domCreator !== 'function') {
			throw new Error('dom-creator must be a function');
		}

		return domCreator();
	});

	doms.map((element) => document.body.appendChild(element));
	domStore.setWorkingDoms(doms);

	domStore.firstRender = false;
}

export const render = (domCreatorFn: () => (() => HTMLElement)[]) => {
	domStore.setDoms(domCreatorFn());
};

render(Comp1);
generateUIInterface();
