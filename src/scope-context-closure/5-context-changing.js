function foo () {
  console.log(this.bar)
}

foo.bar = 'baz'

function buz () {
  console.log('baz')
}

buz.bar = 'buz'

foo.call(buz);