//fix for fake upload placeholder
var UploadFix = (function() {
  
  function _setUpListeners() {
    $('#upload').on('change', _showPlaceholder);
  }

  function _showPlaceholder(ev) {
    ev.preventDefault();

    var realVal = $(this).val(),
        lastIndex = realVal.lastIndexOf('\\') + 1;

    if (lastIndex !== -1) {
      realVal = realVal.substr(lastIndex);
      $(this).prev('.mask').find('.file-input-text').val(realVal);
    }
  }

  return {
    init: function() {
      _setUpListeners();
    }
  }
  
})();


//margin fixing for 3rd element in IE
var Projects = (function() {
  var _thirdChild = $(".projects-item:nth-child(3n)");
  var _after = $(".projects-item:nth-child(3n+1)");

  function _fixMargin() {
    _thirdChild.css("margin-right", "0");
  }

  function _fixFloat() {
    _after.css("clear", "both");
  }

  return {
    init: function() {
      _fixMargin();
      _fixFloat();
    }
  }

})();


//Popup showind and hiding module
var Popup = (function() {
  var _popup = $('#popup-project');
  
  function _popupShow() {
    _popup.fadeIn(300);
  }
  
  function _popupHide() {
    _popup.fadeOut(300);
  }

  return {
    show: function() {
      _popupShow();
    },

    hide: function() {
      _popupHide();
    }
  }

})();


$(document).ready(function(){
  Projects.init();
  Popup.hide();
  UploadFix.init();
  $('input, textarea').placeholder();
});
