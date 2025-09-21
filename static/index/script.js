window.onload = function() {
    try {
        const image = document.getElementById("vector1");
        var canvas = fx.canvas();
        var texture = canvas.texture(image);
        
        image.parentNode.insertBefore(canvas, image);
        image.parentNode.removeChild(image);
    
        window.addEventListener("mousemove", function(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.pageX - rect.left;
            const y = e.pageY - rect.top;
            canvas.draw(texture).swirl(x, y, 200, 4).update();
        });
    } catch (error) {
        console.log(error);
    }
}