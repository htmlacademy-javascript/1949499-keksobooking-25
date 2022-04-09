const FILE_TYPES = ['gif', 'jpg', 'png', 'jpeg'];

const fileChooser = document.querySelector('#images');
const preview = document.querySelector('.ad-form__photo');
const inputImage = document.createElement('img');

inputImage.style.maxWidth = '70px';
inputImage.style.maxHeight = '70px';

preview.appendChild(inputImage);

fileChooser.addEventListener(('change'), () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches){
    inputImage.src = URL.createObjectURL(file);
  }
});
