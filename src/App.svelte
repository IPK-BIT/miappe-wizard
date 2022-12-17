<script>
    import Header from '@/components/Header.svelte';
    import InitView from '@/components/InitView.svelte';
    import Explanation from '@/components/Explanation.svelte';
    import TreeView from '@/components/treeview/TreeView.svelte';
    
    import Investigation from '@/components/isa/investigation/Investigation.svelte';
    import InvestigationWizard from '@/components/isa/investigation/InvestigationWizard.svelte';
    import Forms from '@/components/Forms.svelte';
    
    import { isaObj, isaStr } from '@/stores/isa.js';


    let showJson = false;
    let viewportMode = 'init';
    let mode = 'form'; // ['form', 'wizard', 'level']
    let level;
    
    function handleMenuAction(event) {
        if (event.detail.action === 'startWizardMode') {
            mode = 'wizard';
        }
    }

    function handleInitViewAction(event) {
        if (event.detail.action === 'addInvestigation') {
            viewportMode = 'main';
        }
        if (event.detail.action === 'startWizardMode') {
            viewportMode = 'main';
            mode = 'wizard';
        }
        
    }

    function handleTreeViewAction(event) {
        if (event.detail.action === 'showIsaLevel') {
            viewportMode = 'main';
            mode = 'level';
            level = event.detail.level;

            /*switch (event.detail.level) {
                case 'investigation':
                    console.log('set hierarchical level to investigation');
                    break;
                case 'investigation.publication':
                    console.log('set hierarchical level to investigation/publications');
                    break;
                case 'investigation.people':
                    console.log('set hierarchical level to investigation/people');
                    break;
                case 'investigation.study':
                    console.log('set hierarchical level to investigation/studies');
                    break;
                default:
                    console.log(event.detail.level);
                    break;
            }*/
        }
    }
</script>

<main>
    
    

    {#if viewportMode == 'init'}
    <InitView on:initViewAction={handleInitViewAction} {isaObj} />
    {:else}
    
    <div class="content">

        <div class="header">
            <Header on:menuAction={handleMenuAction} {isaObj} {viewportMode} />
        </div>
        
        <div class="leftcol">
            <TreeView on:treeViewAction={handleTreeViewAction} />
        </div>
        
        <div class="middlecol">
            
            {#if mode === 'form'}
            <Investigation bind:value={$isaObj} />
            {:else if mode === 'wizard'}
            <InvestigationWizard bind:isa={$isaObj} on:closeWizard={() => {mode = 'form'}} />
            {:else if mode === 'level'}
            <Forms bind:isaObj={$isaObj} {level} />
            {/if}
                
        </div>
            
        <div class="rightcol">
            <Explanation />
            
            <div id="json">
                <strong>ISA-JSON (<a href="#" on:click={() => showJson = !showJson}>{showJson ? 'hide' : 'show'}</a>)</strong>
                
                {#if showJson}
                <textarea bind:value={$isaStr} id="json-textarea"></textarea>
                {/if}
            </div> 
        </div>

    </div>
    {/if}

    
</main>
    
<style>
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
    }
    :global(#app) {
        padding: 0;
        margin: 0;
        height: 100vh;
    }
    main {
        font-family: sans-serif;
        height: 100vh;
    }
    .content {
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        grid-template-rows: 60px auto;
        grid-column-gap: 1px;
        grid-row-gap: 0px;
        padding: 0px 0px;
        border: 0px solid blue;
        min-height: 90vh;
        height: 100vh;
    }
    .header {
        grid-area: 1 / 1 / 1 / 4;
        background: rgb(80, 80, 100);
    }
    .leftcol {
        grid-area: 2 / 1 / 2 / 2;
        background: rgb(240,240,240);
        align-self: stretch;
        padding: 10px 5px;
        border-right: 1px solid rgb(190,190,190);
        /*box-shadow: 0px 0px 15px rgba(0,0,0,0.1);*/
    }
    .middlecol {
        grid-area: 2 / 2 / 2 / 3;
        overflow-y: scroll;
        padding: 20px 30px;
    }
    .rightcol {
        grid-area: 2 / 3 / 2 / 4;
        background: rgb(240,240,240);
        align-self: stretch;
        padding: 10px;
        border-left: 1px solid rgb(190,190,190);
    }
    #json {
        padding: 10px;
        background: white;
        border: 1px solid rgb(150,150,150);
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
        width: 150px;
    }
    :global(input) {
        padding: 4px 8px;
        font-size: 100%;
        border: 1px solid rgb(80,80,80);
        border-radius: 5px;
        box-sizing: border-box;
    }
    :global(button) {
        background: rgb(210,210,210);
        border: 0;
        border-radius: 5px;
        padding: 3px 6px;
        cursor: pointer;
        border: 1px solid transparent;
    }
    :global(button:hover) {
        background: rgb(230, 230, 152);
        border: 1px solid rgb(70,70,70);
    }

    :global(button.add) {
        background: rgb(130, 130, 230);
        color: white;
        border: 0;
        border-radius: 5px;
        padding: 3px 6px;
        cursor: pointer;
        border: 1px solid transparent;
    }
    :global(button.add:hover) {
        background: rgb(160, 160, 255);
    }
</style>