
// import {dato} from './eletrodomesticos.js';

const urlCliente = 'http://localhost:3000/api/clientes/';
const contenedor = document.querySelector('tbody');
let resultados = '';
let opcion = '';

const modalArticuloCliente = new bootstrap.Modal(document.getElementById('modalArticuloCliente'));
const formArticuloClientes = document.querySelector('form');
const cedula = document.getElementById('cedula');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const sexo = document.getElementById('sexo');
const estado_civil = document.getElementById('estado_civil');
const edad = document.getElementById('edad');

//********************************************
//proband importar datos de una tabla


//*******************************************************METODO GET  PARA  MOSTRAR RESULTATDOS**********************

btnCrear.addEventListener('click', () => {
  cedula.value = '';
  nombre.value = '';
  apellido.value = '';
  sexo.value = '';
  estado_civil.value = '';
  edad.value = '';
  opcion = 'crear';
  modalArticuloCliente.show();
});


//*******************************************************METODO GET  PARA  MOSTRAR RESULTATDOS**********************

const mostrar = (articulos) => {
  articulos.forEach(articulo => {
    resultados += `
            <tr class="text-center">
                <td>${articulo.id}</td>
                <td>${articulo.cedula}</td>
                <td>${articulo.nombre}</td>
                <td>${articulo.apellido}</td>
                <td>${articulo.sexo}</td>
                <td>${articulo.estado_civil}</td>
                <td>${articulo.edad}</td>
                <td><a class='btnEditarCliente btn btn-primary'>Editar</a> <a class='btnBorrarCliente btn btn-danger'>Eliminar</a></td>
            </tr>
        `;
  });
  contenedor.innerHTML = resultados;
};


//*******************************************************PROCEDIMIENTO GET**********************

fetch(urlCliente)
  .then(response => response.json())
  .then(data => mostrar(data))
  .catch(error => console.log(error));

const on = (element, event, selector, handler) => {
  element.addEventListener(event, e => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};


//*******************************************************BORRAR UN ELEMENTO**********************

on(document, 'click', '.btnBorrarCliente', e => {
  const row = e.target.parentNode.parentNode;
  const id = row.firstElementChild.innerHTML;
  alertify.confirm("This is a confirm dialog.",
    function () {
      fetch(urlCliente + id, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(() => {
          location.reload();
          alertify.success('Articulo Eliminado');
        });
    },
    function () {
      alertify.error('Cancelado');
    });
});

//*******************************************************PROCEDIMIENTO EDITAR**********************

let idFormClientes = 0;
on(document, 'click', '.btnEditarCliente', e => {
  opcion = 'editar';
  const row = e.target.parentNode.parentNode;
  idFormClientes = row.children[0].innerHTML;
  cedula.value = row.children[1].innerHTML;
  nombre.value = row.children[2].innerHTML;
  apellido.value = row.children[3].innerHTML;
  sexo.value = row.children[4].innerHTML;
  estado_civil.value = row.children[5].innerHTML;
  edad.value = row.children[6].innerHTML;
  modalArticuloCliente.show();
});

//*******************************************************PROCEDIMIENTO DE CREAR Y EDITAR**********************

formArticuloClientes.addEventListener('submit', e => {
  e.preventDefault();
  if (opcion === 'crear') {
    fetch(urlCliente, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        cedula: cedula.value,
        nombre: nombre.value,
        apellido: apellido.value,
        sexo: sexo.value,
        estado_civil: estado_civil.value,
        edad: edad.value,
      })
    })
      .then(res => res.json())
      .then(data => {
        const nuevoArticulo = [];
        nuevoArticulo.push(data);
        mostrar(nuevoArticulo);
      });
  }
  if (opcion === 'editar') {
    fetch(urlCliente + idFormClientes, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        cedula: cedula.value,
        nombre: nombre.value,
        apellido: apellido.value,
        sexo: sexo.value,
        estado_civil: estado_civil.value,
        edad: edad.value,
      })
    })
      .then(res => res.json())
      .then(res => location.reload());
  }
  modalArticuloCliente.hide();
});










