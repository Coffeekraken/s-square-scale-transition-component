"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SWebComponent2 = _interopRequireDefault(require("coffeekraken-sugar/js/core/SWebComponent"));

var _offset = _interopRequireDefault(require("coffeekraken-sugar/js/dom/offset"));

var _scrollTop = _interopRequireDefault(require("coffeekraken-sugar/js/dom/scrollTop"));

var _scrollLeft = _interopRequireDefault(require("coffeekraken-sugar/js/dom/scrollLeft"));

var _getTransitionProperties = _interopRequireDefault(require("coffeekraken-sugar/js/dom/getTransitionProperties"));

var _getAnimationProperties = _interopRequireDefault(require("coffeekraken-sugar/js/dom/getAnimationProperties"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Component =
/*#__PURE__*/
function (_SWebComponent) {
  _inherits(Component, _SWebComponent);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, _getPrototypeOf(Component).apply(this, arguments));
  }

  _createClass(Component, [{
    key: "componentWillMount",

    /**
     * Component will mount
     * @definition    SWebComponent.componentWillMount
     * @protected
     */
    value: function componentWillMount() {
      _get(_getPrototypeOf(Component.prototype), "componentWillMount", this).call(this);
    }
    /**
     * Mount component
     * @definition    SWebComponent.componentMount
     * @protected
     */

  }, {
    key: "componentMount",
    value: function componentMount() {
      _get(_getPrototypeOf(Component.prototype), "componentMount", this).call(this);
    }
    /**
     * Component unmount
     * @definition    SWebComponent.componentUnmount
     * @protected
     */

  }, {
    key: "componentUnmount",
    value: function componentUnmount() {
      _get(_getPrototypeOf(Component.prototype), "componentUnmount", this).call(this);
    }
    /**
     * Component will receive prop
     * @definition    SWebComponent.componentWillReceiveProp
     * @protected
     */

  }, {
    key: "componentWillReceiveProp",
    value: function componentWillReceiveProp(name, newVal, oldVal) {
      _get(_getPrototypeOf(Component.prototype), "componentWillReceiveProp", this).call(this, name, newVal, oldVal);
    }
    /**
     * Animate in
     * @param    {HTMLElement}    $source    The source HTMLElement from where the scale will happen
     * @return    {Promise}    A promise that will be resolved when the transition in is finished
     */

  }, {
    key: "animateIn",
    value: function animateIn($source) {
      var _this = this;

      return new Promise(function (resolve) {
        // get the position of the source
        var sourcePos = (0, _offset.default)($source);
        var sourceX = sourcePos.left - (0, _scrollLeft.default)();
        var sourceY = sourcePos.top - (0, _scrollTop.default)();
        var sourceWidth = $source.offsetWidth;
        var sourceHeight = $source.offsetHeight; // remove the "still-frame" class

        _this.classList.remove('still-frame'); // set the initial state of the transition


        _this.style.display = 'block';
        _this.style.width = 0;
        _this.style.height = 0;
        setTimeout(function () {
          // add the animate-in class
          _this.classList.add('animate-in--phase-1');

          setTimeout(function () {
            // set the transition position and size
            _this.style.top = sourceY + 'px';
            _this.style.left = sourceX + 'px';
            _this.style.width = sourceWidth + 'px';
            _this.style.height = sourceHeight + 'px'; // get the transition and/or animation properties

            var phase1TransitionProps = (0, _getTransitionProperties.default)(_this);
            var phase1AnimationProps = (0, _getAnimationProperties.default)(_this); // wait till the end of phase 1

            setTimeout(function () {
              // remove the phase 1 class and add the phase 2
              _this.classList.remove('animate-in--phase-1');

              _this.classList.add('animate-in--phase-2'); // set the position and the size


              _this.style.top = 0;
              _this.style.left = 0;
              _this.style.width = '100vw';
              _this.style.height = '100vh'; // get the transition and/or animation properties

              var phase2TransitionProps = (0, _getTransitionProperties.default)(_this);
              var phase2AnimationProps = (0, _getAnimationProperties.default)(_this); // wait till the end of phase 2

              setTimeout(function () {
                // resolve the promise
                resolve(_this); // remove the phase 2 class

                _this.classList.remove('animate-in--phase-2'); // add the "still-frame" class


                _this.classList.add('still-frame'); // hide the transition


                if (_this.props.hideAtEnd) _this.style.display = 'none';
              }, phase2TransitionProps.totalDuration || phase2AnimationProps.totalDuration);
            }, phase1TransitionProps.totalDuration || phase1AnimationProps.totalDuration);
          });
        });
      });
    }
    /**
     * Animate out
     * @param    {HTMLElement}    $source    The source HTMLElement to where the scale will happen
     * @return    {Promise}    A promise that will be resolved when the transition out is finished
     */

  }, {
    key: "animateOut",
    value: function animateOut($dest) {
      var _this2 = this;

      return new Promise(function (resolve) {
        // get the position of the source
        var destPos = (0, _offset.default)($dest);
        var destX = destPos.left - (0, _scrollLeft.default)();
        var destY = destPos.top - (0, _scrollTop.default)();
        var destWidth = $dest.offsetWidth;
        var destHeight = $dest.offsetHeight; // remove the "still-frame" class

        _this2.classList.remove('still-frame'); // set the initial state of the transition


        _this2.style.display = 'block';
        _this2.style.width = '100vw';
        _this2.style.height = '100vh';
        _this2.style.top = 0;
        _this2.style.left = 0;
        setTimeout(function () {
          // add the animate-out class
          _this2.classList.add('animate-out--phase-1');

          setTimeout(function () {
            // set the transition position and size
            _this2.style.top = destY + 'px';
            _this2.style.left = destX + 'px';
            _this2.style.width = destWidth + 'px';
            _this2.style.height = destHeight + 'px'; // get the transition and/or animation properties

            var phase1TransitionProps = (0, _getTransitionProperties.default)(_this2);
            var phase1AnimationProps = (0, _getAnimationProperties.default)(_this2); // wait till the end of phase 1

            setTimeout(function () {
              // remove the phase 1 class and add the phase 2
              _this2.classList.remove('animate-out--phase-1');

              _this2.classList.add('animate-out--phase-2'); // set the transition position and size


              _this2.style.width = 0;
              _this2.style.height = 0; // get the transition and/or animation properties

              var phase2TransitionProps = (0, _getTransitionProperties.default)(_this2);
              var phase2AnimationProps = (0, _getAnimationProperties.default)(_this2); // wait till the end of phase 2

              setTimeout(function () {
                // resolve the promise
                resolve(_this2); // remove the phase 2 class

                _this2.classList.remove('animate-out--phase-2'); // hide the transition


                if (_this2.props.hideAtEnd) _this2.style.display = 'none';
              }, phase2TransitionProps.totalDuration || phase2AnimationProps.totalDuration);
            }, phase1TransitionProps.totalDuration || phase1AnimationProps.totalDuration);
          });
        });
      });
    }
  }], [{
    key: "defaultCss",

    /**
     * Css
     * @protected
     */
    value: function defaultCss(componentName, componentNameDash) {
      return "\n      ".concat(componentNameDash, " {\n        display: block;\n        position: fixed;\n        top: 0; left: 0;\n        width: 0; height: 0;\n      }\n    ");
    }
  }, {
    key: "defaultProps",

    /**
     * Default props
     * @definition    SWebComponent.defaultProps
     * @protected
     */
    get: function get() {
      return {
        /**
         * Specify if want the transition element to be hided at the end of the transition
         * @prop
         * @type    {Boolean}
         */
        hideAtEnd: false
      };
    }
    /**
     * Physical props
     * @definition    SWebComponent.physicalProps
     * @protected
     */

  }, {
    key: "physicalProps",
    get: function get() {
      return [];
    }
  }]);

  return Component;
}(_SWebComponent2.default);

exports.default = Component;