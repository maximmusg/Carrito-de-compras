//variables 

const carrito = document.querySelector('#carrito');
const contendedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCuros = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //cuando agregas un curso presionando el bonton de 'Agregar al carrito'
    listaCuros.addEventListener('click', agregarCurso);
    //elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el arreglo

        limpiarHTML();
    })

}

//Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
}

//elimina un curso del carrito

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //elimina el arreglo de articuloCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        console.log(articulosCarrito);
        carritoHTML(); //itera sobre el curso y mostrar su html
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la info del mismo

function leerDatosCurso(curso){
    // console.log(curso);
    //creo un objeto con el contenido del curso seleccioando

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    //revisa si un articulo ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    console.log(existe);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualiziado
            } else{
                return curso; //retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else{
        //agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHTML();
}

//muestra el carrito de compras en el HTML

function carritoHTML(){
    //limpiar el html

    limpiarHTML();

    //recorre el carrito y genera e html
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src='${imagen}' width='100'>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href='#' class='borrar-curso' data-id="${id}" > X </a>
            </td>            
        `;

        //agrega el html del carrito en el tbody

        contendedorCarrito.appendChild(row);
    })
}

//elimina los cursos del tbody

function limpiarHTML(){
    //forma lenta
    // contendedorCarrito.innerHTML='';

    while(contendedorCarrito.firstChild){
        contendedorCarrito.removeChild(contendedorCarrito.firstChild);
    }
}