<meta>
  @path /news-api/news_list
  @method get
  @params { page: Number, pageSize: Number}
  @desc 获取新闻列表 （此接口展示了数据上下文缓存能力，比如：totalCall，每次访问都会自增1）
</meta>

let totalCall = 0;
return function (params) {
  return {
    code: 200,
    msg: '成功',
    data: {
      total: totalCall++,
      list: [
        {
          id: parseInt(Math.random() * 100),
          name: '标题1'
        },
        {
          id: parseInt(Math.random() * 100),
          name: '标题2'
        }
      ]
    },
    timestamp: new Date().getTime()
  }
}