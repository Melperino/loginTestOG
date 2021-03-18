function register() {
    let username = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;
	
	$.post('/newUser', { username: username, password: password},
	function (data) {
		if (data == "OK") {
			localStorage.setItem('user', username);
				alertify
				.alert("Successfuly signed up", function () {
					window.location.href = "./edit-user";
				});
			}
    });   
}