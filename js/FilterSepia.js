import Filter from './Filter.js';
export default class FilterSepia extends Filter {
    
    constructor(ctx){
        super(ctx);
    }

    reDraw() {
        const imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
            data[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
            data[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

}