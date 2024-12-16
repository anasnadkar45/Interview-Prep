// const div = document.querySelector('div');
// const form = document.querySelector('form');
// const button = document.querySelector('button');

// event bubbling - bottom level to top level
// div.addEventListener('click',handleClick)

// form.addEventListener('click',handleClick)

// button.addEventListener('click',handleClick)

// function handleClick(event){
//     alert("currentTarget = " + event.currentTarget.tagName + " Target = " + event.target.tagName);
// }
// ------------------------------------------------------------------



// event capturing function - top level to bottom level
// div.addEventListener('click', function () {
//     alert('div')
// }, { capture: true })

// form.addEventListener('click', function () {
//     alert('form')
// }, { capture: true })

// button.addEventListener('click', function () {
//     alert('button')
// }, { capture: true })
// ------------------------------------------------------------------



// event stop propagation
// div.addEventListener('click', function (e) {
//     alert('div')
//     e.stopPropagation()
// })

// form.addEventListener('click', function (e) {
//     alert('form')
//     e.stopPropagation()
// })

// button.addEventListener('click', function (e) {
//     alert('button')
//     e.stopPropagation()
// })
// ------------------------------------------------------------------

// Event Deligation

// document.querySelector('.products').addEventListener('click',(event)=>{
//     if(event.target.tagName === "SPAN"){
//         window.location.href += '/' + event.target.className
//     }
// })


// call

// const name1 = {
//     FName: 'anas',
//     LName: 'Nadkar',
//     fullName: function (hometown, country) {
//         return this.FName + ' ' + this.LName + ' hello' + ' ' + hometown + ' ' + country
//     }
// }

// const name2 = {
//     FName: 'sara',
//     LName: 'Nadkar',
// }

// console.log(name1.fullName.call(name2, 'Khed', 'India'))
// console.log(name1.fullName.apply(name2, ['Khed', 'India']))

// const result = name1.fullName.bind(name2, 'Khed', 'India')
// console.log(result())



// Polyfills
// map

// Array.prototype.myMap = function (cbFn) {
//     let temp = [];
//     for(let i=0; i<this.length; i++){
//         temp.push(cbFn(this[i], i, this))
//     }
//     return temp
// }

// const array = [1,2,3,4,5,6,7,8,9]
// const exp1 = array.myMap(function(num,i,arr){
//     return num * num;
// })

// console.log(exp1)

// -----------------------------------------------------------------------------

// filter


// const array = [1,2,3,4,5,6,7,8];

// Array.prototype.myFilter = function (cbFn){
//     let temp = [];
//     for(let i=0; i<this.length; i++){
//         if(cbFn(this[i],this)){
//             temp.push(cbFn(this[i],this))
//         }
//     }
//     return temp;
// }
// const exp1 = array.myFilter(function(num,arr){
//     if(num % 2 === 0){
//         return num
//     }
// })

// const exp2 = array.myFilter(function(num,arr){
//     if(num<5){
//         return num
//     }
// })

// console.log(exp2);

// ___----------------------------------------------------------------

// promise

// let promise = new Promise(function (resolve, reject) {
//     const x = 'anas';
//     const y = 'anas';

//     if (typeof (x) === typeof (y)) {
//         resolve('success')
//     } else {
//         reject('error')
//     }
// });

// promise.then((response) => {
//     console.log(response);
// }).catch((err) => {
//     console.log(err);
// })

// ----------------------------------------------------------------

//HOF

// function print(name){
//     console.log('hii ' + name )
// }

// function getName(name,print) {
//     print(name)
// }

// const result = getName('anas', print);

// ----------------------------------------------------------------

// // Find Maximum Number
// function findMax(numbers){
//     let ans = numbers[0];
//     if(numbers.length === 1){
//         return ans;
//     }else if(numbers.length === 0){
//         return 'array should contain atleast one element'
//     }

//     for(let i = 1; i < numbers.length; i++){
//         if(ans < numbers[i]){
//             ans = numbers[i];
//         }
//     }

//     return ans;
// }

// const numbers = [];
// console.log("Maximum number is:", findMax(numbers));

// ----------------------------------------------------------------

// Program to find Reverse of a string without using
// built-in method ?
//  const findReverse = (sampleString) => {
//  let reverse = "";
//  for (let i = sampleString.length - 1; i >= 0; i--) {
//     reverse += sampleString[i];
//  }
//   console.log(reverse);
//  };
//  findReverse("Hello Iam Saikrishna Ui Developer");

// ----------------------------------------------------------------

// function computeAmount(){
//     let totalAmount = 0;
//     this.lacs = function(amount){
//         totalAmount += amount * 100000
//         return this
//     }

//     this.crore = function(amount){
//         totalAmount += amount * 10000000
//         return this;
//     }

//     this.thousand = function(amount){
//         totalAmount += amount * 1000
//         return this;
//     }

//     this.value = function(){
//         return totalAmount;
//     }
//     return this
// }

// console.log(computeAmount().lacs(1).lacs(1).crore(1).thousand(1).crore(1).value())

// ----------------------------------------------------------

// function Student() {
//     this.name = "Saikrishna",
//     this.exp = "8"
// }
// Student.prototype.company = "Hexagon"
// let std1 = new Student();
// std1.exp = "9"
// let std2 = new Student();
// std2.exp = "10"
// console.log(std1);
// console.log(std2)

// ----------------------------------------------------------------

// let items = [
//     { color: 'red', type: 'tv', age: 18 },
//     { color: 'silver', type: 'phone', age: 20 },
//     { color: 'blue', type: 'book', age: 18 },
// ];

// const excludes = [
//     { k: 'color', v: 'silver' },
//     { k: 'type', v: 'tv' },
// ];

// function excludeItems(items, excludes) {
//     excludes.forEach(pair => {
//         items = items.filter(item => item[pair.k] !== pair.v);
//     });
//     return items;
// }

// console.log(excludeItems(items, excludes));

//----------------------------------------------------------------------


// function square() {
//     const temp = [];
//     for (let i = 0; i < this.length; i++) {
//         let multiple = Number((this[i] * this[i]).toFixed(2));
//         temp.push(multiple);
//     }
//     return temp;
// }

// Array.prototype.square = square;

// const numbers = [0.1, -0.5, 1.1];
// const sqNumbers = numbers.square();
// console.log(sqNumbers); // Output: [0.01, 0.25, 1.21]

// ----------------------------------------------------------------

// function add(n = 0) {
//     let temp = n;
//     return {
//         add: function add(num){
//             temp += num;
//             return this
//         },
//         sum: function sum(){
//             return temp
//         }
//     }
// }

// const value = add(4).add(2).add(3).sum();
// console.log(value); // Outputs: 9

// const anotherValue = add(10).add(20).sum();
// console.log(anotherValue); // Outputs: 30


//----------------------------------------------------------------


// Array.prototype.myMap = function (cbFn) {
//     const temp = [];
//     for (let i = 0; i < this.length; i++) {
//         temp.push(cbFn(this[i]));
//     }
//     return temp;
// }

// const arr = [1, 'hello', [2, 3], { a: 1, b: 2 }];

// const cbFn = (element) => {
//     if (typeof element === 'number') {
//         return element * 2
//     } else if (typeof element === 'string') {
//         return element.toUpperCase()
//     } else if (Array.isArray(element)) {
//         let temp = []
//         for (let i = 0; i < element.length; i++) {
//             temp.push(element[i])
//         }
//         return temp
//     } else if (typeof element === 'object' && element !== null) {
//         return Object.keys(element)
//     }
// }
// const exp1 = arr.myMap(cbFn);
// console.log(exp1)

// ----------------------------------------------------------------

// const arr = [1, 2, 3, 4, 5];

// const output = arr.reduce((acc, current) => {
//     if(current % 2 === 0) {
//         current = current + 2;
//         acc += current
//     }else{
//         current = current - 1;
//         acc += current
//     }
//     return acc;
// },0)

// console.log(output)

// -----------------------------------------------------------

