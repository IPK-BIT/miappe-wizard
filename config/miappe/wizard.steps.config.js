window.steps = [
    {
        title: 'Welcome to the MIAPPE Wizard.',
        text: [
            'With this Wizard it is super easy to annotate measurements of your phenotyping experiment with MIAPPE-compliant metadata according to FAIR principles.',
            'Click on the Next button to start the metadata annotation of the results data of your experiments.'
        ]
    },
    {
        title: 'Please provide the Title and Description of your Plant Phenotyping Project and when you submitted and published the Dataset.',
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
   /* {
        title: 'What is the submission date of your plant phenotyping project?',
        fields: [
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
    },*/
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
        title: 'Please provide the responsible Institute for the whole Plant Phenotyping Project.',
        fields: [
            {
                label: 'Contact address',
                type: 'text',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'comments',
                    commentName: 'Study Contact Institution'
                },
                explanation: 'DM-16'
            },
            {
                label: 'Country',
                type: 'text',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'comments',
                    commentName: 'Study Country'
                },
                explanation: 'DM-17'
            }
        ],
        hook: 'addStudy'
    },
    {
        title: 'Please provide is the Title of your Experiment and the responsible Institution',
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
                label: 'Contact address',
                type: 'text',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Contact Institution'
                },
                explanation: 'DM-16'
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
            },
            {
                label: 'ROR ID of your institute',
                type: 'ror',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Contact Institution ROR'
                }
            }
        ]
    },
  /*  {
        title: 'Please provide contact address of your institute.',
        fields: [
            {
                label: 'Contact address',
                type: 'text',
                explanation: 'DM-16',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Contact Institution'
                }
            },
            {
                label: 'Country',
                type: 'text',
                explanation: 'DM-17',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Country'
                }
            }
        ]
    },*/
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