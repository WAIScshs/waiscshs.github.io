let currentIndex = 0;
let texts = []
let images = []

const regularWidth = 1920;
const regularHeight = 995;
let currentWidth;
let currentHeight;

function loadSizes() {
    let vector1 = document.getElementById("vector1");
    const vector2 = document.getElementById("vector2");
    const logo = document.querySelector(".container img");
    
    if (vector1 === null) {
        vector1 = document.querySelectorAll("div canvas")[0];
    }

    logo.style.width = currentWidth * 0.32 + "px";
    logo.style.height = currentHeight * 0.16 + "px";

    vector1.style.width = currentWidth * 1.5 + "px";
    vector1.style.height = currentHeight + "px";
    vector1.style.left = -(currentWidth * 1.5 - window.innerWidth)/2 + "px";
    vector1.style.bottom = -currentHeight * 0.25 + "px";

    vector2.style.width = currentWidth * 1.6 + "px";
    vector2.style.height = currentHeight + "px";
    vector2.style.left = -(currentWidth * 1.6 - window.innerWidth)/2 + "px";
    vector2.style.bottom = -currentHeight * 0.43 + "px";
}

window.onload = function() {

    currentWidth = window.innerWidth;
    currentHeight = window.innerHeight;
    if (currentHeight / regularHeight < currentWidth / regularWidth) {
        currentHeight = currentWidth/regularWidth * regularHeight;
    } else {
        currentWidth = currentHeight/regularHeight * regularWidth;
    }
    currentHeight = parseInt(currentHeight);
    currentWidth = parseInt(currentWidth);

    window.addEventListener("resize", function() {
        currentWidth = window.innerWidth;
        currentHeight = window.innerHeight;
        if (currentHeight / regularHeight < currentWidth / regularWidth) {
            currentHeight = currentWidth/regularWidth * regularHeight;
        } else {
            currentWidth = currentHeight/regularHeight * regularWidth;
        }
        currentHeight = parseInt(currentHeight);
        currentWidth = parseInt(currentWidth);
        loadSizes();
    });

    setTimeout(loadSizes, 100);

    let mouseX = 0;
    let mouseY = 0;

    const image = document.getElementById("vector1");
    var canvas = fx.canvas();
    var texture = canvas.texture(image);
    
    image.parentNode.insertBefore(canvas, image);
    image.parentNode.removeChild(image);
    canvas.draw(texture).update();
    
    window.addEventListener("mousemove", function(e) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.pageX - rect.left;
        mouseY = e.pageY - rect.top;

        mouseX = ((mouseX - canvas.width/2)/2) + canvas.width/2;
        mouseY = ((mouseY - canvas.height/2)/2) + canvas.height/2;

        canvas.draw(texture)
            .zoomBlur(parseInt(mouseX), parseInt(mouseY), 0.2)
            .update();
    });
}