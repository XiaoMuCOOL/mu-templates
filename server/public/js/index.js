'use strict'
$(function () {
  let sfasf = 1
  let a = (i) => {
    i += 1
    console.log(i)
  }
  console.log('offending code goes here...')
  $('.index').mutouch({
    offsetY: 50,
    onSwipeTop: function () {
      console.log('mutouch')
    }
  })
})
