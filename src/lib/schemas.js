//import investigationSchema from '@/lib/schemas/investigation_schema.json';
//import xyz from '@/lib/schemas/';


import assay_schema from '@/lib/schemas/assay_schema.json';
import comment_schema from '@/lib/schemas/comment_schema.json';
import data_schema from '@/lib/schemas/data_schema.json';
import factor_schema from '@/lib/schemas/factor_schema.json';
import factor_value_schema from '@/lib/schemas/factor_value_schema.json';
import investigation_schema from '@/lib/schemas/investigation_schema.json';
import material_attribute_schema from '@/lib/schemas/material_attribute_schema.json';
import material_attribute_value_schema from '@/lib/schemas/material_attribute_value_schema.json';
import material_schema from '@/lib/schemas/material_schema.json';
import ontology_annotation_schema from '@/lib/schemas/ontology_annotation_schema.json';
import ontology_source_reference_schema from '@/lib/schemas/ontology_source_reference_schema.json';
import person_schema from '@/lib/schemas/person_schema.json';
import process_schema from '@/lib/schemas/process_schema.json';
import protocol_parameter_schema from '@/lib/schemas/protocol_parameter_schema.json';
import protocol_schema from '@/lib/schemas/protocol_schema.json';
import publication_schema from '@/lib/schemas/publication_schema.json';
import sample_schema from '@/lib/schemas/sample_schema.json';
import source_schema from '@/lib/schemas/source_schema.json';
import study_schema from '@/lib/schemas/study_schema.json';

const mapping = {
    assay: assay_schema,
    comment: comment_schema,
    data: data_schema,
    factor: factor_schema,
    factor_value: factor_value_schema,
    investigation: investigation_schema,
    material_attribute: material_attribute_schema,
    material_attribute_value: material_attribute_value_schema,
    material: material_schema,
    ontology_annotation: ontology_annotation_schema,
    ontology_source_reference: ontology_source_reference_schema,
    person: person_schema,
    process: process_schema,
    protocol_parameter: protocol_parameter_schema,
    protocol: protocol_schema,
    publication: publication_schema,
    sample: sample_schema,
    source: source_schema,
    study: study_schema
}

export default class Schemas {

    static pathSchemaFiles = 'data/vendor/isa_json_schemas/';
    static cache = {};
    
    /*static async getSchema(identifier) {
        if (this.cache[identifier] === undefined) {
            let path = this.pathSchemaFiles+identifier+'_schema.json';
            const response = await fetch(path);
            const json = await response.json();
            this.cache[identifier] = json;
        }
        return this.cache[identifier];
    }*/

    static getObjectFromSchema(identifier) {
        //let schema = await Schemas.getSchema(identifier);
        let schema = mapping[identifier];

        const getDatatypeByJsonType = (type) => {
            let types = {
                'string': '',
                'array': [],
                'object': {}
            }
            return types[type];
        }

        let obj = {};
        let keys = [];
        for (const [k, v] of Object.entries(schema.properties)) {
            keys.push(k);

            if (v['type'] === 'string') {
                obj[k] = '';
            } else if (v['type'] === 'array') {
                obj[k] = [];
            } else if (v['type'] === 'object') {
                
                let entries = Object.entries(v['properties']);
                obj[k] = Object.fromEntries( entries.map(x => [x[0], getDatatypeByJsonType(x[1]['type']) ]) );
            }
        }

        return obj;
    }

}