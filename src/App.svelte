<script>
    import Header from '@/components/Header.svelte';
    import Explanation from '@/components/Explanation.svelte';
    import TreeView from '@/components/TreeView.svelte';
    
    import Investigation from '@/components/isa/investigation/Investigation.svelte';
    import InvestigationWizard from '@/components/isa/investigation/InvestigationWizard.svelte';
    
    import { isaObj, isaStr } from '@/stores/isa.js';
    
    
    let showJson = false;
    let mode = 'form'; // ['form', 'wizard']
    
    
    function handleMenuAction(event) {
        if (event.detail.action === 'startWizardMode') {
            mode = 'wizard';
        }
    }
</script>

<main>
    
    <Header on:menuAction={handleMenuAction} {isaObj} />
    
    <div class="content">
        
        <div class="leftcol">
            <TreeView/>
        </div>
        
        <div class="middlecol">
            
            {#if mode === 'form'}
            <Investigation bind:isa={$isaObj} />
            {:else if mode === 'wizard'}
            <InvestigationWizard bind:isa={$isaObj} on:closeWizard={() => {mode = 'form'}} />
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
            grid-template-columns: 1fr 2fr 1fr;
            grid-template-rows: 1fr;
            grid-column-gap: 50px;
            grid-row-gap: 0px;
            padding: 10px 30px;
            border: 0px solid blue;
            min-height: 90vh;
            height: 90vh;
        }
        
        .leftcol {
            grid-area: 1 / 1 / 2 / 2;
            background: rgb(230,230,230);
            align-self: stretch;
            padding: 10px;
        }
        
        .middlecol {
            grid-area: 1 / 2 / 2 / 3;
        }
        
        .rightcol {
            grid-area: 1 / 3 / 2 / 4;
            background: rgb(230,230,230);
            align-self: stretch;
            padding: 10px;
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
            margin-bottom: 10px;
            border: 1px solid rgb(215,215,215);
            box-sizing: border-box;
            background: rgb(247,247,247);
        }
        
        :global(div.attr > h4) {
            margin: 0 0 5px 0;
            
            color: darkslateblue;
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
        
        
        
    </style>
    