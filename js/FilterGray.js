import Filter from './Filter.js';
export default class FilterGray extends Filter {
    
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
            let media = (r+b+g)/3;
            data[i] = media;
            data[i + 1] = media;
            data[i + 2] = media;
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

}