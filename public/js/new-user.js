function register() {
    let username = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;
	let role = document.getElementById("txtRole").value;

	$.post('/newUser', { username: username, password: password,role: role},
	function (data) {
		if (data == "OK") {
			localStorage.setItem('user', username);
			localStorage.setItem('role',role)
				alertify
				.alert("Successfuly signed up", function () {
					window.location.href = "./edit-user";
				});
			}
    });
}