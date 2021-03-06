angular.module('convergence')

	.factory('randomise', function () {
		'use strict';

		return {
			generate: function generate(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			shuffleArray: function shuffle(array) {
				var currentIndex = array.length, temporaryValue, randomIndex;

				// While there remain elements to shuffle...
				while (0 !== currentIndex) {

					// Pick a remaining element...
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;

					// And swap it with the current element.
					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}

				return array;
			}
		};
	});
