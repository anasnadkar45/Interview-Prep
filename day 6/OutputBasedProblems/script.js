// var PromiseBtn = document.querySelector('.promiseBtn');

// var MyPromise = new Promise((resolve)=>{
//     PromiseBtn.addEventListener('click', ()=>{
//         resolve('Promis is resolved');
//     })
// }).then((res)=> {
//     console.log(res);
// })

// var x = 1;
// var y = 'a';

// console.log(x + y);

// var obj1 = {
//     name: 'foo',
// }

// var obj2 = {
//     age: 10
// }

// let finalObj = {...obj1, ...obj2}
// console.log(finalObj)

// var arr1 = ["a", "b", "c", "d", "e"];
// var arr2 = ["a", "b", "c", "d", "e"];

// const newArray = [...arr1, ...arr2];
// console.log(newArray);

let number = 123;

function ReverseNumber(number){
    const numberStr = number.toString().split('').reverse().join('');
    return console.log(numberStr);
}

ReverseNumber(number);