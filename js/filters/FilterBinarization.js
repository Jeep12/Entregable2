import Filter from './Filter.js';

export default class FilterBinarization extends Filter {
    constructor(ctx, threshold) {
        super(ctx);
        this.threshold = threshold;
    }

    reDraw(imageData) {
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            // Convertir a escala de grises
            const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
            
            // Aplicar la binarización basada en el umbral
            const newValue = gray < this.threshold ? 0 : 255;

            // Establecer los nuevos valores RGB
            data[i] = newValue; // Componente rojo
            data[i + 1] = newValue; // Componente verde
            data[i + 2] = newValue; // Componente azul
            // Mantener el canal alfa
        }

        this.ctx.putImageData(imageData, 0, 0);
    }
}
