let url = 'https://jsonplaceholder.typicode.com/posts';

async function fetchData() {
    const data = await fetch(url);
    const response = await data.json();
    return response.slice(0, 10);
}


var accordian__container = document.querySelector('.accordian__container');
async function displayAccordian() {
    var accordianData = await fetchData();
    console.log(accordianData);

    accordianData.forEach(data => {
        var accordianItem = document.createElement('div');
        var title = document.createElement('h1');
        var content = document.createElement('p');

        title.innerHTML = data.title;
        content.innerHTML = data.body;
        content.style.display = 'none';

        title.onclick = () => {
            if(content.style.display === 'none'){
                content.style.display = 'block'
            }else{
                content.style.display = 'none'
            }
        }

        accordianItem.appendChild(title);
        accordianItem.appendChild(content);

        accordian__container.appendChild(accordianItem);
    });

}

displayAccordian();

