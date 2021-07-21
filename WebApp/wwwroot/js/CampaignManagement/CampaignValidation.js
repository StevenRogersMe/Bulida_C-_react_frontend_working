function validate() {
    var acceptTermAndCondition = $('#chkAccept').prop('checked');
    if (!acceptTermAndCondition) {
        toastr.error("Please Accept Terms & Conditions", { timeOut: 5000 });
        return false;
    }

    if ($("#CampaignName").val() == "" || $("#CampaignName").val() == undefined) {
        toastr.error("Please Write Campaign Name", { timeOut: 5000 });
        return false;
    }
    if ($("#CampaignBudget").val() == "" || $("#CampaignBudget").val() == undefined) {
        toastr.error("Please Write Campaign Budget", { timeOut: 5000 });
        return false;
    }

  
    return validateTab1();

}

function validateTab1() {
    var Exact = $('#chkExact').prop('checked');
    var Phrase = $('#chkPhrase').prop('checked');
    var Modifier = $('#chkModifier').prop('checked');
    var Broad = $('#chkBroad').prop('checked');

    if (!Exact && !Phrase && !Modifier && !Broad) {
        toastr.error("You need to add at least one Match Type", { timeOut: 5000 });
        return false;
    }

    var isSKAG = $('#chkAccept').prop('checked');

    if (isSKAG && AdGroupList.length == 0) {
        toastr.error("You need to add at least one keyword", { timeOut: 5000 });
        return false;
    }

    var isSTAG = $('#stag_switch').prop('checked');
    if (isSTAG) {
        if (AdGroupList.length > 0) {
            for (let i = 0; i < AdGroupList.length; i++) {
                if (AdGroupList[i].Keywords.length == 0) {
                    toastr.error("You need to add at least one keyword against Ad Group " + AdGroupList[i].AdGroup, { timeOut: 5000 });
                    return false;
                }
            }
        }
        else {
            toastr.error("You need to add at least one keyword", { timeOut: 5000 });
            return false;
        }
    }

    return true;
}

function validateExt() {
    if ($("#exptexth1").val() == "" || $("#exptexth1").val() == undefined) {
        toastr.error("Please Write Heading 1", { timeOut: 5000 });
        return false;
    }

    if ($("#exptextd1").val() == "" || $("#exptextd1").val() == undefined) {
        toastr.error("Please Write Description 1", { timeOut: 5000 });
        return false;
    }

    if ($("#exptextfurl").val() == "" || $("#exptextfurl").val() == undefined) {
        toastr.error("Please Write Final Url", { timeOut: 5000 });
        return false;
    }

    return true;
}

function validateCallOnly() {

    if ($("#callonlyPhone").val() == "" || $("#callonlyPhone").val() == undefined) {
        toastr.error("Please Write Phone Number", { timeOut: 5000 });
        return false;
    }

    return true;
}

function validateRespSearch() {
    if ($("#resph1").val() == "" || $("#resph1").val() == undefined) {
        toastr.error("Please Write Heading 1", { timeOut: 5000 });
        return false;
    }

    if ($("#respd1").val() == "" || $("#respd1").val() == undefined) {
        toastr.error("Please Write Description 1", { timeOut: 5000 });
        return false;
    }

    if ($("#respfurl").val() == "" || $("#respfurl").val() == undefined) {
        toastr.error("Please Write Final Url", { timeOut: 5000 });
        return false;
    }

    return true;
}

function RemoveDuplicates(values) {
   
    var uniqueValues = [];
    $.each(values, function (i, el) {
        if ($.inArray(el, uniqueValues) === -1) uniqueValues.push(el);
    });

    uniqueValues = uniqueValues.filter(item => item);
    return uniqueValues;
}

function AdGroup_CapitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function AdGroup_LowerCase(string) {
    return string.toLowerCase();
}

function AdGroup_TitleCase(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
            separateWord[i].substring(1);
    }
    return separateWord.join(' ');
}


function KeyWordToExt(EdsExt, AdgroupString) {
 
    if (EdsExt.type === "ext") {

        var innerObj = {
            HeadlineOne: EdsExt.obj.HeadlineOne.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            HeadlineTwo: EdsExt.obj.HeadlineTwo.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            HeadlineThree: EdsExt.obj.HeadlineThree.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            DescriptionOne: EdsExt.obj.DescriptionOne.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            DescriptionTwo: EdsExt.obj.DescriptionTwo.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            FinalURL: EdsExt.obj.FinalURL.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            PathOne: EdsExt.obj.PathOne.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            PathTwo: EdsExt.obj.PathTwo.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),
        }

    }
    else if (EdsExt.type === "callOnly") {

        var innerObj = {
            Country: EdsExt.obj.Country,
            PhoneNumber: EdsExt.obj.PhoneNumber,

            HeadlineOne: EdsExt.obj.HeadlineOne.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            HeadlineTwo: EdsExt.obj.HeadlineTwo.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            DescriptionOne: EdsExt.obj.DescriptionOne.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            DescriptionTwo: EdsExt.obj.DescriptionTwo.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            FinalUrl: EdsExt.obj.FinalUrl.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            BusinessName: EdsExt.obj.BusinessName.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            VerificationURL: EdsExt.obj.VerificationURL.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),
        }

    }
    else if (EdsExt.type === "resp") {

        var innerObj = {
            DescriptionOne: EdsExt.obj.DescriptionOne.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            DescriptionTwo: EdsExt.obj.DescriptionTwo.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            DescriptionThree: EdsExt.obj.DescriptionThree.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            DescriptionFour: EdsExt.obj.DescriptionFour.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            PathOne: EdsExt.obj.PathOne.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),

            PathTwo: EdsExt.obj.PathTwo.replace("_keyword_", AdGroup_LowerCase(AdgroupString)).replace("_Keyword_", AdGroup_CapitalizeFirstLetter(AdgroupString)).replace("_KeyWord_", AdGroup_TitleCase(AdgroupString)).replace("_KEYWORD_", AdgroupString),
        }

    }
    else {
        var innerObj = "";
    }

    innerObj.Edited = EdsExt.obj.Edited;

    var NewEdsExt = {
        Id: EdsExt.Id,
        type: EdsExt.type,
        obj: innerObj,
    }
    return NewEdsExt;
}