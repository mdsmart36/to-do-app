$(document).ready(function() {

  $('#selectAll').on('click', function() {
    $('input:checkbox').prop("checked", this.checked);
  });

  $('#removeButton').on('click', function() {

    // select every table row in which checkbox is checked
    var checkbox_id = $('input:checked').attr('id');

    // remove those parent table rows from the DOM
    $('input:checked').parent().parent().remove(); 

    //console.log(checkbox_id);

    // remove item from the database by making AJAX call
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
  });


  $('#addButton').on('click', function(e) {
    //e.preventDefault();
    window.location.href = '/';
    });

  });


