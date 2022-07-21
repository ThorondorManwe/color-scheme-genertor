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

function ColorToHex(color) {
    const number = Number(color);
    const hexadecimal = number.toString(16);
    return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
}

function ConvertRGBtoHex(red, green, blue) {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}


function recorreDivs(divs) {
    divs.forEach((div) => {
        div.addEventListener('click', function(e) {
            const rgbColor = e.currentTarget.style.backgroundColor;

            const matches = rgbColor.match(/\d+/g);
            
            const red = matches[0];
            const green = matches[1];
            const blue = matches[2];

            const hexColor = ConvertRGBtoHex(red, green, blue);
            navigator.clipboard.writeText(hexColor);
            window.alert("Hex Value on clipboard")
        });
    });
}


function recorrePara(p) {
    p.forEach((p) => {
        p.addEventListener('click', function(e) {
            const paragraphHex = e.currentTarget.innerText;
            navigator.clipboard.writeText(paragraphHex);
            window.alert("Hex Value on clipboard")
        });
    });
}

// Llama a la API
function callApi(color, mode = "monochrome") {
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
        .then(response => response.json())
        .then(data => {
            const array = data.colors;
            let html = "";

            const mappedArray = array.map(function(color) {
                const hexColor = color.hex.value;
                html += `
                    <div>
                        <div class="colors" style="background-color: ${hexColor};">
                            
                        </div>

                        <div class="colorsPara">
                            <p>${hexColor}</p>
                        </div>
                    </div>
                `;
            });
            document.getElementById("color-container").innerHTML = html;

            const divs = document.querySelectorAll('.colors');
            const colorsPara = document.querySelectorAll('.colorsPara');

            recorreDivs(divs);
            recorrePara(colorsPara);

            /* console.log(mappedArray); */
            console.log(array);
        })
}


activate.addEventListener('click', function() {
    let color = colorInput.value;
    color = color.substring(1);
    const selectMode = select.options[select.selectedIndex].value;
    callApi(color, selectMode);
});