//import './app.css'
import App from './App.svelte'

let config = {};

const target = document.querySelector('#app');
//const shadowRoot = target.attachShadow({ mode: "open" });

function startApp(params) {
    const app = new App({
        //target: document.getElementById('app')
        target: target,
        props: {
            config: params.config
        }
    });
}

window.miappeWizard = {
    startApp: startApp
}

//export default app
