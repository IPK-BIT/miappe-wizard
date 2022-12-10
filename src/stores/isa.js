import { writable } from 'svelte/store';

function createIsaStoresSynced() {

	const storeIsaObj = writable({});
    const storeIsaStr = writable('');

    const setIsaObj = (isaObj) => {
        storeIsaObj.set(isaObj);
        storeIsaStr.set(JSON.stringify(isaObj, null, 2));
    }

    const setIsaStr = (isaStr) => {
        storeIsaObj.set(JSON.parse(isaStr));
        storeIsaStr.set(isaStr);
    }

    const storesSynced = {
        isaObj: {
            subscribe: storeIsaObj.subscribe,
            set: setIsaObj
        },
        isaStr: {
            subscribe: storeIsaStr.subscribe,
            set: setIsaStr
        }
    };

    return storesSynced;

}

const storesIsa = createIsaStoresSynced();

export const isaObj = storesIsa.isaObj;
export const isaStr = storesIsa.isaStr;