import { writable } from 'svelte/store';

import Investigation from '@/components/isa/investigation/Investigation.svelte';
import Publications from '@/components/isa/generic/Publications.svelte';
import People from '@/components/isa/generic/People.svelte';
import Studies from '@/components/isa/study/Studies.svelte';
import Study from '@/components/isa/study/Study.svelte';
import Assays from '@/components/isa/assay/Assays.svelte';


const keyToComponentMapping = {
    '': Investigation,
    'publications': Publications,
    'people': People,
    'studies': Studies,
    'study': Study,
    'assays': Assays
};


function createPartialViewStore() {

	const store = writable({
        'path': '',
        'component': ''
    });

    const set = ($) => {

        let component;
        let pathElements = $.path.split('.');
        let lastPathElement = pathElements.at(-1);

        let pathForKeyedStore = pathElements.splice(1).join('.');

        if (pathForKeyedStore !== '') {
            const regex = /(?<key>[a-z]+)*(\[(?<index>\d)\])*\.?/g;
            let match = regex.exec(lastPathElement);

            component = keyToComponentMapping[match.groups.key];

            if (match.groups.key === 'studies' && match.groups.index !== undefined) { // TODO imrove this to more generic approach
                component = keyToComponentMapping['study'];
            }
        } else {
            component = Investigation;
        }

        $ = {
            path: pathForKeyedStore,
            component: component
        }

        store.set($);
    }

	return {
		subscribe: store.subscribe,
        set: set
	};
}

export const partialview = createPartialViewStore();