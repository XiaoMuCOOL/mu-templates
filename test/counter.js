'use strict'
// const Counter = require('../server/controllers/counter')
// const Util = require('../server/controllers/util')

// let b = async ()=> {
//   let a =await Counter.getSeqById('groupId')
//   Util.error(a,'a')
// }
// b()

import test from 'ava'
import Counter from '../server/controllers/counter'
test('counter.getSeqById', async t => {
  t.log('测试groupId自增长')
  let id = await Counter.getSeqById('groupId')
  t.truthy(id, '测试id是否正确')
})
