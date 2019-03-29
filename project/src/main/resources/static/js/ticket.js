$.ajax({
    type: 'get',
    async: false,
    url: 'http://por.gotion.com.cn/ticket/get?_=' + new Date().getTime(),
    dataType: 'jsonp',
    jsonp: 'jsonpCallback',
    success: function(data){
        console.log(data)
    },
    error: function(){
    }
});