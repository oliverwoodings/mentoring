function Foo () {
  this.baz = 'boz'
}

Foo.prototype.bar = function () {
  console.log(this.baz)
}

var foo = new Foo()
var bar = foo.bar
bar()