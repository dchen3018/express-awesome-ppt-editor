function saveToLocalStorage(obj) {
  if(typeof(Storage) !== "undefined"){
    localStorage.setItem(obj.fileName, obj.content)
  } else {
    console.log('no web storage')
  }
}

function loadFromLocalStorage(key) {
  if(typeof(Storage) !== "undefined"){
    return localStorage.getItem(key)
  } else {
    return null;
  }
}

export { saveToLocalStorage, loadFromLocalStorage };
