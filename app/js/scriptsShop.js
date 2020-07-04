$("document").ready(function(){
    $('.nmb-arrow').click(function(){
      var $wrapper = $(this).closest('.nmb');
      var $input = $wrapper.find('.nmb-input');

      var value = +$input.val();
      var valueNew;
      if(value== '' || isNaN(value)){
            $input.val(1);
            return false;
      }
      if($(this).hasClass('nmb-arrow--plus')){
        valueNew = value + 1;
      }
      //minus
      else{
        if (value<=1)
          return false;
        else
          valueNew = value - 1;
      }
      $input.val(valueNew);
      if (typeof (ProductCntChange) === "function") 
        ProductCntChange($wrapper);
      if (typeof (cartChangeProductCnt) === "function") 
        cartChangeProductCnt();
      
    });
    $('.j-toCart').click(function(){
      addToCart($(this));
    });
});//end ready

function addToCart($product){
  var $wrapper = $product.closest('.j-product');

  var id = $wrapper.attr('data-id');
  var count = 1;

  var propSize;

  var $sizeSelect = $wrapper.find('.j-productSize');
  //propSize = $sizeSelect.val();
  propSize = $sizeSelect.attr('data-prop');

  var prop = {};
  if(propSize)
    prop['SIZE'] = propSize;

  console.log({action:"BUY",count:count,id:id,prop:prop});
  animationToCart($product);

  //php doesn-t working
  /*$.post(
        'app/ajax_toBasket.php',
        {action:"BUY",count:count,id:id,prop:prop}
        )
        .done(function (Res) {
            var res = JSON.parse(Res);
            console.log(res);
            $product.hide().next('.j-added').addClass('j-added--show');
            cartTopUpdate(res);
  });*/
  $product.hide().next('.j-added').addClass('j-added--show');
  cartTopUpdate({cnt:3,sum:3350,word:'товара'});
}

function cartTopUpdate(cart){
  $('.hCartSmall-cnt,.cartTop-cnt').text(cart.cnt);
  $('.cartTop-word').text(cart.word);
  $('.cartTop-sum').text(cart.sum);

}
