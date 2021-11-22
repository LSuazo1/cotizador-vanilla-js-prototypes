//constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function () {

    let cantidad;
    const base=2000;

   //console.log(this.marca);
    switch (this.marca) {
        case '1':
            cantidad=base *1.15;
            break;
        case '2':
            cantidad=base *1.05;
            break;
        case '3':
            cantidad=base *1.35;
            break;
        default:
            break;
    }

    //Leer el anio
    const diferencia=new Date().getFullYear()-this.year;
    cantidad-=((diferencia *3)*cantidad)/100;
    

    if (this.tipo==='basico') {
        cantidad+=1.30;
    }else{
        cantidad+=1.50;
    }
    return cantidad;
}


function UI() { }
//llenar las opciones de los anios
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    min = max - 21
    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}
//Muestra alertas en la pantalla se
UI.prototype.mostrarMensajes = (mensaje, tipo) => {
    const div = document.createElement('div');
    if (tipo == 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado=(total,seguro)=>{

    const div=document.createElement('div');

    div.classList.add('mt-10');

    div.innerHTML=`
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Total:<span class=font-normal>${total}</span></p>
    
    `;
    const resultadoDiv=document.querySelector('#resultado');
    
    const spinner=document.querySelector('#cargando');
    spinner.style.display="block";
    
    setTimeout(() => {
        spinner.style.display="none";
        resultadoDiv.appendChild(div);
    },3000);

}



//instanciar UI
const ui = new UI();



document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); //llena el select con los anios
});

eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}


function cotizarSeguro(e) {
    e.preventDefault();

    //leer marca seleccionada
    const marca = document.querySelector('#marca').value
    //console.log(marca);
    //leer el anio seleccionado
    const year = document.querySelector('#year').value;

    //leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensajes('Todos los campos son obligarorios', 'error');
        return;
    }
    ui.mostrarMensajes('cotizando', 'correcto');

    //Ocultar las cotizaciones previas
    const resultados=document.querySelector('#resultado div');
    if ( resultados!= null) {
        resultados.remove();       
    }

    //Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total=seguro.cotizarSeguro();

   ui.mostrarResultado(total,seguro);
}