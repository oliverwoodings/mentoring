function foo () {
  console.log(this.bar)
}

foo.bar = 'baz'

foo()