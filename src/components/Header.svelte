<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function emit(action) {
		dispatch('action', {
            action: action
		});
    }
</script>


<header class="flex-container">
    <div class="flex-items">
        <h1>miappe Wizard</h1>
    </div>

    <div class="flex-items">
        <button on:click|preventDefault={() => emit('loadISA')}>Load minimal example</button> 
        <button on:click|preventDefault={() => emit('addInvestigation')}>Add new Investigation</button>
        <button on:click|preventDefault={() => emit('saveIsaAsJson')}>Save ISA-JSON as file</button>
        <button on:click|preventDefault={() => emit('loadIsaFromJson')}>Load ISA-JSON from file</button>
        <button on:click|preventDefault={() => emit('startWizardMode')}>Start Wizard mode</button>
    </div>
</header>


<style>
header {
    background: rgb(80, 80, 100);
    color: white;
    padding: 10px 15px;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
    margin-bottom: 15px;
}

h1 {
    margin: 0;
    padding: 0;
    font-size: 150%;
    font-weight: normal;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: normal;
  align-content: normal;
}

.flex-items:nth-child(1) {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
  padding-right: 100px;
}

.flex-items:nth-child(2) {
  display: block;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: center;
  order: 0;
}
</style>