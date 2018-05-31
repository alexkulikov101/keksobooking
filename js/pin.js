'use strict';



(function(){

	var PIN_SPIRE_HEIGHT = 18;
var ENTER_KEYCODE = 13;

	var template = document.querySelector('template').content;
	window.pin = {
		renderMapPin: function (element) {
			var mapPin = template.querySelector('.map__pin').cloneNode(true);
			var mapPinImage = mapPin.querySelector('img');

			mapPin.style.left = element.location.x + 'px';
			mapPin.style.top = element.location.y - (mapPinImage.height / 2 + PIN_SPIRE_HEIGHT) + 'px';
			mapPin.querySelector('img').setAttribute('src', element.author.avatar);
			mapPin.classList.add('hidden');

			return mapPin;
		}
	};
})();