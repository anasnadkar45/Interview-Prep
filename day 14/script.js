const btn = document.querySelector('.increament_btn');
const btnPressed = document.querySelector('.increament_pressed');
const count = document.querySelector('.increament_count');

var pressedCount = 0;
var triggerCount = 0;

const debounceCount = () => {
    setTimeout(() => {
        count.innerHTML = triggerCount++;
    }, 800)
}

btn.addEventListener('click', () => {
    btnPressed.innerHTML = pressedCount++;
    debounceCount();
})