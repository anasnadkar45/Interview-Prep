const div = document.querySelector('div');
const form = document.querySelector('form');
const button = document.querySelector('button');

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

document.querySelector('.products').addEventListener('click',(event)=>{
    if(event.target.tagName === "SPAN"){
        window.location.href += '/' + event.target.className
    }
})
