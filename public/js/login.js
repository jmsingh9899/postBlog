const loginForm = document.getElementById('login')
const signupForm = document.getElementById('signup')
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const loginUsername = document.getElementById('username').value
    const loginPassword = document.getElementById('password').value

    if(loginUsername && loginPassword){
        const resp = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ user: loginUsername, password: loginPassword }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(resp.ok){
            location.href = '/'
        } else {
            alert('Incorrect information')
        }
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const signupUsername = document.getElementById('signupusername').value
    const signupPassword = document.getElementById('signuppassword').value
    if(signupPassword.length < 8){
        alert("Please make your password at least 8 characters.")
        return
    }
    if(signupUsername && signupPassword){
        const resp = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({ user:signupUsername, password:signupPassword}),
            headers: { 'Content-Type': 'application/json' }
        })

        if(resp.ok){
            location.href = '/'
        } else {
            alert("signup fail")
        }
    }
});