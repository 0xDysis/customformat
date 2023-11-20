document.getElementById('shape').addEventListener('change', updateShape);

function updateShape() {
    var shape = document.getElementById('shape').value;

    var sizeInput = document.getElementById('sizeInput');
    while (sizeInput.firstChild) {
        sizeInput.removeChild(sizeInput.firstChild);
    }

    if(shape === 'rectangle') {
        createInput('width');
        createInput('height');
    } else {
        createInput('width');
        createInput('height');
    }

    updateSize();
}

function createInput(id) {
    var input = document.createElement('input');
    input.type = 'number';
    input.id = id;
    input.placeholder = id.charAt(0).toUpperCase() + id.slice(1);
    input.addEventListener('input', updateSize);
    document.getElementById('sizeInput').appendChild(input);
}

function updateSize() {
    var shape = document.getElementById('shape').value;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var width = document.getElementById('width').value;
    var height = document.getElementById('height').value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    if(shape === 'rectangle') {
        ctx.rect((canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    } else if(shape === 'tShape') {
        ctx.moveTo((canvas.width - width) / 2, (canvas.height - height) / 2);
        ctx.lineTo((canvas.width + width) / 2, (canvas.height - height) / 2);
        ctx.lineTo((canvas.width + width) / 2, (canvas.height - height) / 2 + height / 3);
        ctx.lineTo((canvas.width + width / 3) / 2, (canvas.height - height) / 2 + height / 3);
        ctx.lineTo((canvas.width + width / 3) / 2, (canvas.height + height) / 2);
        ctx.lineTo((canvas.width - width / 3) / 2, (canvas.height + height) / 2);
        ctx.lineTo((canvas.width - width / 3) / 2, (canvas.height - height) / 2 + height / 3);
        ctx.lineTo((canvas.width - width) / 2, (canvas.height - height) / 2 + height / 3);
    } else if(shape === 'lShape') {
        ctx.moveTo((canvas.width - width) / 2, (canvas.height - height) / 2);
        ctx.lineTo((canvas.width - width) / 2, (canvas.height + height) / 2);
        ctx.lineTo((canvas.width + width) / 2, (canvas.height + height) / 2);
    } else if(shape === 'uShape') {
        ctx.moveTo((canvas.width - width) / 2, (canvas.height - height) / 2);
        ctx.lineTo((canvas.width - width) / 2, (canvas.height + height) / 2);
        ctx.lineTo((canvas.width + width) / 2, (canvas.height + height) / 2);
        ctx.lineTo((canvas.width + width) / 2, (canvas.height - height) / 2);
    }
    ctx.closePath();
    ctx.stroke();
}
