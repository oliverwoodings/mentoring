function foo () {
  console.log(this.bar)
}

foo.bar = 'baz'

foo = foo.bind(foo)

foo.bar = 'boz'

foo()