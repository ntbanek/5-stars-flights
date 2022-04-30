
    document.getElementById('back_btn').addEventListener('click', () => {
        document.getElementById('login_form').style.display = 'none';
        if(document.getElementById("error"))
        {
        document.getElementById("error").style.display = 'none';
        }
    })
    
    