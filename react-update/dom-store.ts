function createDomStore() {
	let storedDoms = [] as (() => HTMLElement)[];
	let workingDoms = [] as HTMLElement[];

	const domStore = {
		getDoms() {
			return storedDoms as (() => HTMLElement)[];
		},
		getWorkingDoms() {
			return workingDoms as HTMLElement[];
		},
		setDoms(doms: (() => HTMLElement)[]): void {
			storedDoms = [...doms];
		},
		setWorkingDoms(doms: HTMLElement[]): void {
			workingDoms = [...doms];
		},
		firstRender: true,
	};

	return domStore;
}

export const domStore = createDomStore();

export const clearDom = (): void => {
	const workingDoms = domStore.getWorkingDoms();

	workingDoms.forEach((element) => document.body.removeChild(element));
};
