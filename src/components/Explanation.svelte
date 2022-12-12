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

    {#if $explanation.attr !== undefined && $explanation.attr !== false && explanations?.[$explanation.isaLevel]?.[$explanation.attr] !== undefined}
    <div id="explanation-content">
        <strong>Explanation:</strong>
        <p>{explanations?.[$explanation.isaLevel]?.[$explanation.attr]}</p>
    </div>
    {/if}

</section>


<style>
#explanation-content {
    padding: 10px;
    margin-bottom: 20px;
    background: white;
    border: 1px solid rgb(150,150,150);
}
</style>