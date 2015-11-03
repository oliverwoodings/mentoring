function foo (bar, baz) {
  console.log(bar, baz)
}

var foobar = foo.bind(null, 'bar')
foobar('baz')