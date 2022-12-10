<script>
    import { explanation } from '@/stores/explanation.js';

    explanation.subscribe(value => {
        //console.log(value);
    });

    let explanations = {
        'Investigation': {
            'title': 'This is the title.',
            'description': 'This is the description.',
            'submissionDate': 'This is the submissionDate.',
            'publicReleaseDate': 'This is the publicReleaseDate.',
        },
        'Study': {
            'title': 'This is the title of your study.'
        }
    }
</script>


<section>

    {#if $explanation.attr !== undefined && $explanation.attr !== false && explanations[$explanation.isaLevel] !== undefined && explanations[$explanation.isaLevel][$explanation.attr] !== undefined}
    Explanation: {explanations[$explanation.isaLevel][$explanation.attr]}
    {/if}

</section>


<style>

</style>