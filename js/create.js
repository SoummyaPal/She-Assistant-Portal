
$(document).ready(function () {
  $('#create-changes').on('click', function (e) {
    e.preventDefault();

    const designName = $('#create-design-name').val();
    const designPrice = $('#create-design-price').val();
    const designDescription = $('#create-design-desc').val();
    const designUrl = $('#create-design-url').val();
    const designer = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    const designerId = designer["id"];

    const designValues = { designName, designPrice, designDescription, designUrl, designerId };
    console.log(designValues);
    if (designName.length < 3) {
      alert("Please enter your design name");
    } else if (designPrice.length < 3) {
      alert("Please enter the price for the design");
    } else if (designDescription.length < 3) {
      alert("Please enter a description for the design");
    } else if (designUrl.length < 3) {
      alert("A url to the design image must be given");
    } else {
      $.ajax({
        url: 'http://localhost:3000/designs',
        type: "POST",
        data: designValues,
        success: function (data) {
          alert("Design successfully created")
        },
        error: function (error) {
          alert("An error Occured");
        }
      });
    }
    return false;
  })

})