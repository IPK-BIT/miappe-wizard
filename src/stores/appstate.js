import { writable } from 'svelte/store';

function createAppStateStore() {

    const initialAppState = {
        'mode': 'init' // ['init', 'form', 'wizard', 'level']
    };

	const store = writable(initialAppState);

	return {
		subscribe: store.subscribe,
        set: store.set,

        INIT: 'init',
        FORM: 'form',
        WIZARD: 'wizard',
        LEVEL: 'level',
	};
}

export const appstate = createAppStateStore();