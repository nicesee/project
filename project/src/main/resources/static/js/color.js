var Color = {
    create: function(str) {
        if(!str || str == '') {
            return '#cccccc';
        }
        return '#' + md5(str).substring(0, 6);
    }
}