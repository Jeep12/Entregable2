import FilterSepia from './filters/FilterSepia.js';
import FilterGray from './filters/FilterGray.js';
import FilterSaturation from "./filters/FilterSaturation.js";
import FilterBrightness from "./filters/FilterBrightness.js";
import FilterNegative from './filters/FilterNegative.js';
import FilterBinarization from './filters/FilterBinarization.js';
import FilterBlur from './filters/FilterBlur.js';
import FilterBorder from './filters/FilterBorder.js';

export default class Photo {
    constructor(context, width, height) {
        this.ctx = context;
        this.width = width;
        this.height = height;
        this.loaded = false;
        this.imageData = null;
        this.originalImageData = null; // Aca guardo la imagen original, asi cuando se aplican filtros que tienen rango, se aplique el valor desde la original.

    }

    loadImage(fileName) {
        let orgWidth = this.width;
        let orgHeight = this.height;
        let img = new Image();
        img.src = URL.createObjectURL(fileName);
        let context = this.ctx;
    
        img.onload = () => {
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            let targetWidth = orgWidth;
            let targetHeight = targetWidth / aspectRatio;
            if (targetHeight > orgHeight) {
                targetHeight = orgHeight;
                targetWidth = targetHeight * aspectRatio;
            }
            let posx = (orgWidth - targetWidth) / 2; // Calcular la posición horizontal centrada
            context.drawImage(img, posx, 0, targetWidth, targetHeight);
            this.imageData = context.getImageData(0, 0, this.width, this.height);
            this.originalImageData = this.imageData;// Guardar la imagen original
    
            // Ahora que la imagen se ha cargado completamente, puedes aplicar el filtro de brillo
            //brightnessFilter(0); // Por ejemplo, aplicar el filtro con nivel 0
        };
    }
    

    sepiaFilter() {
        let filterSepia = new FilterSepia(this.ctx);
        filterSepia.reDraw(this.imageData);
    }

    grayFilter() {
        let filterGray = new FilterGray(this.ctx);
        filterGray.reDraw(this.imageData);
    }
    negativeFilter(){

        let filterNegative = new FilterNegative(this.ctx);
        filterNegative.reDraw(this.imageData);
    }
    blurFilter(){

        let filterBLur = new FilterBlur(this.ctx);
        filterBLur.reDraw(this.imageData);
    }
    borderFilter(){
        let filterBorder = new FilterBorder(this.ctx);
        filterBorder.reDraw(this.imageData);

    }
    binarizationFilter(threshold) {
        // Verifica si hay una imagen cargada
        if (this.originalImageData != null) {

            let filteredImageData = new ImageData(new Uint8ClampedArray(this.originalImageData.data), this.originalImageData.width, this.originalImageData.height);
            let filterBinarization = new FilterBinarization(this.ctx, threshold);

            // Aplica el filtro de binarización a la imagen
            filterBinarization.reDraw(filteredImageData);
        } else {
            console.error('No hay ninguna imagen cargada.');
        }
    }
    saturationFilter(saturation) {


        if (!this.originalImageData != null){

            
            let filteredImageData = new ImageData(new Uint8ClampedArray(this.originalImageData.data), this.originalImageData.width, this.originalImageData.height);
            let saturationFilter = new FilterSaturation(this.ctx, saturation);
        
            saturationFilter.reDraw(filteredImageData);
        }
        
    }

    brightnessFilter(brightnessLevel) {
        if (!this.originalImageData != null){

            
                let filteredImageData = new ImageData(new Uint8ClampedArray(this.originalImageData.data), this.originalImageData.width, this.originalImageData.height);
                let brightnessFilter = new FilterBrightness(this.ctx, brightnessLevel);
            
                brightnessFilter.reDraw(filteredImageData);
        }
    }


    
    

 
}
