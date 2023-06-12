$(document).ready(function () {

    var hashes = window.location.href.slice(window.location.href.indexOf('?'))
    var i=hashes.indexOf(":")+1
    var j=hashes.indexOf(",")

    var pid=hashes.slice(i,j)

    $.getJSON('/fetch_cart',function (data) {
     //alert(data.data)
        var cart=JSON.parse(data.data)
     var key=Object.keys(cart)
       $('#shoppingcart').html(`(${key.length} Articals) &nbsp;&nbsp;&nbsp;`)

      //  alert(key.includes(pid))
      if(key.includes(pid)) {
   $('.addtocart').hide()
    $('#qtycomponent').show()
          $('#qty').html(cart[pid]['qty'])
      }
    else
      {$('#qtycomponent').hide()}
    })


    $("#user-menu-button").click(function () {
        $('#dropdown').toggle()

    })
    $.getJSON('http://localhost:8000/fetch_all_user_category', function (data) {

        var htm = ''
        data.data.map((item) => {
            htm += `<li><a href="#" >${item.categoryname}</a></li>`
        })

        $('.menu').html(htm)

    })

    $.getJSON('http://localhost:8000/fetch_all_products', function (data) {
        htm = ''
        data.data.map(item => {

            var price
            var offerprice
            var save
            if (item.offerprice > 0) {
                price = "<s style='color: red;'>" + item.price + "</s>"
                offerprice = item.offerprice
                save = item.price - item.offerprice
            } else {
                offerprice = item.price

                price = "<div>" +
                    "</div>"
                save = "<div>" +
                    "</div>"
            }

            var data = JSON.stringify(item)

            htm += `<a href='http://localhost:8000/buy_products?product=${data}'>

           <div style=" border-radius:10px; margin:10px;display: flex; flex-direction: column;align-items: center; width:250px;height:300px;padding: 5px;border:1px solid #bdc3c7;box-shadow: 2px 2px #ecf0f1;elevation: below;">
          <div>
          <img src="http://localhost:8000/static/${item.productimage}" style='width:150px; height: 150px;' >
          </div>
          <div style="padding:5px;">
          <div style="width:200px;font-weight: bolder;text-align: left;">
              ${item.productname} ${item.scname}
           </div>
           
           <div style="width:200px; font-size:10px;text-align: left;">
                <i>Mkt:${item.bname}</i>
             </div>

            <div style="width:200px;font-weight: bolder;text-align: left;">
            MRP:&#8377 ${price}
             </div>
             
         <div style="width:200px;font-weight: bolder;text-align: left;">
           Offer:&#8377 ${offerprice}
         </div>
          
         <div style="width:200px;font-weight:bold;text-align: left; color:green">
          You save &#8377 ${save}
          </div>

          </div>
        </div> </a>`
        })

        $('#productlist').html(htm)

    })

    $.getJSON('http://localhost:8000/fetch_all_subcategory', function (data) {
        var htm = ''
        data.data.map((item) => {
            htm += `<div style="margin: 5px;  padding:10px;  width:350px;  background: #f5f6fa;   height: 80px;   border-radius: 10px;  display: flex; flex-direction: row">`

            htm += `<div style="padding: 6px"> <img src='/static/${item.subcategoryicon}' width="40"></div>`

            htm += `<div style="display:flex; flex-direction: column;">
              <div style="font-weight:bold; padding: 5px">${item.subcategoryname}</div>
               <div style="color: blue;">Save upto 25%</div></div>`

            htm += `</div>`

        })
        htm += ""
        $('#subcategorylist').html(htm)

    })

    $('.plus').click(function () {

        var v = $('#qty').html()
        if (v <= 4)
            v++
        $('#qty').html(v)

         cartContainer($(this).attr('product'),$('#qty').html())

    })

    $('.minus').click(function () {

        var v = $('#qty').html()
        if (v > 0)
            v--

         if(v==0)
    {
    $('.addtocart').show()
    $('#qtycomponent').hide()
         alert($(this).attr('productid'))

          removeCartContainer($(this).attr('productid'))
    }
        else
    {
        cartContainer($(this).attr('product'),$('#qty').html())
    }
    $('#qty').html(v)

    })

    $('.addtocart').click(function() {

        $('.addtocart').hide()
        $('#qtycomponent').show()
        $('#qty').html(1)

        cartContainer($(this).attr('product'), $('#qty').html())

    })

    function cartContainer(product,qty) {

        $.getJSON('/add_to_cart',{'product':product,'qty':qty},function (data) {
            //alert(data.data)
        var cart=JSON.parse(data.data)
     var key=Object.keys(cart)
       $('#shoppingcart').html(`(${key.length} Articals)&nbsp;&nbsp;&nbsp;`)

        })

    }

    function removeCartContainer(productid) {
 $.getJSON('/remove_from_cart', {'productid':productid}, function (data) {
            alert('removed')
     var cart=JSON.parse(data.data)
     var key=Object.keys(cart)
       $('#shoppingcart').html(`(${key.length} Articals)&nbsp;&nbsp;&nbsp;`)

        })
}

})
