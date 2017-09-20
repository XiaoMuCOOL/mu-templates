'use strict'
$(function () {
  var a = 8
  let b = (c) => a + c
  if (b(2) === 10) {
    console.log('yes')
  } else {
    console.log('NO')
  }
})
