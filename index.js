const colorInput = document.querySelector('#color');
const activate = document.getElementById('activate');
const select = document.getElementById('mode');


let color = colorInput.value;

color = color.substring(1);
/* const hex = document.querySelector('#hex'); */


/* colorInput.addEventListener('input',()=>{
    let color = colorInput.value;
    /* hex.style.color = color;
    hex.innerHTML = color;
    color = color.substring(1);
    return color;
}) */


// Llama a la API
function callApi(color, mode = "monochrome") {
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
        .then(response => response.json())
        .then(data => {
            const array = data.colors;

            const mappedArray = array.map(function(color) {
                return color.hex.value;
            });

            console.log(mappedArray);
        })
}


activate.addEventListener('click', function() {
    const selectMode = select.options[select.selectedIndex].value;
    callApi(color, selectMode);
});