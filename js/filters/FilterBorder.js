import Filter from './Filter.js';

export default class FilterBorder extends Filter {
    constructor(ctx) {
        super(ctx);
    }

    reDraw(imageData) {
        // Obtener los datos de píxeles de la imagen del lienzo
        let data = imageData.data;

        // Definir las matrices de Sobel para las direcciones x e y
        let sobelX = [
            [-1, 0, 1],   // Coeficientes para la dirección x (horizontal)
            [-2, 0, 2],   // Se aplican a los píxeles vecinos a la izquierda y derecha del píxel actual
            [-1, 0, 1]    // Los valores negativos resaltan los bordes oscuros, los positivos resaltan los claros
        ];

        let sobelY = [
            [-1, -2, -1], // Coeficientes para la dirección y (vertical)
            [0, 0, 0],    // Se aplican a los píxeles vecinos arriba y abajo del píxel actual
            [1, 2, 1]     // Los valores negativos resaltan los bordes oscuros, los positivos resaltan los claros
        ];

        // Crear una copia de los datos de píxeles para mantener la imagen original
        let newData = new Uint8ClampedArray(data);

        // Iterar sobre los píxeles de la imagen para aplicar el efecto de bordes
        for (let y = 1; y < this.ctx.canvas.height - 1; y++) {
            for (let x = 1; x < this.ctx.canvas.width - 1; x++) {
                let index = (y * this.ctx.canvas.width + x) * 4;

                let gxRed = 0, gxGreen = 0, gxBlue = 0;
                let gyRed = 0, gyGreen = 0, gyBlue = 0;

                // Calcular los componentes gx y gy por canal de color
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        let pixelIndex = ((y + i) * this.ctx.canvas.width + (x + j)) * 4;

                        // Coeficientes de las matrices de Sobel
                        let weightX = sobelX[i + 1][j + 1]; // Coeficiente para la dirección x, conviniendo con la posición actual del píxel y su correspondiente en la matriz sobel
                        let weightY = sobelY[i + 1][j + 1]; // Coeficiente para la dirección y
                        // Calcular los componentes gx y gy para cada canal de color
                        gxRed += data[pixelIndex] * weightX;
                        gxGreen += data[pixelIndex + 1] * weightX;
                        gxBlue += data[pixelIndex + 2] * weightX;

                        gyRed += data[pixelIndex] * weightY;
                        gyGreen += data[pixelIndex + 1] * weightY;
                        gyBlue += data[pixelIndex + 2] * weightY;
                    }
                }

                // Calcular la magnitud del gradiente
                let magnitudeRed = Math.sqrt(gxRed * gxRed + gyRed * gyRed);
                let magnitudeGreen = Math.sqrt(gxGreen * gxGreen + gyGreen * gyGreen);
                let magnitudeBlue = Math.sqrt(gxBlue * gxBlue + gyBlue * gyBlue);

                // Ajustar los valores si son mayores que 255
                newData[index] = Math.min(magnitudeRed, 255);
                newData[index + 1] = Math.min(magnitudeGreen, 255);
                newData[index + 2] = Math.min(magnitudeBlue, 255);
            }
        }

        // Actualizar la imagen en el canvas con los cambios
        imageData.data.set(newData);
        this.ctx.putImageData(imageData, 0, 0);
    }
}
