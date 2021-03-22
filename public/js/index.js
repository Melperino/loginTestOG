
function boot() {
    if (localStorage.getItem('user') != null) {
		console.log(localStorage.getItem('user'))
        window.location.href = "./edit-user";
    }
}

function send() {
    let username = document.getElementById('txtUser').value;
    let password = document.getElementById('txtPwd').value;
    
    if (username == undefined || password == undefined) {
        alertify
        .alert("Empty fields, do provide username n password pls thx", function () {
        });
    }

    if (username != "" && password != "") {
        $.post('/login', { username: username, password: password },
            function (data, status) {
                if (data == true) {
                    localStorage.setItem('user', username);
                    alertify
                        .alert("Successfuly logged in", function () {
                            window.location.href = "./edit-user";
                        });
                } else {
                    alertify
                        .alert("Wrong username or password", function () {
                        });
                }
            });
    }

}

function validate() {
    if (localStorage.getItem('user') == null) {
        window.location.href = "./";
    } else {
        let username = localStorage.getItem('user');
        $.post('/validate', { username: username },
            function (data) {
                if (data !== undefined) {
                    return true;
                } else {
                    window.location.href = "./";
                }
            });
    }
}

function logOut() {
    localStorage.clear();
    window.location.href = "./";
}

function signIn() {
    window.location.href = "./new-user";
}

function mouseoverPass(obj) {
    var obj = document.getElementById('txtPwd');
    obj.type = "text";
}

function mouseoutPass(obj) {
    var obj = document.getElementById('txtPwd');
    obj.type = "password";
}
