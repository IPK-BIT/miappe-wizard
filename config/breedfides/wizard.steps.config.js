window.steps = [
    {
        title: 'Please provide a Title and Description of your Dataset and which Institution or Organisation is responsible for.',
        fields: [
            {
                label: 'Project Title',
                type: 'text',
                isaMapping: {
                    jsonPath: 'title'
                },
                explanation: 'DM-3'
            },
            {
                label: 'Project Description',
                type: 'textarea',
                isaMapping: {
                    jsonPath: 'description'
                },
                explanation: 'DM-4'
            },
            {
                label: 'Institution',
                type: 'text',
                isaMapping: {
                    jsonPath: 'comments',
                    commentName: 'Study Contact Institution'
                },
                explanation: 'DM-16'
            },
            {
                label: 'Institution Address',
                type: 'text',
                isaMapping: {
                    jsonPath: 'comments',
                    commentName: 'Study Contact Institution'
                },
                explanation: 'DM-16'
            }
        ]
    },
    {
        title: 'Please provide the Authors of your Dataset and define their Contribution.',
        component: 'People',
        jsonPath: 'people',
        componentConfig: {
            showComments: false,
            label: 'Authors'
        }
    },
    {
        hooks: [
            {
                type: 'addStudy'
            }
        ],
        title: 'Please provide the Title and Location of your Study',
        fields: [
            {
                label: 'Study title',
                type: 'text',
                isaMapping: {
                    jsonPath: 'studies[0].title',
                }
            },
            {
                label: 'Location',
                type: 'text',
                isaMapping: {
                    jsonPath: 'studies[0].comments',
                    commentName: 'Study Experimental Site'
                },
                explanation: 'DM-18'
            },
            {
                label: 'Location Latitude',
                type: 'text',
                isaMapping: {
                    jsonPath: 'studies[0].comments',
                    commentName: 'Study Latitude'
                },
                explanation: 'DM-19'
            },
            {
                label: 'Location Longitude',
                type: 'text',
                isaMapping: {
                    jsonPath: 'studies[0].comments',
                    commentName: 'Study Longitude'
                },
                explanation: 'DM-20'
            },
            {
                label: 'Country',
                type: 'text',
                isaMapping: {
                    jsonPath: 'studies[0].comments',
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
        ]
    },*/
    {
        hooks: [
            {
                type: 'addProtocol',
                parameters: {
                    protocolName: 'Growth',
                    protocolVersion: 'MIAPPE v1.1',
                    protocolDescription: 'How the plants were grown up.',
                    protocolParameters: ['Light intensity', 'Air temperature']
                }
            }
        ],
        title: 'Please provide a brief summary of the Growth Conditions.',
        fields: [
            {
                label: 'Growth description',
                type: 'textarea',
                isaMapping: {
                    jsonPath: 'studies[0].protocols[0].description'
                },
                explanation: 'DM-67'
            }
        ]
    },
    {
        title: 'Please select constant Parameters for all Samples of the Experiment.',
        component: 'ProtocolParametersSelect',
        jsonPath: 'studies[0].protocols[0].parameters'
    },
    {
        title: 'Select Factors that are different between the Samples.',
        component: 'FactorsSelect',
        jsonPath: 'studies[0].factors'
    },
    {
        title: 'Upload template',
        component: 'Uploader',
        jsonPath: 'studies[0]'
    }
];