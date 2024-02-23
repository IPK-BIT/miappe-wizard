window.steps = [
    {
        title: 'Please provide a Title and Description of your Dataset and which Institution or Organisation is responsible for.',
        fields: [
            {
                label: 'Project Title',
                type: 'text',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'title'
                },
                explanation: 'DM-3'
            },
            {
                label: 'Project Description',
                type: 'textarea',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'description'
                },
                explanation: 'DM-4'
            },
            {
                label: 'Institution',
                type: 'text',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'comments',
                    commentName: 'Study Contact Institution'
                },
                explanation: 'DM-16'
            },
            {
                label: 'Institution Address',
                type: 'text',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'comments',
                    commentName: 'Study Contact Institution'
                },
                explanation: 'DM-16'
            },
            {
                label: 'Country (PREFILL)',
                type: 'text',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'comments',
                    commentName: 'Study Country'
                },
                explanation: 'DM-17'
            }
        ]
    },
    {
        title: 'Please provide all Authors of your Dataset and define their Contribution.',
        fields: [
            {
                label: 'Authors',
                type: 'people',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'people'
                },
                explanation: 'DM-16',
                componentConfig: {
                    showComments: false
                }
            }
        ],
        hook: 'addStudy'
    },
    {
        title: 'Please provide the Title and Location of your Study',
        fields: [
            {
                label: 'Study title',
                type: 'text',
                isaMapping: {
                    entity: 'study',
                    attribute: 'title',
                    studyIndex: 0 // can also be omitted, in this case it is set to 0 by default
                }
            },
            {
                label: 'Location',
                type: 'text',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Experimental Site'
                },
                explanation: 'DM-18'
            },
            {
                label: 'Location Latitude',
                type: 'text',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Latitude'
                },
                explanation: 'DM-19'
            },
            {
                label: 'Location Longitude',
                type: 'text',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Longitude'
                },
                explanation: 'DM-20'
            },
            {
                label: 'Country',
                type: 'text',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Country'
                },
                explanation: 'DM-17'
            }
        ]
    },
 /*   {
        title: 'Please provide a link to the data file of the study.',
        fields: [
            {
                label: 'Study Data File Link',
                type: 'text',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Data File Link'
                }
            },
            {
                label: 'Study Data File Description',
                type: 'textarea',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Data File Description'
                }
            }
        ],
        hook: 'addProtocol',
        hookParameters: {
            protocolName: 'Growth',
            protocolVersion: 'MIAPPE v1.1',
            protocolDescription: 'How the plants were grown up.',
            protocolParameters: ['Light intensity', 'Air temperature']
        }
    },*/
    {
        title: 'Please provide a brief summary of the Growth Conditions.',
        hook: 'addProtocol',
        hookParameters: {
            protocolName: 'Growth',
            protocolVersion: 'MIAPPE v1.1',
            protocolDescription: 'How the plants were grown up.',
            protocolParameters: ['Light intensity', 'Air temperature']
        },
        fields: [
            {
                label: 'Growth description',
                type: 'textarea',
                isaMapping: {
                    //entity: 'protocol',
                    //attribute: 'description',
                    jsonPath: 'studies[0].protocols[0].description'
                },
                explanation: 'DM-67'
            }
        ]
    },
    {
        title: 'Please select constant Parameters for all Samples of the Experiment.',
        level: 'Study',
        component: 'ProtocolParametersSelect',
        jsonPath: 'studies[0].protocols[0].parameters'
    },
    {
        title: 'Select Factors that are different between the Samples.',
        level: 'Study',
        component: 'FactorsSelect',
        jsonPath: 'studies[0].factors'
    },
    /*{
        title: 'Growth Protocol',
        level: 'Study',
        component: 'StudyTemplateGenerator'
    },
    {
        title: 'Materials',
        level: 'Study',
        component: 'Materials'
    }*/
    {
        title: 'Upload template',
        level: 'Study',
        component: 'Uploader'
    }
];