<meta>
  @path /common-api/user_info
  @method get|post
  @desc 获取用户信息
</meta>
function (params) {
	console.log('mock received', params)
	return {
	  code: 200,
	  data: {
	    userName: 'xxx' // 用户名
	  },
	  msg: 'ok'
	}
}
