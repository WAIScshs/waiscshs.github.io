function loadText(text) {
    document.getElementById("windowText").innerHTML = text;
}


window.onload = function() {
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


    const windowBackground = document.getElementById("windowBackground");

    windowBackground.addEventListener("click", function (event) {
        if (event.target.id === "windowBackground") {
            windowBackground.style.display = "none";
        }
    });

    const projects = document.getElementById("projects");
    const members = document.getElementById("members");
    const meetings = document.getElementById("meetings")
    const contact = document.getElementById("contact");

    projects.addEventListener("click", function() {
        windowBackground.style.display = "block";
    });

    members.addEventListener("click", function() {
        windowBackground.style.display = "block";
    });

    meetings.addEventListener("click", function() {
        windowBackground.style.display = "block";
    });

    contact.addEventListener("click", function() {
        windowBackground.style.display = "block";
    });
}