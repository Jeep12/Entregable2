import Filter from './Filter.js';

export default class FilterBrightness extends Filter {

    constructor(ctx, brightnessLevel) {
        super(ctx);
        this.brightnessLevel = brightnessLevel;
    }

    reDraw(imageData) {
        const data = imageData.data;

        // Escalar el nivel de brillo dentro del rango [-255, 255]
        let brightnessLevel = Math.max(-255, Math.min(255, this.brightnessLevel));

        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            // Ajustar los valores RGB según el nivel de brillo
            r += brightnessLevel;
            g += brightnessLevel;
            b += brightnessLevel;

            // Normalizar los valores de color para asegurarse de que estén en el rango [0, 255]
            r = this.clamp(r, 0, 255);
            g = this.clamp(g, 0, 255);
            b = this.clamp(b, 0, 255);

            // Aplicar los nuevos valores RGB
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    setLevel(level) {
        this.brightnessLevel = level;
        this.reDraw();
    }
    getLevel() {
        return this.brightnessLevel;
    }
}
