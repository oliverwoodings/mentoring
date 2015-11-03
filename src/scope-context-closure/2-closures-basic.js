var bar = 3

function foo () {
  var bar = 0
  bar++
  console.log(bar)
}

foo()
bar++
console.log(bar)