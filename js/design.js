$(document).ready(function () {
  function populateTableappend(data) {
    data.forEach((element, i) => {
      $('tbody').append(`
             <tr id=${element.id}>
                <th scope="row">${i + 1}</th>
                <td id="design_name">${element.designName}</td>
                <td id="design_desc">${element.designDescription}</td>
                <td id="design_price">${element.designPrice}</td>
                <td id="design_url">${element.designUrl}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-outline-light update-design-button" id=${element.id} data-toggle="modal" data-target="#update-form-modal">Update</button>
                        <button type="button" class="btn btn-outline-danger delete-design" id=${element.id}>Delete</button>
                    </div>
                </td>
            </tr>
             `)

    })
  }

  function populateTableHtml(designs) {
    designs.forEach((design, i) => {
      $('tbody').html(`
      <tr id=${design.id}>
         <th scope="row">${i + 1}</th>
         <td id="design_name">${design.designName}</td>
         <td id="design_desc">${design.designDescription}</td>
         <td id="design_price">${design.designPrice}</td>
         <td id="design_url">${design.designUrl}</td>
         <td>
             <div class="btn-group" role="group" aria-label="Basic example">
                 <button type="button" class="btn btn-outline-light update-design-button" id=${design.id} data-toggle="modal" data-target="#update-form-modal">Update</button>
                 <button type="button" class="btn btn-outline-danger delete-design" id=${design.id}>Delete</button>
             </div>
         </td>
     </tr>
      `)

    })
  }
  const designer = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
  const designerId = designer["id"];
  $.ajax({
    url: `http://localhost:3000/designs?designerId=${designerId}`,
    type: "GET",
    cache: true,
    success: function (data) {
      populateTableappend(data);


      //search function
      $('#search-button').click(function (e) {
        e.preventDefault();
        const desName = $("#search-box").val().trim();
        console.log(desName);

        $.ajax({
          type: "GET",
          url: `http://localhost:3000/designs?designerId=${designerId}&designName_like=${desName}`,
          dataType: "json",
          success: function (designs) {
            populateTableHtml(designs);

          },
          error: function (error) {
            alert('An error occured');
          }
        })
      });

      //When the field is empty
      $('#search-box').on('keyup', function (e) {
        if (e.target.value === '') {
          const designer = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
          const designerId = designer["id"];
          $.ajax({
            url: `http://localhost:3000/designs?designerId=${designerId}`,
            success: function (data) {
              $('tbody').html('');
              location.reload();
              populateTableappend(data);
            }
          })
        }
      });



      // Delete button function
      $('button.delete-design').on('click', function (e) {
        $.ajax({
          url: `http://localhost:3000/designs/${e.target.id}`,
          type: "delete",
          success: function () {
            alert("deleted");
          }
        })
      })

      //Update button function
      $('button.update-design-button').on('click', function (e) {
        const id = e.target.id;
        const designer = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
        const designerId = designer["id"];

        $('#update-design-name').val($('#' + id).children('td[id=design_name]').text())
        $('#update-design-price').val($('#' + id).children('td[id=design_price]').text())
        $('#update-design-desc').val($('#' + id).children('td[id=design_desc]').text())
        $('#update-design-url').val($('#' + id).children('td[id=design_url]').text())


        $('#update-changes').on('click', function () {
          const designupdate_objs = {
            designName: $('#update-design-name').val(),
            designPrice: $('#update-design-price').val(),
            designDescription: $('#update-design-desc').val(),
            designUrl: $('#update-design-url').val(),
            designerId
          }

          $.ajax({
            url: `http://localhost:3000/designs/${e.target.id}`,
            type: "put",
            data: designupdate_objs,
            success: function () {
              alert("Successful changes")
            }
          })
        })

      })
    }
  });
});