$(document).ready(function() {
	$("#logout").click(function() {
		post('/user/logout', {}, function(data, status) {
			if(status) {
				location.href = "/";
			}
		});
	});
});

function numberStatus(number) {
	if(number < 0) {
		return '<span class="label label-danger">' + number + '</span>';
	} else {
		return '<span class="label label-success">' + number + '</span>';
	}
}

function urlFormat(url) {
	if(url.indexOf("http://") == -1) {
		url = "http://" + url;
	}
	return url;
}

var Valid = new Object();
Valid.get = function(type, name) {
	if('blank' == type) {
		return {
			validators: {
				notEmpty: {
					message: name + '不能为空'
				},
				stringLength: {
					min: 1,
					max: 17,
					message: name + '长度必须小于17位'
				}
			}
		}
	} else if('length32' == type) {
		return {
			validators: {
				stringLength: {
					min: 0,
					max: 32,
					message: name + '长度必须小于32位'
				}
			}
		}
	} else if('length128' == type) {
		return {
			validators: {
				stringLength: {
					min: 0,
					max: 128,
					message: name + '长度必须小于128位'
				}
			}
		}
	} else if('account' == type) {
		return {
			validators: {
				notEmpty: {
					message: name + '不能为空'
				},
				regexp: {
					regexp: /^[a-zA-Z0-9]{6,20}$/,
						message: name + '只能包含大小写和数字且在6到20位之间'
				}
			}
		}
	} else if('password' == type) {
		return {
			validators: {
				notEmpty: {
					message: name + '不能为空'
				},
				stringLength: {
					min: 6,
					max: 20,
					message: name + '长度必须在6到20位之间'
				}
			}
		}
	} else if('plus' == type) {
		return {
			validators: {
				notEmpty: {
					message: name + '不能为空'
				},
				regexp: {
					regexp:  /^[1-9]\d*$/,
					message: name + '只能输入正整数'
				}
			}
		}
	} else if('startDate' == type) {
		return {
			validators: {
				notEmpty: {
					message: name + '不能为空'
				},
				callback: {
					message: '开始日期不能大于结束日期',
					callback:function(value, validator,$field,options){
						var endDate = $('#window-form').find("input[name='endDate']").val().replace(/-/g,"");
						validator.updateStatus('endDate', 'NOT_VALIDATED', null);
						return parseInt(value.replace(/-/g,""))<=parseInt(endDate);
					}
				}
			}
		}
	} else if('endDate' == type) {
		return {
			validators: {
				notEmpty: {
					message: name + '不能为空'
				},
				callback: {
					message: '结束日期不能小于开始日期',
					callback:function(value, validator,$field){
						var startDate = $('#window-form').find("input[name='startDate']").val().replace(/-/g,"");
						validator.updateStatus('startDate', 'NOT_VALIDATED', null);
						return parseInt(value.replace(/-/g,""))>=parseInt(startDate);
					}
				}
			}
		}
	}
}

function post(url, data, callback) {
	$.post(url, data, function(data, status){
		var obj = $.parseJSON(data);

		callback(obj, obj.success)
	});
}

function alert(message) {
	$('#window-alert').unbind();
	var modal = $('#window-alert');
	modal.find('.modal-body p').text(message);
	modal.modal();
}

function error(message) {
	$('#window-alert').unbind();
	var modal = $('#window-error');
	modal.find('.modal-body p').text(message);
	modal.modal();
}

function confirm(message, callback) {
	$('#window-confirm').unbind();
	var modal = $('#window-confirm');
	modal.find('.modal-body p').text(message);
	modal.modal();
	$('#confirm').unbind();
	$('#confirm').click(function() {
		callback();
		modal.modal('hide');
	});
}

function createProgress(total, current) {
	var total_ = parseFloat(total).toFixed(2);
	var current_ = parseFloat(current).toFixed(2);
	var percent = (current_ * 100 / total_).toFixed(2) + "%";
	return "<div title='" + percent + "' class='progress progress-xs'><div class='progress-bar progress-bar-" + (current_ - total_ >= 0 ? 'success' : 'danger') + "' style='width: " + percent + "'></div></div><br />" + current_;
}

function computeDaysDelta(date1, date2, day) {
	var delta = moment.duration(moment(date2) - moment(date1)).as("days") + 1;
	var weekEnds = 0;
	if(day == 'd') {
		for(var i = 0; i < delta; i++) {
			var d = moment(date1).format("d");
			if(d == 0 || d == 6) {
				weekEnds ++;
			}
			date1 = moment(date1).add(1, "days");
		}
	}
	return delta - weekEnds;
}

function td_click(event){
	event.stopPropagation();
}
