function UpdatePassword() {
    var formId = "form";

    if ($('#NewPassword').val() != $('#ConfirmPassword').val()) {

        alert("Both password should be same");

        return false;
    }

    if (validate(formId)) {
        var User = {
            OldPassword: $('#CurrentPassword').val(),
            NewPassword: $('#NewPassword').val(),
            ConfirmPassword: $('#ConfirmPassword').val(),
        };
        ShowLoader();
       
        $.ajax({

            url: '../api/User/ChangePassword/',
            type: 'POST',
            data: JSON.stringify(User),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                toastr.success("Password Change Successfully", { timeOut: 5000 });

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
};

function ResetForm() {

    $('#CurrentPassword').val("");
    $('#NewPassword').val("");
    $('#ConfirmPassword').val("");
}



function checkPasswordStrength() {
    var number = /([0-9])/;
    var alphabets = /([a-zA-Z])/;
    var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;



    if ($('#NewPassword').val().length < 6) {
        $('#Password-strength-status').removeClass();
        $('#Password-strength-status').addClass('weak-password');
        $('#Password-strength-status').addClass('mt-2');
        $('#Password-strength-status').html("Weak (should be atleast 6 characters long)");
    }
    else {

        if ($('#NewPassword').val().match(number) && $('#NewPassword').val().match(alphabets) && $('#NewPassword').val().match(special_characters)) {
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



