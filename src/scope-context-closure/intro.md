# context, scope and closures


### Definitions

* __context:__ everything that can be accessed through a function's own instance (via `this`)
* __scope:__ everything that can be accessed (directly or indirectly) at a particular point in a piece of code
* __closures:__ everything that can be directly accessed at a particular point in a piece of code (i.e. without accessing a parent closure)
* __IIFE:__ (Immediately-Invoked Function Expression) - a function that is declared and immediately called. Useful for creating closures


### Analogy

Human life is an excellent analogy for context, scope and closures. At any point in time we are able to see information and perform actions (often based on that information). Information can be equated to _variables_, whilst actions can be compared to _functions_. For example, the colour of your hair is a variable, which you can change by invoking the action of dyeing it.

We also tend to put up walls (both physical and non-physical) around some of the information and actions to keep them private, either from everyone or certain groups of people. These walls are comparable to _closures_; inside a set of walls we contain various variables and functions that are private. For example, dialling 999 is a public function of the Police, whereas talking on the radio to a squad car is a private function reserved for only those people within the closure of the police force.

Individual humans can be broken down into two parts: our physical body, and our 'mind'. In theory, you could swap 'minds' with someone else and be the same person in a different body. This is comparable to _context_. Another example would be driving someone else's car. You know how to drive a car, but this new car might be more powerful or a different a colour.


### Scope/closure

The easiest way to understand scoping and closures is to just see a commented example. Below are scenarios of when and where variables/functions can be accessed:

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


### Defining context

Context in JavaScript is a hard concept to actually define in a single sentence. The easiest way is to think of it as the object which a function is _assigned_ to. For example:

```js
var foo = {
  bar: '123',
  baz: function () {
    console.log(this.bar)
  }
}
foo.baz() // 123
```

The context of the function `baz` is the object `foo`, meaning it can access all the properties of `foo` via `this`.

It is important to remember that if you declare a function without it being a property of another object, it will be automatically receive the the context of the global scope (i.e. the Window object):

```js
(function foo () {
  console.log(this === Window) // true
}())
```


### Changing context

We have previously defined context as the object which a function is assigned to. Since functions can be 'copied' by reference in JavaScript, we can actually change the context of a function very easily. For example:

```js
function foo () {
  console.log(this.bar)
}
foo() // undefined because bar does not exist on foo's context (the window)

var baz = {
  bar: 123,
  foo: foo
}
newContext.foo() // logs 123 because we have given `foo` the context of `baz`
console.log(foo === baz.foo) // true because `foo` is copied by reference, it is just executed with a different context
```

It is important to remember that no matter how you reassign a function, it will change it's context. This applies even if you just assign the function to a new variable:

```js
var baz = {
  bar: 123,
  foo: function foo () {
    console.log(this.bar)
  }
}

var foo = baz.foo
foo() // undefined because you have changed the context of `foo` to be the global scope (the window)
```


### Context binding

Whilst being able to change a function's context can be useful, it can also be a problem. You might be exposing a public API where you don't want your consumers to be able to break your internal code by changing the context of an API method. We can solve this by binding a function to its context:

```js
var foo = {
  bar: '123',
  baz: function () {
    console.log(this.bar)
  }
}
var oldBaz = foo.baz
foo.baz = foo.baz.bind(foo) //bind baz to foo
console.log(oldBaz === foo.baz) // this is not true, because when you call bind it returns a new function, it does not modify the old one

var baz = foo.baz // uh-oh, we've reassigned baz!
baz() // logs 123 because we have bound baz to foo
```