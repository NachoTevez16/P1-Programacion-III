//Lista de productos
let listaProductos = [
    {id: 1, nombre: "Anana", precio:6200, img:"./img/anana.jpg"},
    {id: 4, nombre: "Frambuesa", precio:5800, img:"./img/frambuesa.png"},
    {id: 3, nombre: "Banana", precio:1500, img:"./img/banana.jpg"},
    {id: 6, nombre: "Kiwi", precio:6100, img:"./img/kiwi.jpg"},
    {id: 2, nombre: "Arandano", precio:5300, img:"./img/arandano.jpg"},
    {id: 10, nombre: "Pera", precio:2200, img:"./img/pera.jpg"},
    {id: 5, nombre: "Frutilla", precio:4000, img:"./img/frutilla.jpg"},
    {id: 13, nombre: "Sandia", precio:3600, img:"./img/sandia.jpg"},
    {id: 8, nombre: "Manzana", precio:1500, img:"./img/manzana.jpg"},
    {id: 12, nombre: "Pomelo rojo", precio:4600, img:"./img/pomelo-rojo.jpg"},
    {id: 7, nombre: "Mandarina", precio:1100, img:"./img/mandarina.jpg"},
    {id: 9, nombre: "Naranja", precio:1700, img:"./img/naranja.jpg"},
    {id: 11, nombre: "Pomelo amarillo", precio:4000, img:"./img/pomelo-amarillo.jpg"}
];


//Etiquetas
let contenedorProductos = document.querySelector(".contenedor-productos");
let inputBuscar = document.querySelector(".barra-busqueda");
let itemsCarrito = document.getElementById("items-carrito");
let contadorCarrito = document.getElementById("contador-carrito");
let precioTotal = document.getElementById("precio-total");


inputBuscar.addEventListener("keyup", filtrarProductos);

//Filtrar productos
//Ejercicio 4
/*  Para este ejercicio utilize un filtro que obtiene el input escrito por el usuario y filtra todos los objetos de la lista */ 
function filtrarProductos(){
    let valorInput = inputBuscar.value;
    let listaProductosFiltrados = listaProductos.filter(producto =>producto.nombre.toLowerCase().includes(valorInput.toLowerCase()));
    mostrarProductos(listaProductosFiltrados)
}


//Mostrar productos 
//Ejercicio 3
/*  Para resolver este ejercicio utilize el for clasico, se recorre el array de productos y añaden los productos para luego mostrarlos en la
    tarjeta correspondiente, se le da el formato solicitado y el estilado similar a la referencia
*/ 
function mostrarProductos(array){
    let html = "";
    for(let i = 0; i < array.length; i++){
        html += `<div class="card-producto">
                    <img src="${array[i].img}" alt="${array[i].nombre}">
                    <h3>${array[i].nombre}</h3>
                    <p>$${array[i].precio}</p>
                    <button onclick="agregarCarrito(${array[i].id})" >Agregar a carrito</button>
                </div>`;

    }
    contenedorProductos.innerHTML = html;
}

//Carrito
let carrito = [];

function actualizarCarrito(){
    let totalProductos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    let totalPrecio = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

    contadorCarrito.textContent = totalProductos;
    precioTotal.textContent = `$${totalPrecio}`;
}


function agregarCarrito(id) { 
    let producto = listaProductos.find(producto => producto.id === id);

    if (!producto) return;

    let productoEnCarrito = carrito.find(producto => producto.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    console.log("Carrito actualizado:", carrito);
    guardarCarrito(); 
    mostrarCarrito();
    actualizarCarrito();
}



function eliminarProducto(id) {
    let producto = carrito.find(producto => producto.id === id);

    if (!producto) return;

    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        carrito = carrito.filter(producto => producto.id !== id);
    }

    console.log("Producto eliminado del carrito:", producto);
    guardarCarrito(); 
    mostrarCarrito();
    actualizarCarrito(); 
}


function mostrarCarrito() {
    let htmlCarrito = "";

    //Ejericicio 7
    /*  Para este ejercicio se utiliza una simple logica para que cuando el carrito no este vacio, se muestre que no hay elementos
        En el caso que haya, se muestra el nombre, la cantidad y se calcula el precio total de las unidades seleccionadas
    */ 
    if (carrito.length === 0) {
        htmlCarrito = "<p>No hay elementos en el carrito.</p>";
    } else {
        carrito.forEach(producto => {
            htmlCarrito += `
                <li>
                    <p>${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad} <button onclick="eliminarProducto(${producto.id})">X</button></p>
                    
                </li>
            `;
        });
    }

    itemsCarrito.innerHTML = htmlCarrito;
    console.log("Carrito actual:", carrito);
}

//Ejercicio 6
/*  Esta funcion guarda localmente la lista del carrito */ 
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Ejercicio 9
/*  Esta funcion elimina toda la lista del carrito, evita que se guarde en el localStorage y actualiza lo necesario para que se borre totalmente*/ 
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
    actualizarCarrito();
}



//Ejercicio 2
/*  En este ejercicio se selecciona donde se va a mostrar el objeto alumno, imprime los datos por consola y los muestra en el contenedor solicitado*/ 

let nav= document.querySelector(".nombreAlumno");

//Objeto Alumno
let alumno = {dni:44626274,nombre:"Ignacio",apellido:"Tevez"};
let navAlumno = "";

function imprimirAlumno(){
    console.log(`Nombre: ${alumno.nombre} Apellido: ${alumno.apellido}`)

    navAlumno = `${alumno.nombre} ${alumno.apellido}`;
    nav.innerHTML = navAlumno;
}


//Funcion inicializadora
function init(){
    imprimirAlumno();
    mostrarProductos(listaProductos);
    guardarCarrito(); 
}

init();