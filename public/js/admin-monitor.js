function validateAdmin() {
    validate();
    if (localStorage.getItem('role') != 'admin') {
        window.location.href = "./edit-user";
    } else {
        let username = localStorage.getItem('user');
        let admin = localStorage.getItem('role')
        $.post('/validateAdmin', { username: username, role: admin },
            function (data) {
                if (data !== undefined) {
                    return true;
                } else {
                    window.location.href = "./edit-user";
                }
            });
    }
}