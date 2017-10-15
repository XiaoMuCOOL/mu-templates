'use strict'
const Counter = require('../server/controllers/counter')
const Util = require('../server/controllers/util')

let b = async ()=> {
    let a =await Counter.getSeqById('groupId')
    Util.error(a,'a')
}
b()
