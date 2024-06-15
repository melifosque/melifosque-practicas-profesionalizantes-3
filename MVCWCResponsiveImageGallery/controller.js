import ImageGalleryModel from './model.js';
import ImageGalleryView from './view.js';

class ImageGalleryController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.addEventListener('change', () => {
      this.view.update(this.model.getImages());
    });

    this.initForm();
  }

  addImage(url, description) {
    this.model.addImage(url, description);
  }

  removeImage(url) {
    this.model.removeImage(url);
  }

  initForm() {
    const form = document.getElementById('image-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const url = form.querySelector('#image-url').value;
      const description = form.querySelector('#image-description').value;
      this.addImage(url, description);
      form.reset();
    });
  }
}

// Instanciamos el modelo, la vista y el controlador
const model = new ImageGalleryModel();
const view = document.createElement('image-gallery-view');
document.body.appendChild(view);
const controller = new ImageGalleryController(model, view);

// Añadimos algunas imágenes de ejemplo
controller.addImage('images/img_5terre.jpg', 'Cinque Terre');
controller.addImage('images/img_forest.jpg', 'Forest');
controller.addImage('images/img_lights.jpg', 'Northern Lights');
controller.addImage('images/img_mountains.jpg', 'Mountains');

// Para manejar la adición y eliminación de imágenes desde la consola del navegador
window.controller = controller;
