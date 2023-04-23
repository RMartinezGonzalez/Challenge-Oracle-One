const textarea = document.querySelector('.hero-textarea');
let textContent = textarea.value;
let validText = false;
const result = document.querySelector('.result-text');
const btnEncrypt = document.querySelector('.button-encrypt');
const btnDecrypt = document.querySelector('.button-decrypt');
const btnCopy = document.querySelector('.button-copy');
const keys = [['e', 'enter'], ['i', 'imes'], ['a', 'ai'], ['o', 'ober'], ['u', 'ufat']];

btnEncrypt.onclick = showMessageEncrypt;
btnDecrypt.onclick = showMessageDecrypt;
btnCopy.onclick = copy;

function showMessageEncrypt() {
  textContent = textarea.value.toLowerCase();
  valid();
  result.textContent = encrypt(textContent);
  // textarea.value = '';
  changeClasses();
}

function showMessageDecrypt() {
  textContent = textarea.value.toLowerCase();
  valid();
  result.textContent = decrypt(textContent);
  // textarea.value = '';
  changeClasses();
}

function valid() {
  if (textContent.trim().length === 0) {
    alert('Ingrese un texto');
  }
  else if (textContent.match((/[0-9áéíóú]/g))) {
    alert('Ingrese un texto valido');
    textContent = '';
  }
  else {
    validText = true;
  }
}

function encrypt(text) {
  let textEncrypt = '';

  if (validText) {

    for (let i = 0; i < text.length; i++) {
        
      let replaced = false;
      for (let j = 0; j < keys.length; j++) {

        if (text[i] === keys[j][0]) {
          textEncrypt += keys[j][1];
          replaced = true;
          break;
        }
      }

      if (!replaced) {
        textEncrypt += text[i];
      }
    }
  }

  return textEncrypt;
}

function decrypt(text) {

  let decryptedText = '';
  let index = 0;

  while (index < text.length) {

    let replaced = false;
    
    for (let i = 0; i < keys.length; i++) {
        
      let key = keys[i];
      let keyChar = key[0];
      let keySubstring = key[1];

      if (text.substring(index).startsWith(keySubstring)) {

        decryptedText += keyChar;
        index += keySubstring.length;
        replaced = true;
        break;
      }
    }

    if (!replaced) {
      decryptedText += text[index];
      index++;
    }
  }

  return decryptedText;
}

function copy() {
  navigator.clipboard.writeText(result.textContent);
  btnCopy.textContent = 'Copiado con éxito!';
  setTimeout(changeCopyButton, 2000);
  textarea.value = '';
}

function changeCopyButton() {
  btnCopy.textContent = 'Copiar';
}

function changeClasses() {

  let noresult = document.querySelector('.noresult')
  let result = document.querySelector('.result');
  let resultText = document.querySelector('.result-text');

  if (resultText.textContent.trim().length === 0) {
    result.classList.add('hidden');
    noresult.classList.remove('hidden');
  }
  else {
    result.classList.remove('hidden');
    noresult.classList.add('hidden');
  }
}