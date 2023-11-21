let shape = 'rectangle';
let rectangleDimensions = [100, 100];
let rectangleInputs = [];
let tShapeDimensions = [50, 20, 40, 50, 25];
let tShapeInputs = [];
let uShapeDimensions = [100, 90, 100, 50, 100, 90]; // Adjusted uShape dimensions
let uShapeInputs = []; // Adjusted uShape inputs
let lShapeDimensions = [100, 50, 10, 100];
let lShapeInputs = [];
let hMirror = false;
let vMirror = false;
let zoom = 2;
let zoomSpeed = 0.1;
let offsetX = 0;
let offsetY = 0;
let dragging = false;
let previousMouseX = 0;
let previousMouseY = 0;
let uitsparingDimensions = [10, 10]; // Starting dimensions for the uitsparing
let uitsparingPosition = [1, 1]; // Starting position for the uitsparing
let uitsparingInputs = []; // Inputs for the uitsparing

function setup() {
  createCanvas(800, 600);
  
  let shapeSelector = createSelect();
  shapeSelector.position(10, 10);
  shapeSelector.option('rectangle');
  shapeSelector.option('tShape');
  shapeSelector.option('uShape');
  shapeSelector.option('lShape');
  shapeSelector.changed(() => {
    shape = shapeSelector.value();
    updateInputVisibility();
  });

  // Create input fields for rectangle
  for (let i = 0; i < 2; i++) {
    let rectangleDimensionInput = createInput(rectangleDimensions[i].toString());
    rectangleDimensionInput.position(10, 40 + i * 30);
    rectangleDimensionInput.input(() => rectangleDimensions[i] = parseInt(rectangleDimensionInput.value()));
    rectangleInputs.push(rectangleDimensionInput);
  }

  // Create input fields for tShape
  let tShapeLabels = ['Base 1 Width', 'Stem Width', 'Stem Height', 'Base 2 Width', 'Base Height'];
  for (let i = 0; i < 5; i++) {
    let tShapeLabel = createElement('label', tShapeLabels[i]);
    tShapeLabel.position(10, 100 + i * 30);
    let tShapeDimensionInput = createInput(tShapeDimensions[i].toString());
    tShapeDimensionInput.position(120, 100 + i * 30);
    tShapeDimensionInput.input(() => tShapeDimensions[i] = parseInt(tShapeDimensionInput.value()));
    tShapeInputs.push({label: tShapeLabel, input: tShapeDimensionInput});
  }

  // Create input fields for uShape
  let uShapeLabels = ['Rectangle 1 Width', 'Rectangle 1 Height', 'Rectangle 2 Width', 'Rectangle 2 Height', 'Rectangle 3 Width', 'Rectangle 3 Height'];
  for (let i = 0; i < 6; i++) {
    let uShapeLabel = createElement('label', uShapeLabels[i]);
    uShapeLabel.position(10, 100 + i * 30);
    let uShapeDimensionInput = createInput(uShapeDimensions[i].toString());
    uShapeDimensionInput.position(120, 100 + i * 30);
    uShapeDimensionInput.input(() => uShapeDimensions[i] = parseInt(uShapeDimensionInput.value()));
    uShapeInputs.push({label: uShapeLabel, input: uShapeDimensionInput});
  }

  // Create input fields for lShape
  let lShapeLabels = ['Base Width', 'Base Height', 'Stacked Rectangle Width', 'Stacked Rectangle Height'];
  for (let i = 0; i < 4; i++) {
    let lShapeLabel = createElement('label', lShapeLabels[i]);
    lShapeLabel.position(10, 100 + i * 30);
    let lShapeDimensionInput = createInput(lShapeDimensions[i].toString());
    lShapeDimensionInput.position(120, 100 + i * 30);
    lShapeDimensionInput.input(() => lShapeDimensions[i] = parseInt(lShapeDimensionInput.value()));
    lShapeInputs.push({label: lShapeLabel, input: lShapeDimensionInput});
  }

  // Create horizontal mirror button
  let hMirrorButton = createButton('Mirror Horizontally');
  hMirrorButton.position(10, 300);
  hMirrorButton.mousePressed(() => {
    hMirror = !hMirror;
  });

  // Create vertical mirror button
  let vMirrorButton = createButton('Mirror Vertically');
  vMirrorButton.position(130, 300);
  vMirrorButton.mousePressed(() => {
    vMirror = !vMirror;
  });
  let zoomInButton = createButton('+');
  zoomInButton.position(10, 340);
  zoomInButton.mousePressed(() => {
    zoom += zoomSpeed;
  });

  let zoomOutButton = createButton('-');
  zoomOutButton.position(40, 340);
  zoomOutButton.mousePressed(() => {
    zoom -= zoomSpeed;
  });
// Create "uitsparing toevoegen" button
let uitsparingButton = createButton('uitsparing toevoegen');
uitsparingButton.position(10, 380);
uitsparingButton.mousePressed(() => {
  // Add functionality for creating a new uitsparing here
  uitsparingDimensions = [10, 10];
  uitsparingPosition = [1, 1];
});

// Create input fields for uitsparing
let uitsparingLabels = ['Width', 'Height', 'X Position', 'Y Position'];
for (let i = 0; i < 4; i++) {
  let uitsparingLabel = createElement('label', uitsparingLabels[i]);
  uitsparingLabel.position(10, 410 + i * 30);
  let uitsparingInput = createInput(i < 2 ? uitsparingDimensions[i].toString() : uitsparingPosition[i-2].toString());
  uitsparingInput.position(120, 410 + i * 30);
  uitsparingInput.input(() => {
    if (i < 2) {
      uitsparingDimensions[i] = parseInt(uitsparingInput.value());
    } else {
      uitsparingPosition[i-2] = parseInt(uitsparingInput.value());
    }
  });
  uitsparingInputs.push({label: uitsparingLabel, input: uitsparingInput});
}
  updateInputVisibility();
}

function updateInputVisibility() {
  for (let input of rectangleInputs) {
    input.style('display', shape === 'rectangle' ? 'inline' : 'none');
  }
  for (let item of tShapeInputs) {
    item.input.style('display', shape === 'tShape' ? 'inline' : 'none');
    item.label.style('display', shape === 'tShape' ? 'inline' : 'none');
  }
  for (let item of uShapeInputs) {
    item.input.style('display', shape === 'uShape' ? 'inline' : 'none');
    item.label.style('display', shape === 'uShape' ? 'inline' : 'none');
  }
  for (let item of lShapeInputs) {
    item.input.style('display', shape === 'lShape' ? 'inline' : 'none');
    item.label.style('display', shape === 'lShape' ? 'inline' : 'none');
  }
  for (let item of uitsparingInputs) {
    item.input.style('display', 'inline');
    item.label.style('display', 'inline');
  }
}
function drawUitsparing() {
  // Calculate the starting position of the uitsparing based on the current shape
  let ux, uy;
  if(shape === 'rectangle') {
    ux = -rectangleDimensions[0] / 2 + uitsparingPosition[0];
    uy = rectangleDimensions[1] / 2 - uitsparingDimensions[1] - uitsparingPosition[1];
  } else if(shape === 'tShape') {
    ux = -(tShapeDimensions[0] + tShapeDimensions[1] + tShapeDimensions[3]) / 2 + uitsparingPosition[0];
    uy = (tShapeDimensions[2] + tShapeDimensions[4]) / 2 - uitsparingDimensions[1] - uitsparingPosition[1];
  } else if(shape === 'uShape') {
    ux = -(uShapeDimensions[0] + uShapeDimensions[2] + uShapeDimensions[4]) / 2 + uitsparingPosition[0];
    uy = Math.max(uShapeDimensions[1], uShapeDimensions[3], uShapeDimensions[5]) / 2 - uitsparingDimensions[1] - uitsparingPosition[1];
  } else if(shape === 'lShape') {
    ux = -lShapeDimensions[0] / 2 + uitsparingPosition[0];
    uy = (lShapeDimensions[1] + lShapeDimensions[3]) / 2 - uitsparingDimensions[1] - uitsparingPosition[1];
  }

  // Draw the uitsparing
  rect(ux, uy, uitsparingDimensions[0], uitsparingDimensions[1]);
}

function draw() {
  background(220);
  stroke(25)
  push();
  translate(width / 2 + offsetX, height / 2 + offsetY); // Apply dragging
  scale(zoom); // Apply zoom
  if (hMirror) {
    scale(-1, 1);
  }
  if (vMirror) {
    scale(1, -1);
  }

  if(shape === 'rectangle') {
    let x = -rectangleDimensions[0] / 2;
    let y = -rectangleDimensions[1] / 2;
    rect(x, y, rectangleDimensions[0], rectangleDimensions[1]);
        
  } else if(shape === 'tShape') {
    let x = -(tShapeDimensions[0] + tShapeDimensions[1] + tShapeDimensions[3]) / 2;
    let y = -(tShapeDimensions[2] + tShapeDimensions[4]) / 2;
    rect(x, y + tShapeDimensions[2], tShapeDimensions[0], tShapeDimensions[4]);
    rect(x + tShapeDimensions[0], y, tShapeDimensions[1], tShapeDimensions[2] + tShapeDimensions[4]);
    rect(x + tShapeDimensions[0] + tShapeDimensions[1], y + tShapeDimensions[2], tShapeDimensions[3], tShapeDimensions[4]);
  } else if(shape === 'uShape') {
    let x = -(uShapeDimensions[0] + uShapeDimensions[2] + uShapeDimensions[4]) / 2;
    let y = -Math.max(uShapeDimensions[1], uShapeDimensions[3], uShapeDimensions[5]) / 2;
    rect(x, y, uShapeDimensions[0], uShapeDimensions[1]);
    rect(x + uShapeDimensions[0], y, uShapeDimensions[2], uShapeDimensions[3]);
    rect(x + uShapeDimensions[0] + uShapeDimensions[2], y, uShapeDimensions[4], uShapeDimensions[5]);
  } else if(shape === 'lShape') {
    let x = -lShapeDimensions[0] / 2;
    let y = -(lShapeDimensions[1] + lShapeDimensions[3]) / 2;
    rect(x, y + lShapeDimensions[3], lShapeDimensions[0], lShapeDimensions[1]);
    rect(x, y, lShapeDimensions[2], lShapeDimensions[3]);
  }
  
  stroke(0); // Set the stroke color to black
  drawUitsparing();

  pop();
}
function mousePressed() {
  dragging = true;
  previousMouseX = mouseX;
  previousMouseY = mouseY;
}

function mouseReleased() {
  dragging = false;
}

function mouseDragged() {
  if (dragging) {
    offsetX += mouseX - previousMouseX;
    offsetY += mouseY - previousMouseY;
    previousMouseX = mouseX;
    previousMouseY = mouseY;
  }
}


