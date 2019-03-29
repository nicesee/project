function Tag(inputId,interests){
	var obj = new Object();
	var obj2 = new Object();
	if(inputId==null||inputId==""){
		alert("初始化失败，请检查参数！");
		return;
	}
	
	obj.inputId = inputId;
	//初始化
	obj = (function(obj){
		obj.tagValue="";
		obj.isDisable = false;
		return obj;
	})(obj);
	
	//初始化界面
	obj.initView=function(){
		var inputObj = $("#"+this.inputId);
		var inputId = this.inputId;
		inputObj.css("display","none");
		var appendStr='';
		appendStr+='<div class="tagsContaine" id="'+inputId+'_tagcontaine">';
		appendStr+='<div class="tagList"></div>';
		appendStr+='</div>';
		inputObj.after(appendStr);
		//写入DOM
		if(this.tagValue!=null&&this.tagValue!=""){
			tagTake.setInputValue(inputId,this.tagValue,interests);
		}
	}
	return obj;
}

var tagTake ={
	"setInputValue":function(inputId,inputValue,interests){
		if(inputValue==null||inputValue==""){
			return;
		}
		var tagListContaine = $("#"+inputId+"_tagcontaine .tagList");
		inputValue = inputValue.replace(/，/g,",");
		var inputValueArray = inputValue.split(",");
		for(var i=0;i<inputValueArray.length;i++){
			var valueItem = $.trim(inputValueArray[i]);
			if(interests!=""){
				//判断
				if(tagTake.cyclicJudgment((i+1),interests)==true){
					if(valueItem!=""){
					//选中
						var appendListItem = tagTake.getTagItemModel(valueItem,(i+1),'true');
						tagListContaine.append(appendListItem);
						continue;
					}
				}else{
					if(valueItem!=""){
						//未选中
						var appendListItem = tagTake.getTagItemModel(valueItem,(i+1),'false');
						tagListContaine.append(appendListItem);
					}
				}
			}
			
		}
		tagTake.initTagEvent(inputId);
	},
	"initTagEvent":function(inputId){
		$("#"+inputId+"_tagcontaine .tagList .tagItem").off();
		var ds =  $("#"+inputId+"_tagcontaine").attr("ds");
		if(ds=="0"){
			return;
		}
	
		$("#"+inputId+"_tagcontaine .tagList .tagItem").click(function(){
			var check=$(this).attr("data-check");
			if(check=="true"){
				//选中
				$(this).attr("data-check","false");
				$(this).css("backgroundColor","#b7b7b7"); //选中颜色 1abd9e
			}else{
			   //取消选中/未选中
				$(this).attr("data-check","true");
				$(this).css("backgroundColor","#1abd9e"); //未选中颜色 b7b7b7
			}
		
		});
	},
	"getTagItemModel":function(valueStr,i,is){
		if(is=="true"){
			return '<div class="tagItem" data-check="true" style="background-color:#1abd9e;"  data-id='+i+'><span class="interestName">'+valueStr+'</span></div>';
		}else{
			return '<div class="tagItem" data-check="false" style="background-color:#b7b7b7;"  data-id='+i+'><span class="interestName">'+valueStr+'</span></div>';
		}
	
	},"cyclicJudgment":function(i,interests){
		for(var j=0;j<interests.length;j++){
			if(interests[j].id==i){
				return true;
			}
		}
		return false;
	}	
}
