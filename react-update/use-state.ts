import { generateUIInterface } from '.';

export function useState<S>(initialState: S) {
	const state = {} as { value: S };

	state.value = initialState;

	const setState = (newState: S) => {
		state.value = newState;
		generateUIInterface();
	};

	// setTimeout(() => render(), 0);

	return [state, setState] as const;
}
