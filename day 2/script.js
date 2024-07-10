// var x = 10;
// function foo(){
//     console.log(x)
//     var x = 20;
// }

// foo();


// Q2
// console.log('start');
// setTimeout(()=>{
//     console.log('Timeout');
// },0);

// console.log('end');


// Q3
// here the order will be end, promise, and then timeout.
// because promise is microtask and has higher priority than timeout
// setTimeout(()=>{
//     console.log('Timeout');
// },0);

// Promise.resolve().then(() => console.log('Promise'));
// console.log('end');


// Q4 
// resturn a promise
// async function foo() {
//     return 'Hello, world'
// }

// const result = foo();
// console.log(result);

// return result in string
// async function foo() {
//     return 'Hello, world';
// }

// async function main() {
//     const result = await foo();
//     console.log(result);
// }

// main();


// Q5
// it will be false becausr the reference is element in an array is different 
// console.log([1,2] == [1,2]);


// Q6
// const numbers = [1, 2, 3, 4, 5, 6, 7];

// const filteredNumbers = numbers.filter((number) => number < 3).map((number) => number + 5);
// console.log(filteredNumbers);


// Q7
const str = 'hi i am anas';

const strArray = [];
str.split(' ').map((word)=>{
    strArray.push(word.charAt(0).toUpperCase()+word.slice(1));
})



console.log(strArray)