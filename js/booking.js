function booking(id) {

  const designName = $('#book-design-name').attr('placeholder');
  const designPrice = $('#book-design-price').attr('placeholder');
  const designDescription = $('#book-design-desc').attr('placeholder');
  const designUrl = $('#book-design-url').attr('placeholder');
  const designid = $('#book-design-id').attr('value');
  const userEmail = $('#book-design-email' + id).val();
  // const phone = $('#book-design-phone'+designid).val();
  const phone = $('#book-design-phone' + id).val();
  const bookData = { designName, designPrice, designDescription, designUrl, designid, phone, userEmail };

  console.log(bookData);

  $.ajax({
    url: 'http://localhost:3000/bookings',
    type: "POST",
    data: bookData,
    success: function (data) {
      alert('You have successfully Book your design, we will get back to you ...');
    },
    error: function (error) {
      alert("An error occurred");
    }
  })
}