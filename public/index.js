// Allows the user to switch between logging in and signing up
document.addEventListener("DOMContentLoaded", () => {
    const logInForm = document.querySelector('.log-in');
    const signUpForm = document.querySelector('.sign-up');


    document.querySelector("#log-in-form").addEventListener("click", e => {
        e.preventDefault();

    });
});

//Login & Signup

const loginBtn = document.getElementById('log-in');
const signupBtn = document.getElementById('sign-up');

function login(e){
    e.preventDefault();

 
    let password = document.getElementById('l-password');

    let loggingIn = {
      
        password: password.value
    }

    axios.post('/api/login', loggingIn).then(res => {
        console.log(res.data)
        localStorage.setItem('user', res.data.id)
        location.href = '/home'
    })
}



loginBtn.addEventListener('click', login)

