<script>
    let study;
    export { study as value };

    import { config } from '@/stores/config';

    import { setContext } from 'svelte';
    setContext('isaLevel', 'protocol');

    import { appstate } from '@/stores/appstate';

    import Svelecte from "svelecte/src/Svelecte.svelte";
    import ParameterOption from "./questionnaire/ParameterOption.svelte";
    import Schemas from "@/lib/schemas";
    import String from "./isa/generic/String.svelte";
    import { growthProtocols } from '@/stores/growthProtocols.js';

    let protocol = Schemas.getObjectFromSchema("protocol");
    protocol.name = "Growth";

    let options = config.checklist.defaultProtocols[0].parameters;

    let selected_options_fixed = [];
    let selected_options_fixed_values = {};
    let selected_options_variable = [];

    let options_variable = [];
    $: {
        let possible_options = options.map((o) => o.label);
        options_variable = possible_options.filter((o) => !selected_options_fixed.includes(o));
    }

    let factor_options = config.checklist.studyFactors;
    let selected_factor_options = [];

    function save() {
        protocol.parameters = [];
        for(let p of [selected_options_fixed, selected_options_variable].flat()) {
            let param = Schemas.getObjectFromSchema("protocol_parameter");
            let oa = Schemas.getObjectFromSchema("ontology_annotation");
            oa.annotationValue = p;
            param.parameterName = oa;
            protocol.parameters.push(param);
        }
        let _protocol = {
            protocol: protocol, 
            fixed_parameters: selected_options_fixed_values
        };

        $growthProtocols = ($growthProtocols).set(study, _protocol);
    }

</script>

{#if $appstate !== appstate.WIZARD}
<h3>Growth Protocol</h3>
{/if}

<p>
    In this step, we will define the growth protocol for your plants.
    Please describe how you grew your plants in this experiment.
</p>

<String bind:value={protocol.description} label="Protocol description" attr="description" />

<p>
    Were there any experimental treatments applied to your plants (e.g. some stress vs control)? If yes, please select any that apply
    or write your own. You will then be able to specifiy which plant received which treatment in the next step. 
</p>

<Svelecte options={factor_options} bind:value={selected_factor_options} 
    labelAsValue={true} 
    multiple 
    creatable={true}
    creatablePrefix=""
    allowEditing={true}
    dropdownItem={ParameterOption}
    on:change={() => save()}
    />

<p>
    Now please pick the growth parameters which are the same for all plants and add any that you can think of.
    The more you describe the more helpful the data set will be.
</p>

<Svelecte options={options} bind:value={selected_options_fixed} 
    labelAsValue={true} 
    multiple 
    creatable={true}
    creatablePrefix=""
    allowEditing={true}
    dropdownItem={ParameterOption}
    on:change={() => save()}
    />

{#each selected_options_fixed as option}
    <String bind:value={selected_options_fixed_values[option]} attr="{option}"/>
{/each}

<p>
    Were there any growth parameters which were <b>not</b> the same for all plants but which were also not experimental treatments defined earlier?
    You will be able to enter values for each plant in the next table below.
</p>

<Svelecte options={options_variable} bind:value={selected_options_variable} 
    labelAsValue={true} 
    multiple 
    creatable={true}
    creatablePrefix=""
    allowEditing={true}
    dropdownItem={ParameterOption}
    on:change={() => save()}
    />

<button class="add" on:click={() => save()} style="margin-top: 20px;">Save</button>