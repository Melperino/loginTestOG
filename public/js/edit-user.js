
function getUser(){
	validate();
    checkAdmin();
	document.getElementById("txtUser").value = localStorage.getItem('user');
}

function updateUser(){
	
    let user = localStorage.getItem('user');
    let password = document.getElementById("txtPwd").value;

    if(password == ""){
        alertify
                .warning("Do chose a new password", function () {
                    window.location.reload;
		});
    } else {
        $.post('/editUser', {username: user, password:password },
        function (data){
            if(data == "OK"){
                alertify
                    .success("Successfuly updated", function () {
                        window.location.reload;
                    });
            }else{
                alertify
                    .warning("Something bad happened :c", function () {
                        window.location.reload;
                    });
            }
        });
    }
}