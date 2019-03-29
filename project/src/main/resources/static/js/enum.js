OperType = {
    10: '添加',
    11: '修改',
    12: '删除'
}

//工作类别
WorkType = [
    {id: 1,name: '重要'},
    {id: 2,name: '一般'},
    {id: 3,name: '长期'},
    {id: 4,name: '一次性'}
]

//工作体系
WorkSetup = [
    {id: 1,name: '研发'},
    {id: 2,name: '工艺'},
    {id: 3,name: '制造'},
    {id: 4,name: '商务'},
    {id: 5,name: '财务'},
    {id: 6,name: '营销'},
    {id: 7,name: '服务'},
    {id: 8,name: '人力'}
]

//编码申请状态
WorkStatus = {
    1: ['进行中','label label-danger'],
    2: ['审批中','label label-info'],
    3: ['已通过','label label-success'],
    4: ['已驳回','label label-warning'],
    5: ['已结项','label label-success']
}


//交付物类型
DeliverableType = [
    {id:1, name: 'docx'},
    {id:2, name: 'doc'},
    {id:3, name: 'pptx'},
    {id:4, name: 'ppt'},
    {id:5, name: 'xlsx'},
    {id:6, name: 'xls'},
    {id:7, name: 'png'},
    {id:8, name: 'jpg'},
    {id:9, name: 'gif'},
    {id:10, name: 'dwg'},
    {id:11, name: 'pdf'},
    {id:12, name: 'plm'}
]

function trans(arrs) {
    var obj = {};
    if(arrs != null) {
        for(var i=0;i<arrs.length;i++) {
            obj[arrs[i].id] = arrs[i].name;
        }
    }
    return obj;
}