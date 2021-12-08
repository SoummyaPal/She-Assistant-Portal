function createUser() {
  $('#signup-form').submit(function (e) {
    e.preventDefault();
    const firstName = $('#firstname').val();
    const lastName = $('#lastname').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const isAdmin = false;
    const url = $(this).attr('action');
    const user = { firstName, lastName, email, password, isAdmin };
    if (firstName.length < 1) {
      alert("Please enter your first name");
    } else if (lastName.length < 1) {
      alert("Please enter your last name");
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters long");
    } else {
      $.ajax({
        url: url,
        type: 'POST',
        data: user
      }).done((data) => {
        window.location.replace('../html/login.html');
      })
    }
    return false;
  })
}
