const input = document.querySelector('input[type=file]')
input.addEventListener('change', () => {
  const fileName = input.files[0].name
  document.querySelector('label').innerText = fileName
})