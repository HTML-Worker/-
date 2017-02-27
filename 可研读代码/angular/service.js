(function () {
    angular
        .module('app')
        .factory('documentCreateService', documentCreateService);

    documentCreateService.$inject = ['$http'];
    function documentCreateService($http) {

        var documentCreateService = {};
        var ms = documentCreateService;
        ms.getDocumentCreateData=function() {
            return {
                roleTypes: [
                    {
                        key: 0,
                        value: '全部'
                    }, {
                        key: 1,
                        value: '管理员'
                    }, {
                        key: 2,
                        value: '院长'
                    }, {
                        key: 3,
                        value: '庭长'
                    }, {
                        key: 4,
                        value: '法官'
                    }, {
                        key: 5,
                        value: '书记员'
                    }
                ],
                courtRoom: [
                    {
                        key: 0,
                        value: '民一庭'
                    }, {
                        key: 1,
                        value: '民二庭'
                    }, {
                        key: 2,
                        value: '行政一庭'
                    }, {
                        key: 3,
                        value: '行政二庭'
                    }, {
                        key: 4,
                        value: '刑事一庭'
                    }, {
                        key: 5,
                        value: '刑事一庭二'
                    }
                ],
                userAccountStatus: [
                    {
                        key: 1,
                        value: '启用'
                    }, {
                        key: 2,
                        value: '禁用'
                    }
                ],
                keywordsOption: [
                    {
                        key: 0,
                        value: '关键词'
                    }, {
                        key: 1,
                        value: '案件类型'
                    }, {
                        key: 2,
                        value: '审判程序'
                    }, {
                        key: 3,
                        value: '文书类型'
                    }
                ],
                judgeRole: [
                    {
                        key: 0,
                        value: '审判长'
                    }, {
                        key: 1,
                        value: '审判员'
                    }, {
                        key: 2,
                        value: '人民陪审员'
                    }, {
                        key: 3,
                        value: '法官助理'
                    }
                ],
                batchReplaceTitle: [
                    {
                        key: 0,
                        value: '当事人'
                    }, {
                        key: 1,
                        value: '其他诉讼参与人'
                    }, {
                        key: 2,
                        value: '案件信息'
                    }, {
                        key: 3,
                        value: '诉讼标的'
                    }
                ],
                batchReplaceTitleType: [
                    {
                        title: 0,
                        type: [
                            {
                                key: 0,
                                value: '原告'
                            }, {
                                key: 1,
                                value: '被告'
                            }, {
                                key: 2,
                                value: '上诉人'
                            }, {
                                key: 3,
                                value: '被上诉人'
                            }, {
                                key: 4,
                                value: '第三人'
                            }
                        ]
                    },
                    {
                        title: 1,
                        type: [
                            {
                                key: 0,
                                value: '被告人'
                            }, {
                                key: 1,
                                value: '申诉人'
                            }, {
                                key: 2,
                                value: '被申诉人'
                            }, {
                                key: 4,
                                value: '申请再审人'
                            }, {
                                key: 5,
                                value: '被申请再审人'
                            }, {
                                key: 6,
                                value: '申报人'
                            }, {
                                key: 7,
                                value: '申请人'
                            },{
                                key: 8,
                                value: '被执行人'
                            }, {
                                key: 9,
                                value: '被执行第三人'
                            }, {
                                key: 10,
                                value: '异议人'
                            }, {
                                key: 11,
                                value: '利害关系人'
                            }, {
                                key: 12,
                                value: '被申请人'
                            }
                        ]
                    }
                ],
                relationshipWithDangshiren: [
                    {
                        key: 0,
                        value: '原告'
                    },{
                        key: 1,
                        value: '被告'
                    },{
                        key: 2,
                        value: '第三人'
                    }
                ],
                agency: [
                    {
                        key: 0,
                        value: '一般代理'
                    },{
                        key: 1,
                        value: '特别代理'
                    }
                ],
                agencyOther: [
                    {
                        key: 0,
                        value: '法定代理人'
                    },{
                        key: 1,
                        value: '负责人'
                    }
                ],
                gender: [
                    {
                        key: 0,
                        value: '男'
                    },{
                        key: 1,
                        value: '女'
                    }
                ],
                monetaryUnit: [
                    {
                        key: 0,
                        value: '元'
                    }, {
                        key: 1,
                        value: '万元'
                    }, {
                        key: 2,
                        value: '亿元'
                    }, {
                        key: 3,
                        value: '美元'
                    }, {
                        key: 4,
                        value: '英镑'
                    }, {
                        key: 5,
                        value: '港币'
                    }
                ]
            }
        };
        ms.getDocumentGenerated = function (para) {
            // return $http.post(urls.headLine, para).then(function (result) {
            return $http.get(configData.getDataUrl.documentCreate.generateDocument, para).then(function (result) {
                ms.wholeDocumentInfo = result.data;
                return result;
            });
        };

        ms.getNewsDetail = function (id, searchWord) {
            // searchWord="主席";
            // todo 使用promise 模式
            return $http.get(urls.newsDetail + '/' + id).then(function (result) {
                ms.newsDetail = angular.copy(result.data);

                ms.newsDetail.Detail.markedTitle = ms.markSearchWords(ms.newsDetail.Detail.Title, searchWord);
                ms.newsDetail.Detail.markedHtmlFullText = ms.markSearchWords(ms.newsDetail.Detail.HtmlFullText, searchWord);

                return result;
            });
        };


        //将搜索的关键字在标题/文中标红
        ms.markSearchWords = function (wholeStr, searchWord) {
            if (searchWord) {
                var markedSearchWord = "<em class='search-word'>" + searchWord + "</em>";
                return wholeStr.split(searchWord).join(markedSearchWord);
            }
            else {
                return wholeStr;
            }

        };

        //取前len个文字
        ms.getShortContent = function (len, txt) {
            if (txt && txt.length > len) {
                return txt.substr(0, len) + "...";
            }
            else {
                return txt;
            }
        };

        return documentCreateService;
    }
})()
