$(document).ready(function() {

  $('#selectAll').on('click', function() {
    $('input:checkbox').prop("checked", this.checked);
  });

  $('#removeButton').on('click', function() {
    //e.preventDefault();
    // select every table row in which checkbox is checked
    // remove those parent table rows from the DOM
    var checkbox_id = $('input:checked').attr('id');

    // remove item from the database by making AJAX call
    
    $('input:checked').parent().parent().remove();

    console.log(checkbox_id);

    $.ajax({
      url: '/todo',
      method: 'DELETE',
      data: {
        todo_id: checkbox_id
      },
      success: function(response) {
        console.log("returned from ajax DELETE");
      }
    });

  });


  $('#editButton').on('click', function() {
    var checkbox_id = $('input:checked').attr('id');

    window.location.href = '/todo/' + checkbox_id;

    // $.ajax({
    //   url: '/todo/' + checkbox_id,
    //   method: 'GET',
    //   success: function(response) {

    //     console.log("returned from ajax Edit Button");
    //   }
    // });    
  });


  $('#addButton').on('click', function(e) {
    e.preventDefault();
    // go to index page
    // $.get("/index.ejs", function(data) {
    //   window.location = data.redirect;
    });

  });


