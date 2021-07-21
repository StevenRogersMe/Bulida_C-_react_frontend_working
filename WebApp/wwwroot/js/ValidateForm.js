function validate(id) {
    var form = document.getElementById(id); 
    var inputs, divs, i;
    inputs = $("#form input:not([type=hidden])");
    for (i = 0; i < inputs.length; i++) {
        var required = inputs[i].required;
        var value = inputs[i].value;
        var inputId = inputs[i].id;
        var pattern = inputs[i].pattern;
        if (required == true && (value == "" || value == null)) {
            $("#" + inputId).addClass("is-invalid");
            var em = inputs[i].closest('div');
            var classes = $(em).attr('class');
            if (classes !== undefined)
            {
                if (classes.includes('defaultDropdown')) {
                    $('.k-invalid-msg').text('Required*');
                    $("span[data-for='" + inputId + "']").show();
                    return false;
                }
                else if (classes.includes('defaultAutoComplete')) {
                    $('.k-invalid-msg').text('Required*');
                    $("span[data-for='" + inputId + "']").show();
                    return false;
                }
                else {
                    $("#required-error").remove();
                    $(em).append('<div id="required-error" class="invalid-feedback">Required*</div>');
                    return false;
                }
            }
            else
            {
                $("#required-error").remove();
                $(em).append('<div id="required-error" class="invalid-feedback">Required*</div>');
                return false;
            }
        };

        if (pattern != null && pattern != "")
        {
            var re = RegExp(pattern);
            if (!re.test(value))
            {
                $("#" + inputId).addClass("is-invalid");
                var em = divs[i].getElementsByTagName("div");
                var classes = $(em).attr('class');
                $("#required-error").remove();
                $(em).append('<div id="required-error" class="invalid-feedback">Please enter the valid format</div>');
                return false;
            }
        }
    }
    return true;
}

function IsDateGreater(DateA, DateB) {
    var a = new Date(DateA);
    var b = new Date(DateB);

    var msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
    var msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());


    if (parseFloat(msDateA) > parseFloat(msDateB))
        return 1;
    else
        0;
};

$(document).ready(function () {
    
    $("input").focus(function () { 
        $("input").removeClass("is-invalid");
        $("#required-error").remove();
        $('#error').html('');
        $("#error").hide();
    });
    $(".defaultDropdown").change(function () {
        $(".k-invalid-msg").hide();
    });
    $(".defaultAutoComplete").select(function () {
        $(".k-invalid-msg").hide();
    });

});


