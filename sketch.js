let shape = 'rectangle';
let rectangleDimensions = [100, 100];
let rectangleInputs = [];
let tShapeDimensions = [50, 20, 50, 20, 25]; // Adjusted tShape dimensions
let tShapeInputs = [];
let uShapeDimensions = [100, 100, 100, 50, 100, 100]; // Adjusted uShape dimensions
let uShapeInputs = []; // Adjusted uShape inputs
let lShapeDimensions = [100, 50, 100];
let lShapeInputs = [];

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
  for (let i = 0; i < 3; i++) {
    let lShapeDimensionInput = createInput(lShapeDimensions[i].toString());
    lShapeDimensionInput.position(10, 40 + i * 30);
    lShapeDimensionInput.input(() => lShapeDimensions[i] = parseInt(lShapeDimensionInput.value()));
    lShapeInputs.push(lShapeDimensionInput);
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
  for (let input of lShapeInputs) {
    input.style('display', shape === 'lShape' ? 'inline' : 'none');
  }
}

function draw() {
  background(220);
  fill(255); // Set the fill color
  stroke(25); // Set the stroke color to match the fill color

  if(shape === 'rectangle') {
    let x = width / 2 - rectangleDimensions[0] / 2;
    let y = height / 2 - rectangleDimensions[1] / 2;
    rect(x, y, rectangleDimensions[0], rectangleDimensions[1]);
  } else if(shape === 'tShape') {
    let x = width / 2 - (tShapeDimensions[0] + tShapeDimensions[1] + tShapeDimensions[3]) / 2;
    let y = height / 2 - (tShapeDimensions[2] + tShapeDimensions[4]) / 2;
    rect(x, y + tShapeDimensions[2], tShapeDimensions[0], tShapeDimensions[4]);
    rect(x + tShapeDimensions[0], y, tShapeDimensions[1], tShapeDimensions[2] + tShapeDimensions[4]);
    rect(x + tShapeDimensions[0] + tShapeDimensions[1], y + tShapeDimensions[2], tShapeDimensions[3], tShapeDimensions[4]);
  } else if(shape === 'uShape') {
    let x = width / 2 - (uShapeDimensions[0] + uShapeDimensions[2] + uShapeDimensions[4]) / 2;
    let y = height / 2 - Math.max(uShapeDimensions[1], uShapeDimensions[3], uShapeDimensions[5]) / 2;
    rect(x, y, uShapeDimensions[0], uShapeDimensions[1]);
    rect(x + uShapeDimensions[0], y, uShapeDimensions[2], uShapeDimensions[3]);
    rect(x + uShapeDimensions[0] + uShapeDimensions[2], y, uShapeDimensions[4], uShapeDimensions[5]);
  } else if(shape === 'lShape') {
    let x = width / 2 - lShapeDimensions[0] / 2;
    let y = height / 2 - lShapeDimensions[2] / 2;
    rect(x, y, lShapeDimensions[0] * 2 / 3, lShapeDimensions[1]);
    rect(x, y + lShapeDimensions[1], lShapeDimensions[0] / 3, lShapeDimensions[2] - lShapeDimensions[1]);
  }
}




