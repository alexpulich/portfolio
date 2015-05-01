var Validation = (function() {

    var _setUpListeners = function() {
        $('form').on('keydown', '.error-input', _removeError);
        $('form').on('reset', _clearForm);
        $('form').on('change', '#fileupload', _removeErrorUpload);
    },

    _validateForm = function(form) {

        var elements = form.find('input, textarea').not('#reset')
                                                   .not('[type="submit"]')
                                                   .not('[type="hidden"]')
                                                   .not('[type="file"]'),
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

        });
        return valid;

    },

    _removeError = function() {
        $(this).removeClass('error-input');
    },

    _clearForm = function(form) {
        var form = $(this);
        form.find('input, textarea').trigger('hideTooltip');
        form.find('.error-input').removeClass('error-input');
    },

    // remove highlight and qtip from upload field
    _removeErrorUpload = function() {
        var filename = $('#filename');
        filename.removeClass('error-input');
        filename.trigger('hideTooltip');
    },

    _clearPopupForm = function(form) {
        form.find('input, textarea').trigger('hideTooltip');
        form.find('.error-input').removeClass('error-input');
        form.find('.file-input-text').removeClass('error-fake-input');
    },

    _createTooltip = function(element, position) {
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
    };

    return {
        init: _setUpListeners,
        validateForm: _validateForm,
        clearPopupForm:_clearPopupForm
    }

})();

// 
// ContactsForm module
// 
var ContactForm = (function() {

    var _setUpListeners = function() {
        $('#contacts-form').on('submit', _submitForm);
    },

    _submitForm = function(ev) {
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
    },

    _ajaxForm = function(form, url) {
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
        init: _setUpListeners
    }

})();


var AddProjectForm = (function() {

    var _setUpListeners = function() {
        $('#add-project-form').on('submit', _submitForm);
    },

    _submitForm = function(ev) {
        ev.preventDefault();

        var form = $(this),
            url = '/add-projects.php',
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
    },

    _ajaxForm = function(form, url) {
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
        init: _setUpListeners
    }

})();


//
//
//

var LoginForm = (function() {

    var _setUpListeners = function() {
        $('#login-form').on('submit', _submitForm);
    },

    _submitForm = function(ev) {
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
    },

    _ajaxForm = function(form, url) {
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
        init: _setUpListeners
    }

})();


// 
//fix for fake upload placeholder
// 
var UploadFix = (function() {
    // Setting up listening if user has chose a file
    var _setUpListeners = function() {
        $('#fileupload').on('change', _showPlaceholder);
    },

    // adding a placeholder text
    _showPlaceholder = function(ev) {
        ev.preventDefault();

        var realVal = $(this).val(),
            lastIndex = realVal.lastIndexOf('\\') + 1;

        if (lastIndex !== -1) {
            realVal = realVal.substr(lastIndex);
            $('#filename').val(realVal);
        }
    }

    return {
        init: _setUpListeners
    }

})();

// 
//margin fixing for 3rd element in IE
// 
var Projects = (function() {
    var _after = $('.projects-item:nth-child(3n+1)'),

    _fixMargin = function() {
        _after.css("margin-left", "0");
    },

    _fixFloat = function() {
        _after.css("clear", "both");
    }

    return {
        init: _fixMargin
    }

})();

// 
// fixes for placeholder in ie
// 
var FixPlaceholders = (function() {
    var _fixPlaceholders = function() {
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
    var _popup = $('#popup-project'),

    _popupShow = function() {
        _popup.fadeIn(300);
        $('input, textarea').placeholder();
    },

    _popupHide = function() {
        var form = $('form');
        Validation.clearPopupForm(form);
        _popup.fadeOut(300);
    }

    return {
        show: _popupShow,

        hide: _popupHide
    }

})();


$(document).ready(function() {

    if ($.find('#uploadfile').length > 0) {
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
});