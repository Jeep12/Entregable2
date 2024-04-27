import Filter from './Filter.js';

export default class FilterNegative extends Filter {
    constructor(ctx) {
        super(ctx);
    }

    reDraw(imageData) {
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            // Invertir los valores RGB
            data[i] = 255 - data[i]; // Componente rojo
            data[i + 1] = 255 - data[i + 1]; // Componente verde
            data[i + 2] = 255 - data[i + 2]; // Componente azul
            // Mantener el canal alfa
        }

        this.ctx.putImageData(imageData, 0, 0);
    }
}
