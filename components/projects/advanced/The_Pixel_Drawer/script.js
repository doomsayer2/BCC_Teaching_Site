// Get references
const container = document.querySelector('.container');
const sizeInput = document.querySelector('.size');
const colorInput = document.querySelector('.color');
const resetBtn = document.querySelector('.btn');

// Get the size of the input
let size = sizeInput.value;

// Only color if we in draw mode
let draw = false;

/**
 * This fucntion is used in order to populate the container with div elements based on the given size.
 * @param {*} size of our grid we use
 */
const populate = (size) => {
  // Update the size css variable to dynamically change our grid
  container.style.setProperty('--size', size);

  // Fill the container with div elements
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div');
    div.classList.add('pixel');

    // Add event listeners for each div to color it
    div.addEventListener('mouseover', () => {
      if (!draw) return;
      div.style.backgroundColor = colorInput.value;
    });

    div.addEventListener('mousedown', () => {
      div.style.backgroundColor = colorInput.value;
    });

    container.appendChild(div);
  }
};

/**
 * The reset function resets the drawing area
 */
const reset = () => {
  container.innerHTML = '';
  populate(size);
};

// Set the general event listeners
document.addEventListener('mousedown', () => (draw = true));
document.addEventListener('mouseup', () => (draw = false));

// Make the reset button work
resetBtn.addEventListener('click', reset);

// Make the size changer work
sizeInput.addEventListener('keyup', () => {
  size = sizeInput.value;
  reset();
});

// Actually create our drawing area
populate(size);
