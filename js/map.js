'use strict';
var imageStartRange = 1;
var imageEndRange = 8;
var NUMBER_OF_RENTALS = 8;
var CARD_RENDER_NUMBER = 0;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinsContainer = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');



var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi','dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerType = {
	flat: 'Квартира',
	house: 'Дом',
	bungalo: 'Бунгало'
};


/*  функция перемешивания значений в массиве */
function shuffleArray(array) {
	return array.sort(function () {
		return Math.random() - 0.5;
	});
}


// Создаёт массив со случайным количеством преимуществ
var getRandomElement = function (arr) {
	return arr[getRandomNumber(0, arr.length)];
};

var getRandomArray = function (arr) {
	var newArr = [];

	while (newArr.length < arr.length) {
		var randomElement = getRandomElement(arr);

		if (newArr.indexOf(randomElement) !== -1) {
			continue;
		}

		newArr.push(randomElement);
	}

	newArr = newArr.slice(0, getRandomNumber(0, newArr.length));
	return newArr;
};




/*  получить массив случайных и неповторяющихся чисел */
function getRandomNonRepeatingValue(firstNumber, lastNumber) {

	var nonRepeatingValuesArray = [];

	for (var i = firstNumber; i <= lastNumber; i++) {
		nonRepeatingValuesArray.push(i);
	}

	return nonRepeatingValuesArray;

};


var imageRandom = getRandomNonRepeatingValue(imageStartRange,imageEndRange);

var objectTitle = shuffleArray(TITLES);


var getRandomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min) + min);
};




var createOffer = function(index) {

	var offerAvatar = index;
	var offerTitle = TITLES[getRandomNumber(0,TITLES.length-1)];
	var offerPrice = getRandomNumber(1000,1000000);
	var offerType = TYPE[getRandomNumber(0, TYPE.length - 1)];
	var offerRooms = getRandomNumber(1,5);
	var offerGuests = getRandomNumber(1,32);
	var offerCheckin = TIMES[getRandomNumber(0, TIMES.length - 1)];
	var offerCheckout = TIMES[getRandomNumber(0, TIMES.length - 1)];
	var offerFeatures = getRandomArray(FEATURES);
	var offerLocationX = getRandomNumber(300,900);
	var offerLocationY = getRandomNumber(100,500);

	var ob = {
		author: {
			avatar: 'img/avatars/user' + '0' + (offerAvatar + 1) + '.png'
		},
		offer: {
			title: offerTitle,
			address: offerLocationX + ', ' + offerLocationY,
			price: offerPrice,
			type: offerType,
			rooms: offerRooms,
			guests: offerGuests,
			checkin: offerCheckin,
			checkout: offerCheckout,
			features: offerFeatures,
			description: '',
			photos: []
		},

		location :{
			x: offerLocationX,
			y: offerLocationY
		}
	};

	return ob;
};

var addObjects = function (numberOfObjects) {
	var Objects = [];

	for (var i = 0; i < numberOfObjects; i++) {
		Objects.push(createOffer(i));
	}

	return Objects;
};

var listOfRentals = addObjects(NUMBER_OF_RENTALS);



var renderPin = function (e){
	var mapPin = mapPinTemplate.cloneNode(true);
	var mapPinImage = mapPin.querySelector('img');

	mapPin.style.left = e.location.x - (mapPinImage.width / 2) + 'px';
	mapPin.style.top = e.location.y - mapPinImage.height + 'px';
	mapPin.querySelector('img').setAttribute('src' , e.author.avatar);


	return mapPin;
}



var renderMap = function(e){
	var mapElement = mapCardTemplate.cloneNode(true);

////Функция удаления всех детей у родителя
var removeChilds = function (parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
};
mapElement.querySelector('h3').textContent = e.offer.title;
mapElement.querySelector('small').textContent = e.offer.address;
mapElement.querySelector('.popup__price').innerHTML = e.offer.price + '&#x20bd;/ночь';
mapElement.querySelector('h4').textContent = offerType[e.offer.type];
mapElement.querySelector('h4').nextElementSibling.textContent = e.offer.rooms + ' для ' + e.offer.guests + ' гостей';
mapElement.querySelector('.popup__features').previousElementSibling.textContent = 'Заезд после ' + e.offer.checkin + ', выезд до ' + e.offer.checkout;


var featuresList = mapElement.querySelector('.popup__features');

removeChilds(featuresList);

var fragmentFeatures = document.createDocumentFragment();

for (var i = 0; i < e.offer.features.length; i++) {
	var featureElement = document.createElement('li');
	featureElement.classList.add('feature', 'feature--' + e.offer.features[i]);
	fragmentFeatures.appendChild(featureElement);
}

featuresList.appendChild(fragmentFeatures);



mapElement.querySelector('.popup__features').nextElementSibling.textContent = e.offer.description;
mapElement.querySelector('.popup__avatar').setAttribute('src', e.author.avatar);

return mapElement;
}

var fragment = document.createDocumentFragment();

for (var i = 0; i < listOfRentals.length; i++) {
	fragment.appendChild(renderPin(listOfRentals[i]));
}

fragment.appendChild(renderMap(listOfRentals[CARD_RENDER_NUMBER]));

pinsContainer.appendChild(fragment);


////////////////////////////////// События


map.classList.add('map--faded');
var form = document.querySelector('.notice__form');
form.classList.add('notice__form--disabled');

var popup = document.querySelector('.popup');
var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
popup.classList.add('hidden');

for (var i = 0; i < pins.length; i++) {
	pins[i].classList.add('hidden');
}





var disabledForm = function(flag){
	var field = document.querySelectorAll('fieldset');
	for(var i = 0; i < field.length; i++){
		field[i].disabled = flag;
	}

}

disabledForm(true);


var mapPinMap = document.querySelector('.map__pin--main');

mapPinMap.addEventListener('mouseup', function(){

	map.classList.remove('map--faded');
	form.classList.remove('notice__form--disabled');
	for (var i = 0; i < pins.length; i++) {
		pins[i].classList.remove('hidden');
	}

	disabledForm(false);

})








