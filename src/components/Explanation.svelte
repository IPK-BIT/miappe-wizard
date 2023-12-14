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
        'Investigation': {
            'identifier': miappe['DM-2'],
            'title': miappe['DM-3'],
            'description': miappe['DM-4'],
            'submissionDate': miappe['DM-5'],
            'publicReleaseDate': miappe['DM-6'],
        },
        'Study': {
            'title': 'This is the title of your study.'
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
    </div>
    {/if}

</section>


<style>
#explanation-content {
    /*padding: 10px;
    margin-bottom: 20px;
    background: white;
    border: 1px solid rgb(150,150,150);*/
}

p {
    margin-top: 3px;
}
</style>