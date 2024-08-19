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

// console.log(['1','2'] + 90);

let arr = [1,2,3,4,5,6,7,8,9];
console.log(arr[2], arr.length);

arr.length = 0;
console.log(arr[2], arr.length);
console.log(arr[100]);

// reducer function

// 

function createCounter(){
    let count = 0;
    return function(){
        count++;
        return count;
    }
}

const count1 = createCounter();
const count2 = createCounter();

console.log(count1());
console.log(count1());
console.log(count2());