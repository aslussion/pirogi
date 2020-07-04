var $contacts;
$("document").ready(function(){
  stepsAll();
  cartCalc();

  $('.j-pay').change(function(){
    payChange();
  });
  $('.j-deliDay,.j-deliTime').change(function(){
    deliChange();
  });

  $contacts = $('.j-contact[required]');//поля, обязательные для заполнения
  $contacts.change(function(){
    contactChange($(this));
  });

  $('.j-product-delete').click(function(){
        var $product = $(this).closest('.j-productCart');
        var id = $product.attr('data-id');
        var data = {id:id};
        /*$.ajax({  
            type: 'GET',
            url: '/ajax/product-delete.php',  
            data: data, 
            success: function(html_res){
                //console.log(html_res);
                $product.remove();
                var products = $('.j-product-delete').length;
                if(products==0)
                    window.location.reload();
                else
                    cartRecalc();
            },
          });*/


        $product.remove();
                var products = $('.j-product-delete').length;
                if(products==0)
                    window.location.reload();
                else
                    cartChangeProductCnt();

        return false;
  });

  $('.datepickerCart').datepicker({
    minDate:0, //не позднее сегодняшнего дня
  });


});//end ready

//пересчет цены итого
function cartCalc(){
  var sumProducts = +$('.j-sumProducts').text();
  var sumDeli = +$('.j-sumDeli').text();
  var sumSale = +$('.j-sumSale').text();
  var sumTotal = sumProducts + sumDeli + sumSale;
  $('.j-sumTotal').text(sumTotal);

}

//изм-е способа оплаты
function payChange(){
  if($('.j-pay:checked').length)
    stepDone(1);

}
//заполнение данных доставки
function deliChange(){
  if($('.j-deliDay').val() && $('.j-deliTime').val())
    stepDone(0);
}
function contactChange($contact){
  if($contact.val())
    $contact.addClass('filled');
  else
    $contact.removeClass('filled');
  //console.log($('.j-contact[required]:not(.filled)').length);
  if(!$('.j-contact[required]:not(.filled)').length)
    stepDone(2);
  else
    stepUnDone(2);
}

//шаг заполнен
function stepDone(nmb){
  $('.cartAside-step').eq(nmb).addClass('cartAside-step--done');
  stepsAll();
}
//шаг не заполнен
function stepUnDone(nmb){
  $('.cartAside-step').eq(nmb).removeClass('cartAside-step--done');
  stepsAll();
}


function stepsAll(){
  var $btn = $('.j-orderBtn');
  if($('.cartAside-step:not(.cartAside-step--done)').length){
    $btn.prop('disabled', true);
  }
  else{
    $btn.prop('disabled', false);
  }

}

function cartChangeProductCnt(){
  var $products = $('.j-productCart');
  var productsSumm = 0;
  var productsCnt = 0;
  var productsCnt = $products.length;
  $products.each(function(){
        var  productPrice = +$(this).find('.j-product-price').text();
        var  productCnt = +$(this).find('.nmb-input').val();
        productsSumm += productPrice*productCnt;
        //productsCnt += productCnt;
  });
  $('.j-sumProducts').text(productsSumm);
  $('.j-productsCnt').text(productsCnt);

  cartCalc();
}