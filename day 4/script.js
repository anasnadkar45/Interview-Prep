
// var x = 2;
// var y = "4";

// return console.log(x - y);

// {
//     var x = 1;
//     console.log(x);
//     console.log(x);
// }


// Higher order functions
// function higherOrder(fn) {
//     fn();
// }

// higherOrder(function () { console.log("Hello world") });

// function higherOrder2() {
//     return function() {
//       return console.log("Hello world");
//     }
//   }      
//   var x = higherOrder2();
//   x()   



// this keyword
// function doSomething() {
//     console.log(this);
// }

// doSomething();

// var obj = {
//     name:  "vivek",
//     getName: function(){
//     console.log(this.name);
//   }
// }
   
// obj.getName();

// let url = 'https://jsonplaceholder.typicode.com/users';
// async function fetchData(){
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
// }

// fetchData();

// async function displayUsers(){
//     // const users = await fetchData();
//     const users = [
//         {
//             id:1,
//             name: 'John',
//             email: 'john@typicode.com'
//         },
//         {
//             id:2,
//             name: 'John',
//             email: 'john@typicode.com'
//         },
//         {
//             id:3,
//             name: 'John',
//             email: 'john@typicode.com'
//         },
//     ]

//     console.log(users);
//     const container = document.getElementById('container');

//     users.forEach(user => {
//         const card = document.createElement('div');
//         card.classList = 'card';

//         // create and append the name in card
//         const nameItem = document.createElement('div');
//         const nameLabel = document.createElement('span');
//         const nameValue = document.createElement('div');

//         nameLabel.textContent = 'Name: ';
//         nameValue.textContent = user.name

//         nameItem.appendChild(nameLabel);
//         nameItem.appendChild(nameValue);

//         card.appendChild(nameItem);

//         container.appendChild(card);
//     });
// }

// displayUsers();