
var userId = 0;
var distributorCheckArray = [];

function initializeForm() {

    LoadKendoDropDown('LocationTypeId', '-- Please Select Access Level --', '../api/Location/GetAllLocationTypes');
    LoadKendoDropDown('LocationId', '-- Please Select Access --', '');
    LoadKendoDropDown('Role', '-- Please Select Role --', '../api/Roles/Get?roleorPrivilege=role');

    //For Signle Check 
    $(document).on('change', '.distributor', function () {
        if ($(this).is(":checked")) {
            if (distributorCheckArray.length + 1 > 1) {
                var inputField = distributorCheckArray[distributorCheckArray.length - 1];
                $("#" + inputField).prop('checked', false);
                if (inputField === "distributor_switch")
                    $('#distributorInfoDiv').addClass('d-none');
                else
                    $('#orderbookerInfoDiv').addClass('d-none');
                distributorCheckArray.pop();
                distributorCheckArray.push($(this).attr("id"));
            }
            else {
                distributorCheckArray.push($(this).attr("id"));
            }
        }
        else {
            distributorCheckArray.splice(distributorCheckArray.indexOf($(this).attr("id")), 1);
        }
    });

    $(document).on('change', '#distributor_switch', function () {
        if ($(this).is(":checked")) {
            $('#distributorInfoDiv').removeClass('d-none');
        }
        else {
            $('#distributorInfoDiv').addClass('d-none');
        }
    });
    $(document).on('change', '#credit_switch', function () {
        if ($(this).is(":checked")) {
            $('#creditDiv').removeClass('d-none');
        }
        else {
            $('#creditDiv').addClass('d-none');
        }
    });
    $(document).on('change', '#orderbooker_switch', function () {
        if ($(this).is(":checked")) {
            $('#orderbookerInfoDiv').removeClass('d-none');
        }
        else {
            $('#orderbookerInfoDiv').addClass('d-none');
        }
    });

    $('#CNIC').keydown(function () {

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
    $('#ContactNumber').keydown(function () {

        //allow  backspace, tab, ctrl+A, escape, carriage return
        if (event.keyCode == 8 || event.keyCode == 9
            || event.keyCode == 27 || event.keyCode == 13
            || (event.keyCode == 65 && event.ctrlKey === true))
            return;
        if ((event.keyCode < 48 || event.keyCode > 57))
            event.preventDefault();
    });
    $("#CompanyImage").change(function () {
        debugger;
        readURL(this);
    });
}


//Image file Upload 
function readURL(input) {
    debugger;
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#userImg')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function LoadLocations() {
    debugger;
    var LocationTypeId = $('#LocationTypeId').val();
    if (LocationTypeId !== "") {
        LoadKendoDropDown('LocationId', '-- Please Select Access --', '../api/Location/GetAllLocationsByLocationType?Id=' + LocationTypeId);
    }
    else {
        LoadKendoDropDown('LocationId', '-- Please Select Access --', '');
    }

    var locationType = $("#LocationTypeId").data("kendoDropDownList").text();
    if (locationType === "Distributor")
        $('#distributorDiv').removeClass('d-none');
    else
        $('#distributorDiv').addClass('d-none');
}

function Add() {
    var formId = "form";
    if (validateDistributor() & validate(formId)) {

        var formData = new FormData();
        debugger;
        var file = document.getElementById("CompanyImage");
        formData.append("CompanyImage", file.files[0]);

        var password = $('#Password').val();
        var cnfrmPassword = $('#ConfirmPassword').val();
        if (password !== cnfrmPassword) {
            toastr.warning("Password and Confirm Should be Same", { timeOut: 5000 });
            return false;
        }
        var User = {
            FirstName: $('#FirstName').val(),
            LastName: $('#LastName').val(),
            CNIC: $('#CNIC').val(),
            ContactNumber: $('#ContactNumber').val(),
            Email: $('#Email').val(),
            Designation: $('#Designation').val(),
            LocationTypeId: $('#LocationTypeId').val(),
            LocationId: $('#LocationId').val(),
            IsDistributor: $('#distributor_switch').prop('checked'),
            IsOrderbooker: $('#orderbooker_switch').prop('checked'),
            Margin: $('#Margin').val(),
            IsCredited: $('#credit_switch').prop('checked'),
            CreditDays: $('#creditDays').val(),
            CreditAmount: $('#creditAmount').val(),
            Discount: $('#Discount').val(),
            UserName: $('#UserName').val(),
            Role: $('#Role').val(),
            Password: $('#Password').val(),
            ConfirmPassword: $('#ConfirmPassword').val(),
            MacAddress: $('#MacAddress').val(),
            IsMobileUser: $('#IsMobileUser').prop("checked")
        };
        var serializeobject = JSON.stringify(User);
        ShowLoader();

        $.ajax({
            type: 'POST',
            url: '../api/User/Post?user=' + serializeobject,
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (data) {
                toastr.success("User Added Successfully", { timeOut: 5000 });
                ResetForm();
                HideLoader();
            },
            error: function (data) {
                var response = data.responseText.replace(/"/g, '');
                toastr.error(response, { timeOut: 5000 });
                HideLoader();
            }
        });
    }
}

function validateDistributor() {
    if ($('#distributor_switch').is(':checked')) {

        if (parseFloat($('#Margin').val()) > 100) {
            toastr.warning("Margin can not greater than 100%", { timeOut: 5000 });
            return false;
        }

        $('#Discount').val(0);

        return true;
    }
    else if ($('#orderbooker_switch').is(':checked')) {

        $('#Margin').val(0);
        $('#creditAmount').val(0);
        $('#creditDays').val(0);

        return true;
    }
    else {

        $('#Margin').val(0);
        $('#creditAmount').val(0);
        $('#creditDays').val(0);
        $('#Discount').val(0);

        return true;
    }
}

function ResetForm() {
    $('#FirstName').val('');
    $('#LastName').val('');
    $('#CNIC').val('');
    $('#ContactNumber').val('');
    $('#Email').val('');
    $('#Designation').val('');
    UnselectKendoDropDown("LocationTypeId");
    UnselectKendoDropDown("LocationId");
    $('#UserName').val('');
    UnselectKendoDropDown("Role");
    $('#Password').val('');
    $('#ConfirmPassword').val('');
    $('#MacAddress').val('');
    $('#IsMobileUser').prop("checked", false);
    $('#Margin').val(0);
    $('#creditAmount').val(0);
    $('#creditDays').val(0);
    $('#Discount').val(0);
    $('#userImg').attr("src", "../../Content/dist-assets/images/placeholder.jpg");
    $('#CompanyImage').val();
    $('#UserImage').val('');
    $('#Password-strength-status').html("");
    $('#Password-strength-status').text("");
}

$(document).on('click', '.jstree-node', function (e) {

    e.stopImmediatePropagation();
    let locationId = $(this).attr('id');

    initializeDataTable(locationId);
});

function initializeDataTable(locationId) {

    var dtCommonParam = {
        updateUrl: '../UserManagement/Update?id=',
        resetPasswordUrl: '../UserManagement/ResetPassword?username=',
        getDataUrl: '../api/User/GetAll?LocationId=' + locationId,
        activateUrl: "../api/User/Activate?id=",
        deActivateUrl: "../api/User/Deactivate?id=",
        tableId: 'UserTable'
    };
    $('#UserTable').DataTable({
        processing: true,
        serverSide: true,
        destroy: true,
        oLanguage: { sProcessing: "<div class='loader-bubble loader-bubble-primary mb-3'></div>" },
        ajax:
        {
            url: dtCommonParam.getDataUrl,
            type: "POST",
            dataSrc: "data"
        },
        "columns": [

            { "data": "Username" },
            { "data": "FirstName" },
            { "data": "LastName" },
            { "data": "Role" },
            { "data": "ValidFlag", "title": "Status", className: "text-center" },
            { "data": "Id", "title": "Action", className: "text-center" },
        ],
        "columnDefs": [
            {
                "render": function (data, type, row) {
                    return GetgridValidFlagDescription(row.ValidFlag);

                },
                "targets": -2
            },
            {
                "render": function (data, type, row) {
                    return GetAction(row.ValidFlag, row.Id, row.Username, dtCommonParam);
                },
                "targets": -1
            },
            {
                "render": function (data, type, row) {
                    return GetgridBoldCell(data);
                },
                "targets": [0, 3]
            },
            {
                orderable: false,
                targets: "no-sort",
            }
        ],
        "pagingType": "full_numbers",
        "order": [[0, "dsc"]]
    });
}

function populateData(id) {
    userId = id;
    ShowLoader();
    $.ajax({
        url: "../api/User/GetById?id=" + id,
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            LoadKendoDropDown('LocationTypeId', '-- Please Select Access Level --', '../api/Location/GetAllLocationTypes');
            LoadKendoDropDown('Role', '-- Please Select Role --', '../api/Roles/Get?roleorPrivilege=role');
            LoadKendoDropDown('LocationId', '-- Please Select Access --', '../api/Location/GetAllLocationsByLocationType?Id=' + data.LocationTypeId);
            $('#FirstName').val(data.FirstName);
            $('#LastName').val(data.LastName);
            $('#CNIC').val(data.CNIC);
            $('#ContactNumber').val(data.ContactNumber);
            $('#Email').val(data.Email);
            $('#Designation').val(data.Designation);
            $('#LocationTypeId').val(data.LocationTypeId);
            $('#LocationId').val(data.LocationId);
            $('#UserName').val(data.Username);
            $('#Role').val(data.Role);
            $('#MacAddress').val(data.MacAddress);

            if (data.Image == null)
                $('#userImg').attr("src", "../../Content/dist-assets/images/placeholder.jpg");
            else
                $('#userImg').attr("src", "../../ImagesStorageDB/" + data.Image);


            $('#IsMobileUser').prop("checked", data.IsMobileUser);

            if (data.LocationType === "Distributor")
                $('#distributorDiv').removeClass('d-none');

            $('#distributor_switch').prop('checked', data.IsDistributor);
            if (data.IsDistributor === true)
                $('#distributorInfoDiv').removeClass('d-none');

            $('#Margin').val(data.Margin);

            $('#credit_switch').prop('checked', data.IsCredited);
            if (data.IsCredited === true)
                $('#creditDiv').removeClass('d-none');

            $('#creditDays').val(data.CreditDays);
            $('#creditAmount').val(data.CreditAmount);

            $('#orderbooker_switch').prop('checked', data.IsOrderbooker);
            if (data.IsOrderbooker === true)
                $('#orderbookerInfoDiv').removeClass('d-none');

            $('#Discount').val(data.Discount);

            HideLoader();
        }
    });
}

function Update() {
    var formId = "form";
    var formData = new FormData();
    debugger;
    var file = document.getElementById("CompanyImage");
    formData.append("CompanyImage", file.files[0]);

    if (validate(formId)) {
        var User = {
            FirstName: $('#FirstName').val(),
            LastName: $('#LastName').val(),
            CNIC: $('#CNIC').val(),
            ContactNumber: $('#ContactNumber').val(),
            Email: $('#Email').val(),
            Designation: $('#Designation').val(),
            LocationTypeId: $('#LocationTypeId').val(),
            LocationId: $('#LocationId').val(),
            IsDistributor: $('#distributor_switch').prop('checked'),
            IsOrderbooker: $('#orderbooker_switch').prop('checked'),
            Margin: $('#Margin').val(),
            IsCredited: $('#credit_switch').prop('checked'),
            CreditDays: $('#creditDays').val(),
            CreditAmount: $('#creditAmount').val(),
            Discount: $('#Discount').val(),
            UserName: $('#UserName').val(),
            Role: $('#Role').val(),
            MacAddress: $('#MacAddress').val(),
            IsMobileUser: $('#IsMobileUser').prop("checked"),
            Id: userId
        };
        var serializeobject = JSON.stringify(User);
        ShowLoader();
        $.ajax({
            type: 'POST',
            url: '../api/User/Put?user=' + serializeobject,
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (data) {
                toastr.success("User Updated Successfully", { timeOut: 5000 });
                ResetForm();
                RedirectToUrl('../UserManagement/Manage')
                HideLoader();
            },
            error: function (data) {
                var response = data.responseText.replace(/"/g, '');
                toastr.error(response, { timeOut: 5000 });
                HideLoader();
            }
        });
    }
}

function Reset() {
    var formId = "form";
    if (validate(formId)) {
        var password = $('#Password').val();
        var cnfrmPassword = $('#ConfirmPassword').val();
        if (password !== cnfrmPassword) {
            toastr.warning("Password and Confirm Should be Same", { timeOut: 5000 });
            return false;
        }
        var User = {
            Username: $('#Username').val(),
            Password: $('#Password').val(),
            ConfirmPassword: $('#ConfirmPassword').val(),
        };
        ShowLoader();
        $.ajax({
            url: '../api/User/ResetPassword/',
            type: 'POST',
            data: JSON.stringify(User),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                toastr.success("Password Reset Successfully", { timeOut: 5000 });
                ResetForm();
                RedirectToUrl('../UserManagement/Manage')
                HideLoader();
            },
            error: function (data) {
                var response = data.responseText.replace(/"/g, '');
                toastr.error(response, { timeOut: 5000 });
                HideLoader();
            }
        });
    }
}


function checkPasswordStrength() {
    var number = /([0-9])/;
    var alphabets = /([a-zA-Z])/;
    var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;



    if ($('#Password').val().length < 6) {
        $('#Password-strength-status').removeClass();
        $('#Password-strength-status').addClass('weak-password');
        $('#Password-strength-status').addClass('mt-2');
        $('#Password-strength-status').html("Weak (should be atleast 6 characters long)");
    }
    else {

        if ($('#Password').val().match(number) && $('#Password').val().match(alphabets) && $('#Password').val().match(special_characters)) {
            $('#Password-strength-status').removeClass();
            $('#Password-strength-status').addClass('strong-password');
            $('#Password-strength-status').addClass('mt-2');
            $('#Password-strength-status').html("Strong");
        }
        else {
            $('#Password-strength-status').removeClass();
            $('#Password-strength-status').addClass('medium-password');
            $('#Password-strength-status').addClass('mt-2');
            $('#Password-strength-status').html("Medium (should include Upper Case, Lower Case alphabets, numbers and special characters.)");
        }
    }
}

function ValidateEmail() {
    var email = document.getElementById("Email").value;
    var emailError = document.getElementById("emailError");
    emailError.innerHTML = "";
    var expr = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!expr.test(email)) {
        emailError.innerHTML = "Invalid email address.";
    }

    if (email == "") {
        emailError.innerHTML = "";
    }

}



