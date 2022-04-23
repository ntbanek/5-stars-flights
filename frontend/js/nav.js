if(document.getElementById('login_btn')) {
    document.getElementById('login_btn').addEventListener('click', () => {
        document.getElementById('myForm').style.display = 'block';
    })
    }
    else {
        document.getElementById('logout_btn').addEventListener('click', () => {
        window.location.href='/logout';
    })
    }
    
    document.getElementById('signup_btn').addEventListener('click', () => {
        window.location.href='/signup';
    })
    