/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


var $tooltip = $('<div>', {"class": "mapster_tooltip"})

// Initialize Imagemapster plugin
var mainOptions = {
  staticState: false,
  showToolTip: true,
  toolTipContainer: $tooltip,
  mapKey: 'name',
  fillOpacity: 1,
  fadeInterval: 100,
  render_highlight: {
    altImage: './assets/images/alt_map.png'
  },
  areas: [{
    key: 'sanitary',
    toolTip: 'Administration & Maintenance'
  },
  {
    key: 'pump',
    toolTip: 'Primary Effluent Pump/Lift Station'
  },
  {
    key: 'basin',
    toolTip: 'Primary Settling Basins'
  },
  {
    key: 'digesters',
    toolTip: 'Anaerobic Digesters'
  },
  {
    key: 'fermenters',
    toolTip: 'Fermenters'
  },
  {
    key: 'clarifiers',
    toolTip: 'Primary Clarifiers &amp; Aeration Tanks'
  },
  {
    key: 'bioreactors',
    toolTip: 'Bioreactor'
  },
  {
    key: 'degritters',
    toolTip: 'Cyclone Degritters'
  },
  {
    key: 'secondary_clarifiers',
    toolTip: 'Secondary Clarifiers & Chlorine Tanks'
  },
  {
    key: 'belt_filter',
    toolTip: 'Digesters & Belt Filter Presses'
  }
]
};

var mapOptions = {
  staticState: false,
  fade: true,
  fadeDuration: 350,
  render_highlight: {
    altImage: './assets/images/alt_pump.png'
  }
};

$('#main_map').mapster(mainOptions);
$('#pump_station').mapster(mapOptions);
var resizeTime = 0;
var resizeDelay = 0;
function resize(maxWidth, maxHeight) {
  var image = $('img'),
    imgWidth = image.width(),
    imgHeight = image.height(),
    newWidth = 0,
    newHeight = 0;

  if (imgWidth / maxWidth > imgHeight / maxHeight || imgWidth / maxWidth < imgHeight / maxHeight) {
    newWidth = maxWidth;
  } else {
    newHeight = maxHeight;
  }
  image.mapster('resize', newWidth, newHeight, resizeTime);
}

// Track window resizing events, but only actually call the map resize when the
// window isn't being resized any more

function onWindowResize() {
  var curWidth = $('.map_container').width(),
    curHeight = $('.map_container').height(),
    checking = false;
  if (checking) return;
  checking = true;
  window.setTimeout(function() {
    var newWidth = $('.map_container').width(),
      newHeight = $('.map_container').height();
    if (newWidth === curWidth &&
      newHeight === curHeight) {
      resize(newWidth, newHeight);
    }
    checking = false;
  }, resizeDelay);
}
$(window).bind('resize', onWindowResize);

// Handle image toggle when user clicks on image map
window.toggleView = function(view) {
  if ($(view).hasClass('hide')) {
    $('.map_area').fadeToggle(300, 'linear', function() {
      $(view).toggleClass('hide');
    });
  } else {
    $(view).toggleClass('hide');
    $('.map_area').fadeToggle(300, 'linear');
  }

  removeBlur();
  onWindowResize();
}

// cabinet
var v = document.getElementsByTagName("video")[1];
// fan
var v2 = document.getElementsByTagName("video")[2];
// generator
var v3 = document.getElementsByTagName("video")[3];

// console.log(document.getElementsByTagName("video"));

// Autoplay video when modal is opened
$('#cabinetModal').on('shown.bs.modal', function () {
  v.play();
  // Pause video when animation ends
  v.addEventListener("ended", function() {
      // Toggle hidden status after video plays
      $('.cabinet').addClass('hide');
      $('.cabinet_inside').removeClass('hide');
  });
});
$('#cabinetModal').on('hidden.bs.modal', function () {
  v.currentTime = 0;
  $('.cabinet').toggleClass('hide');
  $('.cabinet_inside').toggleClass('hide');
});
// Clean this up later
$('#generatorModal').on('shown.bs.modal', function () {
  v3.play();
});
$('#cabinetModal').on('hidden.bs.modal', function () {
  v.currentTime = 0;
});
$('#fanModal').on('shown.bs.modal', function () {
  v2.play();
  v2.addEventListener("ended", function() {
      // Toggle hidden status after video plays
      $('.fan-content').removeClass('hide');
  });
});
$('#fanModal').on('hidden.bs.modal', function () {
  v2.currentTime = 0;
  $('.fan-content').toggleClass('hide');
});

window.applyBlur = function() {
  $('img[src$="_map.jpg"]').css({'filter': 'blur(3px)',
    'transition': 'all 0.4s ease'
  });
}
window.removeBlur = function() {
  $('img[src$="_map.jpg"]').css('filter', '');
}

// When modal closes, scroll to top of screen
$(window).on('hidden.bs.modal', function (e) {
  window.scrollTo(0,0);
})


// lock phones in landscape mode
// var start = function() {
//   screen.orientation.lock('landscape-primary').then(
//     startInternal,
//     function() {
//       alert('To start, rotate your screen to landscape.');
//
//       var orientationChangeHandler = function() {
//         if (!screen.orientation.type.startsWith('landscape')) {
//           return;
//         }
//         screen.orientation.removeEventListener('change', orientationChangeHandler);
//         startInternal();
//       }
//
//       screen.orientation.addEventListener('change', orientationChangeHandler);
//     });
// }
// window.onload = start;


/***/ })
/******/ ]);