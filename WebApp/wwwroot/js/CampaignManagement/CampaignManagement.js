

var AdGroupList = [];
var Id = 0;

function insertEditedAd(editedAd) {
    var ads = JSON.parse(localStorage.getItem("editedAd"));
    if (ads === null) {
        ads = [];
        ads.push(editedAd);
    }
    else {
        ads.push(editedAd);
    }

    localStorage.setItem("editedAd", JSON.stringify(ads));
}

function getUpdateAd() {
    var ads = JSON.parse(localStorage.getItem("editedAd"));
    if (ads === null) {
        ads = [];
        return ads;
    }
    else {
        return ads;
    }
}
function initializeForm() {

    TabsWizard();
    initializeFormValues();

    $(".STAGSDiv").hide();
    localStorage.clear();
    $(document).on('change', '.rdbtn', function () {

        if ($(this).is(":checked") && $(this).attr("id") == "skag_switch") {

            $(".STAGSDiv").hide();
            $("#stag_switch").prop('checked', false);
        }

        if ($(this).is(":checked") && $(this).attr("id") == "stag_switch") {

            $(".STAGSDiv").show();
            $("#skag_switch").prop('checked', false);
        }

        if (!($('#skag_switch').prop('checked')) && !($('#stag_switch').prop('checked'))) {
            $(".STAGSDiv").hide();
            $("#skag_switch").prop('checked', true);
        }

    });

    dataTable.initialize();
}
function TabsWizard() {

    $("#smartwizard").on("showStep", function (e, anchorObject, stepNumber, stepDirection, stepPosition) {
       
        //alert("You are on step "+stepNumber+" now");
        if (stepPosition === 'first') {
            $("#prev-btn").addClass('disabled');
        } else if (stepPosition === 'final') {
            $("#next-btn").addClass('disabled');
        } else {
            $("#prev-btn").removeClass('disabled');
            $("#next-btn").removeClass('disabled');
        }
        if (stepNumber == 2)
        {
            loadReviewTable();
        }
    }); // Toolbar extra buttons


    var btnCancel = $('<button></button>').text('Reset').addClass('btn btn-danger').on('click', function () {
        $('#smartwizard').smartWizard("reset");
    }); // Smart Wizard

    $('#smartwizard').smartWizard({
        selected: 0,
        theme: 'default',
        transitionEffect: 'fade',
        showStepURLhash: true,
        toolbarSettings: {
            toolbarPosition: 'bottom',
            toolbarButtonPosition: 'end',
            toolbarExtraButtons: [btnCancel]
        },
        anchorSettings: {
            anchorClickable: true, // Enable/Disable anchor navigation
            enableAllAnchors: true, // Activates all anchors clickable all times
            //  markDoneStep: true, // Add done state on navigation
            //  markAllPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
            //  removeDoneStepOnNavigateBack: false, // While navigate back done step after active step will be cleared
            //  enableAnchorOnDoneStep: true // Enable/Disable the done steps navigation
        },
    }); // External Button Events


    $("#reset-btn").on("click", function () {
        // Reset wizard
        $('#smartwizard').smartWizard("reset");
        return true;
    });
    $("#prev-btn").on("click", function () {
        // Navigate previous
        $('#smartwizard').smartWizard("prev");  
        return true;
    });
    $("#next-btn").on("click", function () {
        // Navigate next
        $('#smartwizard').smartWizard("next");
        return true;
    });
    $("#theme_selector").on("change", function () {
        // Change theme
        $('#smartwizard').smartWizard("theme", $(this).val());
        return true;
    }); // Set selected theme on page refresh

}

function initializeFormValues() {
    $("#skag_switch").prop('checked', true);
    $("#chkExact").prop('checked', true);
    $("#chkPhrase").prop('checked', true);
    $("#chkModifier").prop('checked', true);
    $("#chkNegative").prop('checked', true);
}









function PostData(dataType) {


    var isValid = validate();

    if (isValid) {


        var campaign = {
            Name: $("#CampaignName").val(),
            Budget: parseInt($("#CampaignBudget").val()),
            Exact: $('#chkExact').prop('checked'),
            Phrase: $('#chkPhrase').prop('checked'),
            Modifier: $('#chkModifier').prop('checked'),
            Broad: $('#chkBroad').prop('checked'),
            NegativePhrase: $('#chkNegative').prop('checked'),
            Skag: $('#skag_switch').prop('checked'),
            Stag: $('#stag_switch').prop('checked'),
        };
        campaign.CallOutExt = [];
        campaign.SnippetExt = [];
        campaign.SearchExt = [];
        campaign.CallOnlyExt = [];
        campaign.ExpTextAdExt = [];
        for (var index = 0; index < AdGroupList.length; index++) {
            var ads = AdGroupList[index].EdsExts;
            for (let j = 0; j < ads.length; j++) {
                var type = AdGroupList[index].EdsExts[j].type;
                if (type == "callout") {
                    if (!campaign.CallOutExt.includes(AdGroupList[index].EdsExts[j].obj)) {
                        AdGroupList[index].EdsExts[j].obj.AdGroupName = AdGroupList[index].AdGroup;
                        campaign.CallOutExt.push(AdGroupList[index].EdsExts[j].obj);
                    }
                }
                if (type == "snippet") {
                    if (!campaign.SnippetExt.includes(AdGroupList[index].EdsExts[j].obj)) {
                        AdGroupList[index].EdsExts[j].obj.AdGroupName = AdGroupList[index].AdGroup;

                        campaign.SnippetExt.push(AdGroupList[index].EdsExts[j].obj);
                    }
                }
                if (type == "resp") {
                    if (!campaign.SearchExt.includes(AdGroupList[index].EdsExts[j].obj)) {
                        AdGroupList[index].EdsExts[j].obj.AdGroupName = AdGroupList[index].AdGroup;
                        campaign.SearchExt.push(AdGroupList[index].EdsExts[j].obj);
                    }
                }
                if (type == "callOnly") {
                    if (!campaign.CallOnlyExt.includes(AdGroupList[index].EdsExts[j].obj)) {
                        AdGroupList[index].EdsExts[j].obj.AdGroupName = AdGroupList[index].AdGroup;
                        campaign.CallOnlyExt.push(AdGroupList[index].EdsExts[j].obj);
                    }
                }
                if (type == "ext") {
                    if (!campaign.ExpTextAdExt.includes(AdGroupList[index].EdsExts[j].obj)) {
                        AdGroupList[index].EdsExts[j].obj.AdGroupName = AdGroupList[index].AdGroup;
                        campaign.ExpTextAdExt.push(AdGroupList[index].EdsExts[j].obj);
                    }
                }
            }
        }
        campaign.AdGroupList = AdGroupList;

        if (dataType === 'csv') {
            $.ajax({
                url: '../api/CampaignBuilder/csv',
                type: 'POST',
                data: JSON.stringify(campaign),
                contentType: "application/json;charset=utf-8",
                success: function (response, status, xhr) {

                    var filename = "";
                    var disposition = xhr.getResponseHeader('Content-Disposition');
                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        var matches = filenameRegex.exec(disposition);
                        if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                    }

                    var type = xhr.getResponseHeader('Content-Type');
                    var blob = new Blob([response], { type: type });

                    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                        window.navigator.msSaveBlob(blob, filename);
                    } else {
                        var URL = window.URL || window.webkitURL;
                        var downloadUrl = URL.createObjectURL(blob);

                        if (filename) {
                            // use HTML5 a[download] attribute to specify filename
                            var a = document.createElement("a");
                            // safari doesn't support this yet
                            if (typeof a.download === 'undefined') {
                                window.location = downloadUrl;
                            } else {
                                a.href = downloadUrl;
                                a.download = filename;
                                document.body.appendChild(a);
                                a.click();
                            }
                        } else {
                            window.location = downloadUrl;
                        }

                        setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100);
                    }

                },
                error: function (data) {
                    var response = data.responseText.replace(/"/g, '');
                    toastr.warning(response, { timeOut: 5000 });
                    HideLoader();
                }
            });
        }

        if (dataType === 'google') {
            $.ajax({
                url: '../api/CampaignBuilder/google',
                type: 'POST',
                data: JSON.stringify(campaign),
                contentType: "application/json;charset=utf-8",
                success: function (response, status, xhr) {
                    window.location = '../googleAds/';
                },
                error: function (data) {
                    var response = data.responseText.replace(/"/g, '');
                    toastr.warning(response, { timeOut: 5000 });
                    HideLoader();
                }
            });
        }

    }

  

}

function GetExcel(id)
{

    var url = "../api/CampaignBuilder/GetExcel?id=" + id;
    window.open(url);
}

function PostCampaignToGoogle() {
    var inputBox = document.getElementById("customerid");
    if (!inputBox.checkValidity()) {
        return;
    }
    var customerId = $(inputBox).val();
    $.ajax({
        type: "GET",
        url: '/GoogleAds/' + customerId + '/campaign',
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function (data) {
        var html = [];
    });
    return false;
}

