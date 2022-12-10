import { writable } from 'svelte/store';

function createExplanationStore() {

	const store = writable({
        'isaLevel': undefined,
        'attr': undefined
    });

	return {
		subscribe: store.subscribe,

        setContext: (getContext) => store.update(x => {
            let isaLevel = getContext('isaLevel');
            x.isaLevel = isaLevel;
            return x;
        }),

		setIsaLevel: (isaLevel) => store.update(x => {
            x.isaLevel = isaLevel;
            return x;
        }),

		setAttr: (attr) => store.update(x => {
            x.attr = attr;
            return x;
        }),

		reset: () => store.update(x => {
            x.attr = false;
            return x;
        })
	};
}

export const explanation = createExplanationStore();