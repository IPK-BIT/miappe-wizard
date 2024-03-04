import { writable } from "svelte/store";
import { isaObj } from "./isa";
import { appstate } from "./appstate";

fetch("/data/gitlab.json")
.then((res) => res.json())
.then((data) => {
    CLIENT_ID.set(data['client-id'])
    CLIENT_SECRET.set(data['client-secret'])
})
.catch((err) => {
    console.error("gitlab client configuration not available");
    CLIENT_ID.set("")
    CLIENT_SECRET.set("")
})
export const CLIENT_ID = writable("")
export const CLIENT_SECRET = writable("")
export const ACCESS_TOKEN = writable("")
export const gitlab_repsonse= writable({access_token: ""})

export const base_url = "https://git.nfdi4plants.org"

export async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        isaObj.set(JSON.parse(localStorage.getItem('isaobj')));
        localStorage.removeItem('isaobj');
        
        fetch("/data/gitlab.json")
        .then((res) => res.json())
        .then((data) => {
            CLIENT_ID.set(data['client-id'])
            CLIENT_SECRET.set(data['client-secret'])
            
            let queryObj = {
                client_id: data['client-id'],
                client_secret: data['client-secret'],
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: window.origin
            }
            
            let queryString = Object.keys(queryObj).map(key => key + '=' + queryObj[key]).join('&');
            
            fetch(`${base_url}/oauth/token?${queryString}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(
            response => response.json()
            )
            .then(
            data => {
                gitlab_repsonse.set(data);
            }
            )
            .catch(
            error => console.error('Error:', error)
            );
            appstate.set(appstate.GUI);
        })
        .catch((_) => {
            console.error("gitlab client configuration not available");
            CLIENT_ID.set("")
            CLIENT_SECRET.set("")
        })
    }
}