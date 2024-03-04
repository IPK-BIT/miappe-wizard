import { writable, get, derived } from 'svelte/store';
import { keyed } from 'svelte-keyed';

import { miappeInvestigationHandler, miappeStudyHandler } from '@/lib/miappeMappers';

import Schemas from '@/lib/schemas';

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

    const addProxies = () => {
        let isaObj = get(storeIsaObj);
        isaObj = new Proxy(isaObj, miappeInvestigationHandler);
        if (isaObj.studies.length > 0) {
            for (const [i, study] of isaObj.studies.entries()) {
                isaObj.studies[i] = new Proxy(isaObj.studies[i], miappeStudyHandler);
            }
        }
        storeIsaObj.set(isaObj);
    }

    const storesSynced = {
        isaObj: {
            subscribe: storeIsaObj.subscribe,
            update: updateIsaObj,
            set: setIsaObj,
            addProxies: addProxies
        },
        isaStr: {
            subscribe: storeIsaStr.subscribe,
            set: setIsaStr
        }
    };

    storesSynced.isaObj.keyed = (level) => keyed(storesSynced.isaObj, level);


    storesSynced.isaObj.keyedComments = (jsonPath, commentName) => {
        const keyedComments = keyed(storesSynced.isaObj, jsonPath);

        const derivedComments = derived(keyedComments, $comments => {
            let comment = $comments.find((c) => c.name == commentName);
            let value = '';
            if(comment) {
                value = comment.value;
            }
            return value;
        });

        const update = (value) => {
            keyedComments.update($comments => {
                let comment = $comments.find((c) => c.name == commentName);
                if(comment) {
                    comment.value = value;
                    $comments = $comments;
                } else {
                    comment = Schemas.getComment(commentName, value);
                    $comments = [...$comments, comment];
                }
                return $comments;
            });

        }
        const set = (value) => {
            update(value);
        }

        const store = {
            subscribe: derivedComments.subscribe,
            update: update,
            set: set
        }

        return store;
    }

    return storesSynced;

}

const storesIsa = createIsaStoresSynced();

export const isaObj = storesIsa.isaObj;
export const isaStr = storesIsa.isaStr;