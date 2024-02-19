<script>

export let config;

import { setConfig } from './stores/config';
setConfig(config);

import { wizard } from '@/stores/wizard';

import '@fontsource/roboto';
import '@fontsource/roboto/500.css';

import Header from '@/components/Header.svelte';
import InitView from '@/components/InitView.svelte';
import Explanation from '@/components/Explanation.svelte';
import TreeView from '@/components/treeview/TreeView.svelte';

import Investigation from '@/components/isa/investigation/Investigation.svelte';
import GenericQuestionnaire from '@/components/questionnaire/GenericQuestionnaire.svelte';
import Forms from '@/components/Forms.svelte';

import Gui from './components/gui/Gui.svelte';

import { appstate } from '@/stores/appstate';
import { partialview } from '@/stores/partialview';
import { isaObj, isaStr } from '@/stores/isa.js';
import ManualExplanation from '@/components/ManualExplanation.svelte';

let showJson = false;

partialview.subscribe($ => {
    if (typeof($.component) === 'function') {
        $appstate = appstate.LEVEL;
    }
});

function showGui() {
    $appstate = appstate.GUI;
}

</script>

<main>
    
    

    {#if $appstate == appstate.INIT}

    <InitView />
    
    {:else}
    
    <div class="content">

        <div class="header">
            <Header />
        </div>
        
        <div class="leftcol">

            {#if $appstate !== appstate.WIZARD}
            <div class="bbox" style="margin-bottom: 20px;">
                <a href="#" on:click|preventDefault={showGui}>Investigation</a>
            </div>

            
            <TreeView />
            {/if}

            {#if $appstate === appstate.WIZARD}
            <div class="bbox">
                <p style="margin: 0 0 5px 0;">Your progress:</p>
                <div id="progress-bar">
                    <div id="progress" style:width={(($wizard.currentStep / $wizard.steps)*100)+'%'}></div>
                    <div id="progress-percent">{Math.floor(($wizard.currentStep / $wizard.steps)*100)}%</div>
                </div>
            </div>
            {/if}
            

        </div>
        
        <div class="middlecol">

            <div class="bbox">
            
            {#if $appstate === appstate.FORM}
            <Investigation bind:value={$isaObj} />
            {:else if $appstate === appstate.WIZARD}
            <GenericQuestionnaire on:closeWizard={() => {$appstate = appstate.FORM;}} />
            {:else if $appstate === appstate.LEVEL}
            <Forms />
            {:else if $appstate === appstate.GUI}
            <Gui />
            {/if}

            </div>
                
        </div>
            
        <div class="rightcol">
            <ManualExplanation />
            <Explanation />
            
            {#if $appstate !== appstate.WIZARD || true==true}
            <div class="bbox" id="json">
                <strong>ISA-JSON (<a href="#" on:click={() => showJson = !showJson}>{showJson ? 'hide' : 'show'}</a>)</strong><br />
                {#if showJson}
                <textarea bind:value={$isaStr} id="json-textarea"></textarea>
                {/if}
                
            </div>
            {/if}
        </div>

    </div>
    {/if}

    
</main>
    
<style>

#progress-bar {
    border: 0px solid rgb(160,160,160);
    background: rgb(225,225,225);
    height: 25px;
    position: relative;
}

#progress {
    background: rgb(30, 206, 7);
    height: 100%;
    width: 0%;
}

#progress-percent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25px;
    padding: 4px 0 0 0;
    text-align: center;
    font-size: 0.95em;
}

    :global(*) {
        box-sizing: border-box;
    }
    :global(html) {
        padding: 0;
        margin: 0;
        height: 100vh;
    }
    :global(body) {
        padding: 0;
        margin: 0;
        height: 100vh;
        font-family: 'Roboto', sans-serif;
        background: rgb(190,190,190);
    }
    :global(#app) {
        padding: 0;
        margin: 0;
        height: 100vh;
    }
    :global(strong) {
        font-weight: 500;
    }
    main {
        font-family: 'Roboto', sans-serif;
        height: 100vh;
    }
    .content {
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        grid-template-rows: 60px auto;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        padding: 0px 0px;
        border: 0px solid blue;
        min-height: 90vh;
        height: 100vh;
    }
    .header {
        grid-area: 1 / 1 / 1 / 4;
        /* background: rgb(80, 80, 100); */
        /*background: linear-gradient(0deg, hsl(145, 83%, 28%) 0%, hsl(145, 83%, 38%) 100%);*/
        background: white;
        border-bottom: 2px solid rgb(150,150,150);
        box-shadow: 0px 5px 5px rgba(0,0,0,0.2);
    }
    .leftcol {
        grid-area: 2 / 1 / 2 / 2;
        align-self: stretch;
        padding: 20px 0;
        padding-left: 15px;
        padding-right: 10px;
        /*border-right: 1px solid rgb(190,190,190);*/
        /*box-shadow: 0px 0px 15px rgba(0,0,0,0.1);*/
    }
    .middlecol {
        grid-area: 2 / 2 / 2 / 3;
        overflow-y: auto;
        padding: 0 10px 20px 10px;
        margin-top: 20px;
        /*background: rgb(220,220,220);*/
    }
    
    :global(div.bbox) {
        background: white;
        border-radius: 6px;
        padding: 20px;
        box-shadow: 1px 1px 4px rgba(0,0,0,0.25);
        /*border-right: 1px solid rgb(140,140,140);
        border-bottom: 1px solid rgb(140,140,140);*/
    }
    .rightcol {
        grid-area: 2 / 3 / 2 / 4;
        /*background: rgb(240,240,240);*/
        align-self: stretch;
        padding: 20px 0;
        padding-left: 10px;
        padding-right: 15px;
        border-left: 0px solid rgb(190,190,190);
    }
    #json {
        padding: 10px;
        background: white;
        /*border: 1px solid rgb(150,150,150);*/
    }
    #json-textarea {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        min-height: 500px;
        
        padding: 2px;
        color: rgb(30,30,30);
        overflow-x: scroll;
        white-space: pre;
        border: 1px solid rgb(180,180,180);
        margin-top: 3px;
    }
    textarea:focus-visible {
        outline: none;
    }
    :global(div.attr) {
        padding: 10px;
        margin-bottom: 0px;
        /*border: 1px solid rgb(215,215,215);*/
        box-sizing: border-box;
        
    }
    :global(div.attr > h4) {
        margin: 0 0 5px 0;
        color: darkslateblue;
    }
    :global(label) {
        display: inline-block;
        width: 250px;
    }
    :global(input) {
        padding: 10px 10px;
        font-size: 100%;
        border: 1px solid rgb(160,160,160);
        border-radius: 2px;
        box-sizing: border-box;
        outline: none;
    }
    :global(button) {
        background: rgb(250,250,250);
        border: 0;
        border-radius: 1px;
        padding: 3px 6px;
        cursor: pointer;
        border: 1px solid transparent;
    }
    :global(button:hover) {
        background: rgb(230, 230, 152);
        border: 1px solid rgb(70,70,70);
    }

    :global(button.add) {
        /*background: rgb(130, 130, 230);*/
        background: linear-gradient(0deg, hsl(145, 83%, 28%) 0%, hsl(145, 83%, 38%) 100%);
        color: white;
        border: 0;
        border-radius: 5px;
        padding: 3px 6px;
        cursor: pointer;
        /*border: 1px solid transparent;*/
    }
    :global(button.add.large) {
        padding: 6px 15px;
        font-size: 100%;
        border-right: 1px solid rgba(0,0,0,0.5);
        border-bottom: 1px solid rgba(0,0,0,0.5);
    }
    :global(button.add:hover) {
        /* background: rgb(173, 173, 255); */
        background: linear-gradient(0deg, hsl(145, 83%, 28%) 0%, hsl(145, 83%, 38%) 100%);
    }
</style>
