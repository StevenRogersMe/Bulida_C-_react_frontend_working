function IntializeForm() {
    $('#Cnic').keydown(function () {

        //allow  backspace, tab, ctrl+A, escape, carriage return
        if (event.keyCode == 8 || event.keyCode == 9
            || event.keyCode == 27 || event.keyCode == 13
            || (event.keyCode == 65 && event.ctrlKey === true))
            return;
        if ((event.keyCode < 48 || event.keyCode > 57))
            event.preventDefault();

        var length = $(this).val().length;

        if (length == 5 || length == 13)
            $(this).val($(this).val() + '-');

    });
}


function CheckDetail() {
  
    var FullName = $("#UserFullName").val();
    var UserName = $("#username").val();
    var PhoneNo = $("#phoneno").val();
    var Email = $("#email").val();
    var Password = $("#password").val();

    if (FullName == "") {
        toastr.warning("Please Enter Full-Name", { timeOut: 5000 });
        return false;
    }
    if (UserName == "") {
        toastr.warning("Please Enter User-Name", { timeOut: 5000 });
        return false;
    }
   if (PhoneNo == "") {
        toastr.warning("Please Enter Phone-No", { timeOut: 5000 });
        return false;
    }
    if (Email == "") {
        toastr.warning("Please Enter Email", { timeOut: 5000 });
        return false;
    }
    if (Password == "") {
        toastr.warning("Please Enter Password", { timeOut: 5000 });
        return false;
    }
    else {
        $("#Detail").removeClass("d-none");
        $("#BasicDetail").addClass("d-none");
    }
    
}
function CheckBasicDetail() {
    $("#BasicDetail").removeClass("d-none");
    $("#Detail").addClass("d-none");
}

function Add() {
    var formId = "form";
    var OutletName = $("#OutletName").val();
    var OwnerName = $("#OwnerName").val();
    var Cnic = $("#Cnic").val();
    var Address = $("#Address").val();
    if (OutletName == "") {
        toastr.warning("Please Enter Outlet-Name", { timeOut: 5000 });
        return false;
    }
    if (OwnerName=="") {
        toastr.warning("Please Enter Owner-Name", { timeOut: 5000 });
        return false;
    }
    if (Address == "") {
        toastr.warning("Please Enter Address", { timeOut: 5000 });
        return false;
    }
    if (Cnic == "") {
        toastr.warning("Please Enter Cnic-No", { timeOut: 5000 });
        return false;
    }
    else {
        if (validate(formId)) {
            var UserRetail = {

                FullName: $("#UserFullName").val(),
                UserName: $("#username").val(),
                Address: $("#Address").val(),
                PhoneNo: $("#phoneno").val(),
                Email: $("#email").val(),
                Password: $("#password").val(),
                OutletName: $("#OutletName").val(),
                OwnerName: $("#OwnerName").val(),
                Cnic: $("#Cnic").val(),
            }

            $.ajax({
                url: '../api/UserRetail/Post/',
                type: 'POST',
                data: JSON.stringify(UserRetail),
                contentType: "application/json;charset=utf-8",
                success: function (data) {                
                    RedirectToUrl("../Account/Login");
                    toastr.success("Registered Sucessfully", { timeOut: 5000 });
                    ResetForm();
                },
                error: function (data) {
                    var response = data.responseText.replace(/"/g, '');
                    toastr.warning(response, { timeOut: 5000 });
                   
                }
            });
        }
    }
}
function ResetForm() {
    $("#UserFullName").val('');
    $("#username").val('');
    $("#Address").val('');
    $("#phoneno").val('');
    $("#email").val('');
    $("#password").val('');
    $("#OutletName").val('');
    $("#OwnerName").val('');
    $("#Cnic").val('');
}