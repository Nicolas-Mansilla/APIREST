

// Elementos del dom//
const tablaUsuarios = document.getElementById('tablaUsuarios');
const nombreInput = document.getElementById('nombre');
const btnCrear = document.getElementById('btnCrear');




// Mostrar La tabla
function mostrarUsuarios(usuarios) {
  const tbody = tablaUsuarios.querySelector('tbody');
  tbody.innerHTML = '';
  usuarios.forEach(usuario => {
    const fila = document.createElement('tr');
    const idColumna = document.createElement('td');
    idColumna.textContent = usuario.id;
    fila.appendChild(idColumna);

    const nombreColumna = document.createElement('td');
    nombreColumna.textContent = usuario.name;
    fila.appendChild(nombreColumna);
      const avatarColumna = document.createElement('td');
      const avatarImg = document.createElement('img');
      avatarImg.src = usuario.avatar;
      avatarImg.alt = usuario.name;
      avatarImg.classList.add('avatar');
      avatarColumna.appendChild(avatarImg);
      fila.appendChild(avatarColumna);
    const createdAtColumna = document.createElement('td');
    const fechaCreacion = new Date(usuario.createdAt).toLocaleDateString();
    createdAtColumna.textContent = fechaCreacion;
    fila.appendChild(createdAtColumna);
    const accionesColumna = document.createElement('td');
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => editarUsuario(usuario.id));
    accionesColumna.appendChild(btnEditar);
    const btnBorrar = document.createElement('button');
    btnBorrar.textContent = 'Borrar';
    btnBorrar.addEventListener('click', () => borrarUsuario(usuario.id));
    accionesColumna.appendChild(btnBorrar);

    fila.appendChild(accionesColumna);

    tbody.appendChild(fila);
  });
}




//Obtener user de la API
function obtenerUsuarios() {
  fetch('https://64768a209233e82dd53a1f57.mockapi.io/api/a/usuarios')
    .then(response => response.json())
    .then(data => {
      mostrarUsuarios(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Crear nuevo user//


function crearUsuario() {
  const nombre = nombreInput.value;

  if (nombre) {
      fetch('https://64768a209233e82dd53a1f57.mockapi.io/api/a/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: nombre, avatar: '', createdAt: new Date().toISOString() }),
    })
      .then(response => response.json())
      .then(data => {
        obtenerUsuarios();
        nombreInput.value = '';
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

// Función para editar un usuario (solo nombre)
function editarUsuario(id) {
  const nuevoNombre = prompt('Ingrese el nuevo nombre:');
  if (nuevoNombre) {
    fetch(`https://64768a209233e82dd53a1f57.mockapi.io/api/a/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: nuevoNombre }),
    })
        .then(response => response.json())
      .then(data => {
        obtenerUsuarios();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}



// Borrar ususario de la API.
function borrarUsuario(id) {
  if (confirm('¿Está seguro de que desea borrar este usuario?')) {
    fetch(`https://64768a209233e82dd53a1f57.mockapi.io/api/a/usuarios/${id}`, {
      method: 'DELETE',
    })

          .then(response => {
        if (response.ok) {
          obtenerUsuarios();
        } else {
          console.error('Error al borrar el usuario:', response.statusText);
        }
      })


      .catch(error => {
        console.error('Error:', error);
      });
  }
}

// Eventos del DOM
btnCrear.addEventListener('click', crearUsuario);


obtenerUsuarios();
