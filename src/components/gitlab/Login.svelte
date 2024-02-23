<script>
    import { CLIENT_ID, base_url } from '@/stores/gitlab-api.js'
    import { isaObj } from '@/stores/isa';

function login() {
    //save the isaobj in localstorage
    localStorage.setItem('isaobj', JSON.stringify($isaObj))
    
    const url = `${base_url}/oauth/authorize?client_id=${$CLIENT_ID}&redirect_uri=${window.origin}&response_type=code&scope=api`
    window.location.href = url
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