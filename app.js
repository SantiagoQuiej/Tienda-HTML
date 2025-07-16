const contenedor = document.querySelector('#contenedorsa')
const contenedor2 = document.querySelector('#contenedor2')
const contador1 = document.querySelector('#contador')
const contador2 = document.querySelector('#contador2')
const boton = document.querySelector('#boton')
let url = "https://api.escuelajs.co/api/v1/products"
let resultado = []
let general = []
let concatenar = ''
const porducto = () => {
    fetch(url)
        .then(result => {
            return result.json()
        })
        .then(data => {
            let general = data.map(item => ({
                img: item.images,
                nombre: item.title,
                preciomin: item.price,
                idg: item.id
            }))

            resultado = general
            resultado.forEach(element => {
                concatenar += crearproducto(element)
            });
            contenedor.innerHTML = concatenar
        })

        .catch(() => {
            alert('Sistemas de compras fallando espere un momento')
            console.error('Problemas en el producto')
        })
}
porducto()

const crearproducto = (informacion) => {
    return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 gy-3">
        <div class="card" id=${informacion.idg}>
            <div class="position-absolute text-white ps-2 pe-2"
                style=" background-color: red; font-size:0.7rem; border-radius:0.3rem; top:0.5rem;left:0.5rem;">
                Oferta
            </div>
            <div class="position-absolute text-black p-1 px-2 mt-1 rounded-circle"
                style="top:0.5ren; right:0.5rem; background-color:white; font-size:0.7rem; border-radius:0.3rem;">
                <i class="bi bi-heart"></i>
            </div>
            <img src="${informacion.img}"
                style="object-fit:cover; min-height:12rem; max-height: 12rem;" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title fw-bold fs-6">${informacion.nombre}</h5>
                    <p class="card-text fw-bold fs-5" style="color: #6a11cb;">$${informacion.preciomin}<del
                        class="text-muted fs-6"></del></p>
                    <button class="btn btn-dark w-100" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"
                         onclick='carrito(${informacion.idg})' style="background-color:#6a11cb;">Añadir al
                        carrito</button>
                </div>
        </div>
    </div>
                `
}

const productocarro = (informacion) => {
    return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 gy-3 w-50">
        <div class="card" style="max-height:20rem;">
            <img src="${informacion.img}"
                style="object-fit:cover; min-height:10rem; max-height: 10rem;" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title fw-bold fs-6">${informacion.nombre}</h5>
                    <p class="card-text fw-bold fs-5" style="color: #6a11cb;">$${informacion.preciomin}<del
                        class="text-muted fs-6"></del></p>
                </div>
        </div>
    </div>`
}
let cont = 0
contador1.textContent = `${cont}`
contador2.textContent = `${cont}`
const carrito = (id) => {
    cont++
    contador1.textContent = `${cont}`
    contador2.textContent = `${cont}`
    let venta = ''
    let datos = resultado.filter(item => item.idg == id)
    datos.forEach(item => {
        general.push(item)
        console.log(general);
        venta += productocarro(item)

    })
    contenedor2.innerHTML += venta
    localStorage.setItem('archivo', JSON.stringify(general))
}
