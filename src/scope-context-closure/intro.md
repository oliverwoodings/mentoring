# context, scope and closures


### Definitions

* __context:__ everything that can be accessed through an object's own instance (via `this`)
* __scope:__ everything that can be accessed (directly or indirectly) at a particular point in a piece of code
* __closures:__ everything that can be directly accessed at a particular point in a piece of code (i.e. without accessing a parent closure)
* __IIFE:__ (Immediately-Invoked Function Expression) - a function that is declared and immediately called. Useful for creating closures


### Analogy

Human life is an excellent analogy for context, scope and closures. At any point in time we are able to see information and perform actions (often based on that information). Information can be equated to _variables_, whilst actions can be compared to _functions_. For example, the colour of your hair is a variable, which you can change by invoking the action of dyeing it.

We also tend to put up walls (both physical and non-physical) around some of the information and actions to keep them private, either from everyone or certain groups of people. These walls are comparable to _closures_; inside a set of walls we contain various variables and functions that are private. For example, dialling 999 is a public function of the Police, whereas talking on the radio to a squad car is a private function reserved for only those people within the closure of the police force.

Individual humans can be broken down into two parts: our physical body, and our 'mind'. In theory, you could swap 'minds' with someone else and be the same person in a different body. This is comparable to _context_. Another example would be driving someone else's car. You know how to drive a car, but this new car might be more powerful or a different a colour.


### Scope/closure example

```js
(function () {

  var foo = 'foo'

  function buz () {
    var bar = 'bar'
    foo = 'baz' // can modify foo, it is in scope from the parent closure
    boz() // can call boz, it is in scope from the current closure
    foobar() // can call foobar, it is in scope from the parent closure

    function boz () {
      console.log('boz')
    }
  } // normal functions (not IIFEs) also create closures!

  buz()

  console.log(foo) // baz
  console.log(bar) // undefined - bar is inside the child closure
  boz() // undefined is not a function - boz is inside the child closure

  function foobar () {
    console.log('foobar')
  }
  
}()) // this is an IIFE

console.log(foo) // undefined - foo is inside the child closure
```


### Context example

```js
var foo = {
  bar: function () {
    console.log(this.baz) // retrieves baz from the current context
  },
  baz: 'baz'
}

foo.bar() // baz
foo.baz = 'boz' // change part of the context of the bar function
foo.bar() // boz

var newFoo = { baz: 'foobar' }
foo.bar.call(newFoo) // call bar with an entirely different context
```