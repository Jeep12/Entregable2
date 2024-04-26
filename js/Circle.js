import Figure from './Figure.js';

export default class Circle extends Figure {

    constructor(name,posX, posY, radius, fill, context) {
        super(name,posX, posY, fill, context);
        this.radius = radius;
    }

    draw() {
        super.draw();
        this.context.beginPath();
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();
    }
    getRadius() {
        return this.radius;
    } 

    
    isInside(x, y) {
        const distanciaAlCentro = Math.sqrt(
            Math.pow(x - this.getPosX(), 2) + Math.pow(y - this.getPosY(), 2)
        );
        return distanciaAlCentro <= this.radius;
    }  

}