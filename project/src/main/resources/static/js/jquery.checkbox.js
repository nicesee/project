var ID_ARR = [];
function isChecked(attrID) {
    var index = $.inArray(parseInt(attrID), ID_ARR);
    var checkedStr = '';
    if(index >= 0) {
        checkedStr = 'checked';
    }
    return checkedStr;
}
function clickCheckbox(attrID) {
    var isChecked = $('input[attr-id="' + attrID + '"]').prop('checked');
    if (isChecked) {
        var index = $.inArray(parseInt(attrID), ID_ARR);
        if (index < 0) {
            ID_ARR.push(parseInt(attrID));
        }
    } else {
        var index = $.inArray(parseInt(attrID), ID_ARR);
        if (index >= 0) {
            ID_ARR.splice(index, 1);
        }
    }
}
$.fn.extend({
    checkbox: function() {
        var o = $(this);
        o.find("thead tr th input, tfoot tr td input").click(function() {
            var isChecked = $(this).prop('checked');
            $(this).parents(".table").find('tr input').prop('checked', isChecked);
            if(isChecked) {
                o.find('tbody tr').each(function() {
                    var input = ($(this).find('td:eq(0) input'))[0];
                    if(input.checked) {
                        var attrID = $(input).attr('attr-id');
                        if(attrID != null) {
                            var index = $.inArray(parseInt(attrID), ID_ARR);
                            if(index < 0) {
                                ID_ARR.push(parseInt(attrID));
                            }
                        }
                    }
                });
            } else {
                o.find('tbody tr').each(function() {
                    var input = ($(this).find('td:eq(0) input'))[0];
                    if(!(input.checked)) {
                        var attrID = $(input).attr('attr-id');
                        if(attrID != null) {
                            var index = $.inArray(parseInt(attrID), ID_ARR);
                            if(index >= 0) {
                                ID_ARR.splice(index, 1);
                            }
                        }
                    }
                });
            }
        });
    }
});
