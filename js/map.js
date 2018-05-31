'use strict';

(function(){


var CARD_RENDER_NUMBER = 0;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var map = document.querySelector('.map');
var mapListElement = map.querySelector('.map__pins');



var createMapElements = function (arrObjects) {
	var fragment = document.createDocumentFragment();

	for (var i = 0; i < arrObjects.length; i++) {
		fragment.appendChild(window.pin.renderMapPin(arrObjects[i]));
	}

	fragment.appendChild(window.card.renderMapCard(arrObjects[CARD_RENDER_NUMBER]));

	mapListElement.appendChild(fragment);
};

createMapElements(window.data.listOfRentals);



var popup = mapListElement.querySelector('.popup');
var mapPinMain = map.querySelector('.map__pin--main');
mapListElement.insertBefore(popup, mapPinMain);
var mapPinsSide = mapListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFields = noticeForm.querySelectorAll('fieldset');

popup.classList.add('hidden');


var openPage = function () {
	map.classList.remove('map--faded');

	for (var i = 0; i < mapPinsSide.length; i++) {
		mapPinsSide[i].classList.remove('hidden');
	}

	noticeForm.classList.remove('notice__form--disabled');
	window.form.disableFieldset(noticeFields, false);
};

mapPinMain.addEventListener('mouseup', function () {
	openPage();
});

mapPinMain.addEventListener('keydown', function (evt) {
	if (evt.keyCode === ENTER_KEYCODE) {
		openPage();
	}
});

var replacePopup = function (target) {
	for (var i = 0; i < window.data.listOfRentals.length; i++) {
		if (target.firstChild.getAttribute('src') === window.data.listOfRentals[i].author.avatar) {
			window.card.renderPopup(popup, window.data.listOfRentals[i]);
		}
	}
};



var openPopup = function (evt) {
	var target = evt.target;

	while (target !== mapListElement) {
		if (target.className === 'map__pin') {
			for (var i = 0; i < mapPinsSide.length; i++) {
				mapPinsSide[i].classList.remove('map__pin--active');
			}

			target.classList.add('map__pin--active');
			popup.classList.remove('hidden');

			replacePopup(target);

			

			break;
		}

		target = target.parentNode;
	}
};


mapListElement.addEventListener('click', function (evt) {
	openPopup(evt);
});


var popupClose = document.querySelector('.popup__close');


popupClose.addEventListener('click', function(){
	popup.classList.add('hidden');
	for (var i = 0; i < mapPinsSide.length; i++) {
		mapPinsSide[i].classList.remove('map__pin--active');
	}


})

document.addEventListener('keydown', function(evt){
	if(evt.keyCode === 27){
		popup.classList.add('hidden');
		for (var i = 0; i < mapPinsSide.length; i++) {
			mapPinsSide[i].classList.remove('map__pin--active');
		}
	}
})



///////////////////////////// Drag Перетаскивание


var fieldAdress = document.querySelector('#address');
var containerPin = document.querySelector('.map__pin--main')
var pinHandle = containerPin.querySelector('img');


pinHandle.addEventListener('mousedown', function(e){
	e.preventDefault();
	var startCoords = {
		x: e.clientX,
		y: e.clientY
	};



	var onMouseMove = function(moveevent){
		moveevent.preventDefault();
		var shift = {
			x: startCoords.x - moveevent.clientX ,
			y: startCoords.y - moveevent.clientY
		};

		

		startCoords = {
			x: moveevent.clientX,
			y: moveevent.clientY
		};

		containerPin.style.top = (containerPin.offsetTop - shift.y) + 'px';
		containerPin.style.left = (containerPin.offsetLeft - shift.x) + 'px';

		if(startCoords.y < 100){
			containerPin.style.top = '100px';

		};

		 if(startCoords.y > 500){
				containerPin.style.top = '500px';
		};

		fieldAdress.value = ('y=' + containerPin.style.top  + ' ' + 'x=' + containerPin.style.left)


	};

	var onMouseUp = function(upvent){
		upvent.preventDefault();
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
	


});

})();