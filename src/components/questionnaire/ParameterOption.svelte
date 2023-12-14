<script>
    import { itemActions } from 'svelecte/item';
    import { manualExplanation } from '@/stores/ManualExplanation.js';
  
    // these properties can be used
    export let inputValue;
    export let index = -1;
    export let item = {};
    export let isSelected = false;
    export let isDisabled = false;
    export let formatter;
    export let disableHighlight = false;
    export let isMultiple = false;

    function showExplanation(item) {
        $manualExplanation = item.explanation;
    }

    function hideExplanation() {
      $manualExplanation = null;
    }
  </script>
  
  <!-- you need to use itemActions and pass given events -->
  <div class="sv-item" use:itemActions={{item, index}}
    class:is-selected={isSelected}
    on:select
    on:deselect
    on:hover
  >
      <div class="sv-item-content" on:mouseover={(e) => showExplanation(item)} on:on:mouseout={(e) => hideExplanation()}>
        {item.label}
      </div>  
  </div>