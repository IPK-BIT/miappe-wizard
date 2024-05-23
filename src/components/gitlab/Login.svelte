<script>
    import { CLIENT_ID, base_url } from '@/stores/gitlab-api.js'
    import { isaObj } from '@/stores/isa';
    import { onMount } from 'svelte';

    let codeVerifier;
    let codeChallenge;
    
    function generateCodeVerifier() {
        let codeVerifier = btoa(String.fromCharCode.apply(null, Array.from(globalThis.crypto.getRandomValues(new Uint8Array(32)))));
        codeVerifier = codeVerifier.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
        return codeVerifier;
    }

     async function generateCodeChallenge(codeVerifier) {
        const ascii = new TextEncoder().encode(codeVerifier);
        const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', ascii);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashBase64 = hashArray.map(b => String.fromCharCode(b)).join('');
        const hashBase64Url = btoa(hashBase64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        return hashBase64Url;
    }

    onMount(async () => {
        codeVerifier = generateCodeVerifier()
        codeChallenge = await generateCodeChallenge(codeVerifier)

        localStorage.setItem('code_verifier', codeVerifier)
    })

function login() {
    localStorage.setItem('isaobj', JSON.stringify($isaObj))
    const params = {
        response_type: 'code',
        client_id: $CLIENT_ID,
        redirect_uri: window.location.origin,
        state: '123456',
        scope: 'api',
        code_challenge: codeChallenge,
        code_challenge_method: 'S256'
    }
    const urlParams = new URLSearchParams(params);
    const authUrl = `${base_url}/authorize?${urlParams.toString()}`;
    window.location.href = authUrl;
}
</script>

<button class="login-btn" on:click={login}>
    <img src="data/gitlab.svg" alt="Gitlab"/>
</button>

<style>
    .login-btn {
        position: absolute;
        top: .5rem;
        right: .5rem;
        border-radius: 50%;
        background-color: hsl(0, 0%, 90%);
        border: 0;
        height: 2.5rem;
        width: 2.5rem;
    }
    
    .login-btn:hover {
        background-color: hsl(0, 0%, 80%);
    }
    
    img {
        height: 100%;
        width: 100%;
    }
    
</style>