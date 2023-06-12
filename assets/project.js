$(document).ready(function () {
    $.getJSON('http://localhost:8000/fetch_all_category_json', function (data) {
        var records=data.data
        records.map((item) => {

            $('#categoryid').append($("<option>").text(item.categoryname).val(item.categoryid))

        })
          $('select').formSelect();

    })

    $('#categoryid').change(function (){
        $('#subcategoryid').empty()



        $.getJSON("http://localhost:8000/fetch_all_subcategory_json",{categoryid:$('#categoryid').val()},function (data){
       alert(JSON.stringify(data))
        $('#subcategoryid').append($("<option>").text('Select SubCategory'))


        var records=data.data

            records.map((item)=>{

            $('#subcategoryid').append($("<option>").text(item.subcategoryname).val(item.subcategoryid))
        })

        $('select').formSelect();

        })
    })

    $('#subcategoryid').change(function () {

        $('#brandid').empty()
        $('#brandid').append($("<option>").text('Select'))

        $.getJSON("http://localhost:8000/fetch_all_brand_json", { categoryid: $('#categoryid').val(),subcategoryid: $('#subcategoryid').val() }, function (data) {

            var records = data.data
            alert(JSON.stringify(records))
            records.map((item) => {

                $('#brandid').append($("<option>").text(item.brandname).val(item.brandid))
            })
            $('select').formSelect();
        })
    })

    $('#brandid').change(function () {
        $('#productid').empty()
        $('#productid').append($("<option>").text('Select'))

        $.getJSON("http://localhost:8000/fetch_all_products_json", { categoryid: $('#categoryid').val(), subcategoryid: $('#subcategoryid').val(),brandid: $('#brandid').val() }, function (data) {
            var records = data.data

            records.map((item) => {

                $('#productid').append($("<option>").text(item.productname).val(item.productid))
            })
            $('select').formSelect();
        })
    })





})










