function foobar (bar) {
  console.log(bar * 2)
}

function foo (bar, baz) {
  console.log(bar + baz)
  foobar.call(null, bar)
}

function boz () {
  console.log('boz has been called!')
  foo.apply(null, arguments)
}

boz(1, 2)