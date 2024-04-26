import Filter from "./Filter.js";
import FilterSepia from './FilterSepia.js';
import FilterGray from './FilterGray.js';
import FilterSaturation from "./FilterSaturation.js";
export default class Photo {


    constructor(context, width, height) {
        this.ctx = context;
        this.width = width;
        this.height = height;
        this.loaded = false;
        this.imageData = null;

    }



    loadImage(fileName) {
        
        let orgWidth = this.width;
        let orgHeight = this.height;

        let img = new Image();
        img.src = URL.createObjectURL(fileName);
        let context = this.ctx;

        img.onload = function () {
            const aspectRatio = this.naturalWidth / this.naturalHeight;
            let targetWidth = orgWidth;
            let targetHeight = targetWidth / aspectRatio;
            if (targetHeight > orgHeight) {
                targetHeight = orgHeight;
                targetWidth = targetHeight * aspectRatio;
            }

            


            context.drawImage(this, 0, 0, targetWidth, targetHeight);

         
        };
    }


    sepiaFilter() {
        let filterSepia = new FilterSepia(this.ctx);
        filterSepia.reDraw();
    }

    grayFilter() {
        let filterGray = new FilterGray(this.ctx);
        filterGray.reDraw();
    }
    saturationFilter(saturation){
        let saturationFilter = new FilterSaturation(this.ctx,saturation);
        saturationFilter.reDraw();
    }

}