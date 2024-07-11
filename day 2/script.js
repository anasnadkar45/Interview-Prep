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
// const str = 'hi i am anas';

// const strArray = [];
// str.split(' ').map((word)=>{
//     strArray.push(word.charAt(0).toUpperCase()+word.slice(1));
// })

// console.log(strArray)

// Q8
// function outer() {
//     let count = 0;
//     return function inner() {
//         count++;
//         console.log(count);
//     }
// }

// const counter = outer();
// counter(); // 1
// counter(); // 2

// Q8
// function foo(a,c,...rest){
//     console.log(a,rest,c);
// }

// foo(1,2,3,4,5);

// Q9
// console.log(name);

// var name = 'anas';
// const url = 'https://jsonplaceholder.typicode.com/users';
// async function getUsers() {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     } catch (error) {
//         console.error('Error fetching users:', error);
//     }
// }

// async function displayUsers() {
//     const users = await getUsers();
//     console.log(users)
//     const container = document.getElementById('container');

//     users.forEach(user => {
//         const cardDiv = document.createElement('div');
        
//         // Create and append the name
//         const nameItem = document.createElement('div');
//         const nameLabel = document.createElement('span');
//         nameLabel.textContent = 'Name: ';
//         const nameValue = document.createElement('span');
//         nameValue.textContent = user.name;
//         nameItem.appendChild(nameLabel);
//         nameItem.appendChild(nameValue);
//         cardDiv.appendChild(nameItem);

//         // Create and append the username
//         const usernameItem = document.createElement('div');
//         usernameItem.classList.add('card-item');
//         const usernameLabel = document.createElement('span');
//         usernameLabel.classList.add('card-label');
//         usernameLabel.textContent = 'Username: ';
//         const usernameValue = document.createElement('span');
//         usernameValue.textContent = user.username;
//         usernameItem.appendChild(usernameLabel);
//         usernameItem.appendChild(usernameValue);
//         cardDiv.appendChild(usernameItem);

//         // Create and append the email
//         const emailItem = document.createElement('div');
//         emailItem.classList.add('card-item');
//         const emailLabel = document.createElement('span');
//         emailLabel.classList.add('card-label');
//         emailLabel.textContent = 'Email: ';
//         const emailValue = document.createElement('span');
//         emailValue.textContent = user.email;
//         emailItem.appendChild(emailLabel);
//         emailItem.appendChild(emailValue);
//         cardDiv.appendChild(emailItem);

//         // Append the card to the container
//         container.appendChild(cardDiv);

        
//     })
// }

// displayUsers();

// console.log(typeof abcd);

// const [a, ,b]= [1,2,3,4,5,6].slice(3,4)[0];
// console.log(a,b);


// {
//     let a = 1;
//     let b = 2;

//     console.log(a);
//     console.log(b);
// }

// console.log(a);
// console.log(b);


// var x = 20;

// function foo(){
//     console.log(x);
//     var x = 10;
// }

// foo()

let username = "my name is anas";

let str = username.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

console.log(str);


