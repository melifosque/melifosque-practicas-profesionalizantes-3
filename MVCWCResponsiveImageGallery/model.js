class ImageGalleryModel extends EventTarget {
    constructor() {
      super();
      this.images = [];
    }
  
    addImage(url, description) {
      this.images.push({ url, description });
      this.notify();
    }
  
    removeImage(url) {
      this.images = this.images.filter(image => image.url !== url);
      this.notify();
    }
  
    getImages() {
      return this.images;
    }
  
    notify() {
      this.dispatchEvent(new Event('change'));
    }
  }
  
  export default ImageGalleryModel;
  