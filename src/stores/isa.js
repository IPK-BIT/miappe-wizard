import { writable, get, derived } from 'svelte/store';
import { keyed } from 'svelte-keyed';

function createIsaStoresSynced() {

	const storeIsaObj = writable({});
    const storeIsaStr = writable('');

    const setIsaObj = (isaObj) => {
        storeIsaObj.set(isaObj);
        storeIsaStr.set(JSON.stringify(isaObj, null, 2));
    }

    const updateIsaObj = (test) => {
        storeIsaObj.update(test);
        storeIsaStr.set(JSON.stringify(get(storeIsaObj), null, 2));
    }

    const setIsaStr = (isaStr) => {
        storeIsaObj.set(JSON.parse(isaStr));
        storeIsaStr.set(isaStr);
    }

    const isaObjDerived = (level) => {
        let _derived = derived(storeIsaObj, $isaObj => $isaObj[level]);
        console.log(_derived);
        return {
            subscribe: _derived.subscribe,
            set: (value) => {
                console.warn(level);
                console.log(value);
                //storeIsaObj[level] = value;
                storeIsaObj.update( x => {
                    console.log(x);
                    x[level] = value;
                    console.log(x);
                    storeIsaStr.set(JSON.stringify(x, null, 2));
                    return x;
                });
            }
        }
    }

    const storesSynced = {
        isaObj: {
            subscribe: storeIsaObj.subscribe,
            update: updateIsaObj, // storeIsaObj.update,
            set: setIsaObj,
            derived: isaObjDerived,
            //keyed: (level) => keyed(storeIsaObj, level)
        },
        isaStr: {
            subscribe: storeIsaStr.subscribe,
            set: setIsaStr
        }
    };

    return storesSynced;

}

const storesIsa = createIsaStoresSynced();

storesIsa.isaObj.keyed = (level) => keyed(storesIsa.isaObj, level);

export const isaObj = storesIsa.isaObj;
export const isaStr = storesIsa.isaStr;