const Button = document.getElementById('circleBtn');
let Output = document.getElementById('output');

function createCircle(){
    const size = Math.random() * 200 + 50;
    Output.style.width = size + 'px';
    Output.style.height = size + 'px';
}

Button.addEventListener('click', ()=>{
    createCircle();
})