var BranchId = 0;

function additionalInfo() {
    return {
        //BranchId: BranchId,
        //start: $("#start").val(),
        //end: $("#end").val(),
    }
}

function onSelectBranch(e) {

    var treeDataItem = $("#BranchTree").data("kendoTreeView").dataItem(e.node);
    BranchId = treeDataItem.id;
    

}


function ddTimeSpanChangeEventHandler() {
    var startDate = new Date();
    var endDate = new Date();
    var interval = $("#ddTimeSpanSummaryFilter").val();
    if (interval == 'today') {
        $('#start').data('kendoDatePicker').enable(false);
        $('#end').data('kendoDatePicker').enable(false);

        $("#start").data("kendoDatePicker").value(startDate);
        $("#end").data("kendoDatePicker").value(endDate);
    }
    else if (interval == 'last_week') {
        startDate.setDate(startDate.getDate() - 7);
        $('#start').data('kendoDatePicker').enable(false);
        $('#end').data('kendoDatePicker').enable(false);

        $("#start").data("kendoDatePicker").value(startDate);
        $("#end").data("kendoDatePicker").value(endDate);
    }
    else if (interval == 'last_month') {
        startDate.setMonth(startDate.getMonth() - 1);
        $('#start').data('kendoDatePicker').enable(false);
        $('#end').data('kendoDatePicker').enable(false);


        $("#start").data("kendoDatePicker").value(startDate);
        $("#end").data("kendoDatePicker").value(endDate);
    }
    else if (interval == 'yesterday') {
        startDate.setDate(startDate.getDate() - 1);
        endDate.setDate(endDate.getDate() - 1);
        $('#start').data('kendoDatePicker').enable(false);
        $('#end').data('kendoDatePicker').enable(false);

        $("#start").data("kendoDatePicker").value(startDate);
        $("#end").data("kendoDatePicker").value(endDate);
    }

    else if (interval == 'custom') {
        $('#start').data('kendoDatePicker').enable(true);
        $('#end').data('kendoDatePicker').enable(true);
    }
}


function retrieveDatewise() {
   
    //if (!$("#start").val()) { ddTimeSpanChangeEventHandler(); return; }
    //if (!$("#end").val()) { ddTimeSpanChangeEventHandler(); return; }

    
        var grid = $("#DatewiseBusinessSummaryGrid").data("kendoGrid");
        grid.dataSource.read();
   
}


function retrieveTrend() {

    if (!$("#start").val()) { ddTimeSpanChangeEventHandler(); return; }
    if (!$("#end").val()) { ddTimeSpanChangeEventHandler(); return; }


    var graph = $("#TrendGraph").data("kendoChart");
    var url = "../api/Reports/GetTrendeSummaryReports/?BranchId=" + BranchId + "&start=" + $("#start").val() + "&end=" + $("#end").val();

    graph.dataSource.transport.options.read.url = url;
    graph.dataSource.read();

}