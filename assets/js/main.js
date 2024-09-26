import { slideshow } from './modules/slideshow.js';
import { dynamicItems } from './modules/dynamicItems.js'; 

/* Main
############################################################################ */

document.addEventListener('DOMContentLoaded', function() {
  hljs.highlightAll();
  slideshow();
  dynamicItems();
});