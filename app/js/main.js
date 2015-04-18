//fix for IE8 to make projects seem 3-inline
$(".projects-item:nth-child(3n)").css("margin-right", "0");

//fix for fake upload pic placeholder
$(document).ready(function() {
   $('#upload').on('change', function() {
      var realVal = $(this).val();
      var lastIndex = realVal.lastIndexOf('\\') + 1;
      if(lastIndex !== -1) {
         realVal = realVal.substr(lastIndex);
         $(this).prev('.mask').find('.file-input-text').val(realVal);
      }
   });
});

$(document).ready(function(){
        //Скрыть PopUp при загрузке страницы    
        PopUpHide();
});
//Функция отображения PopUp
function PopUpShow(){
  $("#popup-project").fadeIn(300);
}
//Функция скрытия PopUp
function PopUpHide(){
  $("#popup-project").fadeOut(300);
}