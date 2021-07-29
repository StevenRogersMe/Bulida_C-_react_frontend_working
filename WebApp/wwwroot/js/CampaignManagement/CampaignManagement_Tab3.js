
var selectedAdGroup = [];
var selectedAdGroupType = [];
var selectedKeyWords = [];
var selectedNegatives = [];

function loadReviewTable() {
    if (validateTab1()) {
        GenerateNegatives();
        var reviewtable = GetTable();
        reviewtable.clear();
        for (let j = 0; j < AdGroupList.length; j++) {
            AdGroupList[j].EdsExts = [];
            AdGroupList[j].Id = j;
        }
        for (let i = 0; i < EdsExtsList.length; i++) {
            for (let j = 0; j < AdGroupList.length; j++) {
                var EdsExt = KeyWordToExt(EdsExtsList[i], AdGroupList[j].AdGroup)
                EdsExt.Id = uuidv4();
                AdGroupList[j].EdsExts.push(EdsExt);
            }
        }
      
        AdGroupList = MergeEditedAd(AdGroupList);
        if ($.fn.dataTable.isDataTable('#tableReview')) {
            loadDropDown(AdGroupList);
            loadAdDropDown(AdGroupList);
            loadKeyWordDropDown(AdGroupList);
            loadNegativesDropDown(AdGroupList);
        }

        reviewtable.rows.add(AdGroupList);
        reviewtable.draw();
    }
    else {
        if ($.fn.dataTable.isDataTable('#tableReview')) {
            var reviewtable = $('#tableReview').DataTable();
            reviewtable.clear();
            reviewtable.draw();
        }
    }
}

function loadDropDown(data) {
    var adGroups = [];
    for (let j = 0; j < data.length; j++) {
        var adGroup = {
            label: data[j].AdGroup,
            value: data[j].AdGroup

        }
        adGroups.push(adGroup)
    }
    $("#adGroupDropDown").multiselect('dataprovider', adGroups);
    $("#adGroupReplaceDropDown").multiselect('dataprovider', adGroups);
}

function reloadREviewTable(data) {
    var reviewtable = GetTable();
    reviewtable.clear();l

    reviewtable.rows.add(data);
    reviewtable.draw();
}

function loadAdDropDown(data) {
    var adTypes = [];
    for (let j = 0; j < data.length; j++) {
        for (var i = 0; i < data[j].EdsExts.length; i++) {

            
                var adType = {
                    label: data[j].EdsExts[i].type,
                    value: data[j].EdsExts[i].type

            }

            var exist = containsObject(adType, adTypes);
            if (!exist) {
                adTypes.push(adType)
            }
        }
    }
    $("#adTypeDropDown").multiselect('dataprovider', adTypes);

}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].value == obj.value) {
            return true;
        }
    }

    return false;
}
function loadKeyWordDropDown(data) {
    var keyWords = [];
    var Exact = $('#chkExact').prop('checked');
    var Phrase = $('#chkPhrase').prop('checked');
    var Broad = $('#chkBroad').prop('checked');
    for (var i = 0; i < data.length; i++) {
        for (let x = 0; x < data[i].Keywords.length; x++) {
            if (data[i].Keywords[x] === undefined) {
                continue;
            }
            //if (!keyWords.includes(data[i].Keywords[x])) {
            //    continue;
            //}
            if (Exact) {
                var keyWord = {
                    label: `[${data[i].Keywords[x]}]`,
                    value: data[i].Keywords[x]

                }
                keyWords.push(keyWord);
            }
            if (Phrase) {
                var keyWord = {
                    label: `"${data[i].Keywords[x]}"`,
                    value: data[i].Keywords[x]

                }
                keyWords.push(keyWord);
            }
            if (Broad) {
                var keyWord = {
                    label: data[i].Keywords[x],
                    value: data[i].Keywords[x]

                }
                keyWords.push(keyWord);
            }

        }
    }
    $("#keywordDropDown").multiselect('dataprovider', keyWords);
}

function appendText() {

}

function loadNegativesDropDown(data) {
    var negatives = [];
    for (let i = 0; i < data.length; i++) {

        for (let j = 0; j < data.length; j++) {
            
                var neg = {
                    label: data[i].AdGroup,
                    value: data[i].AdGroup

            }
            var exist = containsObject(neg, negatives);
                if (data[i].AdGroup != data[j].AdGroup && !exist) {
                negatives.push(neg);
            }
        }
    }

    $("#negativesDropDown").multiselect('dataprovider', negatives);
}


function MergeEditedAd(newAd) {

    editedAd = getUpdateAd();
    for (let i = 0; i < editedAd.length; i++) {
        for (let j = 0; j < newAd.length; j++) {
            if (editedAd[i].AdGroup === newAd[j].AdGroup) {
                newAd[j].EdsExts =  newAd[j].EdsExts.concat(editedAd[i].EdsExts);
            }
        }
    }
    return newAd;
}

function replaceString(string,findText, replacedWord, matchCase, wholeWord) {

    if (matchCase) {
        var regex = new RegExp("/" + replacedWord + "/g");
        return string.replace(regex, findText);
    }
    else if (wholeWord) {
        var regex = new RegExp("\\b" + replacedWord + "\\b");
        replacedWord = `/${replacedWord}/g`;
        return string.replace(regex, findText);
    }

    return string.replace(replacedWord, findText);
}

function findAndReplace() {
    var selectedAdGroup = $('#adGroupReplaceDropDown option:selected');
    var matchCase = $('#matchCase').prop('checked');
    var wholeWordOnly = $('#wholeWordOnly').prop('checked');

    var find = $('#findText').val();
    var replace = $('#replaceText').val();
    if (selectedAdGroup.length == 0) {


        var jsonGrops = JSON.stringify(AdGroupList);
        var replacedJson = replaceString(jsonGrops, find, replace, matchCase, wholeWordOnly);
        var replacedAdGroup = JSON.parse(replacedJson);
        reloadREviewTable(replacedAdGroup);
    }
    else {
        var selectedAdGroups = [];
        for (let i = 0; i < AdGroupList.length; i++) {
            for (var x = 0; x < selectedAdGroup.length; x++) {
                if (AdGroupList[i].AdGroup === selectedAdGroup[x].innerText) {
                    selectedAdGroups.push(AdGroupList[i]);
                }
            }
        }

        var jsonGrops = JSON.stringify(selectedAdGroups);
        var replacedJson = replaceString(jsonGrops, find, replace, matchCase, wholeWordOnly);
        var replacedAdGroup = JSON.parse(replacedJson);

        for (let i = 0; i < AdGroupList.length; i++) {
            for (var x = 0; x < replacedAdGroup.length; x++) {
                if (AdGroupList[i].AdGroup === replacedAdGroup[x].AdGroup) {
                    AdGroupList[i].AdGroup = replacedAdGroup[x];
                }
            }
        }

        reloadREviewTable(AdGroupList);
    }
    $('#findReplaceModal').modal('hide');
    
}

function selectAll() {
    var table = GetTable();
    table.rows().select();
}

function removeSelected() {
    var table = GetTable();
    var selectedRows = table.rows('.selected').data();
    for (var i = 0; i < selectedRows.length; i++) {
        for (var x = 0; x < AdGroupList.length; x++) {
            if (selectedRows[i].Id == AdGroupList[x].Id) {
                AdGroupList.splice(AdGroupList[x], 1);
            }
        }
    }
    reloadREviewTable(AdGroupList);
}

function GetTable() {
    var table;
    if ($.fn.dataTable.isDataTable('#tableReview')) {
        table = $('#tableReview').DataTable();
    }

    else {
        table = $('#tableReview').DataTable({
            scrollCollapse: true,
            buttons: [
                'selectAll',
                'selectNone'
            ],
            language: {
                buttons: {
                    selectAll: "Select all items",
                    selectNone: "Select none"
                }
            },
            data: [],
            "columns": [
                { "data": "AdGroup" },
                { "data": "AdGroup" },
                { "data": "AdGroup" },
                { "data": "AdGroup" },
              
            ],
            "columnDefs": [
              
                {
                    "render": function (data, type, row) {
                        // debugger;
                        return htmlofAdsExtReview(row);

                    },
                    "targets": 1
                },
                {
                    "render": function (data, type, row) {
                        // debugger;
                        return htmlofKewordReview(row);

                    },
                    "targets": 2
                },

                {
                    "render": function (data, type, row) {
                        // debugger;
                        return htmlofNegativeReview(row);

                    },
                    "targets": 3
                },
                {
                    orderable: false,
                    className: 'select-checkbox',
                    targets: 0
                },
                {
                    targets: "no-sort",
                    selector: 'td:last-child'
                }],
            'select': {
                'style': 'multi'
            },
            "order": [[0, "asc"]],
        });
    }
    

    return table;
}




function GenerateNegatives() {

    for (let i = 0; i < AdGroupList.length; i++) {
        AdGroupList[i].Negatives = [];

        for (let j = 0; j < AdGroupList.length; j++) {
            if (AdGroupList[i].AdGroup != AdGroupList[j].AdGroup) {
                AdGroupList[i].Negatives.push(AdGroupList[j].AdGroup);
            }
        }
    }

}


function htmlofAdsExtReview(row) {
    var actionsHtml = "";
    for (let i = 0; i < row.EdsExts.length; i++) {
        var list = AdGroupList;
        var EdsExt = KeyWordToExt(row.EdsExts[i], row.AdGroup)
        EdsExt.AdGroupName = row.AdGroup;
        /// In case of Expanded Text
        if (row.EdsExts[i].type === "ext") {
            actionsHtml = getExtView(EdsExt.obj, row.EdsExts[i].Id, row.AdGroup) + actionsHtml;
        }
        // In Case of Call Only
        else if (row.EdsExts[i].type === "callOnly") {

            actionsHtml = getCallOnly(EdsExt.obj, row.EdsExts[i].Id, row.AdGroup)+ actionsHtml;
        }
        // In case of Resp Search
        else if (row.EdsExts[i].type === "resp") {

            actionsHtml = getRespSearch(EdsExt.obj, EdsExt.Id, row.AdGroup) + actionsHtml;
        }
        else if (row.EdsExts[i].type === "snippet") {

            actionsHtml = getSnippetView(EdsExt, EdsExt.Id) + actionsHtml;
        }
        else if (row.EdsExts[i].type === "callout") {

            actionsHtml = getCallOutView(EdsExt, EdsExt.Id) + actionsHtml;
        }

    }

    return actionsHtml;
}

function DeleteAd(id) {
    for (var index = 0; index < AdGroupList.length; index++) {
        var ads = AdGroupList[index].EdsExts;
        for (let j = 0; j < ads.length; j++) {
            var adId = AdGroupList[index].EdsExts[j].Id;
            if (adId == id) {
                const indexAd = AdGroupList[index].EdsExts.indexOf(AdGroupList[index].EdsExts[j]);
                if (indexAd > -1) {
                    AdGroupList[index].EdsExts.splice(indexAd, 1);
                }
            }
        }
    }
    var stepIndex = window.location.href;
    if (stepIndex.includes("step-3"))  {
        var reviewtable = GetTable();
        reviewtable.clear();

        reviewtable.rows.add(AdGroupList);
        reviewtable.draw();
    }
    else {
        var indx = -1;
        for (let i = 0; i < EdsExtsList.length; i++) {
            if (EdsExtsList[i].Id == id) {
                indx = i;
            }
        }

        if (indx != -1) {
            EdsExtsList.splice(indx, 1);
            //for (let j = 0; j < AdGroupList.length; j++) {
            //    AdGroupList[j].EdsExts.splice(indx, 1);
            //}

        }
        drawGrid();
    }
}


function htmlofKewordReview(row) {
    var actionsHtml = "";
    var Exact = $('#chkExact').prop('checked');
    var Phrase = $('#chkPhrase').prop('checked');
    var Modifier = $('#chkModifier').prop('checked');
    var Broad = $('#chkBroad').prop('checked');
    for (let i = 0; i < row.Keywords.length; i++) {
        if (row.Keywords[i] === undefined) {
            continue;
        }
        if (Exact) {
            actionsHtml = actionsHtml + `<div> [${row.Keywords[i]}] </div>`;

        }
        if (Phrase) {
            actionsHtml = actionsHtml + `<div> "${row.Keywords[i]}" </div>`;
        }
        if (Modifier) {
            actionsHtml = actionsHtml + `<div> +${row.Keywords[i]}</div>`;
        }
        if (Broad) {
            actionsHtml = actionsHtml + `<div> ${row.Keywords[i]}</div>`;
        }
       
    }

    return actionsHtml;
}

function drawReviewGrid() {
    var table = GetTable();
    table.data().clear().draw();


    for (let j = 0; j < AdGroupList.length; j++) {
        AdGroupList[j].EdsExts = [];
    }

    for (let i = 0; i < EdsExtsList.length; i++) {
        for (let j = 0; j < AdGroupList.length; j++) {
            //var obj = AdGroupList[j].EdsExts.find(x => x.Id === EdsExtsList[i].Id);
            /// if (obj == "" || obj == undefined) {
            var EdsExt = KeyWordToExt(EdsExtsList[i], AdGroupList[j].AdGroup)
            AdGroupList.EdsExts.push(EdsExt);
            //  }
        }

        table.row.add({
            "Id": EdsExtsList[i].Id,
        })
    }
    table.rows.add(AdGroupList);
    table.data().draw();
}

function htmlofNegativeReview(row) {
    var actionsHtml = "";
    var NegativePhrase = $('#chkNegative').prop('checked');
    if (NegativePhrase) {
        for (let i = 0; i < row.Negatives.length; i++) {

            actionsHtml = actionsHtml + `<li> ${row.Negatives[i]}</li>`;
        }
    }
    if (row.Negatives.length > 200) {

        actionsHtml = `<div class="container">
    <div class="header"><span>Long Text Expand</span>

    </div>
    <div class="content">
        <ul>
          ${actionsHtml}
        </ul>
    </div>
</div>`;
    }
    else {
        actionsHtml = `<div>
    <div >

    </div>
    <div class="content">
        <ul>
          ${actionsHtml}
        </ul>
    </div>
</div>`;
    }

    return actionsHtml;
}


    