window.onload = function() {
    const main = document.getElementById('main');
    main.hidden = true;
    const elements = document.querySelectorAll('.hex-layer');
    elements.forEach((element) => {
        element.addEventListener('animationend', function() {
            if (element.id === 'hex-layer4') {
                main.hidden = false;
            }
            if (element) 
                element.remove();
        });
    });
}