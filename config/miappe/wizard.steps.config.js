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
                    entity: 'investigation',
                    attribute: 'identifier'
                },
                explanation: 'DM-2'
            },
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
                label: 'License',
                type: 'text',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'license'
                },
                explanation: 'DM-7'
            },
            {
                label: 'Submission Date',
                type: 'date',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'submissionDate'
                },
                explanation: 'DM-5'
            },
            {
                label: 'Public Release Date',
                type: 'date',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'publicReleaseDate'
                },
                explanation: 'DM-6'
            }
        ]
    },
    {
        title: 'Please provide the Authors of your Dataset and define their Contribution.',
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
        ]
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
                },
                explanation: 'DM-12'
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
        ],
        hook: 'addStudy'
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
           // protocolDescription: 'How the plants were grown up.',
            protocolParameters: ['Light intensity', 'Air temperature']
        }
    },
    {
        title: 'Please provide a brief summary of the Growth Conditions.',
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
        title: 'Please select all Parameters, which are constant for all Samples of your Experiment.',
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