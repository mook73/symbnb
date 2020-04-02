(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ad"],{

/***/ "./assets/js/ad.js":
/*!*************************!*\
  !*** ./assets/js/ad.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");

$('#add-image').click(function () {
  // Je récupère le numéro des futurs champs que je vais créer
  var index = +$('#widgets-counter').val(); // Je récupère le prototype des entrées

  var tmpl = $('#annonce_images').data('prototype').replace(/__name__/g, index); // J'injecte ce code au sein de la div

  $('#annonce_images').append(tmpl);
  $('#widgets-counter').val(index + 1); // Je gère le bouton supprimer

  handleDeleteButtons();
});

function handleDeleteButtons() {
  $('button[data-action="delete"]').click(function () {
    var target = this.dataset.target;
    $(target).remove();
  });
}

function updateCounter() {
  var count = +$('#annonce_images div.form-group').length;
  $('#widgets-counter').val(count);
}

updateCounter();
handleDeleteButtons();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

},[["./assets/js/ad.js","runtime","vendors~ad~app"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWQuanMiXSwibmFtZXMiOlsiJCIsImNsaWNrIiwiaW5kZXgiLCJ2YWwiLCJ0bXBsIiwiZGF0YSIsInJlcGxhY2UiLCJhcHBlbmQiLCJoYW5kbGVEZWxldGVCdXR0b25zIiwidGFyZ2V0IiwiZGF0YXNldCIsInJlbW92ZSIsInVwZGF0ZUNvdW50ZXIiLCJjb3VudCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBQSxDQUFDLENBQUMsWUFBRCxDQUFELENBQWdCQyxLQUFoQixDQUFzQixZQUFVO0FBQzVCO0FBQ0EsTUFBTUMsS0FBSyxHQUFHLENBQUNGLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCRyxHQUF0QixFQUFmLENBRjRCLENBSTVCOztBQUNBLE1BQU1DLElBQUksR0FBR0osQ0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJLLElBQXJCLENBQTBCLFdBQTFCLEVBQXVDQyxPQUF2QyxDQUErQyxXQUEvQyxFQUE0REosS0FBNUQsQ0FBYixDQUw0QixDQU81Qjs7QUFDQUYsR0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJPLE1BQXJCLENBQTRCSCxJQUE1QjtBQUVBSixHQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQkcsR0FBdEIsQ0FBMEJELEtBQUssR0FBRyxDQUFsQyxFQVY0QixDQVk1Qjs7QUFDQU0scUJBQW1CO0FBQ3RCLENBZEQ7O0FBZ0JBLFNBQVNBLG1CQUFULEdBQStCO0FBQzNCUixHQUFDLENBQUMsOEJBQUQsQ0FBRCxDQUFrQ0MsS0FBbEMsQ0FBd0MsWUFBVTtBQUM5QyxRQUFNUSxNQUFNLEdBQUcsS0FBS0MsT0FBTCxDQUFhRCxNQUE1QjtBQUNBVCxLQUFDLENBQUNTLE1BQUQsQ0FBRCxDQUFVRSxNQUFWO0FBQ0gsR0FIRDtBQUtIOztBQUVELFNBQVNDLGFBQVQsR0FBeUI7QUFDckIsTUFBTUMsS0FBSyxHQUFHLENBQUNiLENBQUMsQ0FBQyxnQ0FBRCxDQUFELENBQW9DYyxNQUFuRDtBQUVBZCxHQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQkcsR0FBdEIsQ0FBMEJVLEtBQTFCO0FBQ0g7O0FBRURELGFBQWE7QUFDYkosbUJBQW1CLEciLCJmaWxlIjoiYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKCcjYWRkLWltYWdlJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAvLyBKZSByw6ljdXDDqHJlIGxlIG51bcOpcm8gZGVzIGZ1dHVycyBjaGFtcHMgcXVlIGplIHZhaXMgY3LDqWVyXG4gICAgY29uc3QgaW5kZXggPSArJCgnI3dpZGdldHMtY291bnRlcicpLnZhbCgpO1xuXG4gICAgLy8gSmUgcsOpY3Vww6hyZSBsZSBwcm90b3R5cGUgZGVzIGVudHLDqWVzXG4gICAgY29uc3QgdG1wbCA9ICQoJyNhbm5vbmNlX2ltYWdlcycpLmRhdGEoJ3Byb3RvdHlwZScpLnJlcGxhY2UoL19fbmFtZV9fL2csIGluZGV4KTtcblxuICAgIC8vIEonaW5qZWN0ZSBjZSBjb2RlIGF1IHNlaW4gZGUgbGEgZGl2XG4gICAgJCgnI2Fubm9uY2VfaW1hZ2VzJykuYXBwZW5kKHRtcGwpO1xuXG4gICAgJCgnI3dpZGdldHMtY291bnRlcicpLnZhbChpbmRleCArIDEpO1xuXG4gICAgLy8gSmUgZ8OocmUgbGUgYm91dG9uIHN1cHByaW1lclxuICAgIGhhbmRsZURlbGV0ZUJ1dHRvbnMoKTtcbn0pO1xuXG5mdW5jdGlvbiBoYW5kbGVEZWxldGVCdXR0b25zKCkge1xuICAgICQoJ2J1dHRvbltkYXRhLWFjdGlvbj1cImRlbGV0ZVwiXScpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZGF0YXNldC50YXJnZXQ7XG4gICAgICAgICQodGFyZ2V0KS5yZW1vdmUoKTtcbiAgICB9KTtcbiAgICBcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ291bnRlcigpIHtcbiAgICBjb25zdCBjb3VudCA9ICskKCcjYW5ub25jZV9pbWFnZXMgZGl2LmZvcm0tZ3JvdXAnKS5sZW5ndGg7XG5cbiAgICAkKCcjd2lkZ2V0cy1jb3VudGVyJykudmFsKGNvdW50KTtcbn1cblxudXBkYXRlQ291bnRlcigpO1xuaGFuZGxlRGVsZXRlQnV0dG9ucygpOyJdLCJzb3VyY2VSb290IjoiIn0=