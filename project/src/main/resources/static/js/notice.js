$.ajax({
    type: 'get',
    async: false,
    url: 'http://www.yixiangmu.cn/notice/get?_=' + new Date().getTime(),
    dataType: 'jsonp',
    jsonp: 'jsonpCallback',
    success: function(data){
        $('#notice-content').html(data.data);
    },
    error: function(){
    }
});