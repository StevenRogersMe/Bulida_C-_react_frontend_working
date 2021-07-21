var dataUrl = null;

$(document).ready(function () {
    var $appAdminWrap = $(".app-admin-wrap");
    var $mobileIcon = $(".ul-contact-mobile-icon");
    var $childOpenMenu = $(".ul-contact-left-side");
    var $childCloseMenu = $(".contact-close-mobile-icon");
    $mobileIcon.on("click", function () {
        $childOpenMenu.addClass('contact-open');
    });
    $childCloseMenu.on("click", function () {
        $childOpenMenu.removeClass('contact-open');
    });
});

function LoadjsTreee() {
    $('#locationTree').jstree({
        'core': {
            'data': {
                "url": "../api/Location/GetLocationTree",
                "data": function data(node) {
                    return {
                        "id": node.id
                    };
                }
            },
            "themes": {
                "icons": false,
                "dots": false,
            },
        },

    });
}

function RenderHomePage() {
    window.open("../Home/Index", "_self");
}

function GetPromise(apiUrl) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).done((response) => {
            //this means my api call suceeded, so I will call resolve on the response
            resolve(response);
        }).fail((error) => {
            //this means the api call failed, so I will call reject on the error
            reject(error);
        });
    });
};

function LoadKendoDropDown(id, placeholder, url) {
    var promiseObject = GetPromise(url);
    promiseObject
        .then(data =>
            SetKendoDDSource(id, placeholder, data))
        .catch(error =>
            console.log("KENDO DROPDOWN ERROR" + "/r/n" + "Url:" + url + "/r/n" + "htmlElementId:" + id + "/r/n" + "Error Detail" + error));
};

function LoadKendoMultiselect(id, placeholder, url) {
    debugger;
    var promiseObject = GetPromise(url);
    promiseObject
        .then(data =>
            SetKendoMultiSource(id, placeholder, data))
        .catch(error =>
            console.log("KENDO MULTISELECT ERROR" + "/r/n" + "Url:" + url + "/r/n" + "htmlElementId:" + id + "/r/n" + "Error Detail" + error));
};

function LoadKendoAutoComplete(id, placeholder, url) {
    var promiseObject = GetPromise(url);
    promiseObject
        .then(data =>
            SetKendoAutoCompleteSource(id, placeholder, data))
        .catch(error =>
            console.log("KENDO AUTO COMPLETE ERROR" + "/r/n" + "Url:" + url + "/r/n" + "htmlElementId:" + id + "/r/n" + "Error Detail" + error));
};

function IsFormValid(formId) {
    var form = $("#" + formId);
    var kendoValidator = $("#" + formId).kendoValidator().data('kendoValidator');
    var isValid = form.valid();
    if (isValid) {
        isValid = kendoValidator.validate();
    }
    else {
        kendoValidator.validate();
    }
    return isValid;
};

function SetKendoDDSource(id, placeholder, data) {
    $("#" + id).kendoDropDownList({
        dataTextField: "Name",
        dataValueField: "Id",
        optionLabel: placeholder,
        dataSource: data,
        height: 100
    });
};

function SetKendoDDSourceValue(id, placeholder, data, value) {
    $("#" + id).kendoDropDownList({
        dataTextField: "Name",
        dataValueField: "Id",
        optionLabel: placeholder,
        dataSource: data,
        height: 100
    });

    if (value != null) {
        $("#" + id).val(value);
    }
};

function SetKendoMultiSource(id, placeholder, data) {
    $("#" + id).kendoMultiSelect({
        dataTextField: "Name",
        dataValueField: "Id",
        optionLabel: placeholder,
        placeholder: placeholder,
        dataSource: data,
        filter: "contains",
        height: 100
    });
    

};

function SetKendoAutoCompleteSource(id, placeholder, data) {
    $("#" + id).kendoAutoComplete({
        dataTextField: "Name",
        dataValueField: "Id",
        dataSource: data,
        filter: "contains",
        placeholder: placeholder,
        minLength: 2,
        noDataTemplate: '',
        select: onSelectRecord,
        change: OnChangeRecord
    });
};

function LoadKendoSearchAutoComplete(id, placeholder, url) {
    $("#" + id).kendoAutoComplete({
        filter: "startswith",
        autoBind: true,
        dataTextField: "Name",
        dataValueField: "Id",
        dataSource: {
            serverFiltering: true,
            transport: {
                read: {
                    dataType: "json",
                    type: "POST",
                    url: url
                }
            }
        },
        placeholder: placeholder,
        minLength: 3,
        noDataTemplate: '',
        select: onSelectRecord,
        change: OnChangeRecord
    });
}
function InitializeKendoDatePicker(id, disableFutureDates, disablePastDates) {
    $("#" + id).kendoDatePicker({
        value: new Date(),
        disableDates: function (date) {
            if (disableFutureDates) {
                return date > new Date();
            }
            else if (disablePastDates) {
                var oldDate = new Date();
                oldDate.setDate(oldDate.getDate() - 1);
                return date < oldDate;
            }
        }
    });
};
function LoadDropDown(id, url, value, placeholder) {
    var promiseObject = GetPromise(url);
    promiseObject
        .then(data =>
            SetKendoDDSourceValue(id, placeholder, data, value))
        .catch(error => console.log("DROPDOWN ERROR" + "/r/n" + "Url:" + url + "/r/n" + "htmlElementId:" + id + "/r/n" + "Error Detail" + error));
};

function UnselectKendoDropDown(id) {
    var ddList = $('#' + id).data("kendoDropDownList");
    if (ddList != undefined) {
        ddList.text(ddList.options.optionLabel);
        ddList.element.val(0);
        ddList.selectedIndex = -1;
        ddList._oldIndex = 0;
    }
};

function ClearKendoDropDownDataSource(id) {
    UnselectKendoDropDown(id);
    var ddList = $('#' + id).data("kendoDropDownList");
    if (ddList != undefined) {
        ddList.dataSource.data([]);
    }
};



function GetgridBoldCell(value) {

    var styleClasses = "text-primary t-font-boldest";

    var actionHtml = '<div>' +
        '<span class=' + '"' + styleClasses + '"' + '>' + value + '</span>'
    '</div>';
    return actionHtml;
};



function GetImageCell(value) {
    var actionHtml = `<img class="rounded-circle m-0 avatar-sm-table" src="../../ImagesStorageDB/${value}" onerror="this.src='../../Content/dist-assets/images/placeholder.jpg';" alt="">`;
    return actionHtml;
};

function GetgridValidFlagDescription(ValidFlag) {
    var flagStatus, styleClasses;
    if (ValidFlag) {
        flagStatus = "  Active   "
        styleClasses = "badge badge-pill badge-success p-2"
    }
    else {
        flagStatus = "  Inactive  "
        styleClasses = "badge badge-pill badge-warning p-2";
    }
    var actionHtml = '<div>' +
        '<span class=' + '"' + styleClasses + '"' + '>' + flagStatus + '</span>'
    '</div>';
    return actionHtml;
};

function RedirectToUrl(url) {
    location.href = url;
};

function ReloadDataTable(id) {
    $('#' + id).DataTable().ajax.reload();
};

function toggleDropdown(e, rowId) {
    e.preventDefault();
    $(`#dropdown${rowId}`).toggleClass("show");
}

function ActivateRecord(tableId) {
    $.ajax({
        url: dataUrl,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: "{}",
        success: function (result) {
            ReloadDataTable(tableId);
        },
        error: function (errormessage) {
            toastr.error(errormessage.responseText,{ timeOut: 5000 });
        }
    });
};

function DeactivateRecord(tableId) {
    $.ajax({
        url: dataUrl,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: "{}",
        success: function (result) {
            debugger;
            if (tableId != undefined && tableId != null) {
                ReloadDataTable(tableId);
            }
        },
        error: function (errormessage) {
            toastr.error(errormessage.responseText, { timeOut: 5000 });
        }
    });
};
function GetAction(ValidFlag, rowId, rowName, dtCommonParam) {
    var actionsHtml = "";
    if (ValidFlag) {
        actionsHtml =
            (dtCommonParam.resetPasswordUrl ?
                (`<a href=" ${dtCommonParam.resetPasswordUrl + rowName}" class="text-primary mr-2">
                     <i class="nav-icon i-Repeat-2 font-weight-bold" title="Reset"></i>
                     </a>`) : '') +
            (dtCommonParam.updateUrl ?
                (`<a href="${dtCommonParam.updateUrl + rowId}" class="text-primary mr-2">
                    <i class="nav-icon i-Pen-2 font-weight-bold" title="Edit"></i>
                    </a>`) : '') +
            (dtCommonParam.deActivateUrl ?
                (`<a href="#" onclick="ShowModal('${dtCommonParam.deActivateUrl + rowId}','${dtCommonParam.tableId}','${rowName}','inactive')" class="text-danger mr-2">
                    <i class="nav-icon i-Close-Window font-weight-bold" title="Inactive"></i>
                    </a>`) : '') +
            (dtCommonParam.cancelUrl ?
                (`<a href="#" onclick="ShowModal('${dtCommonParam.cancelUrl + rowId}','${dtCommonParam.tableId}','${rowName}','cancelled')" class="text-danger mr-2">
                    <i class="nav-icon i-Close-Window font-weight-bold" title="Cancelled"></i>
                    </a>`) : '');

    }
    else {
        actionsHtml =
            (dtCommonParam.resetPasswordUrl ?
                (`<a href=" ${dtCommonParam.resetPasswordUrl + rowName}" class="text-primary mr-2">
                     <i class="nav-icon i-Repeat-2 font-weight-bold" title="Reset"></i>
                     </a>`) : '') +
            (dtCommonParam.updateUrl ?
                (`<a href="${dtCommonParam.updateUrl + rowId}" class="text-primary mr-2">
                    <i class="nav-icon i-Pen-2 font-weight-bold" title="Edit"></i>
                    </a >`) : '') +
            (dtCommonParam.activateUrl ?
                (`<a href="#" onclick="ShowModal('${dtCommonParam.activateUrl + rowId}','${dtCommonParam.tableId}','${rowName}','active')" class="text-success mr-2">
                    <i class="nav-icon i-Yes font-weight-bold" title="Active"></i>
                    </a>`) : '');

    }

    return actionsHtml;
}


function GetPrintAction(rowId, dtCommonParam) {
    
    var actionsHtml =
        dtCommonParam.printUrl ?
            (`<a href=javascript:WindowOpen("${dtCommonParam.printUrl + rowId}") class="text-success mr-2">
                    <i class="nav-icon i-Billing font-weight-bold" title="Print"></i>
                    </a >`) : '';

    return actionsHtml;
}

function WindowOpen(Url) {
    window.open(Url, "_blank", "location=yes,width=520,height=570,scollbar=yes,status=yes");
}
function ShowModal(url, tableId, rowName, status) {
    dataUrl = url;
    if (status == "active") {
        swal({
            title: rowName,
            text: "Are you sure, You want to Active ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0CC27E',
            cancelButtonColor: '#FF586B',
            confirmButtonText: 'Yes, Active it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success mr-5',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function () {
            ActivateRecord(tableId);
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal('Cancelled', 'There is no change in data', 'info');
            }
        });
    }
    if (status == "inactive") {
        swal({
            title: rowName,
            text: "Are you sure, You want to Inactive ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0CC27E',
            cancelButtonColor: '#FF586B',
            confirmButtonText: 'Yes, Inactive it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success mr-5',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function () {
            DeactivateRecord(tableId);
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal('Cancelled', 'There is no change in data', 'info');
            }
        });
    }

    if (status == "cancelled") {
        swal({
            title: rowName,
            text: "Are you sure, You want to Cancel ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0CC27E',
            cancelButtonColor: '#FF586B',
            confirmButtonText: 'Yes, Cancelled it!',
            cancelButtonText: 'No!',
            confirmButtonClass: 'btn btn-success mr-3',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function () {
            DeactivateRecord(tableId);
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal('Cancelled', 'There is no change in data', 'info');
            }
        });
    }
}

