const urlFactura = 'http://localhost:3000/api/facturas/';
const contenedor = document.querySelector('tbody');
let resultados = '';
let opcion = '';

const modalArticulo3 = new bootstrap.Modal(document.getElementById('modalArticulo3'));
const formArticulo = document.querySelector('form');
const cedula = document.getElementById('cedula');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const nombre_elect = document.getElementById('nombre_elect');
const color = document.getElementById('color');
const consumo_energetico = document.getElementById('consumo_energetico');
const preciobase = document.getElementById('preciobase');
const peso = document.getElementById('peso');
const preciofinal = document.getElementById('preciofinal');


//***********************************



// let obtenerdato = document.getElementsByTagName("th");
// console.log(obtenerdato[5].innerHTML);






//************************************comprobarConsumoEnergetico(char letra)
// console.log(consumo_energetico.value);

const letra = consumo_energetico.value;
// console.log(letra);


function cambioletra(letra) {
  if (letra == 'A') {
    preciobase.value = 100;
  } else if (letra == 'B') {
    preciobase.value = 80;
  } else if (letra == 'C') {
    preciobase.value = 60;
  } else if (letra == 'D') {
    preciobase.value = 50;
  } else if (letra == 'E') {
    preciobase.value = 30;
  } else if (letra == 'F') {
    preciobase.value = 20;
  }
  return preciobase.value;
}

// console.log(cambioletra(consumo_energetico.value));

//*******************************************************change para establecer consumo con preciobase**********************
const tipos = document.querySelector('#consumo_energetico');
console.log(tipos);
tipos.addEventListener('change', () => {
  const valorpreciobase = cambioletra(consumo_energetico.value);
  document.getElementById('preciobase').innerText = `${valorpreciobase}`;



  // let valorOpcion = tipos.value; //Permite capturar el VALUE del select
  // console.log(valorOpcion);
  // var optionSelect = tipos.options[tipos.selectedIndex]; //Permite capturar el contenido de la etiqueta
  // console.log("Opcion: ", optionSelect.text);
  // console.log("Valor: ", optionSelect.value);
  // let inputResult = document.querySelector('#preciobase').value = (optionSelect.value); //Mostrar en el input
});

//*******************************************************METODO GET  PARA  MOSTRAR RESULTATDOS**********************


btnCrear.addEventListener('click', () => {
  cedula.value = '';
  nombre.value = '';
  apellido.value = '';
  nombre_elect.value = '';
  color.value = '';
  consumo_energetico.value = '';
  preciobase.value = '';
  peso.value = '';
  preciofinal.value = '';
  opcion = 'crear';
  modalArticulo3.show();
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
                <td>${articulo.nombre_elect}</td>
                <td>${articulo.color}</td>
                <td>${articulo.consumo_energetico}</td>
                <td>${articulo.preciobase}</td>
                <td>${articulo.peso}</td>
                <td>${articulo.preciofinal}</td>
                <td><a class='btnEditar btn btn-primary'>Editar</a> <a class='btnBorrar btn btn-danger'>Eliminar</a></td>
            </tr>
        `;
  });
  contenedor.innerHTML = resultados;
};


//*******************************************************PROCEDIMIENTO GET**********************
fetch(urlFactura)
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
on(document, 'click', '.btnBorrar', e => {
  const row = e.target.parentNode.parentNode;
  const id = row.firstElementChild.innerHTML;
  alertify.confirm("This is a confirm dialog.",
    function () {
      fetch(urlFactura + id, {
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
let idForm = 0;
on(document, 'click', '.btnEditar', e => {
  opcion = 'editar';
  const row = e.target.parentNode.parentNode;
  idForm = row.children[0].innerHTML;
  cedula.value = row.children[1].innerHTML;
  nombre.value = row.children[2].innerHTML;
  apellido.value = row.children[3].innerHTML;
  nombre_elect.value = row.children[4].innerHTML;
  color.value = row.children[5].innerHTML;
  consumo_energetico.value = row.children[6].innerHTML;
  preciobase.value = row.children[7].innerHTML;
  peso.value = row.children[8].innerHTML;
  preciofinal.value = row.children[9].innerHTML;
  modalArticulo3.show();
});

//*******************************************************PROCEDIMIENTO DE CREAR Y EDITAR**********************
formArticulo.addEventListener('submit', e => {
  e.preventDefault();



  const valorpreciobase = cambioletra(consumo_energetico.value);

  if (opcion === 'crear') {
    fetch(urlFactura, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        cedula: cedula.value,
        nombre: nombre.value,
        apellido: apellido.value,
        nombre_elect: nombre_elect.value,
        color: color.value,
        // preciobase: preciobase.value,
        consumo_energetico: consumo_energetico.value,
        preciobase: valorpreciobase,
        peso: peso.value,
        preciofinal: preciofinal.value,
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
    fetch(urlFactura + idForm, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        cedula: cedula.value,
        nombre: nombre.value,
        apellido: apellido.value,
        nombre_elect: nombre_elect.value,
        color: color.value,
        consumo_energetico: consumo_energetico.value,
        preciobase: preciobase.value,
        peso: peso.value,
        preciofinal: preciofinal.value,
      })
    })
      .then(res => res.json())
      .then(res => location.reload());
  }
  modalArticulo3.hide();
});







