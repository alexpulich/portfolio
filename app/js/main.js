var Validation = (function() {

    function _setUpListeners() {
        $('form').on('keydown', '.error-input', _removeError);
        $('form').on('change', '#upload', _removeErrorUpload);
        $('form').on('reset', _clearForm);
    }


    function _validateForm(form) {
        //dog-nail for upload input
        function _uploadDogNail() {
            var mask = $('.mask');
            if (mask.length > 0) {
                var upl = $('#upload');
                if (upl.val().length < 1) {
                    mask.addClass('error-input');
                    var fakeInput = $('.file-input-text');
                    fakeInput.addClass('error-fake-input');
                    valid = false;
                }
            }
        }

        var elements = form.find('input, textarea').not("#reset").not("#submit"),
            valid = true;

        $.each(elements, function(index, val) {
            var element = $(val),
                val = element.val(),
                pos = element.attr('qtip-position');

            if (val.length < 1) {
                element.addClass('error-input');
                _createTooltip(element, pos);
                valid = false;
            }
            _uploadDogNail();

        });
        return valid;

    }

    function _removeError() {
        $(this).removeClass('error-input');
    }

    function _clearForm(form) {
        var form = $(this);
        form.find('input, textarea').trigger('hideTooltip');
        form.find('.error-input').removeClass('error-input');
    }

    // remove highlight and qtip from upload field
    function _removeErrorUpload() {
        var mask = $('.mask');
        var fakeInput = $('.file-input-text');
        mask.removeClass('error-input');
        fakeInput.removeClass('error-fake-input');
        $('#upload').trigger('hideTooltip');
    }

    function _clearPopupForm(form) {
        form.find('input, textarea').trigger('hideTooltip');
        form.find('.error-input').removeClass('error-input');
        form.find('.file-input-text').removeClass('error-fake-input');
    }

    function _createTooltip(element, position) {
        if (position === 'right') {
            position = {
                my: 'left center',
                at: 'right center'
            }
        } else {
            position = {
                my: 'right center',
                at: 'left center',
                adjust: {
                    method: 'shift none'
                }
            }
        }

        element.qtip({
            content: {
                text: function() {
                    return $(this).attr('qtip-content');
                }
            },
            show: {
                event: 'show'
            },
            hide: {
                event: 'keydown hideTooltip'
            },
            position: position,
            style: {
                classes: 'qtip-mystyle qtip-rounded',
                tip: {
                    height: 10,
                    width: 16
                }
            }
        }).trigger('show');
    }

    return {
        init: function() {
            _setUpListeners();
        },
        validateForm: function(form) {
            _validateForm(form);
        },
        clearPopupForm: function(form) {
            _clearPopupForm(form);
        }
    }

})();

// 
// ContactsForm module
// 
var ContactForm = (function() {

    function _setUpListeners() {
        $('#contacts-form').on('submit', _submitForm);
    }

    function _submitForm(ev) {
        ev.preventDefault();

        var form = $(this),
            url = '/send-mail.php',
            defObject = _ajaxForm(form, url);

        if (defObject) {
            defObject.done(function(resp) {
                var msg = resp.msg,
                    status = resp.status;

                if (status === 'OK') {
                    form.trigger('reset');
                }
            });
        }
    }

    function _ajaxForm(form, url) {
        if (!Validation.validateForm(form)) return false;

        var data = form.serialize();

        return $.ajax({
            type: 'POST',
            url: url,
            dataType: 'JSON',
            data: data
        }).fail(function(resp) {
            console.log('Something is gone wrong');
        })
    }


    return {
        init: function() {
            _setUpListeners();
        }
    }

})();


var AddProjectForm = (function() {

    function _setUpListeners() {
        $('#add-project-form').on('submit', _submitForm);
    }

    function _submitForm(ev) {
        ev.preventDefault();

        var form = $(this),
            url = '/add-projectsdf.php',
            defObject = _ajaxForm(form, url);

        if (defObject) {
            defObject.done(function(resp) {
                var msg = resp.msg,
                    status = resp.status;

                if (status === 'OK') {
                    form.trigger('reset');
                    $('.popup-success').show();
                }
            });
        }
    }

    function _ajaxForm(form, url) {
        if (!Validation.validateForm(form)) return false;

        var data = form.serialize();

        return $.ajax({
            type: 'POST',
            url: url,
            dataType: 'JSON',
            data: data
        }).fail(function(resp) {
            console.log('Something is gone wrong');
        })
    }


    return {
        init: function() {
            _setUpListeners();
        }
    }

})();


//
//
//

var LoginForm = (function() {

    function _setUpListeners() {
        $('#login-form').on('submit', _submitForm);
    }

    function _submitForm(ev) {
        ev.preventDefault();

        var form = $(this),
            url = '/login.php',
            defObject = _ajaxForm(form, url);

        if (defObject) {
            defObject.done(function(resp) {
                var msg = resp.msg,
                    status = resp.status;

                if (status === 'OK') {
                    form.trigger('reset');
                }
            });
        }
    }

    function _ajaxForm(form, url) {
        if (!Validation.validateForm(form)) return false;

        var data = form.serialize();

        return $.ajax({
            type: 'POST',
            url: url,
            dataType: 'JSON',
            data: data
        }).fail(function(resp) {
            console.log('Something is gone wrong');
        })
    }


    return {
        init: function() {
            _setUpListeners();
        }
    }

})();


// 
//fix for fake upload placeholder
// 
var UploadFix = (function() {
    // Setting up listening if user has chose a file
    function _setUpListeners() {
        $('#upload').on('change', _showPlaceholder);
    }

    // adding a placeholder text
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

// 
//margin fixing for 3rd element in IE
// 
var Projects = (function() {
    var _thirdChild = $(".projects-item:nth-child(3n)");
    var _after = $('.projects-item:nth-child(3n+1)')

    function _fixMargin() {
        _thirdChild.css("margin-right", "0");
    }

    function _fixFloat() {
        _after.css("clear", "both");
    }

    return {
        init: function() {
            _fixMargin();

        }
    }

})();

// 
// fixes for placeholder in ie
// 
var FixPlaceholders = (function() {
    function _fixPlaceholders() {
        $('input, textarea').placeholder();
    }

    return {
        init: function() {
            _fixPlaceholders();
        }
    }
})();
// 
//Popup showing and hiding module
// 
var Popup = (function() {
    var _popup = $('#popup-project');

    function _popupShow() {
        _popup.fadeIn(300);
    }

    function _popupHide() {
        var form = $('form');
        Validation.clearPopupForm(form);
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


$(document).ready(function() {

    if ($.find('#upload').length > 0) {
        UploadFix.init();
    }

    if ($.find('#popup-project').length > 0) {
        Popup.hide();
    }

    if ($.find('.projects-item').length > 0) {
        Projects.init();
    }

    if ($.find('form').length > 0) {
        Validation.init();
        FixPlaceholders.init();
    }

    if ($.find('#contacts-form').length > 0) {
        ContactForm.init();
    }

    if ($.find('#add-project-form').length > 0) {
        AddProjectForm.init();
    }

    if ($.find('#login-form').length > 0) {
        LoginForm.init();
    }
    $('input, textarea').placeholder();
});
