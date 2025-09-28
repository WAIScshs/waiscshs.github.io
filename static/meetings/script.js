const regularWidth = 1920;
const regularHeight = 995;
let currentWidth;
let currentHeight;

function getNextMeeting(refDate, today) {
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysInBetween = 14;
    const daysSinceRef = Math.floor((today - refDate) / msPerDay);
    const daysUntilNext = daysInBetween - (daysSinceRef % daysInBetween);
    const nextMeeting = new Date(today.getTime() + (daysUntilNext * msPerDay));
    return nextMeeting;
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

function loadSizes() {
    let vector1 = document.getElementById("vector1");
    const vector2 = document.getElementById("vector2");
    const content = document.querySelector(".content");

    if (vector1 === null) {
        vector1 = document.querySelectorAll("div canvas")[0];
    }

    vector1.style.width = currentWidth * 1.5 + "px";
    vector1.style.height = currentHeight + "px";
    vector1.style.left = -(currentWidth * 1.5 - window.innerWidth)/2 + "px";
    vector1.style.bottom = -currentHeight * 0.25 + "px";

    vector2.style.width = currentWidth * 1.6 + "px";
    vector2.style.height = currentHeight + "px";
    vector2.style.left = -(currentWidth * 1.6 - window.innerWidth)/2 + "px";
    vector2.style.bottom = -currentHeight * 0.43 + "px";

    content.style.width = clamp(currentWidth * 0.625, 0, window.innerWidth) + "px";
    content.style.height = clamp(currentHeight * 0.625, 0, window.innerHeight) + "px";
    content.style.top = ((window.innerHeight - document.getElementById("top-bar").offsetHeight) - parseInt(content.style.height))/2 + document.getElementById("top-bar").offsetHeight + "px";
    content.style.left = (window.innerWidth - parseInt(content.style.width))/2 + "px";
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

    const today = new Date();
    const firstMeeting = new Date("2025-09-18");
    const nextMeetingDate = getNextMeeting(firstMeeting, today);
    const daysUntilMeeting = Math.ceil((nextMeetingDate - today) / (1000 * 60 * 60 * 24));

    const textBox = document.querySelector(".content div");
    textBox.innerHTML = `<h1>Meeting Schedule</h1>Our next meeting is on ${nextMeetingDate.toLocaleDateString()}<br><br>${daysUntilMeeting} days till the next meeting<br><br>We meet in room A125 from 3:30 - 4:30`;
}