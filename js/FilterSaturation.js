// saturationFilter.js
import Filter from './Filter.js';


export default class FilterSaturation extends Filter {
    constructor(ctx, saturation) {
        super(ctx);
        this.saturation = saturation; // Nivel de saturación, un valor entre -100 y 100
    }

    reDraw() {
        const imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const data = imageData.data;

        const adjustment = this.saturation / 100;

        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            // Convertir RGB a HSL (Hue, Saturation, Lightness)
            let hsl = this.rgbToHsl(r, g, b);

            // Ajustar la saturación
            hsl[1] += adjustment;
            hsl[1] = Math.max(0, Math.min(1, hsl[1])); // Asegurar que la saturación esté en el rango [0, 1]

            // Convertir HSL de nuevo a RGB
            let [newR, newG, newB] = this.hslToRgb(hsl[0], hsl[1], hsl[2]);

            // Aplicar los nuevos valores de RGB
            data[i] = newR;
            data[i + 1] = newG;
            data[i + 2] = newB;
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

    // Función auxiliar para convertir RGB a HSL
    rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h, s, l];
    }

    // Función auxiliar para convertir HSL a RGB
    hslToRgb(h, s, l) {
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // A gris
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
}
