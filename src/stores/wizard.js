import { writable } from 'svelte/store';

export const wizard = writable({
    steps: 0,
    currentStep: 0
});