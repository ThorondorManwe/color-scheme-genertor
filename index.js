const colorInput = document.querySelector('#color');
/* const hex = document.querySelector('#hex'); */


colorInput.addEventListener('input',()=>{
    let color = colorInput.value;
    /* hex.style.color = color;
    hex.innerHTML = color; */
    color = color.substring(1);
    console.log(color);
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}`)
        .then(response => response.json())
        .then(data => console.log(data))
})
