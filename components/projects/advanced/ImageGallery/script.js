const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');

const imageNames = ['start', 'car', 'mountains', 'stars', 'sunset', 'water'];

/* Looping through images array */

for (let i = 0; i < imageNames.length; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${imageNames[i]}.jpg`);
  thumbBar.appendChild(newImage);

  newImage.onclick = function (e) {
    displayedImage.src = e.target.src;
  };
}

/* Wiring up the Darken/Lighten button */

btn.onclick = function () {
  const btnClass = btn.getAttribute('class');

  if (btnClass === 'grayscale') {
    btn.setAttribute('class', 'noGrayscale');
    btn.textContent = 'OFF';

    displayedImage.style.filter = 'grayscale(100%)';
  } else {
    btn.setAttribute('class', 'grayscale');
    btn.textContent = 'ON';

    displayedImage.style.filter = 'none';
  }
};
