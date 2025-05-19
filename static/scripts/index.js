window.onload = function() {
    const main = document.getElementById('main');
    main.hidden = true;
    const elements = document.querySelectorAll('.hex-layer');
    const hexMask = document.querySelector('.hex-mask');
    elements.forEach((element) => {
        element.addEventListener('animationend', function() {
            if (element.id === 'hex-layer4') {
                main.hidden = false;
                hexMask.remove();
            }
            if (element) 
                element.remove();
        });
    });
}