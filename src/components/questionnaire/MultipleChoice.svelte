<script>

    import { questionnaire } from '@/stores/questionnaire';

    export let questionId;
    export let options;
	
</script>


<section>

    {#each options as option}
    <div class="option" class:selected={option.value == $questionnaire[questionId]}>
        <input bind:group={$questionnaire[questionId]} type="radio" name="{option.label}" value={option.value} id={option.label} />
        <label for={option.label}>
            {@html option.label}
            {#if option.example}
            <br /><span class="example">Example: {@html option.example}</span>
            {/if}
        </label>
    </div>
    {/each}

</section>


<style>
    div.option {
        margin-bottom: 20px;
        background: rgba(255,255,255,1.0);
        padding: 18px 20px;
        border: 2px solid transparent;
        /*border-left: 1px solid rgb(175,175,175);*/
        box-shadow: 1px 1px 4px rgba(0,0,0,0.15);
        border-radius: 10px;
    }
    .selected {
        border: 2px solid rgb(0,100,220) !important;
        border-left: 2px solid black;
        background: white !important;
    }
    label {
        width: 80%;
        padding-left: 7px;
    }
    span.example {
        display: inline-block;
        margin-top: 10px;
        font-size: 90%;
        font-style: italic;
        color: rgb(112, 112, 41);
    }
    input[type="radio"] {
        margin-top: 3px;
        vertical-align: top;
    }
</style>