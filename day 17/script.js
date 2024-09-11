// for (var i = 0; i <3; i++) {
//     setTimeout(function() {
//         console.log(i);
//     },1000+i);
// }

// (function fnA(a){
//     return (function fbB(b){
//         console.log(a);
//     })(1)
// })(0)

// console.log(3>2>1);

// console.log(1 + '1' - 1);

// console.log(['1','2'] + 90);  // '1','2' + 90

// let arr = [1,2,3,4,5,6,7,8,9];
// console.log(arr[2], arr.length);

// arr.length = 0;
// console.log(arr[2], arr.length);
// console.log(arr[100]);

// reducer function

// 

// function createCounter(){
//     let count = 0;
//     return function(){
//         count++;
//         return count;
//     }
// }

// const count1 = createCounter();
// const count2 = createCounter();

// console.log(count1());
// console.log(count1());
// console.log(count2());

// let items = [
//     {color: 'red', type:'tv', age:18},
//     {color: 'silver', type:'phone', age:18},
//     {color: 'blue', type:'book', age:18},
// ]

// const excludes = [
//     {k:'color', v:'silver'},
//     {k:'type', v:'tv'},
// ];

// function excludeItems(items, excludes) {
//     excludes.forEach(pair => {
//         items = items.filter(item => item[pair.k] !== pair.v);
//     });

//     return items;
// }

// const ans = excludeItems(items, excludes);
// console.log(ans);

// function createCounter() {
//     let count = 0;
//     return {
//       increment: function() {
//         count++;
//         console.log(count);
//       },
//       reset: function() {
//         count = 0;
//         console.log("Reset count to", count);
//       },
//     };
//   }

//   const counter1 = createCounter();
//   const counter2 = createCounter();

//   counter1.increment();
//   counter1.increment();
//   counter2.increment();
//   counter1.reset();
//   counter2.increment();
//   counter1.increment();

//   1 2 1 0 2 1

// console.log(a)
// function scope() {
//     var a = 2
// }
// scope();

// var number = 0;
// console.log(number)
// const number2;
// console.log(number2)


// function Person () {
//     this.name = 'John';
//     this.age = 13;
// }

// const person1 = new Person();
// person1.name = 'anas';

// console.log(person1)

// function Counter (count) {
//     this.increment = function (){
//         count++;
//         console.log(count)
//     }

//     this.decrement = function (){
//         count--;
//         console.log(count)
//     }
// }

// const counter1 = new Counter(5);
// counter1.increment();

// const counter2 = new Counter(5);
// counter2.decrement();

// -----------------------------------------------
// const myLocalStorage = () => {
    
//     return {
//         setItem: (key, value, expiry) => {
//             const item = {
//                 value: value,
//                 expiry: new Date().getTime() + expiry,
//             };
//             window.localStorage.setItem(key, JSON.stringify(item));
//         },

//         getItem: (key) => {
//             const itemStr = window.localStorage.getItem(key);
//             if (!itemStr) {
//                 return null;
//             }
//             const item = JSON.parse(itemStr);
//             const now = new Date().getTime();

//             // Check if the item is expired
//             if (now > item.expiry) {
//                 window.localStorage.removeItem(key);
//                 return null;
//             }
//             return item.value;
//         }
//     }
// }

// const storage = myLocalStorage();
// storage.setItem('foo', 'bar', 1000); // Will expire in 1000ms (1 second)

// setTimeout(() => {
//     console.log(storage.getItem('foo')); // After 1 second, it should return null
// }, 1500); // Check after 1.5 seconds


// ---------------------------------------------------------------------

// console.log('A'-'B');
// console.log('2'-2);
// console.log('2'+2);


// class Amount {
//     constructor() {
//       this.total = 0;
//     }

//     lac(value) {
//       this.total += value * 100000; // 1 lac = 100,000
//       return this;
//     }

//     crore(value) {
//       this.total += value * 10000000; // 1 crore = 10,000,000
//       return this;
//     }

//     getTotal() {
//       return this.total;
//     }
//   }

//   const computeTotalAmount = () => {
//     return new Amount();
//   };

//   // Example usage
//   const totalAmount = computeTotalAmount().lac(50).crore(10).getTotal();
//   console.log(totalAmount); // Will print the total amount in terms of lacs and crores


// var car = new Vehicle("Honda", "white", "2010", "UK");
// console.log(car);
// function Vehicle(model, color, year, country) {
//   this.model = model;
//   this.color = color;
//   this.year = year;
//   this.country = country;
// }

// -------------------------------------------------------------

// function foo(){
//   let x = y = 0;
//   x++;
//   y++;
//   return x;
// }

// console.log(foo(), typeof x, typeof y);

// ----------------------------------------------------------------

// function main() {
//   console.log('A');
//   setTimeout(
//     function print() {
//       console.log('B');

//     }, 0);
//   console.log('C');
// }
// main();

// ---------------------------------------------------------

// function sum(a){
//   return function (b){
//     return function (c){
//       return a + b + c;
//     }
//   }
// }
// const totalSum = sum(1)(2)(3)
// console.log(totalSum);

// -----------------------------------------------------------------

// function evaluate(operator){
//   return function(a){
//     return function(b){
//       if(operator === "sum"){
//         return a + b
//       }else if(operator === "substract"){
//         return a - b
//       }else if(operator === "multiply"){
//         return a * b
//       }else {
//         return a / b
//       }
//     }
//   }
// }

// console.log(evaluate("substract")(4)(2))

// --------------------------------------------------------------

// function add(a){
//   return function (b){
//     if(b) return add(a+b);
//     return a;
//   }
// }
// console.log(add(4)(3)(2)(1)())

// -----------------------------------------------------------

// const promise = new Promise((resolve, reject) => {
//   if (10 - 1 === 0) {
//     return resolve('success');
//   } else {
//     return reject('failure');
//   }
// });

// promise
//   .then((res) => {
//     console.log('Resolved:', res); // This won't run in this case.
//   })
//   .catch((err) => {
//     console.log('Rejected:', err); // This will run and log 'Rejected: failure'
//   });


// -----------------------------------------------------------
// var name = 'promise';
// var name = 'keywords';
// console.log(name);
// function keywords() {
//   var name = 'keywords';
//   console.log(name);
// }
// keywords();
// console.log(name);

// --------------------------------------------------------------

// function foo(){
//   var x = 10;
//   console.log(x);
// }

// foo();
// console.log(x)

// --------------------------------------------------------

// {
//   var a = 1
//   console.log(a);
// }

// console.log(a)

// --------------------------------------------------------------

// console.log(name);
// const name = 'anas';

// var x = 10;

// function foo() {
//   console.log(x);
//   var x = 20;
// }

// foo();

// -----------------------------------------------------

// first letter of each word should be capital
// let username = 'my name is anas';
// username = username.split(' ').map((word)=> {
//   return word[0].toUpperCase() + word.slice(1);
// }).join(' ');

// console.log(username)

// --------------------------------------------------

// for (var i=0; i<=3; i++){
//   let timer = setTimeout(()=>{
//     console.log(i);
//   },1000)

//   clearTimeout(timer)
// }

// ---------------------------------------------------------

// function linearsearch(Arr, target){
//   for(let i=0; i<Arr.length; i++){
//     if(Arr[i]===target){
//       return i;
//       break;
//     }
//   }
// }

// const search1 = linearsearch([2, 3, 4, 5, 3], 4)
// console.log(search1)

// ----------------------------------------------------------

// function largestElement(Arr){
//   let ans;
//   if(Arr.length === 1){
//     return Arr[0];
//   }else if(Arr.length > 1){
//     ans = Arr[0];
//     for(let i=1; i<Arr.length; i++){
//       if(ans < Arr[i]){
//         ans = Arr[i]
//       }
//     }
//     return ans;
//   }
// }

// const Example1 = largestElement([3, 3, 6, 1]);
// console.log(Example1)

// -----------------------------------------------------------------------------------

// function secondLargestElement(Arr){
//   if(Arr.length === 1){
//     return null;
//   }else{
//     if(Arr.length > 1){
//       let ans = Arr[0];
//       for(let i=1; i<Arr.length; i++){
        
//       }
//     }
//   }
// }
// console.log(secondLargestElement([8, 8, 7, 6, 5]))

// ---------------------------------------------------------------------------------

// var a = 1;
// var a = 2;

// console.log(a)