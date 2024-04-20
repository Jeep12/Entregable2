export default class Pen {

    constructor(posX, posY, fill, context, estilo,size) {
        this.antX = posX;
        this.antY = posY;
        this.posX = posX;
        this.posY = posY;
        this.ctx = context;
        this.estilo = estilo;
        this.fill = fill;
        this.size = size; // Nuevo parámetro para el tamaño del lápiz

    }

    draw() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.fill;
        this.ctx.lineCap = 'round'; //cambia el puntero del que  viene por defecto a un circulo
        this.ctx.lineWidth = this.size; // Establecer el grosor de la línea

        this.ctx.moveTo(this.antX, this.antY);
        this.ctx.lineTo(this.posX, this.posY);

        this.ctx.stroke();
        this.ctx.closePath();
    }

    moveTo(posX, posY) {
        this.antX = this.posX;
        this.antY = this.posY;
        this.posX = posX;
        this.posY = posY;   
    }
    setSize(newSize){
    this.size = newSize;
    }
    getSize(){
    return this.size;
}



}