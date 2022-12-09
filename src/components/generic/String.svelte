<script>
    export let attr;
    export let value;
</script>


<section>

    <div class="attr">{attr}: <input type="text" bind:value={value} /></div>

</section>


<style>
input {
    padding: 4px;
    font-family: sans-serif;
    font-size: 100%;
}
</style>