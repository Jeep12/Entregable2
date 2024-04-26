export default class Figure {
    //empiezo el contador en 1
    static count = 1;
    constructor(name, posX, posY, fill, context) {
        //en cada instancia se le incrementa 1;
        Figure.count++;
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.originalFill = fill;
        this.context = context;
    }
    getName() {
        return this.name;
    }
    setFill(fill) {
        this.fill = fill;
    }
    getFill() {
        return this.fill;
    }
    setPosX(posX) {
        this.posX = posX;
    }
    setPosY(posY) {
        this.posY = posY;
    }
    getPosX() {
        return this.posX
    }
    getPosY() {
        return this.posY
    }
    getPosition() {
        return { x: this.getPosX(), y: this.getPosY() }
    }
    draw() {
        this.context.fillStyle = this.fill;
    }
    moveTo(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    //guardo el color original para restablecerlo cuando suceda el evento mouseUp
    getOriginalFill() {
        return this.originalFill;
    }


}

