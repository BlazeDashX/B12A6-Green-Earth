# Question Answer Section

## 1) What is the difference between var, let, and const?

- `var` is a function-scoped declaration that can be redeclared and reassigned.
- `let` is a block-scoped declaration that can be reassigned but cannot be redeclared.
- `const` is a block-scoped declaration that cannot be redeclared or reassigned.

## 2) What is the difference between map(), forEach(), and filter()?

- `map()` creates a new array by applying a function to each element of an array.
- `forEach()` executes a function for each element of an array but does not return a new array.
- `filter()` creates a new array by including only the elements that pass a certain condition.

## 3) What are arrow functions in ES6?

Arrow functions in ES6 provides has concise syntax for writing function expressions. It eliminates the need for the `function` keyword and the `return` keyword in many cases. Arrow functions reduces the code length.

**Syntax:**

```javascript
const sum = (a, b) => a + b;
```

## 4) How does destructuring assignment work in ES6?

Destructuring assignment in ES6 allows to extract values from arrays or properties from an objects and assigns them to variables in a concise way. It provides a more readable and efficient way to access and use data from arrays and objects.

**Example:**

```javascript
const [a, b] = [1, 2];
```

## 5) Explain template literals in ES6. How are they different from string concatenation?

Template literals in ES6 allows to create strings in a more concise way. It allows to embed expressions in strings and reduces the code length.

**Example:**

```javascript
const a = 10;
const b = 20;

const sum = `The sum of ${a} and ${b} is ${a + b}`;
```
