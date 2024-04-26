import Pen from './Pen.js';
import Eraser from './Eraser.js';
import Photo from './Photo.js';


let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');



let windowWidth = window.innerWidth;


let canvasWidth = canvas.width = windowWidth-20;
let canvasHeight = canvas.height = 700;


let inputColor = document.getElementById("color");
let backgroundColor = rgb(255, 255, 255);

ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvasWidth, canvasHeight);


//rango del tamaño del lapiz o la goma 1 a 100
let range1 = document.getElementById("range1");

let image = null;
let originalImage = null;
let size = range1.value;
let isDragging = false;

let mouseUp = true;
let mouseDown = false;
let penClick = false;
let erasedClick = false;
let pencil = null;
let saved = false;
let eraser = null;
let selectedFigure = null;
let name= "Sin nombre";
let offsetX, offsetY;

range1.addEventListener("change", changeRange)
changeRange();
function changeRange() {
    size = range1.value;
    document.getElementById("valueRange").innerHTML = size;

}

let showName = document.getElementById("showName");
showName.innerHTML = name;


canvas.addEventListener("mousedown", (e) => {
    let mouseX = e.clientX - canvas.getBoundingClientRect().left;
    let mouseY = e.clientY - canvas.getBoundingClientRect().top;
    if (penClick) {
        mouseDown = true;
        mouseUp = false;
        pencil = new Pen(mouseX, mouseY, inputColor.value, ctx, 'black', size);
    }
    if (erasedClick) {
        mouseDown = true;
        mouseUp = false;

        eraser = new Eraser(mouseX, mouseY, ctx, size);
        eraser.erase();
    }
 


});

canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;
    isDragging = false;
    mouseUp = true;

});
canvas.addEventListener("mousemove", (e) => {
    //console.log("Coordenadas del evento: \n" +e.layerX, e.layerY);
    if (mouseDown && pencil != null) {
        let mouseX = e.clientX - canvas.getBoundingClientRect().left;
        let mouseY = e.clientY - canvas.getBoundingClientRect().top;
        pencil.moveTo(mouseX, mouseY);
        pencil.draw();
    }
    if (mouseDown && eraser != null) {
        let mouseX = e.clientX - canvas.getBoundingClientRect().left;
        let mouseY = e.clientY - canvas.getBoundingClientRect().top;
        eraser.moveTo(mouseX, mouseY);
        eraser.erase();
     
    }
    if (isDragging && selectedFigure) {
        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;

        // Calcula el desplazamiento actualizado
        const newPosX = mouseX - offsetX;
        const newPosY = mouseY - offsetY;



        // Actualiza la posición de la figura seleccionada
        selectedFigure.moveTo(newPosX, newPosY);


//dibujo denuevo para que se vaya mostrando mientras se arrastra 
    }

});
document.getElementById("clean").addEventListener("click", () => {


        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Limpiar el canvas
        ctx.fillStyle = backgroundColor; // Restaurar el color de fondo
        ctx.fillRect(0, 0, canvasWidth, canvasHeight); // Rellenar el canvas con el color de fondo
        image = null;
        name = "Sin nombre";
        showName.innerHTML = name;

        

    
});

document.getElementById("reloadImage").addEventListener("click", () => {
    let imageInput = document.getElementById("imageInput");
    let selectedImage = imageInput.files[0];
    originalImage.loadImage(selectedImage);
 
});
document.getElementById("acceptImg").addEventListener("click", acceptImage);
function acceptImage(e) {
    // Aquí puedes obtener el valor del input de la imagen y realizar las acciones necesarias
    let imageInput = document.getElementById("imageInput");
    let selectedImage = imageInput.files[0];
     image = new Photo(ctx, canvasWidth, canvasHeight);
     originalImage = image; // Almacena la imagen original para recargarla con un boton
     
     //obtener el nombre del archivo para verificar que no termine con distintos formatos a png,jpg,jpeg
     let fileName = selectedImage.name;

     //guardo el nombre del archivo en la variable name para usarlo en otras funciones
     name = fileName;
     let showName = document.getElementById("showName").innerHTML=name;
     document.getElementById("fileName").innerHTML = fileName;
     
     if (!fileName.endsWith(".jpg") && !fileName.endsWith(".jpeg") && !fileName.endsWith(".png")) {
        // Mostrar un mensaje de error
        alert("Solo se admiten formatos jpg,jpeg y png");
        
        // Limpiar el input de archivo para que el usuario pueda seleccionar nuevamente
        imageInput.value = null;
    }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Limpiar el canvas
    
    image.loadImage(selectedImage);
    
    
}



let imageInput = document.getElementById("imageInput");
imageInput.addEventListener("change", function () {
    if (imageInput.files.length > 0) {
        // Obtener el nombre del archivo seleccionado
        let fileName = imageInput.files[0].name;

        // Mostrar el nombre del archivo en el div con ID "fileName"
        document.getElementById("fileName").innerHTML =  "Archivo seleccionado: "+ "<b>"+fileName +"</b>";
    } else {
        // Si no se selecciona ningún archivo, borrar el contenido del div
        document.getElementById("fileName").innerHTML = "";
    }
})


    let penBtn = document.getElementById("pen");
    penBtn.addEventListener("click", (e) => {
        penClick = true;
        erasedClick = false; // Restablece erasedClick a false al seleccionar el lápiz

        // Restaura el color de la línea al color del lápiz al seleccionar el lápiz
        ctx.strokeStyle = inputColor.value;
        eraser = null;

    });

    let eraseBtn = document.getElementById("eraser");
    eraseBtn.addEventListener("click", (e) => {
        erasedClick = true;
        penClick = false; // Restablece penClick a false al seleccionar la goma de borrar


        // Restaura el color de la línea al color de fondo del lienzo al seleccionar la goma de borrar
        ctx.strokeStyle = backgroundColor;
        pencil = null; // Restablece la instancia del lápiz a null
    });
function rgb(r, g, b) {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}




document.getElementById("saveImage").addEventListener("click", saveCanvasImage);
function saveCanvasImage() {

    // Crear un enlace temporal
    let link = document.createElement('a');
    
    // Obtener la extensión de la imagen original
    let fileInput = document.getElementById("imageInput");

    //operador ternario, si hay un fileinput, se aplica el nombre del file sino el por defecto
    let fileName = (fileInput.files.length > 0) ? fileInput.files[0].name : name;//este name es que se actualiza cuando cargo la imagen


    link.href = canvas.toDataURL(); // Utiliza la extensión original para determinar el tipo de imagen
    link.download = fileName; // Usa el nombre original para nombrar el archivo descargado
    saved = true;
    // Simular un clic en el enlace para descargar la imagen
    link.click();
}



//FILTROSSSSSSSSS

document.getElementById("filterSepia").addEventListener("click",()=>
{
    if(image!=null){
        image.sepiaFilter();
    }
});

document.getElementById("filterGray").addEventListener("click",()=>
{
    if(image!=null){
        image.grayFilter();
    }
});

document.getElementById("saturationRange").addEventListener("change", () => {
    // Obtener el valor actual del input de rango de saturación
    let saturationLevel = parseInt(document.getElementById("saturationRange").value);

    // Aplicar el filtro de saturación con el nuevo nivel de saturación
    if (image != null) {
        image = originalImage;
        image.saturationFilter(saturationLevel);
    }
});

