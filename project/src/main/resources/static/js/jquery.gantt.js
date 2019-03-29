$.fn.extend({
    gantt: function(options) {
        var o = $(this);
        var days = moment(options.date).endOf("month").format('D');
        var thead = '<thead><tr><th>设备</th><th>班次</th>';
        for(var i=1;i<=days;i++) {
            if(moment(options.date).set('date', i).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
                thead += '<th id="'+(moment(options.date).set('date', i).format('YYYY-MM-DD'))+'" class="success">' + (i < 10 ? ('0' + i) : i) + '</th>';
            } else {
                thead += '<th id="'+(moment(options.date).set('date', i).format('YYYY-MM-DD'))+'">' + (i < 10 ? ('0' + i) : i) + '</th>';
            }
        }
        thead += '<th>汇总</th>';
        thead += '</tr></thead>';
        var y = options.y;
        var y2 = options.y2;
        var tbody = '<tbody>';
        for(var i=0;i<y.length;i++) {
            tbody += '<tr><td rowspan="'+y2.length+'">' + y[i].name + '</td>';
            for(var k=0;k<y2.length;k++) {
                tbody += '<td>' + y2[k].name + '</td>';
                for(var j=1;j<=days;j++) {
                    var data = {"data-date": moment(options.date).set('date', j).format('YYYY-MM-DD'),
                                "data-y-id": y[i].id,
                                "data-y-name": y[i].name,
                                "data-y2-id": y2[k].id,
                                "data-y2-name": y2[k].name};
                    tbody += '<td id="'+(moment(options.date).set('date', j).format('YYYY-MM-DD') + '_' + y[i].id + '_' + y2[k].id)+'" class="gantt-date" data='+(JSON.stringify(data))+'>' +
                    '</td>';
                }
                tbody += '<td id="0_'+y[i].id+'_'+y2[k].id+'"></td>';
                tbody += '</tr>';
            }
        }
        tbody += '<tr><td colspan="2">汇总</td>';
        for(var j=1;j<=days;j++) {
            tbody += '<td id="'+(moment(options.date).set('date', j).format('YYYY-MM-DD') + '_0_0')+'">' +
            '</td>';
        }
        tbody += '<td id="0_0_0"></td>';
        tbody += '</tr>';
        tbody += '</tbody>';
        var tfoot = '<tfoot><tr><td colspan="'+(days+1)+'">' +
            '<button type="button" class="btn btn-default pull-right gantt-date-next"><i class="glyphicon glyphicon-chevron-right"></i></button>' +
            '<button type="button" class="btn btn-default pull-right gantt-date-pre"><i class="glyphicon glyphicon-chevron-left"></i></button>' +
            '<button type="button" class="btn btn-default pull-right gantt-date-current">当月</button>' +
            '<span class="pull-right gantt-date-now">'+(moment(options.date).format("YYYY-MM"))+'</span>' +
            '</td></tr></tfoot>';
        o.empty();
        o.append(thead + tbody + tfoot);

        $('.gantt-date-current').on('click', function() {
            options.date = moment();
            o.gantt(options);
        });

        $('.gantt-date-next').on('click', function() {
            options.date = moment(options.date).subtract(-1, 'month');
            o.gantt(options);
        });

        $('.gantt-date-pre').on('click', function() {
            options.date = moment(options.date).subtract(1, 'month');
            o.gantt(options);
        });

        $('.gantt-date').on('click', function(event) {
            var o_ = $(this);
            var data = jQuery.parseJSON(o_.attr('data'));
            options.dayClick(data, function(record) {
                o.gantt(options);
            });
        });

        post(options.items.url, {startDate: moment(options.date).startOf('month').format('YYYY-MM-DD'), endDate: moment(options.date).endOf('month').format('YYYY-MM-DD')}, function(data, status) {
            if(status) {
                for(var i=0;i<data.data.length;i++) {
                    var record = data.data[i];
                    var color = Color.create(record.orderCode);
                    var item = '<button id="'+record.id+'" type="button" class="btn item '+(record.status == 2 ? "item-circle" : "")+'" style="background-color: '+color+'" data='+(JSON.stringify(record))+' draggable="true" title="'+record.materielName+'_'+record.count+'_'+record.workScheduleName+'" data-group="'+record.orderID+'"></button></div>';
                    $('#'+record.deliveryDate+'_'+record.deviceID+'_'+record.workScheduleID).append(item);
                    $('#'+record.deliveryDate+'_0_0').html(Number($('#'+record.deliveryDate+'_0_0').html()) + Number(record.count));
                    $('#0_'+record.deviceID+'_'+record.workScheduleID).html(Number($('#0_'+record.deviceID+'_'+record.workScheduleID).html()) + Number(record.count));
                    $('#0_0_0').html(Number($('#0_0_0').html()) + Number(record.count));
                }
                initDrag();
                initGroup(data.data);
            }
        });

        function initDrag() {
            $('.gantt-date button').on('click', function(ev) {
                ev.stopPropagation();
                var o_ = $(this);
                var data = jQuery.parseJSON(o_.attr('data'));
                options.itemClick(data, function(record) {
                    o.gantt(options);
                });
            });

            $(".gantt-date button").contextMenu("menu", {
                menuStyle: {
                },
                //菜单项样式
                itemStyle: {
                    fontFamily: 'Microsoft Yahei',
                    fontSize: '14px',
                    padding: '1px'
                },
                itemHoverStyle: {
                },
                onContextMenu:function(e){
                    var obj = e.target;//鼠标点击的目标
                    var data = jQuery.parseJSON(obj.getAttribute("data"));
                    options.onContextMenu(data);
                    return true;
                }
            });

            $('.gantt-date button').on('mousemove', function(ev) {
                ev.stopPropagation();
                var o_ = $(this);
                $('button[data-group="'+o_.attr('data-group')+'"]').addClass('item-light');
                var data = jQuery.parseJSON(o_.attr('data'));
                $('#' + data.orderDeliveryDate).addClass('item-light');
            });

            $('.gantt-date button').on('mouseout', function(ev) {
                ev.stopPropagation();
                var o_ = $(this);
                $('button[data-group="'+o_.attr('data-group')+'"]').removeClass('item-light');
                var data = jQuery.parseJSON(o_.attr('data'));
                $('#' + data.orderDeliveryDate).removeClass('item-light');
            });

            var eleDrag;
            $('.gantt-date button').on('selectstart', function() {
                return false;
            });
            $('.gantt-date button').on('dragstart', function(ev) {
                eleDrag = ev.target;
                return true;
            });
            $('.gantt-date button').on('dragend', function(ev) {
                eleDrag = null;
                return false
            });
            $('.gantt-date').on('dragover', function(ev) {
                ev.preventDefault();
                return true;
            });
            $('.gantt-date').on('dragenter', function(ev) {
                return true;
            });
            $('.gantt-date').on('drop', function(ev) {
                var o_ = $(this);
                if(eleDrag) {
                    var eleDrag_ = $(eleDrag);
                    var record = jQuery.parseJSON(eleDrag_.attr('data'));
                    if(record['status'] == 2) {
                        return;
                    }
                    var data = jQuery.parseJSON(o_.attr('data'));
                    options.itemDrag(data, record, function(record) {
                        o.gantt(options);
                    });
                }
                return false;
            });
        }

        function initGroup(data) {
            options.initGroup(data);
        }
    }
});
