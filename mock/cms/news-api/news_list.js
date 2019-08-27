<meta>
  @path /news-api/news_list
  @method get
  @params { page: 0, pageSize: 20}
  @params.page Integer,必填,当前页码,从0开始
  @params.pageSize Integer,选填,每页条数，默认20
  @desc 获取新闻列表 （此接口展示了数据上下文缓存能力，比如：totalCall，每次访问都会自增1）
</meta>

let totalCall = 0;
return function (params) {
  return {
    code: 200,
    msg: '成功',
    data: {
      total: totalCall++, // 一共请求多少次，可以维持上下文状态，比较屌
      list: [
        {
          id: parseInt(Math.random() * 100),
          name: '标题1' // 名称
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