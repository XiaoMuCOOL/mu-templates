import test from 'ava'

test.todo('test user')
test('foo', t => {
  t.pass('success')
});

test('bar', async t => {
  const bar = Promise.resolve('bar')
  t.is(await bar, 'bar')
})
test('name', t => {
  const a = /foo/
  const b = 'bar'
  const c = 'baz'
  t.true(a.test(b) || b === c)
})
