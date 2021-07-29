
$(document).on('click', '.header', function () {
    $header = $(this);
    //getting the next element
    $content = $header.next();
    //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
    $content.slideToggle(500, function () {
        //execute this after slideToggle is done
        //change text of header based on visibility of content div
        $header.text(function () {
            //change text based on condition
            return $content.is(":visible") ? "Collapse" : "Expand";
        });
    });
});


$(document).ready(function () {
    $('#adGroupDropDown').multiselect({
        onChange: function (element, checked) {
            
            if (checked == true) {
             
                if (!selectedAdGroup.includes(element.val()))
                selectedAdGroup.push(element.val());
            }
            else if (checked == false) {
                if (confirm('Do you wish to deselect the element?')) {
                    selectedAdGroup.splice(selectedAdGroup.findIndex(v => v === element.val()), 1);
                }
                else {
                    $("#adGroupDropDown").multiselect('select', element.val());
                    return false;
                }
            }
            var sortedList = [];
                
            for (let i = 0; i < AdGroupList.length; i++) {
                for (let j = 0; j < selectedAdGroup.length; j++) {
                    if (AdGroupList[i].AdGroup == selectedAdGroup[j])
                        sortedList.push(AdGroupList[i]);
                }
            }
            reloadREviewTable(sortedList);
        }
    });

    $('#adTypeDropDown').multiselect({
        onChange: function (element, checked) {

            if (checked == true) {

                if (!selectedAdGroupType.includes(element.val()))
                    selectedAdGroupType.push(element.val());
            }
            else if (checked == false) {
                if (confirm('Do you wish to deselect the element?')) {
                    selectedAdGroupType.splice(selectedAdGroupType.findIndex(v => v === element.val()), 1);
                }
                else {
                    $("#adTypeDropDown").multiselect('select', element.val());
                    return false;
                }
            }
            var sortedList = [];
         
            for (let i = 0; i < AdGroupList.length; i++) {
                for (var v = 0; v < AdGroupList[i].EdsExts.length; v++) {
                    for (var x = 0; x < selectedAdGroupType.length; x++) {
                        if (AdGroupList[i].EdsExts[v].type === selectedAdGroupType[x]) {                         
                            sortedList.push(AdGroupList[i]);
                        }
                    }
                }
              
            }
            reloadREviewTable(sortedList);
        }
    });

    $('#keywordDropDown').multiselect({
        onChange: function (element, checked) {

            if (checked == true) {

                if (!selectedKeyWords.includes(element.val()))
                    selectedKeyWords.push(element.val());
            }
            else if (checked == false) {
                if (confirm('Do you wish to deselect the element?')) {
                    selectedKeyWords.splice(selectedKeyWords.findIndex(v => v === element.val()), 1);
                }
                else {
                    $("#keywordDropDown").multiselect('select', element.val());
                    return false;
                }
            }
            var sortedList = [];
            for (let j = 0; j < selectedKeyWords.length; j++) {
                for (let i = 0; i < AdGroupList.length; i++) {
                    for (var v = 0; v < AdGroupList[i].Keywords.length; v++) {

                        if (AdGroupList[i].Keywords[v] === selectedKeyWords[j])
                            sortedList.push(AdGroupList[i]);
                    }
                }

            }
            console.log(sortedList);
            reloadREviewTable(sortedList);
        }
    });

    $('#negativesDropDown').multiselect({
        onChange: function (element, checked) {

            if (checked == true) {

                if (!selectedNegatives.includes(element.val()))
                    selectedNegatives.push(element.val());
            }
            else if (checked == false) {
                if (confirm('Do you wish to deselect the element?')) {
                    selectedNegatives.splice(selectedNegatives.findIndex(v => v === element.val()), 1);
                }
                else {
                    $("#negativesDropDown").multiselect('select', element.val());
                    return false;
                }
            }
            var sortedList = [];
            for (let j = 0; j < selectedNegatives.length; j++) {
                for (let i = 0; i < AdGroupList.length; i++) {
                    for (var v = 0; v < AdGroupList[i].Keywords.length; v++) {

                        if (AdGroupList[i].Negatives[v] === selectedNegatives[j])
                            sortedList.push(AdGroupList[i]);
                    }
                }

            }
            console.log(sortedList);
            reloadREviewTable(sortedList);
        }
    });

    $('.form-control form-control-sm').on('keyup', function () {
        var table = GetTable();
        table.search(this.value).draw();
    });

    var max_fields = 10;
    var wrapper = $(".container1");
    var add_button = $(".add_form_field");

    var x = 3;
    $(add_button).click(function (e) {
        e.preventDefault();
        if (x < max_fields) {
            x++; 
            $(wrapper).append(` <div class="row mt-3">
                                <div class="col-md-12 form-group">
                                    <label for="Discount">Value ${x}</label>
                                    <input class="form-control form-control-rounded" id="snipVal${x}" maxlength="90" type="text" />
                                </div>
                            </div>`); //add input box
        } else {
            toastr.error('You Reached the limits')
        }
    });

    $(wrapper).on("click", ".delete", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })

    var headLineWrapper = $(".containerSearch");
    var headLineAdd_button = $(".add_headline_field");
    var max_headline_fields = 15;
    var y = 3;
    $(headLineAdd_button).click(function (e) {
        e.preventDefault();
        if (y < max_headline_fields) {
            y++;
            $(headLineWrapper).append(`<div class="row mt-3">
                            <div class="col-md-12 form-group">
                                <label for="Discount">Headline ${y}</label>
                                <input class="form-control form-control-rounded" id="expSearchHeadline${y}" maxlength="50" type="text" />
                            </div>
                        </div>`); //add input box
        } else {
            toastr.error('You Reached the limits')
        }
    });

    $(headLineWrapper).on("click", ".delete", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        y--;
    })

    var callOutWrapper = $(".callContainer");
    var callOutAdd_button = $(".add_call_out");
    var max_callOut_fields = 10;
    var c = 3;
    $(callOutAdd_button).click(function (e) {
        e.preventDefault();
        if (c < max_callOut_fields) {
            c++;
            $(callOutWrapper).append(`  <div class="row mt-3">
                        <div class="col-md-12 form-group">
                            <label for="Discount">Call out text ${c}</label>
                            <input class="allow25 form-control form-control-rounded" id="snipVal${c}" maxlength="25" type="text" />
                        </div>

                    </div>`); //add input box
        } else {
            toastr.error('You Reached the limits')
        }
    });

    $(callOutWrapper).on("click", ".delete", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        y--;
    })
});



$(document).ready(function (e) {


    $('.allow90').maxlength({
        alwaysShow: true,
        threshold: 10,
        warningClass: "label label-info",
        limitReachedClass: "label label-warning",
        placement: 'bottom',
        message: 'used %charsTyped% of %charsTotal% chars.'
    });
    $('.allow15').maxlength({
        alwaysShow: true,
        threshold: 10,
        warningClass: "label label-info",
        limitReachedClass: "label label-warning",
        placement: 'bottom',
        message: 'used %charsTyped% of %charsTotal% chars.'
    });
    $('.allow25').maxlength({
        alwaysShow: true,
        threshold: 10,
        warningClass: "label label-info",
        limitReachedClass: "label label-warning",
        placement: 'bottom',
        message: 'used %charsTyped% of %charsTotal% chars.'
    });
    $('.allow30').maxlength({
        alwaysShow: true,
        threshold: 10,
        warningClass: "label label-info",
        limitReachedClass: "label label-warning",
        placement: 'bottom',
        message: 'used %charsTyped% of %charsTotal% chars.'
    });

});
$(document).ready(function () {
    $("#dropdownlist").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource:  [
            { "text": "Afghanistan", "value": "AF" },
            { "text": "Åland Islands", "value": "AX" },
            { "text": "Albania", "value": "AL" },
            { "text": "Algeria", "value": "DZ" },
            { "text": "American Samoa", "value": "AS" },
            { "text": "Andorra", "value": "AD" },
            { "text": "Angola", "value": "AO" },
            { "text": "Anguilla", "value": "AI" },
            { "text": "Antarctica", "value": "AQ" },
            { "text": "Antigua and Barbuda", "value": "AG" },
            { "text": "Argentina", "value": "AR" },
            { "text": "Armenia", "value": "AM" },
            { "text": "Aruba", "value": "AW" },
            { "text": "Australia", "value": "AU" },
            { "text": "Austria", "value": "AT" },
            { "text": "Azerbaijan", "value": "AZ" },
            { "text": "Bahamas", "value": "BS" },
            { "text": "Bahrain", "value": "BH" },
            { "text": "Bangladesh", "value": "BD" },
            { "text": "Barbados", "value": "BB" },
            { "text": "Belarus", "value": "BY" },
            { "text": "Belgium", "value": "BE" },
            { "text": "Belize", "value": "BZ" },
            { "text": "Benin", "value": "BJ" },
            { "text": "Bermuda", "value": "BM" },
            { "text": "Bhutan", "value": "BT" },
            { "text": "Bolivia", "value": "BO" },
            { "text": "Bosnia and Herzegovina", "value": "BA" },
            { "text": "Botswana", "value": "BW" },
            { "text": "Bouvet Island", "value": "BV" },
            { "text": "Brazil", "value": "BR" },
            { "text": "British Indian Ocean Territory", "value": "IO" },
            { "text": "Brunei Darussalam", "value": "BN" },
            { "text": "Bulgaria", "value": "BG" },
            { "text": "Burkina Faso", "value": "BF" },
            { "text": "Burundi", "value": "BI" },
            { "text": "Cambodia", "value": "KH" },
            { "text": "Cameroon", "value": "CM" },
            { "text": "Canada", "value": "CA" },
            { "text": "Cape Verde", "value": "CV" },
            { "text": "Cayman Islands", "value": "KY" },
            { "text": "Central African Republic", "value": "CF" },
            { "text": "Chad", "value": "TD" },
            { "text": "Chile", "value": "CL" },
            { "text": "China", "value": "CN" },
            { "text": "Christmas Island", "value": "CX" },
            { "text": "Cocos (Keeling) Islands", "value": "CC" },
            { "text": "Colombia", "value": "CO" },
            { "text": "Comoros", "value": "KM" },
            { "text": "Congo", "value": "CG" },
            { "text": "Congo, The Democratic Republic of the", "value": "CD" },
            { "text": "Cook Islands", "value": "CK" },
            { "text": "Costa Rica", "value": "CR" },
            { "text": "Cote D'Ivoire", "value": "CI" },
            { "text": "Croatia", "value": "HR" },
            { "text": "Cuba", "value": "CU" },
            { "text": "Cyprus", "value": "CY" },
            { "text": "Czech Republic", "value": "CZ" },
            { "text": "Denmark", "value": "DK" },
            { "text": "Djibouti", "value": "DJ" },
            { "text": "Dominica", "value": "DM" },
            { "text": "Dominican Republic", "value": "DO" },
            { "text": "Ecuador", "value": "EC" },
            { "text": "Egypt", "value": "EG" },
            { "text": "El Salvador", "value": "SV" },
            { "text": "Equatorial Guinea", "value": "GQ" },
            { "text": "Eritrea", "value": "ER" },
            { "text": "Estonia", "value": "EE" },
            { "text": "Ethiopia", "value": "ET" },
            { "text": "Falkland Islands (Malvinas)", "value": "FK" },
            { "text": "Faroe Islands", "value": "FO" },
            { "text": "Fiji", "value": "FJ" },
            { "text": "Finland", "value": "FI" },
            { "text": "France", "value": "FR" },
            { "text": "French Guiana", "value": "GF" },
            { "text": "French Polynesia", "value": "PF" },
            { "text": "French Southern Territories", "value": "TF" },
            { "text": "Gabon", "value": "GA" },
            { "text": "Gambia", "value": "GM" },
            { "text": "Georgia", "value": "GE" },
            { "text": "Germany", "value": "DE" },
            { "text": "Ghana", "value": "GH" },
            { "text": "Gibraltar", "value": "GI" },
            { "text": "Greece", "value": "GR" },
            { "text": "Greenland", "value": "GL" },
            { "text": "Grenada", "value": "GD" },
            { "text": "Guadeloupe", "value": "GP" },
            { "text": "Guam", "value": "GU" },
            { "text": "Guatemala", "value": "GT" },
            { "text": "Guernsey", "value": "GG" },
            { "text": "Guinea", "value": "GN" },
            { "text": "Guinea-Bissau", "value": "GW" },
            { "text": "Guyana", "value": "GY" },
            { "text": "Haiti", "value": "HT" },
            { "text": "Heard Island and Mcdonald Islands", "value": "HM" },
            { "text": "Holy See (Vatican City State)", "value": "VA" },
            { "text": "Honduras", "value": "HN" },
            { "text": "Hong Kong", "value": "HK" },
            { "text": "Hungary", "value": "HU" },
            { "text": "Iceland", "value": "IS" },
            { "text": "India", "value": "IN" },
            { "text": "Indonesia", "value": "ID" },
            { "text": "Iran, Islamic Republic Of", "value": "IR" },
            { "text": "Iraq", "value": "IQ" },
            { "text": "Ireland", "value": "IE" },
            { "text": "Isle of Man", "value": "IM" },
            { "text": "Israel", "value": "IL" },
            { "text": "Italy", "value": "IT" },
            { "text": "Jamaica", "value": "JM" },
            { "text": "Japan", "value": "JP" },
            { "text": "Jersey", "value": "JE" },
            { "text": "Jordan", "value": "JO" },
            { "text": "Kazakhstan", "value": "KZ" },
            { "text": "Kenya", "value": "KE" },
            { "text": "Kiribati", "value": "KI" },
            { "text": "Korea, Democratic People'S Republic of", "value": "KP" },
            { "text": "Korea, Republic of", "value": "KR" },
            { "text": "Kuwait", "value": "KW" },
            { "text": "Kyrgyzstan", "value": "KG" },
            { "text": "Lao People'S Democratic Republic", "value": "LA" },
            { "text": "Latvia", "value": "LV" },
            { "text": "Lebanon", "value": "LB" },
            { "text": "Lesotho", "value": "LS" },
            { "text": "Liberia", "value": "LR" },
            { "text": "Libyan Arab Jamahiriya", "value": "LY" },
            { "text": "Liechtenstein", "value": "LI" },
            { "text": "Lithuania", "value": "LT" },
            { "text": "Luxembourg", "value": "LU" },
            { "text": "Macao", "value": "MO" },
            { "text": "Macedonia, The Former Yugoslav Republic of", "value": "MK" },
            { "text": "Madagascar", "value": "MG" },
            { "text": "Malawi", "value": "MW" },
            { "text": "Malaysia", "value": "MY" },
            { "text": "Maldives", "value": "MV" },
            { "text": "Mali", "value": "ML" },
            { "text": "Malta", "value": "MT" },
            { "text": "Marshall Islands", "value": "MH" },
            { "text": "Martinique", "value": "MQ" },
            { "text": "Mauritania", "value": "MR" },
            { "text": "Mauritius", "value": "MU" },
            { "text": "Mayotte", "value": "YT" },
            { "text": "Mexico", "value": "MX" },
            { "text": "Micronesia, Federated States of", "value": "FM" },
            { "text": "Moldova, Republic of", "value": "MD" },
            { "text": "Monaco", "value": "MC" },
            { "text": "Mongolia", "value": "MN" },
            { "text": "Montserrat", "value": "MS" },
            { "text": "Morocco", "value": "MA" },
            { "text": "Mozambique", "value": "MZ" },
            { "text": "Myanmar", "value": "MM" },
            { "text": "Namibia", "value": "NA" },
            { "text": "Nauru", "value": "NR" },
            { "text": "Nepal", "value": "NP" },
            { "text": "Netherlands", "value": "NL" },
            { "text": "Netherlands Antilles", "value": "AN" },
            { "text": "New Caledonia", "value": "NC" },
            { "text": "New Zealand", "value": "NZ" },
            { "text": "Nicaragua", "value": "NI" },
            { "text": "Niger", "value": "NE" },
            { "text": "Nigeria", "value": "NG" },
            { "text": "Niue", "value": "NU" },
            { "text": "Norfolk Island", "value": "NF" },
            { "text": "Northern Mariana Islands", "value": "MP" },
            { "text": "Norway", "value": "NO" },
            { "text": "Oman", "value": "OM" },
            { "text": "Pakistan", "value": "PK" },
            { "text": "Palau", "value": "PW" },
            { "text": "Palestinian Territory, Occupied", "value": "PS" },
            { "text": "Panama", "value": "PA" },
            { "text": "Papua New Guinea", "value": "PG" },
            { "text": "Paraguay", "value": "PY" },
            { "text": "Peru", "value": "PE" },
            { "text": "Philippines", "value": "PH" },
            { "text": "Pitcairn", "value": "PN" },
            { "text": "Poland", "value": "PL" },
            { "text": "Portugal", "value": "PT" },
            { "text": "Puerto Rico", "value": "PR" },
            { "text": "Qatar", "value": "QA" },
            { "text": "Reunion", "value": "RE" },
            { "text": "Romania", "value": "RO" },
            { "text": "Russian Federation", "value": "RU" },
            { "text": "RWANDA", "value": "RW" },
            { "text": "Saint Helena", "value": "SH" },
            { "text": "Saint Kitts and Nevis", "value": "KN" },
            { "text": "Saint Lucia", "value": "LC" },
            { "text": "Saint Pierre and Miquelon", "value": "PM" },
            { "text": "Saint Vincent and the Grenadines", "value": "VC" },
            { "text": "Samoa", "value": "WS" },
            { "text": "San Marino", "value": "SM" },
            { "text": "Sao Tome and Principe", "value": "ST" },
            { "text": "Saudi Arabia", "value": "SA" },
            { "text": "Senegal", "value": "SN" },
            { "text": "Serbia and Montenegro", "value": "CS" },
            { "text": "Seychelles", "value": "SC" },
            { "text": "Sierra Leone", "value": "SL" },
            { "text": "Singapore", "value": "SG" },
            { "text": "Slovakia", "value": "SK" },
            { "text": "Slovenia", "value": "SI" },
            { "text": "Solomon Islands", "value": "SB" },
            { "text": "Somalia", "value": "SO" },
            { "text": "South Africa", "value": "ZA" },
            { "text": "South Georgia and the South Sandwich Islands", "value": "GS" },
            { "text": "Spain", "value": "ES" },
            { "text": "Sri Lanka", "value": "LK" },
            { "text": "Sudan", "value": "SD" },
            { "text": "Suriname", "value": "SR" },
            { "text": "Svalbard and Jan Mayen", "value": "SJ" },
            { "text": "Swaziland", "value": "SZ" },
            { "text": "Sweden", "value": "SE" },
            { "text": "Switzerland", "value": "CH" },
            { "text": "Syrian Arab Republic", "value": "SY" },
            { "text": "Taiwan, Province of China", "value": "TW" },
            { "text": "Tajikistan", "value": "TJ" },
            { "text": "Tanzania, United Republic of", "value": "TZ" },
            { "text": "Thailand", "value": "TH" },
            { "text": "Timor-Leste", "value": "TL" },
            { "text": "Togo", "value": "TG" },
            { "text": "Tokelau", "value": "TK" },
            { "text": "Tonga", "value": "TO" },
            { "text": "Trinidad and Tobago", "value": "TT" },
            { "text": "Tunisia", "value": "TN" },
            { "text": "Turkey", "value": "TR" },
            { "text": "Turkmenistan", "value": "TM" },
            { "text": "Turks and Caicos Islands", "value": "TC" },
            { "text": "Tuvalu", "value": "TV" },
            { "text": "Uganda", "value": "UG" },
            { "text": "Ukraine", "value": "UA" },
            { "text": "United Arab Emirates", "value": "AE" },
            { "text": "United Kingdom", "value": "GB" },
            { "text": "United States", "value": "US" },
            { "text": "United States Minor Outlying Islands", "value": "UM" },
            { "text": "Uruguay", "value": "UY" },
            { "text": "Uzbekistan", "value": "UZ" },
            { "text": "Vanuatu", "value": "VU" },
            { "text": "Venezuela", "value": "VE" },
            { "text": "Viet Nam", "value": "VN" },
            { "text": "Virgin Islands, British", "value": "VG" },
            { "text": "Virgin Islands, U.S.", "value": "VI" },
            { "text": "Wallis and Futuna", "value": "WF" },
            { "text": "Western Sahara", "value": "EH" },
            { "text": "Yemen", "value": "YE" },
            { "text": "Zambia", "value": "ZM" },
            { "text": "Zimbabwe", "value": "ZW" }
        ]

    });
});

$(document).ready(function () {
    // length 142
    var languages_list = {
        "af": "Afrikaans",
        "sq": "Albanian - shqip",
        "am": "Amharic - አማርኛ",
        "ar": "Arabic - العربية",
        "an": "Aragonese - aragonés",
        "hy": "Armenian - հայերեն",
        "ast": "Asturian - asturianu",
        "az": "Azerbaijani - azərbaycan dili",
        "eu": "Basque - euskara",
        "be": "Belarusian - беларуская",
        "bn": "Bengali - বাংলা",
        "bs": "Bosnian - bosanski",
        "br": "Breton - brezhoneg",
        "bg": "Bulgarian - български",
        "ca": "Catalan - català",
        "ckb": "Central Kurdish - کوردی (دەستنوسی عەرەبی)",
        "zh": "Chinese - 中文",
        "zh-HK": "Chinese (Hong Kong) - 中文（香港）",
        "zh-CN": "Chinese (Simplified) - 中文（简体）",
        "zh-TW": "Chinese (Traditional) - 中文（繁體）",
        "co": "Corsican",
        "hr": "Croatian - hrvatski",
        "cs": "Czech - čeština",
        "da": "Danish - dansk",
        "nl": "Dutch - Nederlands",
        "en": "English",
        "en-AU": "English (Australia)",
        "en-CA": "English (Canada)",
        "en-IN": "English (India)",
        "en-NZ": "English (New Zealand)",
        "en-ZA": "English (South Africa)",
        "en-GB": "English (United Kingdom)",
        "en-US": "English (United States)",
        "eo": "Esperanto - esperanto",
        "et": "Estonian - eesti",
        "fo": "Faroese - føroyskt",
        "fil": "Filipino",
        "fi": "Finnish - suomi",
        "fr": "French - français",
        "fr-CA": "French (Canada) - français (Canada)",
        "fr-FR": "French (France) - français (France)",
        "fr-CH": "French (Switzerland) - français (Suisse)",
        "gl": "Galician - galego",
        "ka": "Georgian - ქართული",
        "de": "German - Deutsch",
        "de-AT": "German (Austria) - Deutsch (Österreich)",
        "de-DE": "German (Germany) - Deutsch (Deutschland)",
        "de-LI": "German (Liechtenstein) - Deutsch (Liechtenstein)",
        "de-CH": "German (Switzerland) - Deutsch (Schweiz)",
        "el": "Greek - Ελληνικά",
        "gn": "Guarani",
        "gu": "Gujarati - ગુજરાતી",
        "ha": "Hausa",
        "haw": "Hawaiian - ʻŌlelo Hawaiʻi",
        "he": "Hebrew - עברית",
        "hi": "Hindi - हिन्दी",
        "hu": "Hungarian - magyar",
        "is": "Icelandic - íslenska",
        "id": "Indonesian - Indonesia",
        "ia": "Interlingua",
        "ga": "Irish - Gaeilge",
        "it": "Italian - italiano",
        "it-IT": "Italian (Italy) - italiano (Italia)",
        "it-CH": "Italian (Switzerland) - italiano (Svizzera)",
        "ja": "Japanese - 日本語",
        "kn": "Kannada - ಕನ್ನಡ",
        "kk": "Kazakh - қазақ тілі",
        "km": "Khmer - ខ្មែរ",
        "ko": "Korean - 한국어",
        "ku": "Kurdish - Kurdî",
        "ky": "Kyrgyz - кыргызча",
        "lo": "Lao - ລາວ",
        "la": "Latin",
        "lv": "Latvian - latviešu",
        "ln": "Lingala - lingála",
        "lt": "Lithuanian - lietuvių",
        "mk": "Macedonian - македонски",
        "ms": "Malay - Bahasa Melayu",
        "ml": "Malayalam - മലയാളം",
        "mt": "Maltese - Malti",
        "mr": "Marathi - मराठी",
        "mn": "Mongolian - монгол",
        "ne": "Nepali - नेपाली",
        "no": "Norwegian - norsk",
        "nb": "Norwegian Bokmål - norsk bokmål",
        "nn": "Norwegian Nynorsk - nynorsk",
        "oc": "Occitan",
        "or": "Oriya - ଓଡ଼ିଆ",
        "om": "Oromo - Oromoo",
        "ps": "Pashto - پښتو",
        "fa": "Persian - فارسی",
        "pl": "Polish - polski",
        "pt": "Portuguese - português",
        "pt-BR": "Portuguese (Brazil) - português (Brasil)",
        "pt-PT": "Portuguese (Portugal) - português (Portugal)",
        "pa": "Punjabi - ਪੰਜਾਬੀ",
        "qu": "Quechua",
        "ro": "Romanian - română",
        "mo": "Romanian (Moldova) - română (Moldova)",
        "rm": "Romansh - rumantsch",
        "ru": "Russian - русский",
        "gd": "Scottish Gaelic",
        "sr": "Serbian - српски",
        "sh": "Serbo-Croatian - Srpskohrvatski",
        "sn": "Shona - chiShona",
        "sd": "Sindhi",
        "si": "Sinhala - සිංහල",
        "sk": "Slovak - slovenčina",
        "sl": "Slovenian - slovenščina",
        "so": "Somali - Soomaali",
        "st": "Southern Sotho",
        "es": "Spanish - español",
        "es-AR": "Spanish (Argentina) - español (Argentina)",
        "es-419": "Spanish (Latin America) - español (Latinoamérica)",
        "es-MX": "Spanish (Mexico) - español (México)",
        "es-ES": "Spanish (Spain) - español (España)",
        "es-US": "Spanish (United States) - español (Estados Unidos)",
        "su": "Sundanese",
        "sw": "Swahili - Kiswahili",
        "sv": "Swedish - svenska",
        "tg": "Tajik - тоҷикӣ",
        "ta": "Tamil - தமிழ்",
        "tt": "Tatar",
        "te": "Telugu - తెలుగు",
        "th": "Thai - ไทย",
        "ti": "Tigrinya - ትግርኛ",
        "to": "Tongan - lea fakatonga",
        "tr": "Turkish - Türkçe",
        "tk": "Turkmen",
        "tw": "Twi",
        "uk": "Ukrainian - українська",
        "ur": "Urdu - اردو",
        "ug": "Uyghur",
        "uz": "Uzbek - o‘zbek",
        "vi": "Vietnamese - Tiếng Việt",
        "wa": "Walloon - wa",
        "cy": "Welsh - Cymraeg",
        "fy": "Western Frisian",
        "xh": "Xhosa",
        "yi": "Yiddish",
        "yo": "Yoruba - Èdè Yorùbá",
        "zu": "Zulu - isiZulu"
    };

    var user_language_code = "en-US";
    var option = '';
    for (var language_code in languages_list) {
        var selected = (language_code == user_language_code) ? ' selected' : '';
        option += '<option value="' + language_code + '"' + selected + '>' + languages_list[language_code] + '</option>';
    }
    document.getElementById('languages-list').innerHTML = option;
});

$('#exptexth1').keyup(function () {
    $('#target').html($(this).val());
});