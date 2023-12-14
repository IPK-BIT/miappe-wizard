<script>
    import { manualExplanation } from '@/stores/ManualExplanation.js';

</script>


<section>

    {#if $manualExplanation}
    <div id="manual-explanation-content">
        <strong>Explanation:</strong>
        <p>{$manualExplanation}</p>
    </div>
    {/if}

</section>


<style>
#manual-explanation-content {
    padding: 10px;
    margin-bottom: 20px;
    background: white;
    border: 1px solid rgb(150,150,150);
}
</style>