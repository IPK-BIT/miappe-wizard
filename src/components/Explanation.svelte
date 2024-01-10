<script>
    import { explanation } from '@/stores/explanation.js';

    import miappeChecklist from '@/lib/miappe/miappeChecklist.json';

    explanation.subscribe(value => {
        //console.log(value);
    });

    const miappe = miappeChecklist.reduce((result, obj) => {
        result[obj.id] = obj;
        return result;
    }, {});


    /*let explanations = {
        'Investigation': {
            'title': 'This is the title.',
            'description': 'This is the description.',
            'submissionDate': 'This is the submissionDate.',
            'publicReleaseDate': 'This is the publicReleaseDate.',
        },
        'Study': {
            'title': 'This is the title of your study.'
        }
    }*/

    let explanations = {
        'investigation': {
            'identifier': miappe['DM-2'],
            'title': miappe['DM-3'],
            'description': miappe['DM-4'],
            'submissionDate': miappe['DM-5'],
            'publicReleaseDate': miappe['DM-6'],
            'DM-16': miappe['DM-16'],
            'DM-17': miappe['DM-17']
        },
        'study': {
            'identifier': miappe['DM-11'],
            'title': miappe['DM-12'],
            'description': miappe['DM-13'],
            'startDate': miappe['DM-14'],
            'endDate': miappe['DM-15'],
            'contactInstitution': miappe['DM-16'],
            'country': miappe['DM-17'],
            'latitude': miappe['DM-19'],
            'longitude': miappe['DM-20'],
            'altitude': miappe['DM-21'],
            'dataFileLink': miappe['DM-37'],
            'dataFileDescription': miappe['DM-38'],
            'dataFileVersion': miappe['DM-39'],
            'DM-16': miappe['DM-16'],
            'DM-17': miappe['DM-17']
        },
        'protocol': {
            'description': miappe['DM-67']
        }
    }
</script>


<section>

    {#if $explanation.attr !== undefined && $explanation.attr !== false && explanations?.[$explanation.isaLevel]?.[$explanation.attr] !== undefined}
    <div id="explanation-content" class="bbox">
        <strong>Explanation:</strong>
        <p>{explanations?.[$explanation.isaLevel]?.[$explanation.attr]?.definition}</p>

        <strong>Example:</strong>
        <p>{explanations?.[$explanation.isaLevel]?.[$explanation.attr]?.example}</p>

        <p>{$explanation.isaLevel} / {$explanation.attr}</p>
    </div>
    {/if}

</section>


<style>
#explanation-content {
    /*padding: 10px;
    background: white;
    border: 1px solid rgb(150,150,150);*/
    margin-bottom: 20px;
}

p {
    margin-top: 3px;
}
</style>