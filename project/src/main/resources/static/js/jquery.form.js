$.fn.extend({
    submit: function(url, callback) {
        var o = $(this);
        var param = o.serializeJson();
        //获取多选值
        var name = o.find($("[multiple]")).attr("name");
        if(name != null) {
            var s = "";
            var value = o.find($("[multiple] option:selected"));
            for(var i=0;i<value.length;i++) {
                s += value[i].value + ","
            }
            param[name] = s.substring(0, s.length - 1);
        }
        post(url, param, function(data, status) {
            callback(data, status);
        });
    },
    serializeJson: function() {
        var serializeObj = {};
        $(this.serializeArray()).each(function(){
            serializeObj[this.name] = this.value;
        });
        return serializeObj;
    },
    form: function(options, callback) {
        var o = $(this);
        o.find('.modal-title').text(options.title);
        var form = o.find('form .modal-body');
        form.empty();
        if(options.id != '') {
            form.append('<div class="form-group" hidden="hidden">' +
                        '<input type="text" name="id" value="'+options.id+'" class="form-control" placeholder="">' +
                        '</div>');
        }
        for(var i=0;i<options.items.length;i++) {
            var validSplit = '：';
            var item = options.items[i];
            if(item.valid) {
                validSplit = '<span class="color-error">（*）</span>：';
            }
            if(item.type == 'text' || item.type == 'password') {
                form.append('<div class="form-group">' +
                            '<label>'+item.label+validSplit+'</label>' +
                            '<input type="'+item.type+'" name="'+item.name+'" value="' + item.value + '" class="form-control" placeholder="">' +
                            '</div>');
            } else if(item.type == 'number') {
                form.append('<div class="form-group">' +
                            '<label>'+item.label+validSplit+'</label>' +
                            '<input type="'+item.type+'" name="'+item.name+'" value="' + ((item.value == '') ? 0 : item.value) + '" class="form-control" placeholder="">' +
                            '</div>');
            } else if(item.type == 'select') {
                var content = '';
                content += '<div class="form-group">';
                content += '<label>'+item.label+validSplit+'</label>';
                content += '<select name="'+item.name+'" value="'+item.value+'" class="selectpicker form-control" data-live-search="true">';
                //if(item.options) {
                //    for(var j=0;j<item.options.length;j++) {
                //        if(item.value == item.options[j].id) {
                //            content += '<option selected value="'+item.options[j].id+'">'+item.options[j].name+'</option>';
                //        } else {
                //            content += '<option value="'+item.options[j].id+'">'+item.options[j].name+'</option>';
                //        }
                //    }
                //}
                content += '</select>';
                content += '</div>';
                form.append(content);

                o.find('select[name="'+item.name+'"]').select({
                    url: item.url,
                    name: item.name,
                    value: item.value,
                    display: item.display,
                    param: item.param,
                    options: item.options
                });
            } else if(item.type == 'date') {
                form.append('<div class="form-group">' +
                            '<label>'+item.label+validSplit+'</label>' +
                            '<input type="text" name="'+item.name+'" value="' + (item.value == '' ? moment().format('YYYY-MM-DD') : moment(item.value).format('YYYY-MM-DD')) + '" class="form-control">' +
                            '</div>');
                $('input[name="'+item.name+'"]').datepicker({
                    format: 'yyyy-mm-dd'
                });
            } else if(item.type == 'datetime') {
                form.append('<div class="form-group">' +
                '<label>'+item.label+'：</label>' +
                '<input type="text" name="'+item.name+'" value="' + (item.value == '' ? moment().format('YYYY-MM-DD HH:mm') : moment(item.value).format('YYYY-MM-DD HH:mm')) + '" class="form-control">' +
                '</div>');
                $('input[name="'+item.name+'"]').datetimepicker({
                });
            } else if(item.type == 'textarea') {
                form.append('<div class="form-group">' +
                            '<label>'+item.label+validSplit+'</label>' +
                            '<textarea class="form-control" rows="2" name="' + item.name + '" placeholder="' + (item.placeholder == null ? '' : item.placeholder) + '">' + item.value + '</textarea>' +
                            '</div>');
            } else if(item.type == 'hidden') {
                form.append('<div class="form-group" hidden="hidden">' +
                            '<input type="text" name="' + item.name + '" value="'+item.value+'" class="form-control" placeholder="">' +
                            '</div>');
            } else if(item.type == 'readonly') {
                form.append('<div class="form-group">' +
                '<label>'+item.label+validSplit+'</label>' +
                '<input type="text" name="' + item.name + '" value="'+item.value+'" readonly="readonly" class="form-control" placeholder="">' +
                '</div>');
            } else if(item.type == 'file') {
                form.append('<div class="form-group">' +
                            '<label>'+item.label+validSplit+'</label>' +
                            '<input type="'+item.type+'" name="'+item.name+'" class="file form-control">' +
                            '</div>');
            } else if(item.type == 'texts') {
                var items_ = item.items;
                var content = '<div class="row">';
                var items_length = items_.length;
                var col_md = 12 / items_length;
                for(var j=0;j<items_length;j++) {
                    var item_ = items_[j];
                    if(item_.valid) {
                        validSplit = '<span class="color-error">（*）</span>：';
                    }else {
                        validSplit = '：';
                    }
                    content += '<div class="form-group col-md-' + col_md + '">';
                    content += '<label>' + item_.label + validSplit+'</label><input type="' + item_.type + '" name="' + item_.name + '" value="' + item_.value + '" class="form-control" placeholder="">';
                    content += '</div>';
                }
                content += '</div>';
                form.append(content);
            } else if(item.type == 'checkboxs') {
                var items_ = item.items;
                var content = '<div class="checkbox">';
                for(var j=0;j<items_.length;j++) {
                    var item_ = items_[j];
                    if(item_.valid) {
                        validSplit = '<span class="color-error">（*）</span>：';
                    }else {
                        validSplit = '：';
                    }
                    content += '<label class="checkbox-inline"><input type="checkbox" name="' + item_.name + '" ' + (item_.value ? "checked" : "") + '> ' + item_.label + '</label>';
                }
                content += '</div>';
                form.append(content);
            } else if(item.type == 'mix') {
                var items_select = [];
                var items_date = [];
                var items_ = item.items;
                var content = '<div class="row">';
                var items_length = items_.length;
                var col_md = 12 / items_length;
                for(var j=0;j<items_length;j++) {
                    var item_ = items_[j];
                    if(item_.valid) {
                        validSplit = '<span class="color-error">（*）</span>：';
                    }else {
                        validSplit = '：';
                    }
                    if(item_.type == 'select') {
                        content += '<div class="form-group col-md-' + col_md + '">';
                        content += '<label>'+item_.label+validSplit+'</label>';
                        content += '<select name="'+item_.name+'" value="'+item_.value+'" class="selectpicker form-control" data-live-search="true">';
                        if(item_.options) {
                            for(var k=0;k<item_.options.length;k++) {
                                if(item_.value == item_.options[k].id) {
                                    content += '<option selected value="'+item_.options[k].id+'">'+item_.options[k].name+'</option>';
                                } else {
                                    content += '<option value="'+item_.options[k].id+'">'+item_.options[k].name+'</option>';
                                }
                            }
                            items_select.push(item_);
                        }
                        content += '</select>';
                        content += '</div>';
                    }else if(item_.type == 'text') {
                        content += '<div class="form-group col-md-' + col_md + '">';
                        content += '<label>' + item_.label + validSplit+'</label><input type="' + item_.type + '" name="' + item_.name + '" value="' + item_.value + '" class="form-control" placeholder="">';
                        content += '</div>';
                    }else if(item_.type == 'date') {
                        content += '<div class="form-group col-md-' + col_md + '">';
                        content += '<label>' + item_.label + validSplit+'</label><input type="text" name="'+item_.name+'" value="' + (item_.value == '' ? moment().format('YYYY-MM-DD') : moment(item_.value).format('YYYY-MM-DD')) + '" class="form-control">';
                        content += '</div>';
                        items_date.push(item_);
                    }else if(item_.type == 'number') {
                        content += '<div class="form-group col-md-' + col_md + '">';
                        content += '<label>'+ item_.label + validSplit+'</label><input type="'+item_.type+'" name="'+item_.name+'" value="' + ((item_.value == '') ? '' : item_.value) + '" class="form-control" placeholder="">';
                        content += '</div>';
                    }
                }
                content += '</div>';
                form.append(content);

                for(var l=0;l<items_date.length;l++) {
                    $('input[name="'+items_date[l].name+'"]').datepicker({
                        format: 'yyyy-mm-dd'
                    });
                }

                for(var l=0;l<items_select.length;l++) {
                    o.find('select[name="'+items_select[l].name+'"]').select({
                        url: items_select[l].url,
                        name: items_select[l].name,
                        value: items_select[l].value,
                        display: items_select[l].display,
                        param: items_select[l].param,
                        options: items_select[l].options
                    });
                }
            }
            // valid
            if(item.items) {
                for(var v=0;v<item.items.length;v++) {
                    valid(o, item.items[v]);
                }
            }else {
                valid(o, item);
            }
            function valid(o, item) {
                if(item.valid) {
                    //o.find('form').data('bootstrapValidator').addField(item.name, Valid.get(item.valid, item.label));
                    o.find('form').bootstrapValidator('addField', item.name, Valid.get(item.valid, item.label));
                } else {
                    if(item.type == 'textarea') {
                        o.find('form').bootstrapValidator('addField', item.name, Valid.get('length128', item.label));
                    } else {
                        o.find('form').bootstrapValidator('addField', item.name, Valid.get('length32', item.label));
                    }
                }
            }
        }

        o.modal();
        var buttonSubmit = o.find('#submit');
        buttonSubmit.unbind();
        buttonSubmit.click(function() {
            o.find('form').data('bootstrapValidator').validate();
            if(!(o.find('form').data('bootstrapValidator').isValid())) {
                return;
            }
            buttonSubmit.load();
            if(options.url && options.url != '') {
                o.find('form').submit(options.url, function(data, status) {
                    if(status) {
                        o.modal('hide');
                        callback(data);
                    } else {
                        alert(data.message);
                    }
                    buttonSubmit.reset();
                });
            } else {
                callback(o.find('form').serializeJson());
                o.modal('hide');
                buttonSubmit.reset();
            }
        });
        if(options.close != undefined && options.close == false) {
            var buttonApply = o.find('#apply');
            buttonApply.removeClass('hidden');
            buttonApply.unbind();
            buttonApply.click(function() {
                o.find('form').data('bootstrapValidator').validate();
                if(!(o.find('form').data('bootstrapValidator').isValid())) {
                    return;
                }
                buttonApply.load();
                if(options.url && options.url != '') {
                    o.find('form').submit(options.url, function(data, status) {
                        if(status) {
                            callback(data);
                        } else {
                            alert(data.message);
                        }
                        buttonApply.reset();
                    });
                } else {
                    callback(o.find('form').serializeJson());
                    buttonApply.reset();
                }
            });
        } else {
            o.find('#apply').addClass('hidden');
        }
    },
    select: function(obj, callback) {
        var o = $(this);
        o.selectpicker({
            size: 16
        });
        if(obj.url) {
            var param = obj.param;
            if(param == null) {
                param = {};
            }
            param['p'] = 1;
            o.parent().find('input').on('keyup', function(){
                param['q'] = $(this).val();
                load(param);
            });
            load(param);
            function load(param) {
                post(obj.url, param, function(data, status) {
                    option(o, obj, data.data);
                });
            }
        }else if(obj.options) {
            option(o, obj, []);
        }
        //function option(o, obj, options) {
        //    var content = '';
        //    if(obj.all) {
        //        content = '<option value="">'+obj.display+'</option>';
        //    }
        //    var isContain = false;
        //    for(var i=0;i<options.length;i++) {
        //        if(obj.value == options[i].id) {
        //            isContain = true;
        //        }
        //    }
        //    if(obj.value && !isContain) {
        //        content += '<option value="'+obj.value+'">'+obj.display+'</option>';
        //        for(var i=0;i<options.length;i++) {
        //            content += '<option value="'+options[i].id+'">'+options[i].name+'</option>';
        //        }
        //    } else {
        //        for(var i=0;i<options.length;i++) {
        //            content += '<option value="'+options[i].id+'">'+options[i].name+'</option>';
        //        }
        //    }
        //    o.html(content);
        //    if(content != '') {
        //        if(obj.value) {
        //            o.selectpicker('val', obj.value);
        //        }
        //        o.selectpicker('refresh');
        //        // callback
        //        if(callback) {
        //            callback();
        //        }
        //    }
        //}
        function option(o, obj, options) {
            var content = '';
            if(obj.display != undefined && obj.display !== '') {
                content += '<option value="'+obj.value+'">'+obj.display+'</option>';
            }
            for(var i=0;i<obj.options.length;i++) {
                if(obj.options[i].id != obj.value) {
                    content += '<option value="'+obj.options[i].id+'">'+obj.options[i].name+'</option>';
                }
            }
            for(var i=0;i<options.length;i++) {
                if(options[i].id != obj.value) {
                    content += '<option value="'+options[i].id+'">'+options[i].name+'</option>';
                }
            }
            o.html(content);
            if(content != '') {
                if(obj.value) {
                    o.selectpicker('val', obj.value);
                }
                o.selectpicker('refresh');
                // callback
                if(callback) {
                    callback();
                }
            }
        }
    },
    upload: function(options, callback) {
        var o = $(this);
        o.find('.modal-title').text(options.title);
        o.find('form').attr('action', options.url);
        o.modal();
        o.find('#upload').unbind('click').on('click', function(ev) {
            o.find('#upload').load();
            var formData = new FormData(document.forms.namedItem("form-file"));
            $.ajax({
                url: options.url,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(obj) {
                    o.modal('hide');
                    callback(JSON.parse(obj));
                    o.find('form input[name="file"]').val();
                    o.find('#upload').reset();
                }
            });
        });
    },

    load: function() {
        $(this).button('loading');
    },
    reset: function() {
        $(this).button('reset');
    }
});
