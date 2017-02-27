(function () {
    angular
        .module('app')
        .controller('DocumentManageController', DocumentManageController);

    DocumentManageController.$inject = ['$scope', 'documentManageService'];
    function DocumentManageController($scope, documentManageService) {
        function changeTab(args, index) {
            var i = 0, len = $scope.showTab.length;
            $scope.showTab = [];
            for (i = 0; i < len; i++) {
                if (i === index ) {
                    $scope.showTab.push(1);
                }
                else {
                    $scope.showTab.push(0);
                }
            }
        }
        function changeChoosePeopleTab(args, index) {
            var i = 0, len = $scope.showChoosePeopleTab.length;
            $scope.showChoosePeopleTab = [];
            for (i = 0; i < len; i++) {
                if (i === index ) {
                    $scope.showChoosePeopleTab.push(1);
                }
                else {
                    $scope.showChoosePeopleTab.push(0);
                }
            }
        }
        function getReadingPeopleString(data) {
            var readPeopleNames = "";
            for (var i = 0; i < data.length; i++) {
                if (i !== data.length - 1) {
                    readPeopleNames += data[i].name + "，";
                }
                else {
                    readPeopleNames += data[i].name;
                }
            }
            return readPeopleNames;
        }
        function pagination(data, option) {
            var pageSize = option.selectedPageSize;
            var index = option.selectedPageIndex;
            return data.slice((index - 1)*pageSize, index*pageSize);
        }
        $scope.documentManagePage = {
            initPage: function() {
                $scope.showUploadInputBox = false;
                $scope.showDocumentDetail = false;
                $scope.currentDocumentContent = "";
                $scope.readPeopleNames = "";
                $scope.selectedGroupsId = [];
                $scope.choosedGroupList = [];
                $scope.tabArr = [
                    "我的文档",
                    "我的卷宗"
                ];
                $scope.choosePeopleTabArray = [
                    "全部人员",
                    "分组"
                ];
                $scope.showChoosePeopleTab = [1,0];
                $scope.folderListData = [];
                $scope.columnMap = {
                    "id": 'id',
                    "pId":'pid',
                    "name": 'name',
                    "isParent": 'hasChid',
                    "other": ['groupId', 'userId']
                };
                $scope.dividePageOption = {
                    myDocument: {
                        count: 10, //数据列表总数
                        selectedPageSize: 10, //默认单页列表最大数
                        selectedPageIndex: 1, //默认当前选择的页
                        showPageSizeFlag: 1, //是否显示左侧的每页显示多少条（1是显示，0是不显示）
                        showTurnToPageFlag: 0, //是否显示跳转到某一页（1是显示，0是不显示）
                        showTotalCountFlag: 1, //是否显示总条数（1是显示，0是不显示）
                        callback: function() {
                            $scope.dataTableOption.document.tdList = pagination($scope.tableData.documentData, this);
                        }
                    },
                    myFile: {
                        count: 10, //数据列表总数
                        selectedPageSize: 10, //默认单页列表最大数
                        selectedPageIndex: 1, //默认当前选择的页
                        showPageSizeFlag: 1, //是否显示左侧的每页显示多少条（1是显示，0是不显示）
                        showTurnToPageFlag: 0, //是否显示跳转到某一页（1是显示，0是不显示）
                        showTotalCountFlag: 1, //是否显示总条数（1是显示，0是不显示）
                        callback: function() {
                            $scope.dataTableOption.file.tdList = pagination($scope.tableData.fileData, this);
                        }
                    }
                };
                $scope.onSelected = function () {
                    var nodes = $scope.viewModel.treeObj.getCheckedNodes();
                    console.log(nodes);
                    $scope.choosedList = nodes.filter(function (item) {
                        return item.id != 0;
                    });
                    $scope.$apply();
                    console.log($scope.choosedList);
                };
                $scope.viewModel = {
                    id: 'myTree1',
                    initData: [],
                    treeObj: '',
                    columnMap: $scope.columnMap,
                    onSelected: $scope.onSelected
                };


                $scope.choosedList = [];
                $scope.showTab = [1, 0];
                $scope.eventKey = "documentManageController";
                $scope.eventChoosePeoleKey = "documentManageChooseTab";
                $scope.dataTableOption = {
                    document: {
                        thList: [
                            {
                                dbName: 'documentName', //返回结果的字段名
                                thName: '文件名称', //表格头显示名
                                hasSort: {
                                    show: false
                                }, //是否排序
                                classStyle: '', //表格头样式
                                tooltip: '' //tooltip内容
                            },
                            {
                                dbName: 'localDocumentName', //返回结果的字段名
                                thName: '本地文书名称', //表格头显示名
                                hasSort: {
                                    show: false
                                }, //是否排序
                                classStyle: '', //表格头样式
                                tooltip: '', //tooltip内容
                                tdStyle: 'text-center' //数据格样式
                            },
                            {
                                dbName: 'uploadDate',
                                thName: '上传日期',
                                hasSort: {
                                    show: false
                                },
                                classStyle: 'date-th',
                                dateTimeFormat: 'yyyy-MM-dd', //数据格式化样式
                                tdStyle: 'text-center' //数据格样式
                            }
                        ],
                        tdList: [],
                        operOption: { //操作列部分
                            show: true, //是否显示操作列
                            operThText: '操作', //表格头文字
                            operList: [ //操作格内内容
                                {
                                    name: '修改', //操作名
                                    eventName: function(data) {
                                        $scope.showDocumentDetail = true;
                                        $scope.currentDocumentContent = data.detailContent;
                                    } //操作事件名
                                },
                                {
                                    name: '删除', //操作名
                                    eventName: function() {} //操作事件名
                                }
                            ],
                            operThStyle: 'oper-3-3-th' //操作头样式
                        },
                        indexOption: { //序号列部分
                            show: true, //是否自动添加序号列
                            indexText: '序号', //序号列列名文本
                            dividePage: true, //是否带分页
                            pageSize: 5, //分页所用pageSize
                            pageIndex: 1 //分页所用pageIndex
                        },
                        selectedColumn: '',
                        loading: true,
                        callback: ''
                    },
                    file: {
                        thList: [
                            {
                                dbName: 'fileName', //返回结果的字段名
                                thName: '卷宗名称', //表格头显示名
                                hasSort: {
                                    show: false
                                }, //是否排序
                                classStyle: '', //表格头样式
                                tooltip: '' //tooltip内容
                            },
                            {
                                dbName: 'document', //返回结果的字段名
                                thName: '卷宗内文书', //表格头显示名
                                hasSort: {
                                    show: false
                                }, //是否排序
                                classStyle: '', //表格头样式
                                tooltip: '', //tooltip内容
                                tdStyle: 'text-center' //数据格样式
                            },
                            {
                                dbName: 'createDate',
                                thName: '卷宗生成日期',
                                hasSort: {
                                    show: false
                                },
                                classStyle: 'date-th',
                                dateTimeFormat: 'yyyy-MM-dd', //数据格式化样式
                                tdStyle: 'text-center' //数据格样式
                            }
                        ],
                        tdList: [],
                        operOption: { //操作列部分
                            show: false, //是否显示操作列
                            operThText: '操作', //表格头文字
                            operList: [ //操作格内内容
                                {
                                    name: '修改', //操作名
                                    eventName: function() {} //操作事件名
                                },
                                {
                                    name: '删除', //操作名
                                    eventName: function() {} //操作事件名
                                }
                            ],
                            operThStyle: 'oper-3-3-th' //操作头样式
                        },
                        indexOption: { //序号列部分
                            show: true, //是否自动添加序号列
                            indexText: '序号', //序号列列名文本
                            dividePage: true, //是否带分页
                            pageSize: 5, //分页所用pageSize
                            pageIndex: 1 //分页所用pageIndex
                        },
                        selectedColumn: '',
                        loading: true,
                        callback: ''
                    }
                };
                this.bindEvent();
                this.loadTableData();
            },
            bindEvent: function() {
                var me = this;
                $scope.$on('documentManageControllerChangeTab', changeTab);
                $scope.$on('documentManageChooseTabChangeTab', changeChoosePeopleTab);
                $scope.showUploadDocument = function(show) {
                    if (show) {
                        me.loadFolderData();
                    }
                    $scope.showUploadInputBox = show;
                };
                $scope.closeDocumentDetail = function() {
                    $scope.showDocumentDetail = false;
                    $scope.currentDocumentContent = "";
                };
                $scope.showAddFolderBox = function(show) {
                    $scope.showAddFolder = show;
                };
                $scope.showTreeBox = function(show) {
                    me.loadTreeData();
                };
                $scope.removeAllMember = function() {
                    var message = confirm("确定要全部删除吗？");
                    if (message) {
                        $scope.choosedList = [];
                        $scope.viewModel.treeObj.checkAllNodes(false);
                    }
                    return;
                };
                $scope.removeMember = function(node) {
                    var message = confirm("确定要删除吗？");
                    if (message) {
                        $scope.viewModel.treeObj.checkNode(node, false, true);
                        $scope.choosedList = $scope.choosedList.filter(function (item) {
                            return item.id != node.id;
                        });
                        var existArray = $scope.choosedList.filter(function (item) {
                            return item.pId != 0;
                        });
                        if (existArray.length == 0) {
                            $scope.choosedList = [];
                        }
                    }
                    return;
                };
                $scope.addReadPeople = function(mode) {
                    var readPeopleNames = "";
                    var resultData = [];
                    if (mode == "people") {
                        resultData = $scope.choosedList.filter(function(item) {
                            return item.pId !== 0;
                        });
                    }
                    else {
                        var groupChildren = [];
                        //获取所有选择到的人；
                        $scope.choosedGroupList.forEach(function(item) {
                            item.children.forEach(function(child) {
                                groupChildren.push(child);
                            });
                        });

                        //去除重复的数据，因为同一个人可能存在在多个分组之中
                        for (var i = 0; i < groupChildren.length; i++) {
                            var isExist = (resultData.filter(function(item) {
                                return item.id === groupChildren[i].id;
                            })).length > 0 ? true : false;
                            if (isExist) {
                                continue;
                            }
                            else {
                                resultData.push(groupChildren[i]);
                            }
                        }
                    }
                    readPeopleNames = getReadingPeopleString(resultData);
                    $scope.readPeopleNames = readPeopleNames;
                    $('#groupManage-update-modal').modal('hide');
                };
                $scope.addGroup = function() {
                    var peopleArray = $scope.choosedList.filter(function(item) {
                        return item.pId !== 0;
                    });
                    if (peopleArray.length > 0) {
                        var i = 1;
                        while(1) {
                            var temporaryGroupName = "分组" + i;
                            var isExist = false;
                            var targetGroup = $scope.groups.find(function(item) {
                                return item.name === temporaryGroupName;
                            });
                            if (targetGroup) {
                                i++;
                                continue;
                            }
                            else {
                                var newGroup = {
                                    name: temporaryGroupName,
                                    allowModification: true,
                                    children: peopleArray
                                };
                                $scope.groups.push(newGroup);
                                break;
                            }
                        }
                        changeChoosePeopleTab("", 1);
                        $scope.$apply();
                    }
                };
                $scope.selectGroup = function(item) {
                    var index = $scope.selectedGroupsId.indexOf(item.groupId);
                    if (index >= 0) {
                        $scope.selectedGroupsId.splice(index, 1);
                        $scope.choosedGroupList = $scope.choosedGroupList.filter(function(data) {
                            return data.groupId !== item.groupId;
                        });
                    }
                    else {
                        $scope.selectedGroupsId.push(item.groupId);
                        $scope.choosedGroupList.push(item);
                    }
                };
                $scope.checkGroupsSelectState = function(item) {
                    return $scope.selectedGroupsId.indexOf(item.groupId) >= 0;
                };
                $scope.removeGroupMember = function(item, index) {
                    item.children.splice(index, 1);
                };
            },
            loadTableData: function() {
                documentManageService.loadDocumentTableData().then(function() {
                    $scope.tableData = documentManageService.documentManageInitData;
                    var documentData = $scope.tableData.documentData;
                    var fileData = $scope.tableData.fileData;
                    $scope.dividePageOption.myDocument.count = documentData.length;
                    $scope.dividePageOption.myFile.count = fileData.length;
                    $scope.dataTableOption.document.tdList = pagination(documentData, $scope.dividePageOption.myDocument);
                    $scope.dataTableOption.file.tdList = pagination(fileData, $scope.dividePageOption.myFile);

                });
            },
            loadFolderData: function() {
                documentManageService.loadFolderData().then(function() {
                    $scope.folderListData = documentManageService.folderListData;
                });
            },
            loadTreeData: function() {
                documentManageService.loadTreeData().then(function() {
                    $scope.viewModel.initData = documentManageService.treeData.allPeople;
                    $scope.groups = documentManageService.treeData.groups;
                    $('#groupManage-update-modal').modal('show');
                    $scope.choosedList = [];
                    $scope.choosedGroupList = [];
                    $scope.selectedGroupsId = [];
                });
            }
        };
        $scope.documentManagePage.initPage();
    }
})();
