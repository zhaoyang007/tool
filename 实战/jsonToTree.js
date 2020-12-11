// 方法1
var treeList = [
    {
        title: '系统管理',
        parentName: '',
        parentId: 0,
        id: 1,
    },
    {
        title: '菜单管理',
        parentName: '系统管理',
        parentId: 1,
        id: 11,
    },
    {
        title: '菜单新增',
        parentName: '菜单管理',
        parentId: 11,
        id: 111,
    },
    {
        title: '菜单编辑',
        parentName: '菜单管理',
        parentId: 11,
        id: 112,
    },
    {
        title: '菜单删除',
        parentName: '菜单管理',
        parentId: 11,
        id: 113,
    },
    {
        title: '角色管理',
        parentName: '系统管理',
        parentId: 1,
        id: 22,
    },
    {
        title: '角色新增',
        parentName: '角色管理',
        parentId: 22,
        id: 221,
    },
    {
        title: '角色编辑',
        parentName: '角色管理',
        parentId: 22,
        id: 222,
    },
    {
        title: '角色删除',
        parentName: '角色管理',
        parentId: 22,
        id: 223,
    },
    {
        title: '用户管理',
        parentName: '系统管理',
        parentId: 1,
        id: 33,
    },
    {
        title: '用户新增',
        parentName: '用户管理',
        parentId: 33,
        id: 331,
    },
    {
        title: '用户编辑',
        parentName: '用户管理',
        parentId: 33,
        id: 332,
    },
    {
        title: '用户删除',
        parentName: '用户管理',
        parentId: 33,
        id: 333,
    }
]
function jsonToTree(lists, id, parentId) {
    var idList = {},
        treeList = [];
    for (var i = 0, len = lists.length; i < len; i++) {
        //生成一个以id为键的对象
        idList[lists[i][id]] = lists[i]
    }
    for (var j = 0, len1 = lists.length; j < len1; j++) {
        var aVal = lists[j];
        var aValParent = idList[aVal[parentId]];
        //如果aValParent存在；就说明当前的aVal是aValParent的孩子
        if (aValParent) {
            if ('chindren' in aValParent) {
                aValParent['children'].push(aVal)
            } else {
                aValParent['children'] = [];
                aValParent['children'].push(aVal)
            }
        } else {
            treeList.push(aVal)
        }
    }
    return treeList
}
// 方法2
var data=[
  { id: 40, parentId: 31, note: "的萨达是" }, 
  { id: 20, parentId: 11, note: "的萨达是" },
  { id: 22, parentId: 20, note: "dsadas" },
  { id: 12, parentId: null, note: "dsadasad萨达s" }, 
  { id: 11, parentId: undefined, note: "dqwds" }, 
  { id: 24, parentId: 22, note: "搜索" },
  { id: 34, parentId: 22, note: "搜索" }
]
function fnSetTreeData(data) {
  var data = [...data];
  var tree = data.filter((father) => {
    var branchArr = data.filter((child) => {
      if (father.id == child.parentId) child._hasParent = true;
      return father.id == child.parentId;

      // MARK 为什么这样写就报错 ? 
      // if (father.id == child.parentId) child._hasParent = true;
      // return child._hasParent
    });
    if (branchArr.length > 0) father.children = branchArr;
    return !father._hasParent;
  });
  // MARK 为什么在这里还得加一个过滤
  tree = tree.filter((item) => {
    return !item._hasParent;
  })
  return tree
}
console.log(JSON.stringify(fnSetTreeData(data), null, 2))
// 方法3
var data = [
  { id: 40, parentId: 31, note: "的萨达是" }, 
  { id: 20, parentId: 11, note: "的萨达是" },
  { id: 22, parentId: 20, note: "dsadas" },
  { id: 12, parentId: null, note: "dsadasad萨达s" }, 
  { id: 11, parentId: undefined, note: "dqwds" }, 
  { id: 24, parentId: 22, note: "搜索" },
  { id: 34, parentId: 22, note: "搜索" }
]
function listToTree(data) {
  let arr = JSON.parse(JSON.stringify(data))
  const listChildren = (obj, filter) => {
    [arr, obj.children] = arr.reduce((res, val) => {
      if (filter(val))
        res[1].push(val)
      else
        res[0].push(val)
      return res
    }, [[],[]])
    obj.children.forEach(val => {
      if (arr.length)
      listChildren(val, obj => obj.parentId === val.id)
    })
  }

  const tree = {}
  listChildren(tree, val => arr.findIndex(i => i.id === val.parentId) === -1)
  return tree.children
}
// 方法4
var aaa= [{name:'wwb',id:111},{name:'aaa',id:0,pid:"mei"},{name:'a',id:1,pid:"mei"},{name:'b',id:2,pid:1},{name:'c',id:3,pid:1},{name:'d',id:4,pid:2},{name:'e',id:5,pid:2}];

function test(ary,data){

    var data=data?data:(function(ary){
      var tempAry=[];
      var idList=[];
      ary.forEach(function(item){idList.push(item.id)});
     function deb(id,idList){
         var flag=true;
        for(var ida in idList){
            if(id==idList[ida]){
                flag=false;
            }       
        }
         return flag;
     }

      for(var i=0,len=ary.length;i<len;i++){
        if(ary[i].pid==undefined||(ary[i].pid!=undefined&&deb(ary[i].pid,idList))){
          var obj={name:ary[i].name,id:ary[i].id};
          tempAry.push(obj);
        }
       }
        return tempAry; 
    }(ary));

    var temp=0;
   if(data.constructor==Array){
     for(var i=0,len=data.length;i<len;i++){
        for(var j=0,lenA=ary.length;j<lenA;j++){
           if(ary[j].pid==data[i].id){
           var obj={name:ary[j].name,id:ary[j].id};
           data[i].child=data[i].child||[];
           data[i].child.push(obj);
           temp++;
       }
     }
    }
   }

   if(temp>0){
     if(data.constructor==Array){
      for(var n=0,lenB=data.length;n<lenB;n++){
        data[n].child=test(ary,data[n].child?data[n].child:[]);
        if(data[n].child.length==0){
            delete data[n].child;
        }
          delete data[n].id;
      } 
    }
   }else{
       for(var n=0,lenB=data.length;n<lenB;n++){
          delete data[n].id;
       } 

   }
    return data;

}
var a=test(aaa);
sconsole.log(a)
