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

