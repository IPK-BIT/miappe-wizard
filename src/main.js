//import './app.css'
import App from './App.svelte'

const target = document.querySelector('#app');
//const shadowRoot = target.attachShadow({ mode: "open" });

function startApp(params) {
    const app = new App({
        target: target,
        props: {
            config: params.config
        }
    });
    return app;
}

window.miappeWizard = {
    startApp: startApp
}

//export default app