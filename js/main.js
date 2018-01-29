$(function () {
  /* 大转盘 */
  $(".jq-start").click(function () {
    var i = 1
    var t = setInterval(function () {
      i += 5
      if (i > 360) {
        i = 0
      }
      $(".zp").css({
        "-webkit-transform": "rotateZ(" + i + "deg)"
      })
    }, 10)

    setTimeout(function () {
      //拼图:0deg,公仔:-60deg,卡套:-120deg,徽章:-180deg,鼠标垫:120deg,手指笔:60deg
      clearInterval(t)
      $(".zp").css({
        "-webkit-transform": "rotateZ(" + -60 + "deg)"
      })
      setTimeout(function () {
        //设置奖品内容
        $('.prize').text('手指笔')
        $(".main2").show()
      }, 1000)
    }, 2000)
  })
})
