// Uses the small backend at https://github.com/IPK-BIT/isa-json2tab 
export function getIsaTab(isa_json) {
    let serviceUrl = 'https://webapps.ipk-gatersleben.de/isa-json2tab/json2tab';

    return fetch(serviceUrl, {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isa_json)
    })
    .then((result) => result.blob())
    .then((blob) => {
        if (blob != null) {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = "isa-tab.zip";
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    });
}


const example_isa_json = {
    "comments": [],
    "description": "We could alternatively use the class constructor's parameters to set some default values at the time of creation, however we want to demonstrate how to use the object's instance variables to set values.",
    "identifier": "i1",
    "ontologySourceReferences": [
        {
            "description": "Ontology for Biomedical Investigations",
            "file": "",
            "name": "OBI",
            "version": ""
        }
    ],
    "people": [],
    "publicReleaseDate": "2016-11-03",
    "publications": [],
    "studies": [
        {
            "assays": [
                {
                    "characteristicCategories": [],
                    "comments": [],
                    "dataFiles": [
                        {
                            "@id": "#data/rawdatafile-140407662277632",
                            "comments": [],
                            "name": "sequenced-data-0",
                            "type": "Raw Data File"
                        },
                        {
                            "@id": "#data/rawdatafile-140407662277920",
                            "comments": [],
                            "name": "sequenced-data-1",
                            "type": "Raw Data File"
                        },
                        {
                            "@id": "#data/rawdatafile-140407662278208",
                            "comments": [],
                            "name": "sequenced-data-2",
                            "type": "Raw Data File"
                        }
                    ],
                    "filename": "a_assay.txt",
                    "materials": {
                        "otherMaterials": [
                            {
                                "@id": "#material/extract-140407662277488",
                                "characteristics": [],
                                "name": "extract-0",
                                "type": "Extract Name"
                            },
                            {
                                "@id": "#material/extract-140407662277776",
                                "characteristics": [],
                                "name": "extract-1",
                                "type": "Extract Name"
                            },
                            {
                                "@id": "#material/extract-140407662278064",
                                "characteristics": [],
                                "name": "extract-2",
                                "type": "Extract Name"
                            }
                        ],
                        "samples": [
                            {
                                "@id": "#sample/140407662726064",
                                "characteristics": [],
                                "factorValues": [],
                                "name": "sample_material-0"
                            },
                            {
                                "@id": "#sample/140407662726016",
                                "characteristics": [],
                                "factorValues": [],
                                "name": "sample_material-1"
                            },
                            {
                                "@id": "#sample/140407662276816",
                                "characteristics": [],
                                "factorValues": [],
                                "name": "sample_material-2"
                            }
                        ]
                    },
                    "measurementType": {
                        "@id": "#a5b16cf0-e854-4406-8353-0b5594029cad",
                        "annotationValue": "",
                        "comments": [],
                        "termAccession": "",
                        "termSource": ""
                    },
                    "processSequence": [
                        {
                            "@id": "#process/140407662277344",
                            "comments": [],
                            "date": "",
                            "executesProtocol": {
                                "@id": "#140407662277296"
                            },
                            "inputs": [
                                {
                                    "@id": "#sample/140407662726064"
                                }
                            ],
                            "name": "",
                            "nextProcess": {
                                "@id": "#process/140407662277584"
                            },
                            "outputs": [
                                {
                                    "@id": "#material/extract-140407662277488"
                                }
                            ],
                            "parameterValues": [],
                            "performer": ""
                        },
                        {
                            "@id": "#process/140407662277584",
                            "comments": [],
                            "date": "",
                            "executesProtocol": {
                                "@id": "#140407662277440"
                            },
                            "inputs": [
                                {
                                    "@id": "#material/extract-140407662277488"
                                }
                            ],
                            "name": "assay-name-0",
                            "outputs": [
                                {
                                    "@id": "#data/rawdatafile-140407662277632"
                                }
                            ],
                            "parameterValues": [],
                            "performer": "",
                            "previousProcess": {
                                "@id": "#process/140407662277344"
                            }
                        },
                        {
                            "@id": "#process/140407662277680",
                            "comments": [],
                            "date": "",
                            "executesProtocol": {
                                "@id": "#140407662277296"
                            },
                            "inputs": [
                                {
                                    "@id": "#sample/140407662726016"
                                }
                            ],
                            "name": "",
                            "nextProcess": {
                                "@id": "#process/140407662277872"
                            },
                            "outputs": [
                                {
                                    "@id": "#material/extract-140407662277776"
                                }
                            ],
                            "parameterValues": [],
                            "performer": ""
                        },
                        {
                            "@id": "#process/140407662277872",
                            "comments": [],
                            "date": "",
                            "executesProtocol": {
                                "@id": "#140407662277440"
                            },
                            "inputs": [
                                {
                                    "@id": "#material/extract-140407662277776"
                                }
                            ],
                            "name": "assay-name-1",
                            "outputs": [
                                {
                                    "@id": "#data/rawdatafile-140407662277920"
                                }
                            ],
                            "parameterValues": [],
                            "performer": "",
                            "previousProcess": {
                                "@id": "#process/140407662277680"
                            }
                        },
                        {
                            "@id": "#process/140407662277968",
                            "comments": [],
                            "date": "",
                            "executesProtocol": {
                                "@id": "#140407662277296"
                            },
                            "inputs": [
                                {
                                    "@id": "#sample/140407662276816"
                                }
                            ],
                            "name": "",
                            "nextProcess": {
                                "@id": "#process/140407662278160"
                            },
                            "outputs": [
                                {
                                    "@id": "#material/extract-140407662278064"
                                }
                            ],
                            "parameterValues": [],
                            "performer": ""
                        },
                        {
                            "@id": "#process/140407662278160",
                            "comments": [],
                            "date": "",
                            "executesProtocol": {
                                "@id": "#140407662277440"
                            },
                            "inputs": [
                                {
                                    "@id": "#material/extract-140407662278064"
                                }
                            ],
                            "name": "assay-name-2",
                            "outputs": [
                                {
                                    "@id": "#data/rawdatafile-140407662278208"
                                }
                            ],
                            "parameterValues": [],
                            "performer": "",
                            "previousProcess": {
                                "@id": "#process/140407662277968"
                            }
                        }
                    ],
                    "technologyPlatform": "",
                    "technologyType": {
                        "@id": "#4ab4818b-d0e4-4023-9d49-5871348bbeca",
                        "annotationValue": "",
                        "comments": [],
                        "termAccession": "",
                        "termSource": ""
                    },
                    "unitCategories": []
                }
            ],
            "characteristicCategories": [],
            "comments": [],
            "description": "Like with the Investigation, we could use the class constructor to set some default values, but have chosen to demonstrate in this example the use of instance variables to set initial values.",
            "factors": [],
            "filename": "s_study.txt",
            "identifier": "s1",
            "materials": {
                "otherMaterials": [],
                "samples": [
                    {
                        "@id": "#sample/140407662726064",
                        "characteristics": [],
                        "factorValues": [],
                        "name": "sample_material-0"
                    },
                    {
                        "@id": "#sample/140407662726016",
                        "characteristics": [],
                        "factorValues": [],
                        "name": "sample_material-1"
                    },
                    {
                        "@id": "#sample/140407662276816",
                        "characteristics": [],
                        "factorValues": [],
                        "name": "sample_material-2"
                    }
                ],
                "sources": [
                    {
                        "@id": "#source/140410343052864",
                        "characteristics": [],
                        "name": "source_material"
                    }
                ]
            },
            "people": [
                {
                    "address": "",
                    "affiliation": "University of Life",
                    "comments": [],
                    "email": "",
                    "fax": "",
                    "firstName": "Alice",
                    "lastName": "Robertson",
                    "midInitials": "",
                    "phone": "",
                    "roles": [
                        {
                            "@id": "#1bf3dcab-00dc-4db0-be74-a3308aa1b1fe",
                            "annotationValue": "submitter",
                            "comments": [],
                            "termAccession": "",
                            "termSource": ""
                        }
                    ]
                }
            ],
            "processSequence": [
                {
                    "@id": "#process/140407662277008",
                    "comments": [],
                    "date": "",
                    "executesProtocol": {
                        "@id": "#140407662952352"
                    },
                    "inputs": [
                        {
                            "@id": "#source/140410343052864"
                        }
                    ],
                    "name": "",
                    "outputs": [
                        {
                            "@id": "#sample/140407662726064"
                        },
                        {
                            "@id": "#sample/140407662726016"
                        },
                        {
                            "@id": "#sample/140407662276816"
                        }
                    ],
                    "parameterValues": [],
                    "performer": ""
                }
            ],
            "protocols": [
                {
                    "@id": "#140407662952352",
                    "comments": [],
                    "components": [],
                    "description": "",
                    "name": "sample collection",
                    "parameters": [],
                    "protocolType": {
                        "@id": "#ce0a95c0-8b1f-4c77-9b8b-cd1002f7287c",
                        "annotationValue": "sample collection",
                        "comments": [],
                        "termAccession": "",
                        "termSource": ""
                    },
                    "uri": "",
                    "version": ""
                },
                {
                    "@id": "#140407662277296",
                    "comments": [],
                    "components": [],
                    "description": "",
                    "name": "extraction",
                    "parameters": [],
                    "protocolType": {
                        "@id": "#a3d58318-7592-427b-9c64-a3e330528a8c",
                        "annotationValue": "material extraction",
                        "comments": [],
                        "termAccession": "",
                        "termSource": ""
                    },
                    "uri": "",
                    "version": ""
                },
                {
                    "@id": "#140407662277440",
                    "comments": [],
                    "components": [],
                    "description": "",
                    "name": "sequencing",
                    "parameters": [],
                    "protocolType": {
                        "@id": "#c8c6cd3e-3d38-4d19-b685-dfb9683b9e74",
                        "annotationValue": "material sequencing",
                        "comments": [],
                        "termAccession": "",
                        "termSource": ""
                    },
                    "uri": "",
                    "version": ""
                }
            ],
            "publicReleaseDate": "2016-11-03",
            "publications": [
                {
                    "authorList": "A. Robertson, B. Robertson",
                    "doi": "",
                    "pubMedID": "12345678",
                    "status": {
                        "@id": "#f6d24638-a3a6-43d5-a635-0b15d547e131",
                        "annotationValue": "published",
                        "comments": [],
                        "termAccession": "",
                        "termSource": ""
                    },
                    "title": "Experiments with Elephants"
                }
            ],
            "studyDesignDescriptors": [
                {
                    "@id": "#d5241eb4-81ae-4835-84f9-017a4c252c66",
                    "annotationValue": "intervention design",
                    "comments": [],
                    "termAccession": "http://purl.obolibrary.org/obo/OBI_0000115",
                    "termSource": "OBI"
                }
            ],
            "submissionDate": "2016-11-03",
            "title": "My ISA Study",
            "unitCategories": []
        }
    ],
    "submissionDate": "2016-11-03",
    "title": "My Simple ISA Investigation"
}
