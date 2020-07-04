$("document").ready(function(){
  //form
   $('.phoneMask').livequery(function(){
    $(this).inputmask({
        mask: "+7 (999) 999-99-99",
        clearIncomplete: true,
      });
    });
    $(".formAjax").livequery(function(){
      $(this).append('<input type="hidden" name="antispam">');
      $(this).validate({
        rules:{},
        messages:'',
      });
    });

    $(document).on('click', '.formAjax button', function(){
      var form = $(this).closest('form');
        if(form.valid()){
          $.ajax({  
            type: 'GET',
            url: form.attr('action'),  
            data: form.serialize(), 
            success: function(html_res){
              var resText;
              if(html_res == 'success'){
                form.get(0).reset();
                resText = formSucc;
              }
              else if(html_res == 'required'){
                resText = formReq;
              }

              else{
                resText = formErr;
                
              }
              if(resText.length)
                $.fancybox('<div class="fancyText">'+resText+'</div>');
            },
          });
        }
        return false;
    });

    //fancybox
    $('.fancy').fancybox({padding:[30,30,30,30]});

    var owl = $('.j-sliderMain');
              owl.owlCarousel({
                //margin: 10,
                nav: false,/*prev next*/
                navText:false,
                loop: true,
                dots: true,
                //autoplay:true,
                responsive: {//Адаптивность. Кол-во выводимых элементов при определенной ширине.
                  0: {
                    items: 1
                  },
                },
                onInitialized: mainSliderCarouselInitialized
              });

    $('.j-sliderPluses').owlCarousel({
                //margin: 10,
                nav: true,/*prev next*/
                navText:false,
                loop: true,
                dots: false,
                //autoplay:true,
                responsive: {//Адаптивность. Кол-во выводимых элементов при определенной ширине.
                  0: {
                    items: 2
                  },
                },
              });
    $('.j-sliderProducts').owlCarousel({
                margin: 30,
                nav: true,/*prev next*/
                navText:false,
                loop: true,
                dots: true,
                //autoplay:true,
                responsive: {//Адаптивность. Кол-во выводимых элементов при определенной ширине.
                  0: {
                    items: 1
                  },
                  768: {
                    items: 3
                  },
                  1200: {
                    items: 4
                  },
                },
              });
    $('.j-sliderArticles').owlCarousel({
                margin: 30,
                nav: true,/*prev next*/
                navText:false,
                loop: true,
                dots: false,
                //autoplay:true,
                responsive: {//Адаптивность. Кол-во выводимых элементов при определенной ширине.
                  0: {
                    items: 1
                  },
                  768: {
                    items: 2
                  },
                  1200: {
                    items: 3
                  },
                },
              });

    $('.toTheTop').click(function(){
      $('body,html').animate({scrollTop: 0}, 1000);
    });

    //product "select"
    $('.j-productProps .dropdown-item').click(function(){
      var $wrapper = $(this).closest('.j-drop');
      var $product = $(this).closest('.j-product');
      var $selected = $wrapper.find('.j-productSize');
      var price = +$(this).attr('data-price');
      var priceSelected = (price>0) ? price : '';
      $selected.html($(this).html()).attr({'data-prop':$(this).attr('id'),'data-price':priceSelected});
      if(priceSelected){
        $product.find('.j-product-price').text(priceSelected);
      }
    });

    //скрытые по высоте на телефоне блоки
    //высота из другого элемента
    $('.forOpen').each(function(){
      var blockForOpen = $(this);
      var $heightObj = $($(this).attr('data-height-obj'));
      if($heightObj.length){
        $heightObj.load(function() {
          hiddenClsHeight = +$heightObj.height();
          forOpenSetH(blockForOpen,hiddenClsHeight);
        });
      }
      //высота из атрибута
      else{
        hiddenClsHeight = +$(this).attr('data-height');
        forOpenSetH(blockForOpen,hiddenClsHeight);
      }
    });

    //раскрытие-закрытие разделов
    $('.forOpen-ttl div').click(function(){
      var blockForOpen = $(this).closest('.forOpen');
      var textSwitcherO = blockForOpen.find('.forOpen-ttlSwitch--open');
      var textSwitcherH = blockForOpen.find('.forOpen-ttlSwitch--hide');
      
      textSwitcherO.show();
      textSwitcherH.hide();

        if(blockForOpen.hasClass('bFopen')){
            blockForOpen.removeClass('bFopen');
            var hiddenClsHeight = blockForOpen.attr('height-cls');
            blockForOpen.find($('.forOpen-hidden')).css('height',hiddenClsHeight);
        }
        else{
          textSwitcherH.show();
          textSwitcherO.hide();
            blockForOpen.addClass('bFopen');
            var hidden_height = blockForOpen.find('.forOpen-hiddenHeight').css('height');
            blockForOpen.find($('.forOpen-hidden')).css('height',hidden_height);
        } 

    });
    // конец скрытых по высоте на телефоне блоков


    //раскрытие-закрытие разделов
    $('.accord-ttl').click(function(){
        var block_for_open = $(this).closest('.accord');
        if(block_for_open.hasClass('accord--open')){
            block_for_open.removeClass('accord--open');
            block_for_open.find($('.accord-hidden')).slideUp('fast');
        }
        else{
            block_for_open.addClass('accord--open');
            block_for_open.find($('.accord-hidden')).slideDown('fast');
        } 
    });
    //открытие всех блоков, которые должны быть открыты по умолчанию
    $('.accord.accord--open').each(function(indx,elem){
      $(elem).find($('.accord-hidden')).css('display','block');
    });

    $('.datepicker').datepicker();

});//end ready

function mainSliderCarouselInitialized(){
  $('.j-sliderMain').find('.owl-dots').addClass('bin');
}

function forOpenSetH(blockForOpen,hiddenClsHeight){
          if(hiddenClsHeight>0){
                //blockForOpen.find('.forOpen-hidden').css('height',hiddenClsHeight);
          }
          else{
              //высота из стилей
              hiddenClsHeight = blockForOpen.find('.forOpen-hidden').css('height');
          }

          var hMax = +blockForOpen.find('.forOpen-hiddenHeight').height();//alert(hMax);
          if(hMax>hiddenClsHeight){
            blockForOpen.attr('height-cls',hiddenClsHeight);
            blockForOpen.find('.forOpen-hidden').css('height',hiddenClsHeight);
          }
          else{
            blockForOpen.find('.forOpen-ttl').hide();
            blockForOpen.find('.forOpen-hidden').css('height','auto');
          }

}

function animationToCart(btn){
  var butWrap = btn.parents('.cartWrapper'); /* Запоминаем враппер кнопки */
  butWrap.append('<div class="animateToCart"></div>'); /* Добавляем во враппер кружок, который будет анимирован и улетать от кнопки в корзину */
  aniOff = animPosition($('.animateToCart'));
  //console.log(aniOff);
  $('.animateToCart').animate({ top: aniOff.top, left: aniOff.left, width: 0, height: 0 }, 2000, function(){
     //Делаем анимацию полёта кружка от кнопки в корзину и по окончанию, удаляем его 
    $(this).remove();
  });
}

function animPosition(anim){
  var width = $(window).width();

  var offset = anim.offset();

  var left = width-offset.left;
  return {top:-offset.top + 'px',left:left + 'px'}
}