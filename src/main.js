//import './app.css'
import App from './App.svelte'

const target = document.querySelector('#app');
//const shadowRoot = target.attachShadow({ mode: "open" });

const app = new App({
    //target: document.getElementById('app')
    target: target
})

export default app
