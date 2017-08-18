'use strict'
import '../css/style.css'
import '../js/vendor/jquery.mutouch.min.js'
$(function () {
  let sfasf = 1
  let a = (i) => {
    i += 1
    console.log(i)
  }
  console.log(a(sfasf))
  console.log(Config)
  Tools.test(5)
  console.log('offending code goes here...')
  $('.index').mutouch({
    offsetY: 50,
    onSwipeTop: function () {
      alert('mutouch')
    }
  })
})
