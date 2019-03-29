$.fn.extend({
    pagination: function(current, total, count, callback) {
        var o = $(this);
        current = parseInt(current);
        total = parseInt(total);
        var pagination = '';
        if(total > 0) {
            pagination = '<ul class="pagination pagination-sm pull-right">';
            if(current <= 1) {
                pagination += '<li class="disabled" page-index="1"><a href="javascript:">«</a></li>';
                pagination += '<li class="disabled" page-index="1"><a href="javascript:">‹</a></li>';
            } else {
                pagination += '<li page-index="1"><a href="javascript:">«</a></li>';
                pagination += '<li page-index="'+(current-1)+'"><a href="javascript:">‹</a></li>';
            }

            for(var i=current-2;i<=current+2;i++) {
                if(i > 0 && i <= total) {
                    var class_ = 'enabled';
                    if(i == current) {
                        class_ = 'active';
                    }
                    pagination += '<li class="'+class_+'" page-index="'+i+'"><a href="javascript:">'+i+'</a></li>';
                }
            }

            if(current >= total) {
                pagination += '<li class="disabled" page-index="'+total+'"><a href="javascript:">›</a></li>';
                pagination += '<li class="disabled" page-index="'+total+'"><a href="javascript:">»</a></li>';
            } else {
                pagination += '<li page-index="'+(current+1)+'"><a href="javascript:">›</a></li>';
                pagination += '<li page-index="'+total+'"><a href="javascript:">»</a></li>';
            }

            pagination += '</ul>';
            pagination += '<span class="pull-right total">共有' + count + '条，每页显示10条</span>';
        } else {
            pagination = '<ul class="pagination pagination-sm pull-right">没有数据</ul>';
        }
        o.empty();
        o.append(pagination);

        o.find('li').click(function() {
            var pageIndex = $(this).attr('page-index');
            o.parents('.box').find('form input[name=p]').val(pageIndex);
            $(".table thead tr th input, .table tfoot tr td input").prop('checked', false);
            callback(pageIndex);
            o.pagination(pageIndex, total, count, callback);
        });
    }
});
