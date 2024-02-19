//import './app.css'
import App from './App.svelte'

const target = document.querySelector('#app');
//const shadowRoot = target.attachShadow({ mode: "open" });

function startApp(params) {

    const config = {
        checklist: params.config.checklist,
        prefill: params.prefill,
        steps: params.steps,
        explanations: params.explanations
    }

    const app = new App({
        target: target,
        props: {
            config: config
        }
    });
    return app;
}

window.miappeWizard = {
    startApp: startApp
}

//export default app