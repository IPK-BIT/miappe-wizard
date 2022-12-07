<script>
    export let attr;
    let date;
    export { date as value };
</script>


<section>

    <div class="attr">{attr}: <input class="datepicker" type="date" bind:value={date} /></div>

</section>


<style>
.datepicker {
    padding: 4px;
    font-family: sans-serif;
    font-size: 100%;
}
</style>