 
$(document).ready(function() {

    // put form data into a new Todo object
    
    // select the element to insert items into
    var $listDiv = $('#listDiv');

    // get values from the input form
    // var itemDueDate = new Date($('#todoDueDate').val());
    // var month = itemDueDate.getMonth() + 1;
    // var day = itemDueDate.getDate() + 1;
    // var year = itemDueDate.getFullYear();
    // var $itemTitle = $('#todoTitle');
    // var $itemDescription = $('#todoDescription');
    // var $itemPriority = $('#todoPriority');
    
    // create the HTML for a new table row
    // var contentString = "";
    // contentString += "<tr>";
    // contentString += "<td>" + "<input type=\"checkbox\">" + "</td>";
    // contentString += "<td> <span class=\"label label-primary\">" + $itemPriority.val() + "</span> </td>";
    // contentString += "<td>" + $itemTitle.val() + "</td>";
    // //contentString += "<td>" + itemDueDate.toLocaleDateString("en-US") + "</td>";
    // contentString += "<td>" + month + "/" + day + "/" + year + "</td>";
    // contentString += "</tr>";

    var contentString = "";
    contentString += "<tr>";
    contentString += "<td>" + "<input type=\"checkbox\">" + "</td>";
    contentString += "<td> <span class=\"label label-primary\">" + "2" + "</span> </td>";
    contentString += "<td>" + "My item" + "</td>";
    //contentString += "<td>" + itemDueDate.toLocaleDateString("en-US") + "</td>";
    contentString += "<td>" + "2015/04/11" + "</td>";
    contentString += "</tr>";

    // insert the new to-do item into the list
    $listDiv.find('tbody').append(contentString);

    // clear Title and Description fields
    // $itemTitle.val('');
    // $itemDescription.val('');

  });

