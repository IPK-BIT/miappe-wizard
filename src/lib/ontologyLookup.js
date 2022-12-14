function ontologyLookup(search_term, ontology = null, n_terms = 7) {
    return fetch('https://swate.nfdi4plants.org/api/IOntologyAPIv2/getTermSuggestions', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: '[{"n": '+n_terms+',"query": "'+search_term+'"}]'
    }).then((response) => response.json())
}