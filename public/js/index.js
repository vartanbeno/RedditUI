$(document).ready(function() {
    $("input:radio[name=sort]").change(function() {
        if (this.value == "top") {
            $("#timespan").show();
            $("#time").prop("required", true);
            $("#showstickied").hide();
            $("input:radio[name=sticky]").prop("required", false);
        }
        else if (this.value == "hot") {
            $("#timespan").hide();
            $("#time").prop("required", false);
            $("#showstickied").show();
            $("input:radio[name=sticky]").prop("required", true);
        }
        else {
            $("#timespan").hide();
            $("#time").prop("required", false);
            $("#showstickied").hide();
            $("input:radio[name=sticky]").prop("required", false);
        }
    })
})