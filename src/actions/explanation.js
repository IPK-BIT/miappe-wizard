import { explanation } from '@/stores/explanation.js';

export function explanationActionFactory(isaLevel) {
    let action = (elem) => {
        elem.addEventListener('focus', (ev) => {
            explanation.setIsaLevel(isaLevel);
            explanation.setAttr(elem.dataset.attr);
        });
        elem.addEventListener('blur', (ev) => {
            explanation.reset()
        });
    }
    return action;
}