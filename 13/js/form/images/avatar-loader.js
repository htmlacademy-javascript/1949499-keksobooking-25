const FILE_TYPES = ['gif', 'jpg', 'png', 'jpeg'];

const fileChooser = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview').querySelector('img');

fileChooser.addEventListener(('change'), () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches){
    preview.src = URL.createObjectURL(file);
  }
});
