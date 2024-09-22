
// function calcSum(a) {
//     return function (b) {
//         if (b !== undefined) {
//             return calcSum(a + b);
//         } else {
//             return a;
//         }
//     }
// }

// console.log(calcSum(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)())
// ----------------------------------------------------------------

// function calc(){
//     let sum = 0;
//     return {
//         add(val){
//             sum += val
//             return this
//         },
//         subtract(val){
//             sum -= val
//             return this
//         },
//         multiply(val){
//             sum *= val
//             return this
//         },
//         divide(val){
//             sum /= val
//             return this
//         },
//         getResult(){
//             return sum;
//         }
//     }
// }
// const result = calc().add(10).subtract(5).multiply(20).divide(2).getResult();
// console.log(result);

// function calc(initialValue = 0) {
//     return {
//         add: (val) => calc(initialValue + val),
//         subtract: (val) => calc(initialValue - val),
//         multiply: (val) => calc(initialValue * val),
//         divide: (val) => calc(initialValue / val),
//         getResult: () => initialValue
//     };
// }

// const result = calc(0).add(10).subtract(5).multiply(20).divide(2).getResult();
// console.log(result); // Output: 50


// ---------------------------------------

// function abc(){
//     console.log(abc.timeout)
// }

// abc();
// abc.timeout = 100;

// abc.timeout = 200;
// abc();


// ---------------------------------------

// let a = {name:'anas', age:20};
// let z = a;
// z.name = 'sara';
// console.log(a.name);

// ---------------------------------------
// console.log(+true);
// console.log(!'hello');


