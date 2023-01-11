
// let obtenerdato = document.getElementsByTagName("th");
// console.log(obtenerdato[5].innerHTML);
// // console.log(dato+ "dd");
// export const dato = obtenerdato[5].innerHTML;


const url = 'http://localhost:3000/api/electrodomesticos/';
const contenedor = document.querySelector('tbody');
let resultados = '';
let opcion = '';

const modalArticulo2 = new bootstrap.Modal(document.getElementById('modalArticulo2'));
const formArticulo = document.querySelector('form');
const nombre_elect = document.getElementById('nombre_elect');
const preciobase = document.getElementById('preciobase');
const color = document.getElementById('color');
const consumo_energetico = document.getElementById('consumo_energetico');
const peso = document.getElementById('peso');


















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
  nombre_elect.value = '';
  preciobase.value = '';
  color.value = '';
  consumo_energetico.value = '';
  peso.value = '';
  opcion = 'crear';
  modalArticulo2.show();
});

//*******************************************************METODO GET  PARA  MOSTRAR RESULTATDOS**********************
const mostrar = (articulos) => {
  articulos.forEach(articulo => {
    resultados += `
            <tr class="text-center">
                <td>${articulo.id}</td>
                <td>${articulo.nombre_elect}</td>
                <td>${articulo.preciobase}</td>
                <td>${articulo.color}</td>
                <td>${articulo.consumo_energetico}</td>
                <td>${articulo.peso}</td>
                <td><a class='btnEditar btn btn-primary'>Editar</a> <a class='btnBorrar btn btn-danger'>Eliminar</a></td>
            </tr>
        `;
  });
  contenedor.innerHTML = resultados;
};


//*******************************************************PROCEDIMIENTO GET**********************
fetch(url)
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
      fetch(url + id, {
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
  nombre_elect.value = row.children[1].innerHTML;
  preciobase.value = row.children[2].innerHTML;
  color.value = row.children[3].innerHTML;
  consumo_energetico.value = row.children[4].innerHTML;
  peso.value = row.children[5].innerHTML;
  modalArticulo2.show();
});

//*******************************************************PROCEDIMIENTO DE CREAR Y EDITAR**********************
formArticulo.addEventListener('submit', e => {
  e.preventDefault();

  const valorpreciobase = cambioletra(consumo_energetico.value);
  if (opcion === 'crear') {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        nombre_elect: nombre_elect.value,
        // preciobase: preciobase.value,
        preciobase: valorpreciobase,
        color: color.value,
        consumo_energetico: consumo_energetico.value,
        peso: peso.value,
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
    fetch(url + idForm, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        nombre_elect: nombre_elect.value,
        preciobase: preciobase.value,
        color: color.value,
        consumo_energetico: consumo_energetico.value,
        peso: peso.value,
      })
    })
      .then(res => res.json())
      .then(res => location.reload());
  }
  modalArticulo2.hide();
});












// btnCrear.addEventListener('click', () => {
//     descripcion.value = '';
//     precio.value = '';
//     stock.value = '';
//     modalArticulo.show();
//     opcion = 'crear';
// });

// //Funcion para mostrar resultados
// const mostrar = (articulos) => {
//     articulos.forEach(articulo => {
//         resultados += `
//             <tr class='text-center'>
//                 <td>${articulo.id}</td>
//                 <td>${articulo.descripcion}</td>
//                 <td>${articulo.precio}</td>
//                 <td>${articulo.stock}</td>
//                 <td><a class='btnEditar btn btn-primary'>Editar</a><a class='btnBorrar btn btn-danger'>Borrar</a></td>
//             </tr>`;
//         });
//     contenedor.innerHTML = resultados;
// };

// fetch(url)
//     .then(response => response.json())
//     .then(data => mostrar(data))
//     .catch(error => console.log(error));

// const on = (element, event, selector, handler) => {
//     element.addEventListener(event, e => {
//         if (e.target.closest(selector)) {
//             handler(e);
//         }
//     });
// };

// //Funcion para borrar
// on(document, 'click', '.btnBorrar', e => {
//     const row = e.target.parentNode.parentNode;
//     const id = row.firstElementChild.innerHTML;
//     alertify.confirm("¿Está seguro de eliminar este articulo?",
//         function(){
//             fetch(url + id, {
//                 method: 'DELETE'
//             })
//             .then(res => res.json())
//             .then(() => {
//                 location.reload();
//                 alertify.success('Artículo Eliminado');
//             });
//         },
//         function(){
//             alertify.error('Cancelado');
//         });
//     console.log(id);
// });

// //Funcion para editar
// let idArticulo = 0;
// on(document, 'click', '.btnEditar', e => {
//     const row = e.target.parentNode.parentNode;
//     idArticulo = row.children[0].innerHTML;
//     descripcion.value = row.children[1].innerHTML;
//     precio.value = row.children[2].innerHTML;
//     stock.value = row.children[3].innerHTML;
//     opcion = 'editar';
//     modalArticulo.show();
// });

// formArticulo.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if (opcion === 'crear') {
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 descripcion: descripcion.value,
//                 precio: precio.value,
//                 stock: stock.value,
//             })
//         })
//         .then(res => res.json())
//         .then(data => {
//             const nuevoArticulo = [];
//             nuevoArticulo.push(data);
//             mostrar(nuevoArticulo);
//         });
//     }

//     if (opcion === 'editar') {
//         fetch(url + idArticulo, {
//             method: 'PUT',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify({
//                 descripcion: descripcion.value,
//                 precio: precio.value,
//                 stock: stock.value,
//             })
//         })
//         .then(res => res.json())
//         .then(res => location.reload());
//     }
//     modalArticulo.hide();
// });