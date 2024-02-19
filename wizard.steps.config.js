window.steps = [
    {
        title: 'Please provide title and description of your plant phenotyping project.',
        fields: [
            {
                label: 'Project title',
                type: 'text',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'title'
                },
                explanation: 'DM-16'
            },
            {
                label: 'Project description',
                type: 'textarea',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'description'
                }
            }
        ]
    },
    {
        title: 'What is the submission date of your plant phenotyping project?',
        fields: [
            {
                label: 'Submission date',
                type: 'date',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'submissionDate'
                }
            }
        ]
    },
    {
        title: 'Please information about people how have worked on your plant phenotyping project.',
        fields: [
            {
                label: 'Project title',
                type: 'people',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'people'
                },
                explanation: 'DM-16'
            }
        ]
    },
    {
        title: 'Please provide contact address of your institute.',
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
        title: 'What is the title of your experiment?',
        fields: [
            {
                label: 'Study title',
                type: 'text',
                isaMapping: {
                    entity: 'study',
                    attribute: 'title',
                    studyIndex: 0 // can also be omitted, in this case it is set to 0 by default
                }
            }
        ]
    },
    {
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
            protocolDescription: 'How the plants were grown up.',
            protocolParameters: ['Light intensity', 'Air temperature']
        }
    },
    {
        title: 'Please describe how the plants were grown up.',
        fields: [
            {
                label: 'Growth description',
                type: 'textarea',
                isaMapping: {
                    //entity: 'protocol',
                    //attribute: 'description',
                    jsonPath: 'studies[0].protocols[0].description'
                }
            }
        ]
    },
    {
        title: 'Select parameters that were kept constant for all samples during the experiment.',
        level: 'Study',
        component: 'ProtocolParametersSelect',
        jsonPath: 'studies[0].protocols[0].parameters'
    },
    {
        title: 'Select factors that were different between the samples.',
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
];