import { writable } from "svelte/store";

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