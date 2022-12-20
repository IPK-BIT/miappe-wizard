import { writable, get } from 'svelte/store';
import { keyed } from 'svelte-keyed';

function createIsaStoresSynced() {

	const storeIsaObj = writable({});
    const storeIsaStr = writable('');

    const setIsaObj = (isaObj) => {
        storeIsaObj.set(isaObj);
        storeIsaStr.set(JSON.stringify(isaObj, null, 2));
    }

    const updateIsaObj = (isaObj) => {
        storeIsaObj.update(isaObj);
        storeIsaStr.set(JSON.stringify(get(storeIsaObj), null, 2));
    }

    const setIsaStr = (isaStr) => {
        storeIsaObj.set(JSON.parse(isaStr));
        storeIsaStr.set(isaStr);
    }

    const storesSynced = {
        isaObj: {
            subscribe: storeIsaObj.subscribe,
            update: updateIsaObj,
            set: setIsaObj
        },
        isaStr: {
            subscribe: storeIsaStr.subscribe,
            set: setIsaStr
        }
    };

    storesSynced.isaObj.keyed = (level) => keyed(storesSynced.isaObj, level);

    return storesSynced;

}

const storesIsa = createIsaStoresSynced();

export const isaObj = storesIsa.isaObj;
export const isaStr = storesIsa.isaStr;