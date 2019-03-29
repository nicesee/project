var i_left =1;
var i_right =1;
$("body").on("click",".toMoreHidden_left",function(){
    i_left++;
    if(i_left%2==0){
        $(this).text("收起");
    }else{
        $(this).text("更多");
    }
});

$("body").on("click",".toMoreHidden_right",function(){
    i_right++;
    if(i_right%2==0){
        $(this).text("收起");
    }else{
        $(this).text("更多");
    }
});