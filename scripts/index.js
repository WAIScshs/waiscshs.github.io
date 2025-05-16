window.onload = function() {
    const hexagon = document.getElementById("zoom");
    hexagon.addEventListener("animationend", function() {
        hexagon.remove();
    });

    const hexLogo = document.getElementById("hex-logo");
    hexLogo.addEventListener("animationend", function() {
        hexLogo.remove();
    });
}