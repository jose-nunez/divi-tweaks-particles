/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */


console.log('starting particles');

var ispresent = document.getElementsByClassName('particles_switch');

if(ispresent[0]){ 
	var eElements = document.getElementsByClassName('my-super-particle-class');

	for(var i=0;i<eElements.length;i++){
	iterateONELEMENTS(eElements[i],i+1);
		
	}

}
else console.log('No parent class present');

function iterateONELEMENTS(eElement,index){

	var newFirstElement = document.createElement('div');

	var elemID = "particles-js-"+index;

	newFirstElement.setAttribute("id",elemID);
	newFirstElement.className += ' particles-js-container';

	eElement.insertBefore(newFirstElement, eElement.firstChild);

	particlesJS(elemID, {
	  "particles": {
		"number": {
		  "value": 40,
		  "density": {
			"enable": true,
			"value_area": 800
		  }
		},
		"color": {
		  "value": "#ffffff"
		},
		"shape": {
		  "type": "circle",
		  "stroke": {
			"width": 0,
			"color": "#000000"
		  },
		  "polygon": {
			"nb_sides": 5
		  },
		  "image": {
			"src": "img/github.svg",
			"width": 100,
			"height": 100
		  }
		},
		"opacity": {
		  "value": 0.5,
		  "random": false,
		  "anim": {
			"enable": false,
			"speed": 1,
			"opacity_min": 0.1,
			"sync": false
		  }
		},
		"size": {
		  "value": 3,
		  "random": true,
		  "anim": {
			"enable": false,
			"speed": 40,
			"size_min": 0.1,
			"sync": false
		  }
		},
		"line_linked": {
		  "enable": true,
		  "distance": 150,
		  "color": "#ffffff",
		  "opacity": 0.4,
		  "width": 1
		},
		"move": {
		  "enable": true,
		  "speed": 6,
		  "direction": "none",
		  "random": false,
		  "straight": false,
		  "out_mode": "out",
		  "bounce": false,
		  "attract": {
			"enable": false,
			"rotateX": 600,
			"rotateY": 1200
		  }
		}
	  },
	  "interactivity": {
		"detect_on": "canvas",
		"events": {
		  "onhover": {
			"enable": true,
			"mode": "grab"
		  },
		  "onclick": {
			"enable": true,
			"mode": "push"
		  },
		  "resize": true
		},
		"modes": {
		  "grab": {
			"distance": 140,
			"line_linked": {
			  "opacity": 1
			}
		  },
		  "bubble": {
			"distance": 400,
			"size": 40,
			"duration": 2,
			"opacity": 8,
			"speed": 3
		  },
		  "repulse": {
			"distance": 200,
			"duration": 0.4
		  },
		  "push": {
			"particles_nb": 4
		  },
		  "remove": {
			"particles_nb": 2
		  }
		}
	  },
	  "retina_detect": true
	});

}