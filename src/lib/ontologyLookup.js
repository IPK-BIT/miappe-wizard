function ontologyLookup(search_term, ontology = null, n_terms = 7) {
    requestBody = { n: n_terms, query:search_term };
    if(ontology != null) {
        requestBody.ontology = ontology
    }
    return fetch('https://swate.nfdi4plants.org/api/IOntologyAPIv2/getTermSuggestions', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify([requestBody])
      })
        .then((response) => response.json())
}
