// Cargar el contenido de menu.html y agregarlo al elemento con el ID 'menu-container'
fetch('menu.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('menu-container').innerHTML = data;
  })
  .catch(error => {
    console.error('Error:', error);
  });