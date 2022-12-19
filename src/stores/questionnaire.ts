import { writable } from 'svelte/store';

enum PhenotypingExperimentType {
    singleOrganismSingleSample = 'singleOrganismSingleSample',
    singleOrganismMultiSample = 'singleOrganismMultiSample',
    multiOrganismSingleSample = 'multiOrganismSingleSample',
    multiOrganismMultiSample = 'multiOrganismMultiSample'
};

enum GrowthFacilityType {
    outdoor = 'outdoor',
    greenhouse = 'greenhouse',
    phytochamber = 'phytochamber',
    lemnatecFacility = 'lemnatecFacility'
};

interface QuestionnaireState {
    'phenotypingExperimentType': PhenotypingExperimentType | null,
    'growthFacilityType': GrowthFacilityType | null
};

const initialState: QuestionnaireState = {
    'phenotypingExperimentType': null,
    'growthFacilityType': null
};

const store = writable(initialState);

export const questionnaire = {
    subscribe: store.subscribe,
    set: store.set,
    'PhenotypingExperimentType': PhenotypingExperimentType,
    'GrowthFacilityType': GrowthFacilityType
};