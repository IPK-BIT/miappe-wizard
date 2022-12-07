export default class Schemas {

    static pathSchemaFiles = 'data/vendor/isa_json_schemas/';
    static cache = {};
    
    static async getSchema(identifier) {
        if (this.cache[identifier] === undefined) {
            let path = this.pathSchemaFiles+identifier+'_schema.json';
            const response = await fetch(path);
            const json = await response.json();
            this.cache[identifier] = json;
        }
        return this.cache[identifier];
    }

    static async getObjectFromSchema(identifier) {
        let schema = await Schemas.getSchema(identifier);

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