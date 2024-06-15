class ImageGalleryView extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          .gallery {
            border: 1px solid #ccc;
          }
          .gallery:hover {
            border: 1px solid #777;
          }
          .gallery img {
            width: 100%;
            height: auto;
          }
          .desc {
            padding: 15px;
            text-align: center;
          }
          * {
            box-sizing: border-box;
          }
          .responsive {
            padding: 0 6px;
            float: left;
            width: 24.99999%;
          }
          @media only screen and (max-width: 700px) {
            .responsive {
              width: 49.99999%;
              margin: 6px 0;
            }
          }
          @media only screen and (max-width: 500px) {
            .responsive {
              width: 100%;
            }
          }
          .clearfix:after {
            content: "";
            display: table;
            clear: both;
          }
        </style>
        <div id="gallery-container" class="clearfix"></div>
      `;
      this.galleryContainer = this.shadowRoot.getElementById('gallery-container');
    }
  
    update(images) {
      this.galleryContainer.innerHTML = images.map(image => `
        <div class="responsive">
          <div class="gallery">
            <a target="_blank" href="${image.url}">
              <img src="${image.url}" alt="Image" width="600" height="400">
            </a>
            <div class="desc">${image.description}</div>
          </div>
        </div>
      `).join('');
    }
  }
  
  customElements.define('image-gallery-view', ImageGalleryView);
  
  export default ImageGalleryView;
  