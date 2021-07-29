

function onchangeAdGroup() {
    var txtAdGroup = $("#AdGroup").val();
    var AdGroups = txtAdGroup.split("\n");

    //Remove Duplicate
    AdGroups = RemoveDuplicates(AdGroups);

    //Captitalize
    for (let i = 0; i < AdGroups.length; i++) {
        AdGroups[i] = AdGroup_CapitalizeFirstLetter(AdGroups[i]);
    }

    $("#AdGroup").val(AdGroups.toString().replaceAll(",", "\n"));


    var AdGroupList_New = [];

    if (AdGroups.length > 0) {
        for (let i = 0; i < AdGroups.length; i++) {
            var obj = AdGroupList.find(x => x.AdGroup === AdGroups[i]);
            if (obj == "" || obj == undefined) {
                obj = {
                    AdGroup: AdGroups[i],
                    Keywords: [],
                    EdsExts: [],
                    Negatives:[],
                }
                AdGroupList_New.push(obj);
            }
            else {
                AdGroupList_New.push(obj);
            }
        }
    }


    AdGroupList = AdGroupList_New;
    LoadKeyWords();
    LoadAdGroupDropDown();
    drawGrid();

}


function LoadKeyWords() {
    $('#KeywordsDiv').html("");
    if (AdGroupList.length > 0) {
        for (let i = 0; i < AdGroupList.length; i++) {
            let col;
            if ($('#stag_switch').prop('checked')) {
                col = ` <div class="mt-2 col-md-4 STAGSDiv">
                <div class="card border-primary">
                    <div class="card-header bg-primary text-white">
                <div>${AdGroupList[i].AdGroup}</div>
               </div>
               <div class="input-group"><textarea id="keywords-${AdGroupList[i].AdGroup.replace(" ", "")}" class="form-control" style="height: 120px;" onchange = "onchangeKeyword(this)"></textarea></div>
               </div>
              </div>`
            }
            else {
                col = ` <div class="mt-2 col-md-4 STAGSDiv" style="display: none;">
                <div class="card border-primary">
                    <div class="card-header bg-primary text-white">
                <div>${AdGroupList[i].AdGroup}</div>
               </div>
               <div class="input-group"><textarea id="keywords-${AdGroupList[i].AdGroup.replace(" ", "")}" class="form-control" style="height: 120px;" onchange = "onchangeKeyword(this)"></textarea></div>
               </div>
              </div>`
            }
         


            $('#KeywordsDiv').append(col);
            /*$("#keywords-" + AdGroupList[i].AdGroup.replace(" ", "")).val(AdGroupList[i].Keywords.toString().replaceAll(",", "\n"));*/

        }
    }

    for (let i = 0; i < AdGroupList.length; i++) {
        if (AdGroupList[i].AdGroup != "" || AdGroupList[i].AdGroup !== 'undefined') {
            AdGroupList[i].Keywords[i] = AdGroupList[i].AdGroup;
        }
    }
}


function onchangeKeyword(r) {
    debugger;
    var AdGroup = (r.id).replace("keywords-", "");
    var txtkeyWord = $("#keywords-" + AdGroup).val();
    var Keywords = txtkeyWord.split("\n");


    for (let i = 0; i < AdGroupList.length; i++) {
        if (AdGroupList[i].AdGroup.replace(" ", "") === AdGroup) {
            AdGroupList[i].Keywords = Keywords;
        }
    }
}

function CopyAdGroupNames() {
    if (AdGroupList.length > 0) {
        for (let i = 0; i < AdGroupList.length; i++) {
            var txtkeyWord = $("#keywords-" + AdGroupList[i].AdGroup.replace(" ", "")).val();
            var Keywords = txtkeyWord.split("\n");

            Keywords.push(AdGroupList[i].AdGroup);
            Keywords = RemoveDuplicates(Keywords);
            AdGroupList[i].Keywords = Keywords;

            $("#keywords-" + AdGroupList[i].AdGroup.replace(" ", "")).val(AdGroupList[i].Keywords.toString().replaceAll(",", "\n"));

        }
    }
}