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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// project setup 
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d'); // context
// set canvas width and heigh to window width and height

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var num_obstacles = 40;
var gravity = 0.5;
var players = [];
var platforms = [];

function generateRandom() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  // find diff
  var difference = max - min; // generate random number 

  var rand = Math.random(); // multiply with difference 

  rand = Math.floor(rand * difference); // add with min value 

  rand = rand + min;
  return rand;
}

var Platform = /*#__PURE__*/function () {
  function Platform(x, y, width, height) {
    _classCallCheck(this, Platform);

    this.position = {
      x: x,
      y: y
    };
    this.width = width;
    this.height = height;
  }

  _createClass(Platform, [{
    key: "draw",
    value: function draw() {
      // select and fill the context (canvas) with a square
      c.fillStyle = 'black';
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }]);

  return Platform;
}();

var player = /*#__PURE__*/function () {
  function player(skin, l, u, r, d) {
    _classCallCheck(this, player);

    this.skin = skin;
    this.pos = "up";
    this.position = {
      // default position
      x: 20,
      y: innerHeight / 2
    };
    this.width = 50;
    this.height = 25;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.jumps = 0;
    this.l = l;
    this.u = u;
    this.r = r;
    this.d = d;
    this.keys = {
      right: {
        pressed: false
      },
      left: {
        pressed: false
      }
    };
  }

  _createClass(player, [{
    key: "draw",
    value: function draw() {
      // select and fill the context (canvas) with a square
      c.fillStyle = this.skin;
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();

      if (this.pos == "down") {
        this.height = 25;
        this.position.y += 25;
      } else {
        this.height = 50;
      } // moving on Y axis


      this.position.y += this.velocity.y; // add velocity to position

      if (this.position.y + this.height + this.velocity.y <= canvas.height) {
        this.velocity.y += gravity;
      } else {
        this.velocity.y = 0;
        this.position.y = canvas.height - this.height;
        this.jumps = 0;
      } // moving on x axis


      this.position.x += this.velocity.x; // add velocity to position
    }
  }, {
    key: "isColliding_y",
    value: function isColliding_y() {
      var n = 0;

      while (n < platforms.length) {
        if (this.position.y + this.height <= platforms[n].position.y && this.position.y + this.height + this.velocity.y >= platforms[n].position.y && this.position.x + this.width >= platforms[n].position.x && this.position.x <= platforms[n].position.x + platforms[n].width) {
          this.jumps = 0;
          return true;
        }

        n += 1;
      }

      return false;
    }
  }]);

  return player;
}(); // inizialize the player


var player1 = new player('orange', 37, 38, 39, 40);
var player2 = new player('red', 65, 87, 68, 83);
players.push(player1);
players.push(player2);
player1.draw();
var scrollerOffest = 0;
var platform_gen_count = 0; //animate it 

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var _i = 0, _players = players; _i < _players.length; _i++) {
    player = _players[_i];
    player.update();

    if (player.keys.right.pressed && player.position.x < 400) {
      player.velocity.x = 5;
    } else if (player.keys.left.pressed && player.position.x > 100) {
      player.velocity.x = -5;
    } else {
      player.velocity.x = 0;

      if (player.keys.right.pressed) {
        scrollerOffest += 5;
        platforms.forEach(function (platform) {
          platform.position.x -= 5;
        });
      } else if (player.keys.left.pressed) {
        scrollerOffest -= 5;
        platforms.forEach(function (platform) {
          platform.position.x += 5;
        });
      }
    }

    if (player.isColliding_y()) {
      player.velocity.y = 0;
    }

    if (scrollerOffest >= platform_gen_count * canvas.width / 8) {
      for (var i = 0; i < num_obstacles; i++) {
        platforms.push(new Platform(generateRandom(canvas.width * platform_gen_count, canvas.width * platform_gen_count + canvas.width), generateRandom(0, canvas.height), generateRandom(100, 300), generateRandom(20, 40)));
      }

      platform_gen_count += 1;
    }
  }

  platforms.forEach(function (platform) {
    platform.draw();
  });
}

animate(); // Event listeners

window.addEventListener('keydown', function (_ref) {
  var keyCode = _ref.keyCode;

  var _iterator = _createForOfIteratorHelper(players),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      player = _step.value;

      switch (keyCode) {
        // jump
        case player.u:
          if (player.velocity.y <= 10 && player.jumps < 2) {
            player.velocity.y -= 12;
            player.jumps += 1;
          }

          break;
        //down

        case player.d:
          player.pos = "down";
          break;
        //left

        case player.l:
          player.keys.left.pressed = true;
          break;
        //right

        case player.r:
          player.keys.right.pressed = true;
          break;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
});
window.addEventListener('keyup', function (_ref2) {
  var keyCode = _ref2.keyCode;

  var _iterator2 = _createForOfIteratorHelper(players),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      player = _step2.value;

      switch (keyCode) {
        //down
        case player.d:
          player.pos = "up";
          break;
        //left

        case player.l:
          player.keys.left.pressed = false;
          break;
        //right

        case player.r:
          player.keys.right.pressed = false;
          break;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
});

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map