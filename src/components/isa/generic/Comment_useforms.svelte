<script lang="ts">
    export let comment;

    import { useForm, Hint, validators, minLength } from 'svelte-use-form';

    const form = useForm({ name: {initial: ''}, value: {initial: ''} });

</script>

<section>

    <div class="attr">Comment: 
        <form use:form>
            <input type="text" name="name" bind:value={comment.name} use:validators={[minLength(5)]} placeholder="name" />
            <input type="text" name="value" bind:value={comment.value} use:validators={[minLength(10)]} placeholder="value" />
            <button disabled={!$form.valid}>Add</button>

            <Hint for="name" on="minLength" let:value>
                <strong>The name requires at least {value} characters.</strong>
            </Hint>
            <Hint for="value" on="minLength" let:value>
                <strong>The value requires at least {value} characters.</strong>
            </Hint>
        </form>
    </div>

</section>


<style>

form {
    display: inline-block;
}

</style>