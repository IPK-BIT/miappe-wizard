window.steps = [
    {
        title: 'Welcome to the MIAPPE Wizard.',
        text: [
            'With this Wizard it is super easy to annotate measurements of your phenotyping experiment with MIAPPE-compliant metadata according to FAIR principles.',
            'Click on the Next button to start the metadata annotation of the results data of your experiments.'
        ]
    },
    {
        title: 'Please provide the basic information of your Plant Phenotyping Project and when you submitted and published the Dataset.',
        fields: [
            {
                label: 'Project ID',
                type: 'text',
                isaMapping: {
                    jsonPath: 'identifier'
                },
                explanation: 'DM-2'
            },
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
                label: 'License',
                type: 'license',
                isaMapping: {
                    jsonPath: 'comments',
                    commentName: 'License'
                },
                explanation: 'DM-7'
            },
            {
                label: 'Submission Date',
                type: 'date',
                isaMapping: {
                    jsonPath: 'submissionDate'
                },
                explanation: 'DM-5'
            },
            {
                label: 'Public Release Date',
                type: 'date',
                isaMapping: {
                    jsonPath: 'publicReleaseDate'
                },
                explanation: 'DM-6'
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
                    jsonPath: 'studies[0].title'
                },
                explanation: 'DM-12'
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
    {
        title: 'Please provide the responsible Institution of your Study',
        fields: [
            {
                label: 'Institution Contact Address',
                type: 'text',
                isaMapping: {
                    jsonPath: 'studies[0].comments',
                    commentName: 'Study Contact Institution'
                },
                explanation: 'DM-16'
            },
            {
                label: 'ROR ID of your Institution',
                type: 'ror',
                isaMapping: {
                    jsonPath: 'studies[0].comments',
                    commentName: 'Study Contact Institution ROR'
                }
            }
        ]
    },
    {
        title: 'Here you can provide publications related to your experiment.',
        level: 'Study',
        component: 'Publications',
        jsonPath: 'studies[0].publications'
    },
    {
        title: 'Please provide a link to the data file of the study.',
        fields: [
            {
                label: 'Study Data File Link',
                type: 'text',
                isaMapping: {
                    jsonPath: 'studies[0].comments',
                    commentName: 'Study Data File Link'
                }
            },
            {
                label: 'Study Data File Description',
                type: 'textarea',
                isaMapping: {
                    jsonPath: 'studies[0].comments',
                    commentName: 'Study Data File Description'
                }
            }
        ]
    },
    {
        hooks: [
            {
                type: 'addProtocol',
                parameters: {
                    protocolName: 'Growth',
                    protocolVersion: 'MIAPPE v1.1',
                   // protocolDescription: 'How the plants were grown up.',
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
        title: 'Please select all Parameters, which are constant for all Samples of your Experiment.',
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