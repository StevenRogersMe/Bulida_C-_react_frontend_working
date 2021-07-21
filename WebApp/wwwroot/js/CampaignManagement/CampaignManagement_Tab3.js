
var editedAdGroupList = [];

function loadReviewTable() {
    if (validateTab1()) {
        GenerateNegatives();
        var reviewtable = GetTable();
        reviewtable.clear();
        for (let j = 0; j < AdGroupList.length; j++) {
            AdGroupList[j].EdsExts = [];
        }


        for (let i = 0; i < EdsExtsList.length; i++) {
            for (let j = 0; j < AdGroupList.length; j++) {
                //var obj = AdGroupList[j].EdsExts.find(x => x.Id === EdsExtsList[i].Id);
                /// if (obj == "" || obj == undefined) {
                var EdsExt = KeyWordToExt(EdsExtsList[i], AdGroupList[j].AdGroup)
                EdsExt.Id = uuidv4();
                AdGroupList[j].EdsExts.push(EdsExt);
                //  }
            }
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

function GetTable() {
    var table;
    if ($.fn.dataTable.isDataTable('#tableReview')) {
        table = $('#tableReview').DataTable();
    }

    else {
        table = $('#tableReview').DataTable({
            processing: false,
            searching: false,
            scrollCollapse: true,
            data: [],
            "columns": [
                { "data": "AdGroup" },
                { "data": "AdGroup" },
                { "data": "AdGroup" },
                { "data": "AdGroup" },
                //{ "data": "Id",  },
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


                //{
                //    "render": function (data, type, row) {
                //        return GetAction(row.ValidFlag, row.Id, row.Name, dtCommonParam);
                //    },
                //    "targets": -1
                //},
                {
                    targets: "no-sort"
                }],
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


    