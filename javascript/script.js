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

// Array.prototype.myFilter = function (cbFn){
//     let temp = [];
//     for(let i=0; i<this.length; i++){
//         if(cbFn(this[i], i, this )){
//             temp.push(this[i])
//         }
//     }
//     return temp
// }

// const array = [1,2,3,4,5,6,7,8,9,10,11];

// const cbFn = (element,i,arr) =>{
//     if(element % 2 === 0){
//         return element
//     }
// }
// const exp1 = array.myFilter(cbFn);
// console.log(exp1)


//-----------------------------------------------------------

// foo();
// var foo = 100;

// function foo(){
//     console.log('calling foo');
// }

// foo();

// ----------------------------------------------------------------

// const arr = [1, 2, 3, 4, 5];

// const result = arr.reduce((acc, currentNumber)=>{
//     // acc.push(currentNumber*2)
//     // return acc;
//     acc<currentNumber
//     return acc
// });

// console.log(result);

// ----------------------------------------------------------------

// var a = 10

// function fun(){
//     console.log(a);
//     var a = 20;
//     return a;
// }

// console.log(fun());

// ----------------------------------------------------------------

// function outer (){
//     return function (){
//         console.log('inner')
//     }
// }

// const inner = outer();
// console.log(inner())

// ----------------------------------------------------------------

// const arr = [1, 2, 3, 4, 5]

// while(arr.length > 0){
//     arr.pop();
// }

// console.log(arr)

// ----------------------------------------------------------------

// function add(val1) {
//     return function (val2) {
//         if (!val2) {
//             return val1;
//         }
//         return add(val1 + val2);
//     }
// }

// const result = add(2)(1)(2)(3)()
// console.log(result)

// ----------------------------------------------------------------

// function debounce(func, delay) {
//     let timerId; // Holds the reference to the timer

//     return function (...args) {
//         // Clear the previous timer each time the function is called
//         if (timerId) {
//             clearTimeout(timerId);
//         }

//         // Set a new timer with the specified delay
//         timerId = setTimeout(() => {
//             func.apply(this, args);
//         }, delay);
//     };
// }

// // Example usage
// const searchHandler = debounce((query) => {
//     console.log(`Searching for: ${query}`);
// }, 500);

// // Simulating user input
// console.log(searchHandler("React Debounce"))


// ----------------------------------------------------------------

// function findMethod() {
//     let arr = [{ id: 1, name: "sai" }, { id: 2, name: "krishna" }];
//     let data = arr.findIndex(x => x.name == 2)
//     console.log(data)
// }
// findMethod()

// ----------------------------------------------------------------

// const name1 = {
//     fName : 'anas',
//     lName: 'Nadkar',
// }

// const name2 = {
//     fName : 'sara',
//     lName: 'Nadkar',
// }

// const fullName = function(thirdParams, message){
//     console.log(this.fName, this.lName, message)
// }

// fullName.call(name1, name2, "hello")

// function Student() {
//     this.name = "Saikrishna",
//         this.exp = "8"
// }
// Student.prototype.company = "Hexagon"
// let std1 = new Student();
// std1.exp = "9"
// std1.company = "Hexagon"
// let std2 = new Student();
// std2.exp = "10"
// console.log(std1);
// console.log(std2)

// const div = document.querySelector("div");
// const form = document.querySelector("form");
// const button = document.querySelector("button");

// div.addEventListener('click',function(event) {
//     alert("currentTarget" + event.currentTarget.tagName + "target" + event.target.tagName);
// },true);
// form.addEventListener('click',function(event) {
//     alert("currentTarget" + event.currentTarget.tagName + "target" + event.target.tagName);
// },true);
// button.addEventListener('click',function(event) {
//     alert("currentTarget" + event.currentTarget.tagName + "target" + event.target.tagName);
// },true);

// function handleClick(event) {
//     alert("currentTarget" + event.currentTarget.tagName + "target" + event.target.tagName);
// }

// function handleFormClick(event) {
//     alert("currentTarget" + event.currentTarget.tagName + "target" + event.target.tagName);
//     // event.stopPropagation();
// }


// -------------------------------------------------------

// const items = [
//     {id: 1, name: 'apple', category: 'fruit'},
//     {id: 1, name: 'banana', category: 'fruit'},
//     {id: 1, name: 'carrot', category: 'vegetable'},
//     {id: 1, name: 'chicken', category: 'meat'},
//     {id: 1, name: 'cucumber', category: 'vegetable'},
// ]

// const categoryCount = items.reduce((count, item) =>{
//     count[item.category] = (count[item.category] | 0) + 1;
//     return count;
// },{})

// console.log(categoryCount)

// ----------------------------------------------------------------

// const nestedArray = [[1, 2], [3, 4], [5, [6, 7]]];

// const singleArray =  nestedArray.reduce((array, curr)=>{
//     return array.concat(Array.isArray(curr) ? curr.flat(Infinity) : curr);
// },[])

// console.log(singleArray)

// ----------------------------------------------------------------

// const people = [
//     { name: 'Alice', age: 25 },
//     { name: 'Bob', age: 30 },
//     { name: 'Charlie', age: 25 },
// ];

// // Group the people by their age using the reduce method.

// const groupedPeople = people.reduce((age, person)=>{
//     if(!age[person.age]){
//         age[person.age] =  [];
//     }

//     age[person.age].push(person);
//     return age;
// },{});

// console.log(groupedPeople);

// ----------------------------------------------------------------

// const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

// // Expected Output: { apple: 3, banana: 2, orange: 1 }

// const fruitOccurence = fruits.reduce((acc, fruit)=>{
//    acc[fruit] = (acc[fruit] | 0) + 1;
//    return acc;
// },{})

// console.log(fruitOccurence);

// ----------------------------------------------------------------

// const items = [
//     { name: 'Book', price: 12.99 },
//     { name: 'Pen', price: 1.49 },
//     { name: 'Notebook', price: 5.99 }
// ];

// const totalAmount = items.reduce((acc, item)=>{
//     acc += item.price;
//     return acc
// },0)

// console.log(totalAmount);

// ----------------------------------------------------------------

// const data = [
//     { id: 1, value: 10 },
//     { id: 2, value: 20 },
//     { id: 1, value: 15 },
//     { id: 3, value: 30 }
// ];

// const mergedArray = data.reduce((acc, curr)=>{
//     acc[curr.id] = (acc[curr.id] | 0) + curr.value;
//     return acc;
// },{})

// console.log(mergedArray)

// ----------------------------------------------------------------
// function multiply(val1){
//     return function (val2){
//         if(!val2){
//             return val1
//         }
//         return multiply(val1 * val2);
//     }
// }

// const result = multiply(2)(2)(4)()
// console.log(result)

// ----------------------------------------------------------------

// const array = [1,2,3,4,5];

// Array.prototype.myFind = function (cbFn) {
//     for(let i=0; i<this.length; i++){
//         if(cbFn(this[i], i, this)){
//             return this[i];
//         }
//     }
// }
// const exp1 = array.myFind((element, i, array,) => {
//     if (element === 6) {
//         return element;
//     }
// });

// console.log(exp1)
// console.log(array.find((item)=>item.value === 1));


// ----------------------------------------------------------------
// const array = [1,2,3,4,5];

// Array.prototype.myFind = function (cbFn) {
//     let temp = [];
//     for(let i=0; i<this.length; i++){
//         if(cbFn(this[i], i, this)){
//             temp.push(this[i]);
//         }
//     }
//     return temp;
// }
// const exp1 = array.myFind((element, i, array,) => {
//     if (element >= 3) {
//         return element;
//     }
// });

// console.log(exp1)

// ----------------------------------------------------------------

// promises
// function firstName(value) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(`firstName: ${value}`);
//         }, 1000)
//     })
// }

// function secondName(value) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject(`secondName: ${value}`);
//         }, 100)
//     })
// }

// function lastName(value) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(`lastName: ${value}`);
//         }, 1000)
//     })
// }

// Promise.any([
//     firstName('anas'),
//     secondName('javed'),
//     lastName('nadkar')
// ]).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.error(err);
// }).finally(()=>{
//     console.log('done');
// })

// ----------------------------------------------------------------

// shallow copy

// let originalArray = [1, 2, [3, 4]];
// let shallowCopy = originalArray
// shallowCopy[1] = 100;
// console.log(originalArray);

// let originalArray2 = [1, 2, [3, 4]];
// let deepCopy = [...originalArray2]
// deepCopy[1] = 100;
// console.log(originalArray2);

// ----------------------------------------------------------------

// const arr = [1,3,'z',4,'e'];

// let characters = [];
// let numbers = [];   

// arr.forEach(element => {
//     if(typeof element === 'string'){
//         characters.push(element);
//     }else{
//         numbers.push(element);
//     }
// });

// console.log(characters)
// console.log(numbers)

// ----------------------------------------------------------------

// function debounce(func, delay) {
//     let timerId;

//     return function (...args) {
//         // Clear the previous timer if the function is called again
//         clearTimeout(timerId);

//         // Set a new timer
//         timerId = setTimeout(() => {
//             func(args);
//         }, delay);
//     };
// }

// const search = (query) => {
//     console.log(`Searching for: ${query}`);
// };

// const debouncedSearch = debounce(search, 500);

// const inputElement = document.getElementById("searchInput");
// inputElement.addEventListener("input", (event) => {
//     debouncedSearch(event.target.value);
// });


// --------

// function throttle(func, limit) {
//     let lastCall = 0;

//     return function (...args) {
//       const now = Date.now();

//       if (now - lastCall >= limit) {
//         lastCall = now;
//         func.apply(this, args);
//       }
//     };
//   }

//   // Example usage:
//   const handleScroll = () => {
//     console.log("Scroll event fired!", Date.now());
//   };

//   const throttledScroll = throttle(handleScroll, 1000);

//   window.addEventListener("scroll", throttledScroll);

// ----------------------------------------------------------------

// let count = 0;

// const nums = [0,2,3,4];

// nums.forEach((num)=>{
//     if(num){
//         count = count + 1
//     }
// })

// console.log("Count: " + count)


// ----------------------------------------------------------------

// const obj = {
//     a: 1,
//     b: 2,
//     "c": 3,
//     b: 4,
// }

// console.log(obj)

// console.log(!"hello");
// console.log(+false);


// ----------------------------------------------------------------

// const arr = [
//     { id: 1, name: 'anas', age: 21 },
//     { id: 2, name: 'sara', age: 17 },
//     { id: 3, name: 'vedant', age: 21 },
//     { id: 4, name: 'baktiyar', age: 23 },
//     { id: 5, name: 'asmer', age: 21 }
// ];

// const newArray = arr.reduce((acc, curr)=>{
//     if(!acc[curr.age]){
//         acc[curr.age] = [];
//     }
//     acc[curr.age].push(curr);
//     return acc;
// })

// console.log(newArray);

// ----------------------------------------------------------------

// const employees = [
//     {
//         empId: 1,
//         name: 'John',
//         age: 34,
//     },
//     {
//         empId: 2,
//         name: 'sara',
//         age: 29,
//     },
//     {
//         empId: 3,
//         name: 'anas',
//         age: 24,
//     },
//     {
//         empId: 4,
//         name: 'nadkar',
//         age: 43,
//     },
// ]

// function getEmployee(id){
//     const employee = employees.find((employee) => employee.empId === id)
//     if(!employee){
//         return "no employee found"
//     }
//     return employee;
// }

// console.log(getEmployee(6));

// ----------------------------------------------------------------

// const arr1 = [1,2,3,4,5];
// const arr2 = [6,7,8,9,10,11];

// function mergeArray(arr1, arr2) {
//     if(arr1.length > 0 && arr2.length > 0) {
//         return [...arr1, ...arr2];
//     }
// }

// console.log(mergeArray(arr1, arr2));

// ----------------------------------------------------------------------


// console.log(a);
// let a = 10;
// console.log(a);

// const arr = [0,0,0,1,2,3,4];

// const newArr = arr.map((num)=>{
//     if(typeof num === 'number'){
//         return num
//     }
// })

// console.log(newArr)

// ----------------------------------------------------------------

// Array.prototype.myMap = function (cbFn){
//     const temp = [];
//     for(let i=0; i<this.length; i++){
//         temp.push(cbFn(this[i],i,this))
//     }
//     return temp
// }

// const array = [1,2,3,4,5]
// const exp1 = array.myMap(function(element, index, array){
//     return element * 2
// })
// console.log(exp1)

// ----------------------------------------------------------------
// let a = {}
// let b = {key:'b'}
// let c = {key:'c'}
// a[b] = 100;
// b[c] = 200;
// console.log(a[b])

// ----------------------------------------------------------------
// var a = 10;
// {
//     var a = -10;
// }

// let b = a;

// {
//     let b = -20;
// }

// console.log(b);

// ----------------------------------------------------------------

// a = 10
// let a;
// console.log(a);

// const arr = [1, 2, 3, 2, 4, 5,3, 6,5];

// function findDuplicates(arr){
//     const ans = [];
//     arr.sort();
//     for(let i = 0; i < arr.length-1; i++){
//         if(arr[i] === arr[i+1] && !ans.includes(arr[i])){
//             ans.push(arr[i]);
//         }
//     }
//     return ans;
// }

// const ans = findDuplicates(arr);
// console.log(ans);


// infinity curring

// function sum(val1){
//     return function(val2){
//         if(val2){
//             return sum(val1 + val2)
//         }
//         return val1;
//     }
// }

// const ans = sum(2)(2)(4)(5)(6)(2)()
// console.log(ans)

// ----------------------------------------------------------------

// function person(){
//     this.fName = "anas",
//     this.age = "20"
// }

// person.prototype.lName = 'Nadkar'

// console.log(person.lName)

// -------------------------------------------------------------

// const obj = {
//     sum : 200
// }

// console.log(obj.sum)
// delete obj.sum
// console.log(obj.sum);

// -------------------------------------------------------------

// const [a,b] = [1 ,2]
// console.log(a)

// const {name, age} = {
//     name: 'foo',
//     age: 36
// }

// console.log(age)

// const [...rest] = [1,2,3,4,5]

// console.log(rest)

// function myFun(a, ...rest){
//     console.log('hello world')
//     return rest
// }

// console.log(myFun(1, 2, 3))

// console.log('hii ',name);
// var name = 'anas';
// console.log('hii ',name);

// const a = undefined
// console.log(a);

// function one(a=10, b=20){
//     console.log(a+b);
// }
// one(undefined, 10);


// ------------------------------------------------------------------------------------

// function myLocalStorage() {
//     return {
//         setItem: (key, val, duration = 3000) => {
//             localStorage.setItem(key, val);

//             // Automatically remove the item after 'duration'
//             let timer = setTimeout(() => {
//                 localStorage.removeItem(key);
//             }, duration);

//             // Return a function to clear the timer if needed
//             return () => clearTimeout(timer);
//         }
//     };
// }

// const storage = myLocalStorage(); // Create an instance
// storage.setItem('name', 'anas', 1000);
// storage.setItem('name', 'nadkar', 5000);

// console.log(localStorage.getItem('name'));

// setTimeout(() => {
//     console.log(localStorage.getItem('name')); // Should log 'null' after 1000ms
// }, 1500);


// ----------------------------------------------------------------

// function memoize(fn){
//     const cache = {};
//     return function (...args){
//         const key = args.sort().toString();
//         if(cache[key]){
//             console.log('cache');
//             return cache[key];
//         }else{
//             const sum = fn(...args);
//             cache[key] = sum;
//             return sum;
//         }
//     }
// }

// const addSum = (a, b, c) => a + b + c;
// const subSum = (a, b, c) => a - b - c;
// const memoizeAdd = memoize(addSum);
// const memoizeSub = memoize(subSum);
// console.log(memoizeAdd(1, 2, 3));
// console.log(memoizeAdd(1, 2, 3));
// console.log(memoizeSub(1, 2, 3));
// console.log(memoizeSub(1, 2, 3));
// console.log(memoizeAdd(1, 2, 3));


// function getApi(path, query){

// }

// const createApiWithMerging = (myFn) =>{
//     const cacheStore = {};
//     return function(...args){
//         const key = args.toString();
//         if(cacheStore[key]){
//             return cacheStore[key];
//         }else{
//             const output = myFn(...args);
//             cacheStore[key] = output;
//             return output;
//         }
//     }
// }

// const getApiWithMerging = createApiWithMerging(getApi);
// console.log(getApiWithMerging('/list', 'anas'))


// ----------------------------------------------------------------

// const obj = [
//     {
//         key: 'Sample 1',
//         data: 'Data1'
//     },
//     {
//         key: 'Sample 1',
//         data: 'Data1'
//     },
//     {
//         key: 'Sample 2',
//         data: 'Data2'
//     },
//     {
//         key: 'Sample 1',
//         data: 'Data1'
//     },
//     {
//         key: 'Sample 3',
//         data: 'Data1'
//     },
//     {
//         key: 'Sample 4',
//         data: 'Data1'
//     },
// ];

// const output = obj.reduce((acc, curr) => {
//     if (!acc[curr.key]) {
//         acc[curr.key] = []
//     } 
//     acc[curr.key].push(curr)
//     return acc
// }, {})

// console.log(output)

// ----------------------------------------------------------------

// function flattenArray(array){
//     const temp = [];
//     for(let i=0; i<array.length; i++){
//         if(Array.isArray(array[i])){
//             temp.push(...flattenArray(array[i]))
//         }else {
//             temp.push(array[i]);
//         }
//     }
//     return temp;
// }
// const arr = [1,2,3,[4,5,[6,7]],8,9];

// const result = flattenArray(arr);
// console.log(result);

// ----------------------------------------------------------------

// function chunk(arr, size){
//     const answer = [];
//     let temp = [];
//     let currSize = 0;
//     for(let i = 0; i < arr.length; i++){
//         temp.push(arr[i]);

//         if(temp.length === size){
//             answer.push(temp);
//             temp = [];
//         }
//     }

//     if(temp.length > 0){
//         answer.push(temp);
//     }
//     return answer;
// }

// const array = [1,2,3,4,5,6,7]
// console.log(chunk(array,2))
// console.log(chunk(array,3))
// console.log(chunk(array,4))


// -----------------------------------------------------------------------------------------------

// function groupAnagrams(words) {
//     return Object.values(
//         words.reduce((acc, curr) => {
//             const key = curr.split('').sort().join('');
//             acc[key] = acc[key] || [];
//             acc[key].push(curr);
//             return acc;
//         }, {})
//     )
// }

// console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))

// ----------------------------------------------------------------

// function kLargestNumber(arr, k){
//     let ans;
//     let count = 0;
//     if(arr.length === 1 && k=== 1){
//         return arr[0];
//     }

//     const sortedArray = arr.sort();
//     for(let i=sortedArray.length-1; i>=0; i--){
//         if(k !== count){
//             ans = sortedArray[i];
//             count++;
//         }else {
//             return ans;
//         }
//     }
// }

// const Input = [3,2,1,5,6,4];
// let k = 2;

// console.log(kLargestNumber(Input, k));

// ----------------------------------------------------------------
// function rotateMatrix(array) {
//     const ans = [];
//     let currIndex = 0;
//     while (currIndex < array[0].length) {
//         const group = [];
//         for (let i = array.length - 1; i >= 0; i--) {
//             group.push(array[i][currIndex]);
//         }
//         ans.push(group);
//         currIndex++;
//     }
//     return ans;
// }

// const arr = [
//     [1, 2, 3], [4, 5, 6], [7, 8, 9]
// ]

// console.log(rotateMatrix(arr));

// [
//     [7, 4, 1],
//     [8, 5, 2],
//     [9, 6, 3]
// ]


// --------------------------------------------------------------------------------------------------------------------

// const input = {
//     A: (a, b, c) => a + b + c,
//     B: (a, b, c) => a - b - c,
//     C: (a, b, c) => a + b *c,
//     D: {
//         E: (a, b, c) => a + b + c,
//     }
// }


// function compute(a=0, b=0, c=0) {
//     function traverse(obj) {
//         let output = {};
//         for(const key in obj) {
//             const value = obj[key];
//             if(typeof value === 'function'){
//                 try{  
//                     output[key] = value(a,b,c);
//                 }catch(e){
//                     console.log(e)
//                 }
//             }else if(typeof value === 'object'){
//                 output[key] = traverse(value);
//             }
//         }
//         return output;
//     }
//     return traverse(input)
// }

// const ans = compute(1, 1, 1);
// console.log(ans);

// ----------------------------------------------------------------

// const arr = [1, 2, 3, 4, 5, 6, 7, 8];

// Array.prototype.myReduce = function (cbFn, initialValue) {
//     for(let i=0; i<this.length; i++){
//         initialValue = cbFn(initialValue, this[i])
//     }
//     return initialValue
// }

// const ans = arr.myReduce((acc, curr) => {
//     acc = acc + curr;
//     return acc
// }, 0)

// console.log(ans);


// -------------------------------------------------------------

// function memoize(fn){
//     const cache = {};
//     return function (...args) {
//         const key = args.sort().toString();
//         if(cache[key]){
//             console.log('from cache');
//             return cache[key];
//         }else{
//             const ans = fn(args);
//             cache[key] = ans;
//             return ans;
//         }
//     }
// }

// const addSum = (a,b,c) => a + b + c; 

// const memoizeAdd = memoize(addSum);
// console.log(memoizeAdd(1,3))

// ---------------------------------------------------------------------

// function findMax(array){
//     let ans = [];
//     let max;
//     function flattenArray(array){
//         array.forEach(element => {
//             if(Array.isArray(element)){
//                 flattenArray(element);
//             }else {
//                 ans.push(element);
//             }
//         });
//     }
//     flattenArray(array)
//     ans.sort();
//     max = ans[ans.length - 1];
//     return max;
// }

// const nums = [4, 2, [6, 3], [1, [9, 8] ] , 5];
// console.log(findMax(nums));

// ---------------------------------------------------

// const obj1 = {
//     test: 'value1',
// }

// const obj2 = {...obj1};
// obj2.test = 'value2';

// console.log(obj2)

// let a = 'anas';
// let b = 2;

// console.log(1 - 'b')

// ----------------------------------------------------------------

// const arr = [1, 2, 3, 4, 5,4,2,3];

// const updateArr = new Set(arr);
// console.log(updateArr)

// const findDuplicates = (arr) =>{
//     const temp = []
//     const sortedArr=[...arr].sort();
//     console.log(sortedArr)
//     for(let i=0; i<sortedArr.length-1; i++){
//         if(sortedArr[i] === sortedArr[i+1] && !temp.includes(sortedArr[i])){
//             temp.push(sortedArr[i]);
//         }
//     }
//     return temp;
// }

// console.log(findDuplicates(arr))

// let str = 'MyNameIsAnas';
// let result = str.split('').map((char)=> char === char.toUpperCase() ? ' '+char : char).join('').trim();
// console.log(str);
// console.log(result);

// const user = { profile: { name: 'Anas' } };
// console.log(user.name);

// const input = document.getElementById('searchInput');

// function debounce(fn, delay) {
//     let timer;
//     return function(...args){
//         clearTimeout(timer);
//         timer = setTimeout(()=>{
//             fn.apply(this, args);
//         }, delay);
//     }

// }


// const handleInput = debounce(()=>{
//     console.log(input.value)
// }, 1000)

// input.addEventListener('input', handleInput);

// ----------------------------------------------------------------

// const str = 'anas';
// const updatedStr = str.split('')
// updatedStr[0] = 'b'
// console.log(updatedStr)

// const str = 'banglore';

// function reverseStr(str) {
//     const updatedStr = str.split('')
//     const size = Math.floor(str.length / 2)
//     console.log(size)
//     for (let i = 0; i < size; i++) {
//         let start = i;
//         let end = updatedStr.length - 1 - i;
//         let temp = updatedStr[start];
//         updatedStr[start] = updatedStr[end];
//         updatedStr[end] = temp;
//     }

//     return updatedStr.join('');
// }

// console.log(reverseStr(str));


// ----------------------------------------------------------------

// const input = {
//     A: (a, b, c) => a + b + c,
//     B: (a, b, c) => a - b - c,
//     C: (a, b, c) => a + b *c,
//     D: {
//         E: (a, b, c) => a + b + c,
//     }
// }

// const compute = (a=0,b=0,c=0) =>{
//     function generate(input){
//         const ans = {}
//         Object.entries(input).forEach((item)=>{
//             if(typeof (item[1]) === 'function'){
//                 const value = item[1]
//                 ans[item[0]] = value(a,b,c)
//             }else if(typeof (item[1]) === 'object'){
//                 ans[item[0]] = generate(item[1]);
//             }
//         })
//         return ans;
//     }

//     return generate(input);
// }

// // { A: 3, B: -1, C: 2, D: { E: 3 } }
// const ans = compute(1, 1, 1);
// console.log(ans);

// ----------------------------------------------------------------

// function meregeAlternative(s1, s2) {
//     const str1 = s1.split('');
//     const str2 = s2.split('');
//     let ans = ''
//     let i = 0, j = 0;

//     while(i < str1.length || j < str2.length) {
//         if (i < str1.length ) {
//             ans += str1[i];
//             i++;
//         }

//         if (j < str2.length) {
//             ans += str2[j];
//             j++;
//         }
//     }

//     return ans;
// }

// console.log(meregeAlternative('anas', 'nadkar'));

// ----------------------------------------------------------------

// function longestString(str) {
//     const arr = str.split(' ');
//     console.log(arr)

//     const max = arr.reduce((acc, curr) => {
//         if(curr.length > acc.length){
//             acc = curr;
//         }
//         return acc;
//     },'')

//     return max;
// }

// console.log(longestString('anas love javascript'))

// ----------------------------------------------------------------

// const ans = [];
// function flattenArray(array) {

//     for (let i = 0; i < array.length; i++) {
//         if (Array.isArray(array[i])) {
//             flattenArray(array[i]);
//         }else{
//             ans.push(array[i]);
//         }
//     }

//     return ans;
// }

// console.log(flattenArray([[1, 2], [3, 4], [5, 6], [7, 8]]))

// let {a,b,c} = {a:1,b:2,c:3}
// console.log(b)

// ----------------------------------------------------------------

// const obj = { a: 1, b: 2, c: 3 }
// let arr = Object.entries(obj)
// console.log(arr)

// ----------------------------------------------------------------
// function findTheSmallestWord(str){
//     let ans = '';
//     const array = str.split(' ');
//     ans = array[0];
//     for (let i = 0; i < array.length; i++) {
//         let curr = array[i];
//         if(curr.length <= ans.length){
//             ans = curr
//         }
//     }
//     return ans;
// }

// const str = "Find the sma word"

// console.log(findTheSmallestWord(str))

// ----------------------------------------------------------------

// Array.prototype.groupeBy = function(fn){
//     return this.reduce((acc, curr)=>{
//         const key = fn(curr)
//         if(!acc[key]){
//             acc[key] = []
//         }
//         acc[key].push(curr)
//         return acc
//     },{})
// }

// const array1 = [
//     {"id": "1"},
//     {"id": "1"},
//     {"id": "2"},
// ]

// const fn1 = function(item){
//     return item.id;
// }

// console.log(array1.groupeBy(fn1));

// ---------------------------------------------

// const p1 = Promise.resolve("p1 resolved")
// const p2 = Promise.reject("p2 rejected")
// const p3 = Promise.resolve("p3 resolved")

// Promise.allSettled([p1, p2, p3]).then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// })

// ----------------------------------------------------------------

// const arr = [1,2,3,4,5,6];

// const ans = arr.reduce((acc,curr)=>{
//     return acc + curr
// },0)

// console.log(ans)

// ----------------------------------------------------------------------

// function findMissingRepeatingNumbers(nums) {
//     let missingNo;
//     let duplicate;
//     const updatedNums = nums.sort();
//     for (let i = 0; i < updatedNums.length; i++) {
//         if (!duplicate && updatedNums[i] === updatedNums[i + 1]) {
//             duplicate = updatedNums[i];
//         }
//         if(!updatedNums.includes(i)) {
//             missingNo = i
//         }
//     }

//     if(!missingNo){
//         missingNo = updatedNums.length;
//     }
//     return [duplicate, missingNo];

// }

// console.log(findMissingRepeatingNumbers([6,5,7,1,8,6,4,3,2]))

// ------------------------------------------------------

// function retrievePaths(folderStructure) {
//     const paths = [];

//     function helper(structure, currentPath) {
//         for (const [key, value] of Object.entries(structure)) {
//             const newPath = currentPath ? `${currentPath}/${key}` : key;

//             if (typeof value === 'object') {
//                 helper(value, newPath);
//             } else {
//                 paths.push(newPath);
//             }
//         }
//     }

//     helper(folderStructure, "");
//     return paths;
// }
// const folderStructure = {
//     src: {
//         components: {
//             Button: {
//                 "index.js": "file",
//                 "style.css": "file"
//             }
//         },
//         utils: {
//             "helpers.js": "file"
//         }
//     },
//     public: {
//         "index.html": "file"
//     }
// };

// console.log(retrievePaths(folderStructure));


// ------------------------------------------------------------------------------------------------

// const obj = {
//     a: 1,
//     b: function() {
//         return this.a;
//     },
//     c: () => {
//         return this.a;
//     }
// };

// console.log(obj.b());  // Output 1?
// console.log(obj.c());  // Output 2?

// const test = obj.b;
// console.log(test());    // Output 3?

// const testArrow = obj.c;
// console.log(testArrow());  // Output 4?

// ------------------------------------------------

// const obj1 = {};
// const obj2 = { parent: obj1 };
// obj1.child = obj2;


// console.log(obj1);

// const arr = [1, 1, 2, 2, 2, 3];

// const ans = arr.reduce((acc,curr)=>{
//     acc[curr] = acc[curr] ? acc[curr] + 1 : 1 ;
//     return acc ;
// },{})

// console.log(ans);

// ----------------------------------------------------------

// function debounce(cbFn, delay) {
//     let timer;
//     return function (...args) {
//         clearTimeout(timer);
//         timer = setTimeout(() => cbFn(...args), delay);
//     }
// }

// const example = debounce((...args) => {
//     console.log(...args)
// }, 2000)

// example("hii1")
// example("hii2")
// example("hii3")


// ----------------------------------------------------------------

// function createCounter() {
//     let count = 0;
//     return {
//         increment: () => ++count,
//         decrement: () => --count,
//         getCount: () => count
//     };
// }

// const counter1 = createCounter();
// const counter2 = createCounter();

// counter1.increment()
// console.log(counter2.getCount())

// ----------------------------------------------------------------

// function modify1(num){
//     return num + 1;
// }

// function modify2(arr){
//     return arr.shift()
// }
// let num = 0;
// let arr = [1,2,3,4];

// modify1(num)
// modify2(arr)

// console.log(num)
// console.log(arr)

// ----------------------------------------------------------------


// const task = (time) => {
//     return () =>
//         new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(`resolved promised with ${time}`);
//             }, time);
//         });
// };

// const callApis = [
//     task(1000),
//     task(500),
//     task(400),
//     task(600),
//     task(300),
//     task(700),
// ];

// const throttlePromises = async (callApis, limit) => {
//     let currentFetchCount = 0;
//     const result = [];

//     while (currentFetchCount < callApis.length) {
//         let batch = callApis
//             .slice(currentFetchCount, currentFetchCount + limit)
//             .map((api) => api());

//         let batchResults = await Promise.all(batch);

//         result.push(...batchResults);
//         currentFetchCount += limit;
//     }
//     return result;
// };

// throttlePromises(callApis, 2)
//     .then((data) => console.log("Final result:", data))
//     .catch((err) => console.error(err));


// ----------------------------------------------------------------

// const user = {
//     name: "Rowdy Coders",
//     address: {
//       primary: {
//         house: "109",
//         street: {
//           main: 21,
//           cross: ["32", "1"],
//         },
//       },
//     },
//   };

//   function flattenObject(user) {
//     let ans = {};

//     function helper(user) {
//       Object.entries(user).forEach(([key, value])=>{
//         if(!typeof value === "object"){
//           ans[key] = value;
//         }else{
//           helper(value);
//         }
//       })
//     }

//     helper(user);

//     return ans;
//   }

//   console.log(flattenObject(user));

// -------------------------------------------------------

// const str = "a.b.c"

// function stringToObject(str, value) {
//   const array = str.split(".");
//   const ans = array.reduceRight((acc, curr) => ({
//     [curr]: acc
//   }), value)

//   return ans
// }

// console.log(stringToObject(str, "anas"))


// -----------------------------------------------------

// function func(){
//     const a = b = c = 1;
// }

// func();
// console.log(typeof a, typeof b, typeof c);

// ----------------------------------------------------

// sayOtherName();
// sayName();

// var sayName = () =>{
//     console.log("hello world!");
// }

// function sayOtherName() {
//     console.log("world!");
// }

// ----------------------------------------------------------------

// for(let i = 0; i <5; i++) {
//     setTimeout(()=>{
//         console.log(i);
//     },1000)
// }

// ----------------------------------------------------------------

// const outerFunc = () => {

//   if (true) {
//     // "if" block scope
//     var count = 12;
//     console.log(count); // 12
//   }

//   console.log(count); // 12
// }

// outerFunc();
// // console.log(count); // ReferenceError

// ---------------------------------------------------------------- 

// function test(time) {

//     return () => {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve("resolved by " + time + " seconds")
//             }, time)
//         })
//     }

// }

// const callbacks = [test(400), test(500), test(600), test(100)];

// async function getResult(callbacks) {
//     const result = []

//     const batch = callbacks.map((api) => api())
//     const ans = await Promise.all(batch)

//     result.push(...ans)

//     return result
// }

// getResult(callbacks).then((result) =>{
//     console.log(result)
// }).catch((err) =>{
//     console.log(err)
// })

// ----------------------------------------------------------------

// const p1 = Promise.resolve("Promise 1 resolved");
// const p2 = new Promise((resolve) => setTimeout(() => resolve("Promise 2 resolved"), 1000));
// const p3 = Promise.resolve("Promise 3 resolved");

// Promise.all([p1, p2, p3])
//     .then((results) => console.log(results))
//     .catch((error) => console.log("Error:", error));


// ----------------------------------------------------------------

// console.log('start');

// const promise1 = new Promise((resolve, reject) => {
//   console.log(1)
//   resolve(2)
//   console.log(3)
// })

// promise1.then(res => {
//   console.log(res)
// })

// console.log('end');

// ----------------------------------------------------------------

// function calculate(...params) {
//     return params.reduce((acc, val) => {
//         return acc + val;
//     });
// }

// // Memo Function
// function memo(...params) {
//     var obj = {};

//     return function (...actualParams) {
//         let uniqueKey = actualParams.join('');

//         // Return from Cache
//         if (obj[uniqueKey]) {
//             return obj[uniqueKey];
//         }

//         // Calculate value and Store it
//         return obj[uniqueKey] = calculate(...actualParams);
//     };
// }

// var memoizsed = memo();

// console.log(memoizsed(1, 2, 3, 10, 3, 4, 2));

// ----------------------------------------------------------------

// function closure() {
//     let count = 0;
//     return function test() {
//         count++;
//         return count;
//     }
// }

// const closuredTest = closure();

// console.log(closuredTest());
// console.log(closuredTest());
// console.log(closuredTest());

// ----------------------------------------------------------------

// async function async1() {
//     console.log("async1 start");
//     const data = await async2();
//     console.log(data);
//     console.log("async1 end");
// }

// async function async2() {
//     console.log("async2");
//     return "async2 completed";
// }

// console.log("script start");

// setTimeout(function () {
//     console.log("setTimeout");
// }, 0);

// async1();

// new Promise(function (resolve) {
//     console.log("promise1");
//     resolve();
// }).then(function () {
//     console.log("promise2");
// });

// console.log("script end");

// ----------------------------------------------------------------

// let car1 = {
//     color: "green",
//     company: "Ferrari"
// }

// function purchaseCar(currency, amount) {
//     console.log(`I have purchase ${this.color} - ${this.company} car for ${currency}${amount}`)
// }

// Function.prototype.myCall = function(context = {}, ...args) {
//     if(typeof this !== "function"){
//         throw new Error(this + " is not a function");
//     }

//     context.fn = this
//     context.fn(...args)
// }
// purchaseCar.myCall(car1, "rs", 50000000)

// Function.prototype.myApply = function(context = {}, args = []) {
//     if(typeof this !== "function"){
//         throw new Error(this + " is not a function");
//     }

//     if(!Array.isArray(args)){
//         throw new TypeError("CreateListFromArray called on non-object")
//     }

//     context.fn = this
//     context.fn(...args)
// }
// purchaseCar.myApply(car1, ["rs", 50000000])

// Function.prototype.myBind = function(context = {}, ...args) {
//     if(typeof this !== "function"){
//         throw new Error(this + " is not a function");
//     }

//     context.fn = this
//     return function (...newArgs){
//         return context.fn(...args, ...newArgs)
//     }
// }
// const newFn = purchaseCar.myBind(car1)
// newFn("rs", 50000000)


// function sum(a, b) { return this.a + this.b + a + b };

// const obj = {
//     a: 10,
//     b: 10,
// }
// const ans = sum.bind(obj, 10, 20)
// console.log(ans())


// const p1 = new Promise((resolve, reject) => {
//     if (1 > 2) {
//         resolve("resolved")
//     }else{
//         reject("rejected")
//     }
// })

// const ans = p1.then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// })

// async function fetchCart(){
//     const response = await fetch('https://dummyjson.com/carts');
//     const result = await response.json();
//     return result
// }

// const ans = fetchCart();
// console.log(ans);

// ---------------------------------

// let obj1 = {
//     a:10,
//     b:{
//         c:100,
//     }
// }
// let obj2 = {...obj1};
// obj2.b.c = 70;
// console.log(obj1);
// console.log(obj2);

// -----------------------------------------

// const obj =[
//     {
//         key:'Sample 1',
//         data: 'Data 1'
//     },{
//         key:'Sample 1',
//         data: 'Data 1'
//     },{
//         key:'Sample 2',
//         data: 'Data 2'
//     },{
//         key:'Sample 1',
//         data: 'Data 1'
//     },{
//         key:'Sample 3',
//         data: 'Data 1'
//     },
//     {
//         key:'Sample 4',
//         data: 'Data 1'
//     },
// ]

// const ans = obj.reduce((acc, curr)=>{
//     if(acc[curr.key]){
//         acc[curr.key].push(curr);
//     }else{
//         acc[curr.key] = [curr];
//     }

//     return acc;
// },{});

// console.log(ans);

// ----------------------------------------------------------------

// const memoizeOne = (cbFn) =>{
//     const cache = {};
//     return function (...args){
//         let key = args.sort().toString();
//         if(cache[key]){
//             console.log("from cache")
//             return cache[key];
//         }else{
//             const ans = cbFn(...args);
//             cache[key] = ans
//             console.log("first execution")
//             return ans;
//         }
//     }
// }

// const add = (a, b) => a + b;
// const sub = (a, b) => a - b;
// const memoizeAdd = memoizeOne(add);
// const memoizeSub = memoizeOne(sub);
// console.log(memoizeAdd(1,2));
// console.log(memoizeAdd(3,2));
// console.log(memoizeAdd(1,2));
// console.log(memoizeSub(1,2));
// console.log(memoizeAdd(2,1));

// const a = [1,2,3,[4,5,[6,7]],8,9];

// function flattenArray(a){
//     const temp = [];
//     function helper(array){
//         for(let i=0; i<a.length; i++){
//             if(typeof array[i] === "number"){
//                 temp.push(array[i]);
//             }else if(Array.isArray(array[i])){
//                 helper(array[i]);
//             }
//         }
//     }
//     helper(a)
//     return temp;
// }

// const result = flattenArray(a);
// console.log(result);

// ------------------

// const obj = {
//     name: 'anas',
//     age: 20,
//     balls: {
//         type:'leather'
//     }
// }

// const obj2 = JSON.parse(JSON.stringify(obj));
// obj2.balls.type = "tennis";

// console.log(obj);
// console.log(obj2);

// ----------------------------------------------------------------

// var myObj = {
//     foo: "bar",
//     func: function () {
//         var self = this;
//         console.log(this.foo)
//         console.log(self.foo)
//             (function () {
//                 console.log(this.foo)
//                 console.log(self.foo)
//             })()
//     }
// }

// myObj.func()

// ----------------------------------------------------------------

// let todoInput = document.getElementById('todoInput');
// let submitButton = document.getElementById('submitButton');
// let todoWrapper = document.getElementById('todoWrapper');

// function addTodo(){
//     let todoText = todoInput.value.trim();

//     if(todoText === '') return;

//     let li = document.createElement('li');

//     let taskSpan = document.createElement('span');
//     taskSpan.textContent = todoText;
//     taskSpan.onclick = function(){
//         taskSpan.classList.toggle('completed');
//     }

//     li.appendChild(taskSpan);
//     todoWrapper.appendChild(li);

//     todoInput.value = ""; 
// }

// --------------------------------------------

// const input = {
//     user: {
//         name: "John",
//         address: {
//             city: "New York",
//             zip: "10001"
//         }
//     }
// };


// function flattenObject(obj, prefix = "") {
//     let temp = {};

//     for (let key in obj) {
//         let newKey = prefix ? `${prefix}.${key}` : key;

//         if (typeof obj[key] === "object" && obj[key] !== null) {
//             Object.assign(temp, flattenObject(obj[key], newKey))
//         } else {
//             temp[newKey] = obj[key];
//         }
//     }
//     return temp;
// }

// console.log(flattenObject(input)); 

// ----------------------------------------------------------------

// const data = {
//     user: {
//         profile: {
//             name: "Alice",
//             details: {
//                 age: 28,
//                 city: "San Francisco"
//             }
//         }
//     }
// };

// const { user: {
//     profile: {
//         name,
//         details: {
//             age,
//             city
//         }
//     }
// } } = data;

// console.log(name, age, city)

// ----------------------------------------------------------------

// function createCounter(input) {
//     let count = input;
//     return function () {
//         return count++;
//     }
// }
// const counter = createCounter(5);

// console.log(counter());
// console.log(counter());
// console.log(counter());

// const obj = {
//     name: 'anas',
//     user: {
//         username: 'anasnadkar45',
//         email: 'anasnadkar45@gmail.com'
//     }
// }

// const obj2 = structuredClone(obj);
// obj2.user.email = 'anasnadkar25@gmail.com'
// console.log(obj2);
// console.log(obj);

// async function fetchApi(){
//     const response = await fetch('https://dummyjson.com/todos?limit=20&skip=80');
//     const result = await response.json();
//     return result.todos;
// }

// fetchApi().then((response)=>{
//     const groupedUser = response.reduce((acc, curr)=>{
//         if(!acc[curr.userId]){
//             acc[curr.userId] = []
//         }
//         acc[curr.userId].push(curr)
//         return acc;
//     },{})

//     console.log(groupedUser)
// }).catch((err)=>{
//     console.error(err);
// })

// --------------------------------

// function curry(fn, ...args) {
//     return (...newArgs) => {
//         const allArgs = [...args, ...newArgs];
//         return allArgs.length >= fn.length ? fn(...allArgs) : curry(fn, ...allArgs);
//     }
// }
// const join = (a, b, c) => {
//     return `${a}_${b}_${c}`
// }
// const curriedJoin = curry(join)
// console.log(curriedJoin(1, 2, 3)); // '1_2_3'
// console.log(curriedJoin(1)(2, 3)); // '1_2_3'
// console.log(curriedJoin(1, 2)(3)); // '1_2_3'
// console.log(curriedJoin(1)(2)(3)); // '1_2_3'

// ----------------------------------------------------------------

// Array.prototype.myFlat = function (depth = 1) {
//     const flatten = (arr, depth) => {
//         if (depth === 0) return arr;
//         return arr.reduce((acc, curr) =>
//             Array.isArray(curr)
//                 ? acc.concat(flatten(curr, depth - 1))
//                 : acc.concat(curr),
//             [])
//     }

//     return flatten(this, depth);
// }

// const arr = [1, [2, [3]], [4, [5]]];
// console.log(arr.myFlat(4))

// ----------------------------------------------------------------

