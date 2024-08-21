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