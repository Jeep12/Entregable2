import Filter from './Filter.js';

export default class FilterBlur extends Filter {
    constructor(ctx) {
        super(ctx);
    }

    reDraw(imageData) {
        let data = imageData.data;

        // Kernel de desenfoque más grande con pesos más altos
        let kernel = [];

        // Llenar la matriz con el valor deseado
        const valorDeseado = 1;
        const tamano = 7;
        // Cuanto más grande el for, más grande será el blur porque discrimina más píxeles
        for (let i = 0; i < tamano; i++) {
            kernel[i] = [];
            for (let j = 0; j < tamano; j++) {
                kernel[i][j] = valorDeseado;
            }
        }

        let kernelSize = 7;
        let kernelWeight = 49; // Suma de todos los valores del kernel

        let width = this.ctx.canvas.width;
        let height = this.ctx.canvas.height;

        // Aplica el desenfoque a cada píxel
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let sumR = 0;
                let sumG = 0;
                let sumB = 0;

                // Itera sobre los valores del kernel
                for (let i = 0; i < kernelSize; i++) {
                    for (let j = 0; j < kernelSize; j++) {
                        let offsetX = x + i - Math.floor(kernelSize / 2);
                        let offsetY = y + j - Math.floor(kernelSize / 2);

                        // Verifica si el píxel está dentro de los límites de la imagen
                        if (offsetX >= 0 && offsetX < width && offsetY >= 0 && offsetY < height) {
                            const index = (offsetY * width + offsetX) * 4;
                            const weight = kernel[i][j];

                            sumR += data[index] * weight;
                            sumG += data[index + 1] * weight;
                            sumB += data[index + 2] * weight;
                        }
                    }
                }
                // Normaliza los valores y los asigna al píxel original
                let index = (y * width + x) * 4;
                data[index] = sumR / kernelWeight;
                data[index + 1] = sumG / kernelWeight;
                data[index + 2] = sumB / kernelWeight;
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
    }
}
