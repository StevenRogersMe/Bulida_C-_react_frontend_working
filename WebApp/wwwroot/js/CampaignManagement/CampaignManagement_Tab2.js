var countEds = 0
var EdsExtsList = [];

var dataTable = {
    table: null,
    initializeDataTable: function () {
        var $table = $("#tab2DetailGrid");
        dataTable.table = $table.DataTable({
            processing: false,
            searching: false,
            paging: false,
            info: false,
            serverSide: false,
            "columns": [
                { "data": "Id" }
            ],
            "pagingType": "full_numbers",
            columnDefs: [{
                render: function (data, type, row) {
                    var actionsHtml = htmlofEdsExt(row.Id);
                    return actionsHtml;
                },
                targets: 0
            },
            {
                targets: "no-sort"
            }],
            "order": [[0, "asc"]],
        })
    },
    initialize: function () {
        dataTable.initializeDataTable();

    }
};

function getExtView(obj, id, groupName) {
    var Line1 = obj.HeadlineOne;

    if (obj.HeadlineTwo != "") {
        Line1 = Line1 + " | " + obj.HeadlineTwo;
    }
    if (obj.HeadlineThree != "") {
        Line1 = Line1 + " | " + obj.HeadlineThree;
    }

    var Line2 = obj.FinalURL;

    if (obj.PathOne != "") {
        Line2 = Line2 + "/" + obj.PathOne;
    }
    if (obj.PathTwo != "") {
        Line2 = Line2 + "/" + obj.PathTwo;
    }

    var Line3 = obj.DescriptionOne;
    if (obj.DescriptionTwo != "") {
        Line3 = Line3 + ". " + obj.DescriptionTwo;
    }

    if (obj.Edited === true) {
        return `<div class="d-flex flex-column flex-sm-row align-items-sm-center">
              
                                            <div class="flex-grow-1">
                                            <span class="badge badge-warning">Edited</span>
                                                <h6><a href="#">${Line1}</a></h6>
                                                <p class="text-success m-0">
                                                   ${Line2}
                                                </p>
                                                <p class="m-0 text-small text-muted">${Line3}</p>
                                            
                                            </div>
                                            <div>
                                                <button class="btn btn-success mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="OpenExpTextModal('${id}')">
                                                    Edit
                                                </button>
                                                <button class="btn btn-danger mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="DeleteAd('${id}')">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>`;
    }
    else {
        return `<div class="d-flex flex-column flex-sm-row align-items-sm-center">
              
                                            <div class="flex-grow-1">
                                                <h6><a href="#">${Line1}</a></h6>
                                                <p class="text-success m-0">
                                                   ${Line2}
                                                </p>
                                                <p class="m-0 text-small text-muted">${Line3}</p>
                                            
                                            </div>
                                            <div>
                                                <button class="btn btn-success mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="OpenExpTextModal('${id}')">
                                                    Edit
                                                </button>
                                                <button class="btn btn-danger mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="DeleteAd('${id}')">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>`;
    }
  
}

function getCallOnly(obj, id) {
    var Line1 = obj.PhoneNumber;

    if (obj.HeadlineOne != "") {
        Line1 = Line1 + " | " + obj.HeadlineOne;
    }
    if (obj.HeadlineTwo != "") {
        Line1 = Line1 + " | " + obj.HeadlineTwo;
    }

    var Line2 = obj.FinalUrl;

    var Line3 = obj.BusinessName;

    if (obj.DescriptionOne != "") {
        Line3 = Line3 + ". " + obj.DescriptionOne;
    }
    if (obj.DescriptionTwo != "") {
        Line3 = Line3 + ". " + obj.DescriptionTwo;
    }

    if (obj.Edited === true) {
        return `<div class="d-flex flex-column flex-sm-row align-items-sm-center">

                                            <div class="flex-grow-1">
                                            <span class="badge badge-warning">Edited</span>
                                                <h6><a href="#"> <span ><i class="nav-icon i-Telephone font-weight-bold"></i></span>Call ${Line1}</a></h6>
                                                <p class="text-success m-0">
                                                   ${Line2}
                                                </p>
                                                <p class="m-0 text-small text-muted">${Line3}</p>

                                            </div>
                                            <div>
                                                <button class="btn btn-success mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="OpenCallOnlyModal('${id}')">
                                                    Edit
                                                </button>
                                                <button class="btn btn-danger mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="DeleteAd('${id}')">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>`;
    }
    else {
        return `<div class="d-flex flex-column flex-sm-row align-items-sm-center">

                                            <div class="flex-grow-1">
                                                <h6><a href="#"> <span ><i class="nav-icon i-Telephone font-weight-bold"></i></span>Call ${Line1}</a></h6>
                                                <p class="text-success m-0">
                                                   ${Line2}
                                                </p>
                                                <p class="m-0 text-small text-muted">${Line3}</p>

                                            </div>
                                            <div>
                                                <button class="btn btn-success mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="OpenCallOnlyModal('${id}')">
                                                    Edit
                                                </button>
                                                <button class="btn btn-danger mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="DeleteAd('${id}')">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>`;
    }

}

function getRespSearch(obj, id) {

    var Line1 = obj.DescriptionOne;

    if (obj.HeadlineTwo != "") {
        Line1 = Line1 + " | " + obj.DescriptionTwo;
    }
    if (obj.HeadlineThree != "") {
        Line1 = Line1 + " | " + obj.DescriptionThree;
    }

    var Line2 = obj.FinalURL;

    if (obj.PathOne != "") {
        Line2 = Line2 + "/" + obj.PathOne;
    }
    if (obj.PathTwo != "") {
        Line2 = Line2 + "/" + obj.PathTwo;
    }

    var Line3 = obj.DescriptionOne;
    if (obj.DescriptionTwo != "") {
        Line3 = Line3 + ". " + obj.DescriptionFour;
    }

    if (obj.Edited === true) {
        return `<div class="d-flex flex-column flex-sm-row align-items-sm-center">

                                            <div class="flex-grow-1">
                                            <span class="badge badge-warning">Edited</span>
                                                <h6><a href="#"> <span class="text-danger"><i class="nav-icon i-Shuffle1 font-weight-bold"></i></span> ${Line1}</a></h6>
                                                <p class="text-success m-0">
                                                   ${Line2}
                                                </p>
                                                <p class="m-0 text-small text-muted">${Line3}</p>
                                            
                                            </div>
                                            <div>
                                                <button class="btn btn-success mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="OpenRespSearchModal('${id}')">
                                                    Edit
                                                </button>
                                                <button class="btn btn-danger mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="DeleteAd('${id}')">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>`;
    }
    else {
        return `<div class="d-flex flex-column flex-sm-row align-items-sm-center">

                                            <div class="flex-grow-1">
                                                <h6><a href="#"> <span class="text-danger"><i class="nav-icon i-Shuffle1 font-weight-bold"></i></span> ${Line1}</a></h6>
                                                <p class="text-success m-0">
                                                   ${Line2}
                                                </p>
                                                <p class="m-0 text-small text-muted">${Line3}</p>
                                            
                                            </div>
                                            <div>
                                                <button class="btn btn-success mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="OpenRespSearchModal('${id}')">
                                                    Edit
                                                </button>
                                                <button class="btn btn-danger mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="DeleteAd('${id}')">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>`;
    }
}

function getSnippetView(obj, id) {
    var line1 = "Snippet extension Header Type:" + " | " + obj.HeaderType;

    if (obj.Edited === true) {
        return `<div class="d-flex flex-column flex-sm-row align-items-sm-center">

                                            <div class="flex-grow-1">
                                                <span class="badge badge-warning">Edited</span>
                                                <h6><a href="#"> <span class="text-danger"></span> ${line1}</a></h6>                                           
                                            </div>
                                            <div>
                                                <button class="btn btn-success mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="SnippetModal(${id})">
                                                    Edit
                                                </button>
                                                <button class="btn btn-danger mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="DeleteAd('${id}')">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>`;
    }
    else {
        return `<div class="d-flex flex-column flex-sm-row align-items-sm-center">

                                            <div class="flex-grow-1">
                                                <h6><a href="#"> <span class="text-danger"></span> ${line1}</a></h6>                                           
                                            </div>
                                            <div>
                                                <button class="btn btn-success mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="SnippetModal(${id})">
                                                    Edit
                                                </button>
                                                <button class="btn btn-danger mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="DeleteAd('${id}')">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>`;
    }
}

function getCallOutView(obj, i) {
    var line1 = "Callout Extension";
    var id = obj.EdsExts[i].Id;
    if (obj.Edited === true) {
        return `<div class="d-flex flex-column flex-sm-row align-items-sm-center">

                                            <div class="flex-grow-1">
<div class="flex-grow-1">
                                                <h6><a href="#"> <span class="text-danger"></span> ${line1}</a></h6>                                           
                                            </div>
                                            <div>
                                                <button class="btn btn-success mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="CallOutModal(${id})">
                                                    Edit
                                                </button>
                                                <button class="btn btn-danger mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="DeleteAd('${id}')">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>`;
    }
    else {
       return `<div class="d-flex flex-column flex-sm-row align-items-sm-center">

                                            <div class="flex-grow-1">
<div class="flex-grow-1">
                                                <h6><a href="#"> <span class="text-danger"></span> ${line1}</a></h6>                                           
                                            </div>
                                            <div>
                                                <button class="btn btn-success mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="CallOutModal(${id})">
                                                    Edit
                                                </button>
                                                <button class="btn btn-danger mt-3 mb-3 m-sm-0 btn-rounded btn-sm" onclick="DeleteAd('${id}')">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>`;
    }
}

function htmlofEdsExt(id) {
    var actionsHtml = "";
    var ddval = $("#dropdownAdGroup").data("kendoDropDownList").text();
    var obj1 = AdGroupList.find(x => x.AdGroup === ddval);

    if (obj1 != "" && obj1 != undefined) {
        for (let i = 0; i < obj1.EdsExts.length; i++) {
            if (obj1.EdsExts[i].Id == id) {
                /// In case of Expanded Text
                if (obj1.EdsExts[i].type === "ext") {
                    actionsHtml = getExtView(obj1.EdsExts[i].obj, obj1.EdsExts[i].Id, ddval);
                }

                // In Case of Call Only
                else if (obj1.EdsExts[i].type === "callOnly") {

                    actionsHtml = getCallOnly(obj1.EdsExts[i].obj, obj1.EdsExts[i].Id, ddval)
                }

                // In case of Resp Search
                else if (obj1.EdsExts[i].type === "resp") {
                    actionsHtml = getRespSearch(obj1.EdsExts[i].obj, obj1.EdsExts[i].Id, ddval);
                }
                else if (obj1.EdsExts[i].type === "snippet") {

                    actionsHtml = getSnippetView(obj1, obj1.EdsExts[i].Id);
                }
                else if (obj1.EdsExts[i].type === "callout") {

                    actionsHtml = getCallOutView(obj1, obj1.EdsExts[i].Id);
                }
            }
        }
    }

    return actionsHtml;
}

function UpdateKeyWordString(value) {
    return value;
}
function AddExt( id) {
    debugger;
    if (validateExt()) {
        var id = $('#expId').val();
        var ddval = $("#dropdownAdGroup").data("kendoDropDownList").text();
        var innerObj = {
            HeadlineOne: UpdateKeyWordString($('#exptexth1').val()),
            HeadlineTwo: UpdateKeyWordString($('#exptexth2').val()),
            HeadlineThree: UpdateKeyWordString($('#exptexth3').val()),
            DescriptionOne: UpdateKeyWordString($('#exptextd1').val()),
            DescriptionTwo: UpdateKeyWordString($('#exptextd2').val()),
            FinalURL: $('#exptextfurl').val(),
            PathOne: UpdateKeyWordString($('#exptextp1').val()),
            PathTwo: UpdateKeyWordString($('#exptextp2').val()),
        }

        if (id == -1) {
            innerObj.Edited = false;
            var EdsExt = {
                Id: uuidv4(),
                type: "ext",
                obj: innerObj,
                AdGroupName: ddval
            }
            EdsExtsList.push(EdsExt);
        }
        else {
            var obj1 = EdsExtsList.find(x => x.Id === id);

            if (obj1 === undefined) {

                var editedObject;
                for (let i = 0; i < AdGroupList.length; i++) {
                    for (let j = 0; j < AdGroupList[i].EdsExts.length; j++) {
                        if (AdGroupList[i].EdsExts[j].Id == id) {
                            AdGroupList[i].EdsExts[j].obj = innerObj;
                            innerObj.Edited = true;
                            editedObject = AdGroupList[i].EdsExts[j]
                        }
                    }
                }
                editedAdGroupList.push(editedObject);
            }
            else {
                for (var index = 0; index < EdsExtsList.length; index++) {
                    if (EdsExtsList[index].Id == id) {
                        EdsExtsList[index].obj = innerObj;
                    }
                }
            }
        }
        $('#AddExpandedTextModal').modal('hide');
        var stepIndex = window.location.href;
        if (stepIndex.includes("step-3") ) {
            var reviewtable = GetTable();
            reviewtable.clear();

            reviewtable.rows.add(AdGroupList);
            reviewtable.draw();
        }
        else {
            drawGrid();
        }
       
    }

}

function AddCallOnly() {
    if (validateCallOnly()) {
        debugger;
        var id = $('#callonlyId').val();
        var country = $("#dropdownlist").data("kendoDropDownList").value();
        var innerObj = {
            Country: country,
            PhoneNumber: $('#callonlyPhone').val(),
            HeadlineOne: UpdateKeyWordString($('#callonlyh1').val()),
            HeadlineTwo: UpdateKeyWordString($('#callonlyh2').val()),
            DescriptionOne: UpdateKeyWordString($('#callonlyd1').val()),
            DescriptionTwo: UpdateKeyWordString($('#callonlyd2').val()),
            BusinessName: UpdateKeyWordString($('#callonlybusinessName').val()),
            VerificationURL: UpdateKeyWordString($('#callonlyverificationUrl').val()),
            FinalUrl: $('#callonlyFinalUrl').val()
        }

        var ddval = $("#dropdownAdGroup").data("kendoDropDownList").text();

        if (id == -1) {
            innerObj.Edited = false;
            var EdsExt = {
                Id: uuidv4(),
                type: "callOnly",
                obj: innerObj,
                AdGroupName: ddval
            }
            EdsExtsList.push(EdsExt);
        }
        else {
            var obj1 = EdsExtsList.find(x => x.Id === id);

            if (obj1 === undefined) {
                var editedObject;
                for (let i = 0; i < AdGroupList.length; i++) {
                    for (let j = 0; j < AdGroupList[i].EdsExts.length; j++) {
                        //var obj = AdGroupList[j].EdsExts.find(x => x.Id === EdsExtsList[i].Id);
                        if (AdGroupList[i].EdsExts[j].Id == id) {
                            AdGroupList[i].EdsExts[j].obj = innerObj;
                            innerObj.Edited = true;
                            editedObject = AdGroupList[i].EdsExts[j]
                        }
                    }
                }
                editedAdGroupList.push(editedObject);
            }
            else {
                for (var index = 0; index < EdsExtsList.length; index++) {
                    if (EdsExtsList[index].Id == id) {
                        EdsExtsList[index].obj = innerObj;
                    }
                }
            }
        }

       

        $('#AddCallOnlyModal').modal('hide');
        var stepIndex = window.location.href;
        if (stepIndex.includes("step-3")) {
            var reviewtable = GetTable();
            reviewtable.clear();
            reviewtable.rows.add(AdGroupList);
            reviewtable.draw();
        }
        else {
            drawGrid();
        }
    }
}

function AddRespSearch() {

    if (true) {
        var id = $('#searchId').val();

        var innerObj = {
            DescriptionOne: UpdateKeyWordString($('#expDiscSearch1').val()),
            DescriptionTwo: UpdateKeyWordString($('#expDiscSearch2').val()),
            DescriptionThree: UpdateKeyWordString($('#expDiscSearch3').val()),
            DescriptionFour: UpdateKeyWordString($('#expDiscSearch4').val()),
            FinalURL: UpdateKeyWordString($('#expSearchurl').val()),
            PathOne: UpdateKeyWordString($('#expSearchPath1').val()),
            PathTwo: UpdateKeyWordString($('#expSearchPath2').val()),
        }
        inputs = document.getElementsByTagName('input');
        var headLinesValues = [];
        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].id.includes("expSearchHeadline")) {

                headLinesValues.push(inputs[index].value);
            }
        }
        innerObj.HeadLines = headLinesValues;
        var ddval = $("#dropdownAdGroup").data("kendoDropDownList").text();
        //add 
        if (id == -1) {
            innerObj.Edited = true;
            var EdsExt = {
                Id: uuidv4(),
                type: "resp",
                obj: innerObj,
                AdGroupName: ddval
            }
            EdsExtsList.push(EdsExt);
        }
        else{
            var obj1 = EdsExtsList.find(x => x.Id === id);

            if (obj1 === undefined) {

                var editedObject;
                for (let i = 0; i < AdGroupList.length; i++) {
                    for (let j = 0; j < AdGroupList[i].EdsExts.length; j++) {
                        //var obj = AdGroupList[j].EdsExts.find(x => x.Id === EdsExtsList[i].Id);
                        if (AdGroupList[i].EdsExts[j].Id == id) {                          
                            AdGroupList[i].EdsExts[j].obj = innerObj;
                            innerObj.Edited = true;
                            editedObject = innerObj;
                        }
                    }
                }
                editedAdGroupList.push(editedObject);
            }
            else {
                for (var index = 0; index < EdsExtsList.length; index++) {
                    if (EdsExtsList[index].Id == id) {
                        EdsExtsList[index].obj = innerObj;
                    }
                }
            }
        }
        $('#AddRespSearchModal').modal('hide');
        var stepIndex = window.location.href;
        if (stepIndex.includes("step-3")) {
            var reviewtable = GetTable();
            reviewtable.clear();
            reviewtable.rows.add(AdGroupList);
            reviewtable.draw();
        }
         else {
            drawGrid();
        }
    }
}

function AddSnippet() {

    if (true) {
        var id = $('#snippetId').val();
        var innerObj = {
            Language: $("#languages option:selected").text(),
            HeaderType: $("#headerType option:selected").text(),
        }
        inputs = document.getElementsByTagName('input');
        var snippetValues = [];
        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].id.includes("snipVal")) {

                snippetValues.push(inputs[index].value);
            }
        }
        innerObj.SnippetValues = snippetValues;
        //add 
        if (id == -1) {
            var respsearch = {
                Id: countEds,
                type: "snippet",
                obj: innerObj,
            }
            EdsExtsList.push(respsearch);
            countEds++;
        }
        //update
        else {
            var obj1 = EdsExtsList.find(x => x.Id === id);

            if (obj1 === undefined) {

                var editedObject;
                for (let i = 0; i < AdGroupList.length; i++) {
                    for (let j = 0; j < AdGroupList[i].EdsExts.length; j++) {
                        //var obj = AdGroupList[j].EdsExts.find(x => x.Id === EdsExtsList[i].Id);
                        if (AdGroupList[i].EdsExts[j].Id == id) {
                            AdGroupList[i].EdsExts[j].obj = innerObj;
                            innerObj.Edited = true;
                            editedObject = innerObj;
                        }
                    }
                }
                editedAdGroupList.push(editedObject);
            }
            else {
                for (var index = 0; index < EdsExtsList.length; index++) {
                    if (EdsExtsList[index].Id == id) {
                        EdsExtsList[index].obj = innerObj;
                    }
                }
            }
        }
        $('#snippetModal').modal('hide');
        var stepIndex = window.location.href;
        if (stepIndex.includes("step-3")) {
            var reviewtable = GetTable();
            reviewtable.clear();
            reviewtable.rows.add(AdGroupList);
            reviewtable.draw();
        }
        else {
            drawGrid();
        }
      
    }
}
function AddCallOut() {

    if (true) {
  
        var id = $('#callOutId').val();
        var innerObj = {
        };
        inputs = document.getElementsByTagName('input');
        var callOutValues = [];
        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].id.includes("callOut")) {

                callOutValues.push(inputs[index].value);
            }
        }
        innerObj.CallOutValues = callOutValues;
        //add 
        if (id == -1) {
            var respsearch = {
                Id: countEds,
                type: "callout",
                obj: innerObj,
            }
            EdsExtsList.push(respsearch);
            countEds++;
        }
        //update
        else {
            var obj1 = EdsExtsList.find(x => x.Id === id);

            if (obj1 === undefined) {

                var editedObject;
                for (let i = 0; i < AdGroupList.length; i++) {
                    for (let j = 0; j < AdGroupList[i].EdsExts.length; j++) {
                        //var obj = AdGroupList[j].EdsExts.find(x => x.Id === EdsExtsList[i].Id);
                        if (AdGroupList[i].EdsExts[j].Id == id) {
                            AdGroupList[i].EdsExts[j].obj = innerObj;
                            innerObj.Edited = true;
                            editedObject = innerObj;
                        }
                    }
                }
                editedAdGroupList.push(editedObject);
            }
            else {
                for (var index = 0; index < EdsExtsList.length; index++) {
                    if (EdsExtsList[index].Id == id) {
                        EdsExtsList[index].obj = innerObj;
                    }
                }
            }
        }
        $('#AddExpandedTextModal').modal('hide');
        var stepIndex = window.location.href;
        if (stepIndex.includes("step-3")) {
            var reviewtable = GetTable();
            reviewtable.clear();
            reviewtable.rows.add(AdGroupList);
            reviewtable.draw();
        }
        drawGrid();
    }

}


function AddEdsExt(type) {
    if (type == 'ext') {
        AddExt();
    }
    else if (type == 'callOnly') {
        AddCallOnly();
    }
    else if (type == 'resp') {
        AddRespSearch();
    }
    else if (type == 'snippet') {
        AddSnippet();
    }
    else if (type == 'callout') {
        AddCallOut();
    }
}


function drawGrid() {
    var table = $('#tab2DetailGrid').DataTable();
    table.data().clear().draw();


    for (let j = 0; j < AdGroupList.length; j++) {
        AdGroupList[j].EdsExts = [];
    }

    for (let i = 0; i < EdsExtsList.length; i++) {
        for (let j = 0; j < AdGroupList.length; j++) {
            //var obj = AdGroupList[j].EdsExts.find(x => x.Id === EdsExtsList[i].Id);
            /// if (obj == "" || obj == undefined) {
            var EdsExt = KeyWordToExt(EdsExtsList[i], AdGroupList[j].AdGroup)
            AdGroupList[j].EdsExts.push(EdsExt);
            //  }
        }

        table.row.add({
            "Id": EdsExtsList[i].Id,
        })
    }

    table.data().draw();
}


function LoadAdGroupDropDown() {

    var data = [];

    if (AdGroupList.length > 0) {
        for (let i = 0; i < AdGroupList.length; i++) {

            obj = {
                Id: AdGroupList[i].AdGroup.replace(" ", ""),
                Name: AdGroupList[i].AdGroup,
            }
            data.push(obj);
        }

        $("#dropdownAdGroup").kendoDropDownList({
            dataTextField: "Name",
            dataValueField: "Id",
            dataSource: data,
            change: onChangedropdownAdGroup,
            height: 100
        });
    }
}

function onChangedropdownAdGroup() {
    drawGrid();
};


function OpenExpTextModal(id, adGroup) {
    if (AdGroupList.length > 0) {
        if (id == -1) {
            $('#AddExpandedTextModal').modal('show');
            $("#expTextUpdate").addClass("d-none");
            $("#expTextAdd").removeClass("d-none");
            $('#exptexth1').val("_KeyWord_");
            $('#exptexth2').val("Online Store");
            $('#exptexth3').val("Free Delivery");
            $('#exptextd1').val("Buy online _keyword_");
            $('#exptextd2').val("Vast collection of _keyword_");
            $('#exptextfurl').val("https://books.com");
            $('#exptextp1').val("Shop");
            $('#exptextp2').val("Now");
            $('#expId').val(id);

        }
        else {
            var obj1 = EdsExtsList.find(x => x.Id === id);
           
            if (obj1 === undefined) {
                for (let i = 0; i < AdGroupList.length; i++) {
                    for (let j = 0; j < AdGroupList[i].EdsExts.length; j++) {
                        //var obj = AdGroupList[j].EdsExts.find(x => x.Id === EdsExtsList[i].Id);
                        if (AdGroupList[i].EdsExts[j].Id == id) {
                            obj1 = AdGroupList[i].EdsExts[j];
                        }
                    }
                }
            }
            $('#AddExpandedTextModal').modal('show');
            $("#expTextAdd").addClass("d-none");
            $("#expTextUpdate").removeClass("d-none");
            $('#exptexth1').val(obj1.obj.HeadlineOne);
            $('#exptexth2').val(obj1.obj.HeadlineTwo);
            $('#exptexth3').val(obj1.obj.HeadlineThree);
            $('#exptextd1').val(obj1.obj.DescriptionOne);
            $('#exptextd2').val(obj1.obj.DescriptionTwo);
            $('#exptextfurl').val(obj1.obj.FinalURL);
            $('#exptextp1').val(obj1.obj.PathOne);
            $('#exptextp2').val(obj1.obj.PathTwo);
            $('#expId').val(obj1.Id);

        }

    }
    else {
        toastr.error("You need to add at least one Ad Group", { timeOut: 5000 });
    }


}

function SnippetModal(id) {
    $('#snippetModal').modal('show');
    if (AdGroupList.length > 0) {
        if (id == -1) {
            $('#snippetModal').modal('show');
            $("#snippetUpdate").addClass("d-none");
            $("#snippetAdd").removeClass("d-none");
        }
        else {
            $("#snippetAdd").addClass("d-none");
            $("#snippetUpdate").removeClass("d-none");
            $('#snippetModal').modal('show');
        }

    }
    else {
        toastr.error("You need to add at least one Ad Group", { timeOut: 5000 });
    }
}

function CallOutModal(id) {
  
    if (AdGroupList.length > 0) {
        if (id == -1) {
            $('#callOutModal').modal('show');
            $("#calloutUpdate").addClass("d-none");
            $("#calloutAdd").removeClass("d-none");
        }
        else {
            $("#calloutAdd").addClass("d-none");
            $("#calloutUpdate").removeClass("d-none");
            $('#callOutModal').modal('show');
        }

    }
    else {
        toastr.error("You need to add at least one Ad Group", { timeOut: 5000 });
    }
}

function OpenCallOnlyModal(id) {
    if (AdGroupList.length > 0) {
        if (id == -1) {
            $('#AddCallOnlyModal').modal('show');
            $("#btnCallonlyUpdate").addClass("d-none");
            $("#btncallonlyAdd").removeClass("d-none");
            $('#callonlyPhone').val("923217261866");
            $('#callonlyh1').val("_Keyword_");
            $('#callonlyd1').val("Hello World");
            $('#callonlydisplayUrl').val("fb.com");
            $('#callonlybusinessName').val("My Shop");
            $('#callonlyverificationUrl').val("https://fb.com/abc");
            $('#callonlyId').val(id)
        }
        else {


            var obj1 = EdsExtsList.find(x => x.Id === id);

            if (obj1 === undefined)
                for (let i = 0; i < AdGroupList.length; i++) {
                    for (let j = 0; j < AdGroupList[i].EdsExts.length; j++) {
                        //var obj = AdGroupList[j].EdsExts.find(x => x.Id === EdsExtsList[i].Id);
                        if (AdGroupList[i].EdsExts[j].Id == id) {
                            obj1 = AdGroupList[i].EdsExts[j];
                        }
                    }
                }

            $('#AddCallOnlyModal').modal('show');
            $("#btncallonlyAdd").addClass("d-none");
            $("#btnCallonlyUpdate").removeClass("d-none");
           /* $("#callonlyCountry").data("kendoDropDownList").text(obj1.obj.Country);*/
            $('#callonlyPhone').val(obj1.obj.PhoneNumber);
            $('#callonlyh1').val(obj1.obj.HeadlineOne);
            $('#callonlyh2').val(obj1.obj.HeadlineTwo);
            $('#callonlyd1').val(obj1.obj.DescriptionOne);
            $('#callonlyd2').val(obj1.obj.DescriptionTwo);
            $('#callonlydisplayUrl').val(obj1.obj.DisplayURL);
            $('#callonlybusinessName').val(obj1.obj.BusinessName);
            $('#callonlyverificationUrl').val(obj1.obj.VerificationURL);
            $('#callonlyId').val(id)

        }

    }
    else {
        toastr.error("You need to add at least one Ad Group", { timeOut: 5000 });
    }
}



function OpenRespSearchModal(id) {
    if (AdGroupList.length > 0) {
        if (id == -1) {
            $('#AddRespSearchModal').modal('show');
            $("#searchUpdate").addClass("d-none");
            $("#searchAdd").removeClass("d-none");
            $('#resph1').val("Buy _keyword_");
            $('#resph2').val("Get _keyword_");
            $('#resph3').val("Shop _keyword_");
            $('#respd1').val("Buy online _keyword_");
            $('#respd2').val("Vast collection of _keyword_");
            $('#respfurl').val("https://books.com");
            $('#respp1').val("Shop");
            $('#respp2').val("Now");
            $('#respId').val(id);

        }
        else {


            var obj1 = EdsExtsList.find(x => x.Id === id);

            if (obj1 === undefined)
                for (let i = 0; i < AdGroupList.length; i++) {
                    for (let j = 0; j < AdGroupList[i].EdsExts.length; j++) {
                        //var obj = AdGroupList[j].EdsExts.find(x => x.Id === EdsExtsList[i].Id);
                        if (AdGroupList[i].EdsExts[j].Id == id) {
                            obj1 = AdGroupList[i].EdsExts[j];
                        }
                    }
                }

            $('#AddRespSearchModal').modal('show');
            $("#searchAdd").addClass("d-none");
            $("#searchUpdate").removeClass("d-none");
            $('#resph1').val(obj1.obj.HeadlineOne);
            $('#resph2').val(obj1.obj.HeadlineTwo);
            $('#resph3').val(obj1.obj.HeadlineThree);
            $('#respd1').val(obj1.obj.DescriptionOne);
            $('#respd2').val(obj1.obj.DescriptionTwo);
            $('#respfurl').val(obj1.obj.FinalURL);
            $('#respp1').val(obj1.obj.PathOne);
            $('#respp2').val(obj1.obj.PathTwo);
            $('#respId').val(id);

        }

    }
    else {
        toastr.error("You need to add at least one Ad Group", { timeOut: 5000 });
    }


}


