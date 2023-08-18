
//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn  = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

//funciones
function cargarEventListeners() {
    //agrego un curso con el boton agregar al carrito
    listaCursos.addEventListener('click' , agregarCurso);

    //eliminar curso del carrito
    carrito.addEventListener('click' , eliminarCurso);

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click' , vaciarCarrito);   
}




//funcion que añade el curso al carrito
function agregarCurso(e) {
   e.preventDefault(); 

   //condicion para agregar carrito
   if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        //enviamos el curso selecionado para tomar sus datos
       leerDatosCurso(cursoSeleccionado);
    }

  
}

//eliminar cursos del carrito
function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo de articulosCarrito por data-id
        articulosCarrito = articulosCarrito.filter(cursoSeleccionado => cursoSeleccionado.id !== cursoId);

        carritoHtml(); //iteramos sobre el carrito y muestra HTML
    }
}

//leer el contenid del HTML al que dimos click y estare la informacion
function leerDatosCurso(cursoSeleccionado) {
    console.log(cursoSeleccionado);

    //creo un objeto con el contenido del curso
    const infoCurso ={
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si el elemento ya existe en el carrito
    const existe = articulosCarrito.some(cursoSeleccionado => cursoSeleccionado.id === infoCurso.id);

    //incremanta cantidad de curso
    if (existe) {
        const cursos = articulosCarrito.map(cursoSeleccionado => {

            if (cursoSeleccionado.id === infoCurso.id) {
                cursoSeleccionado.cantidad++;
                return cursoSeleccionado;//retorna el objeto actualizado
            }else{
                return cursoSeleccionado;//retorna el objeto que no estan duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //agrega elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHtml();
}

//muestra el carrito de compras en el HTML
function carritoHtml() {
    //limpia HTML 
    limpiarHtml();

    //recorre el carrito y genera el html 
    articulosCarrito.forEach(cursoSeleccionado => {
        const {imagen , titulo, precio , cantidad , id }=cursoSeleccionado;
        const row = document.createElement('tr');
        row.innerHTML = ` 
            <td><img src="${imagen}" width=60></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}" >X</a></td>
         `;

         //agrego el HTML delcarrito en nuestro tbody
         contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del Tdody

function limpiarHtml() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

//elimina los cursos del carrito en DOM
function vaciarCarrito() {
    articulosCarrito = [];

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}