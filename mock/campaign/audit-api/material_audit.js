<meta>
  @path /audit-api/material/audit
  @method post
  @params { id: Number }
  @desc 审核指定物料
</meta>

function (params) {
  return {
    code: 200,
    data: params,
    msg: 'success'
  }
}