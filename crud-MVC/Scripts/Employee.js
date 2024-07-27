$(document).ready(function () {
    loadData();
});

function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.EmployeeID + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Age + '</td>';
                html += '<td>' + item.State + '</td>';
                html += '<td>' + item.Country + '</td>';
                html += '<td>' + item.Gender + '</td>';
                html += '<td><img src="data:image/jpeg;base64,' + item.ImageBase64 + '" width="50" height="50"/></td>';

                html += '<td><a href="#" onclick="return getbyID(' + item.EmployeeID + ')">Edit</a> | <a href="#" onclick="Delele(' + item.EmployeeID + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }

    var fileInput = $('#Image').get(0).files[0];
    if (!fileInput) {
        alert('Please select an image file.');
        return;
    }

    var reader = new FileReader();

    reader.onload = function (e) {
        var empObj = {
            EmployeeID: $('#EmployeeID').val(),
            Name: $('#Name').val(),
            Age: $('#Age').val(),
            State: $('#State').val(),
            Country: $('#Country').val(),
            Gender: $("input[name='Gender']:checked").val(),
            Image: e.target.result.split(',')[1] 
        };

        $.ajax({
            url: "/Home/Add",
            data: JSON.stringify(empObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                loadData();
                $('#myModal').modal('hide');
                clearTextBox();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    };

    reader.readAsDataURL(fileInput); 
}
 

function getbyID(EmpID) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $('#Gender').css('border-color', 'lightgrey');
    $('#Image').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Home/getbyID/" + EmpID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#EmployeeID').val(result.EmployeeID);
            $('#Name').val(result.Name);
            $('#Age').val(result.Age);
            $('#State').val(result.State);
            $('#Country').val(result.Country);
            $("input[name='Gender'][value='" + result.Gender + "']").prop('checked', true);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
            $('#myModalLabel').text("Update Employee");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }

    var fileInput = $('#Image').get(0).files[0];
    if (!fileInput) {
        alert('Please select an image file.');
        return;
    }
    if (!(fileInput instanceof File)) {
        alert('The selected input is not a valid file.');
        return;
    }

    var reader = new FileReader();

    reader.onload = function (e) {
        var empObj = {
            EmployeeID: $('#EmployeeID').val(),
            Name: $('#Name').val(),
            Age: $('#Age').val(),
            State: $('#State').val(),
            Country: $('#Country').val(),
            Gender: $("input[name='Gender']:checked").val(),
            Image: e.target.result.split(',')[1]
        };

        $.ajax({
            url: "/Home/Update",
            data: JSON.stringify(empObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                loadData();
                $('#myModal').modal('hide');
                clearTextBox();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    };

    reader.readAsDataURL(fileInput);
}

function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function clearTextBox() {
    $('#EmployeeID').val("");
    $('#Name').val("");
    $('#Age').val("");
    $('#State').val("");
    $('#Country').val("");
    $("input[name='Gender']").prop('checked', false);
    $('#Image').val(""); 
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $('#myModalLabel').text("Add Employee");
}

function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'red');
        isValid = false;
    } else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Age').val().trim() == "") {
        $('#Age').css('border-color', 'red');
        isValid = false;
    } else {
        $('#Age').css('border-color', 'lightgrey');
    }
    if ($('#State').val().trim() == "") {
        $('#State').css('border-color', 'red');
        isValid = false;
    } else {
        $('#State').css('border-color', 'lightgrey');
    }
    if ($('#Country').val().trim() == "") {
        $('#Country').css('border-color', 'red');
        isValid = false;
    } else {
        $('#Country').css('border-color', 'lightgrey');
    }
    if (!$("input[name='Gender']:checked").val()) {
        alert("Please select a gender");
        isValid = false;
    }
    return isValid;
}
