/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
import $ from 'jquery';

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');


// J'importe tous mes fichiers js

require('jquery');                          // Bibliothèque installée ds node_modules (avec npm)
global.$ = global.jQuery = $;               // jQuery en global

require('bootstrap');                       // Bibliothèque installée ds node_modules (avec npm)
require('./bootstrap-datepicker.min.js');   // J'ai viré le cdn et pris le fichier (sinon ne le trouve pas)
require('./ad.js');                         // Fichier ds assets/js

