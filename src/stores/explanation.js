import { writable } from 'svelte/store';

function createExplanationStore() {

	const { subscribe, set, update } = writable({
        'isaLevel': undefined,
        'attr': undefined
    });

	return {
		subscribe,
		setIsaLevel: (isaLevel) => update(x => {
            x.isaLevel = isaLevel;
            return x;
        }),
		setAttr: (attr) => update(x => {
            x.attr = attr;
            return x;
        }),
		reset: () => update(x => {
            x.attr = false;
            return x;
        })
	};
}

export const explanation = createExplanationStore();