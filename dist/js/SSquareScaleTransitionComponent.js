"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true
})
exports.default = void 0

var _SWebComponent2 = _interopRequireDefault(
  require("coffeekraken-sugar/js/core/SWebComponent")
)

var _offset = _interopRequireDefault(
  require("coffeekraken-sugar/js/dom/offset")
)

var _scrollTop = _interopRequireDefault(
  require("coffeekraken-sugar/js/dom/scrollTop")
)

var _scrollLeft = _interopRequireDefault(
  require("coffeekraken-sugar/js/dom/scrollLeft")
)

var _getTransmationDuration = _interopRequireDefault(
  require("coffeekraken-sugar/js/dom/getTransmationDuration")
)

var _style = _interopRequireDefault(require("coffeekraken-sugar/js/dom/style"))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj
    }
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj
    }
  }
  return _typeof(obj)
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ("value" in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call
  }
  return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return self
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property)
      if (!base) return
      var desc = Object.getOwnPropertyDescriptor(base, property)
      if (desc.get) {
        return desc.get.call(receiver)
      }
      return desc.value
    }
  }
  return _get(target, property, receiver || target)
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object)
    if (object === null) break
  }
  return object
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function")
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf(o, p)
}

/**
 * @name    SSquareScaleTransitionComponent
 * Nice little webcomponent to create fully customizable square scale transition from an HTMLElement to the entire screen and vice-versa.
 *
 * example    html
 * <s-square-scale-transition></s-square-scale-transition>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var Component =
  /*#__PURE__*/
  (function(_SWebComponent) {
    _inherits(Component, _SWebComponent)

    function Component() {
      _classCallCheck(this, Component)

      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(Component).apply(this, arguments)
      )
    }

    _createClass(
      Component,
      [
        {
          key: "componentWillMount",

          /**
           * Component will mount
           * @definition    SWebComponent.componentWillMount
           * @protected
           */
          value: function componentWillMount() {
            _get(
              _getPrototypeOf(Component.prototype),
              "componentWillMount",
              this
            ).call(this)
          }
          /**
           * Mount component
           * @definition    SWebComponent.componentMount
           * @protected
           */
        },
        {
          key: "componentMount",
          value: function componentMount() {
            _get(
              _getPrototypeOf(Component.prototype),
              "componentMount",
              this
            ).call(this)
          }
          /**
           * Component unmount
           * @definition    SWebComponent.componentUnmount
           * @protected
           */
        },
        {
          key: "componentUnmount",
          value: function componentUnmount() {
            _get(
              _getPrototypeOf(Component.prototype),
              "componentUnmount",
              this
            ).call(this)
          }
          /**
           * Component will receive prop
           * @definition    SWebComponent.componentWillReceiveProp
           * @protected
           */
        },
        {
          key: "componentWillReceiveProp",
          value: function componentWillReceiveProp(name, newVal, oldVal) {
            _get(
              _getPrototypeOf(Component.prototype),
              "componentWillReceiveProp",
              this
            ).call(this, name, newVal, oldVal)
          }
          /**
           * Animate in
           * @param    {HTMLElement}    $source    The source HTMLElement from where the scale will happen
           * @param    {Mixed}    [data=null]    Some data to pass to the animateInPhase1, animateInPhase1Style, etc... function
           * @return    {Promise}    A promise that will be resolved when the transition in is finished
           */
        },
        {
          key: "animateIn",
          value: function animateIn($source) {
            var _this = this

            var data =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : null
            return new Promise(function(resolve) {
              // remove the "still-frame" class
              _this.classList.remove("still-frame") // add the "s-square-scale-transition" class from the body

              document.body.classList.add(_this.componentNameDash) // set the initial state of the transition

              _this.style.display = "block"

              var stl = _this.props.animateStyle.call(
                _this,
                "in:0",
                $source,
                data
              )

              if (stl) {
                ;(0, _style.default)(_this, stl)
              } else {
                // get the position of the source
                var sourcePos = (0, _offset.default)($source)
                var sourceX = sourcePos.left - (0, _scrollLeft.default)()
                var sourceY = sourcePos.top - (0, _scrollTop.default)() // apply the initial state

                _this.style.width = 0
                _this.style.height = 0
                _this.style.top = "".concat(sourceY, "px")
                _this.style.left = "".concat(sourceX, "px")
              }

              setTimeout(function() {
                // add the animate-in class
                _this.classList.add("animate-in--phase-1")

                setTimeout(function() {
                  var animateInPhase1Promise = _this.props.animate(
                    "in:1",
                    $source,
                    data
                  )

                  if (!animateInPhase1Promise) {
                    animateInPhase1Promise = _this._animateInPhase1(
                      "in:1",
                      $source,
                      data
                    )
                  }

                  animateInPhase1Promise.then(function() {
                    // remove the phase 1 class and add the phase 2
                    _this.classList.remove("animate-in--phase-1")

                    _this.classList.add("animate-in--phase-2")

                    var animateInPhase2Promise = _this.props.animate(
                      "in:2",
                      $source,
                      data
                    )

                    if (!animateInPhase2Promise) {
                      animateInPhase2Promise = _this._animateInPhase2(
                        "in:2",
                        $source,
                        data
                      )
                    }

                    animateInPhase2Promise.then(function() {
                      // resolve the promise
                      resolve(_this) // remove the phase 2 class

                      _this.classList.remove("animate-in--phase-2") // add the "still-frame" class

                      _this.classList.add("still-frame") // hide the transition

                      if (_this.props.hideAtEnd) {
                        _this.style.display = "none" // remove the "s-square-scale-transition" class from the body

                        document.body.classList.remove(_this.componentNameDash)
                      }
                    })
                  })
                }, 20)
              }, 20)
            })
          }
          /**
           * Animate in phase 1
           * @param    {String}    phase    The current phase to animate
           * @param    {HTMLElement}    $source    The source element from where to animate the transition
           * @param    {Mixed}    [data=null]    Some data passed to the animateIn function
           * @return    {Promise}    A promise that will be resolved at the end of the phase
           */
        },
        {
          key: "_animateInPhase1",
          value: function _animateInPhase1(phase, $source) {
            var _this2 = this

            var data =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : null
            return new Promise(function(resolve) {
              var stl = _this2.props.animateStyle.call(
                _this2,
                "in:1",
                $source,
                data
              )

              if (stl) {
                ;(0, _style.default)(_this2, stl)
              } else {
                // set the source size
                var sourceWidth = $source.offsetWidth
                var sourceHeight = $source.offsetHeight // set the transition size

                _this2.style.width = "".concat(sourceWidth, "px")
                _this2.style.height = "".concat(sourceHeight, "px")
              } // wait till the end of phase 1

              setTimeout(function() {
                resolve(_this2)
              }, (0, _getTransmationDuration.default)(_this2))
            })
          }
          /**
           * Animate in phase 2
           * @param    {String}    phase    The current phase to animate
           * @param    {HTMLElement}    $source    The source element from where to animate the transition
           * @param    {Mixed}    [data=null]    Some data passed to the animateIn function
           * @return    {Promise}    A promise that will be resolved at the end of the phase
           */
        },
        {
          key: "_animateInPhase2",
          value: function _animateInPhase2(phase, $source) {
            var _this3 = this

            var data =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : null
            return new Promise(function(resolve) {
              // set the position and the size
              var stl = _this3.props.animateStyle.call(
                _this3,
                "in:2",
                $source,
                data
              )

              if (stl) {
                ;(0, _style.default)(_this3, stl)
              } else {
                _this3.style.top = 0
                _this3.style.left = 0
                _this3.style.width = "100vw"
                _this3.style.height = "100vh"
              } // wait till the end of phase 2

              setTimeout(function() {
                resolve(_this3)
              }, (0, _getTransmationDuration.default)(_this3))
            })
          }
          /**
           * Animate out
           * @param    {HTMLElement}    $source    The source HTMLElement to where the scale will happen
           * @param    {Mixed}    [data=null]    Some data to pass to the animateOutPhase1, animateOutPhase1Style, etc... function
           * @return    {Promise}    A promise that will be resolved when the transition out is finished
           */
        },
        {
          key: "animateOut",
          value: function animateOut($dest) {
            var _this4 = this

            var data =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : null
            return new Promise(function(resolve) {
              // remove the "still-frame" class
              _this4.classList.remove("still-frame") // add the "s-square-scale-transition" class from the body

              document.body.classList.add(_this4.componentNameDash) // set the initial state of the transition

              var stl = _this4.props.animateStyle.call(
                _this4,
                "in:2",
                $dest,
                data
              )

              if (stl) {
                ;(0, _style.default)(_this4, stl)
              } else {
                _this4.style.display = "block"
                _this4.style.width = "100vw"
                _this4.style.height = "100vh"
                _this4.style.top = 0
                _this4.style.left = 0
              }

              setTimeout(function() {
                // add the animate-out class
                _this4.classList.add("animate-out--phase-1")

                setTimeout(function() {
                  var animateOutPhase1Promise = _this4.props.animate(
                    "out:1",
                    $dest,
                    data
                  )

                  if (!animateOutPhase1Promise) {
                    animateOutPhase1Promise = _this4._animateOutPhase1(
                      "out:1",
                      $dest,
                      data
                    )
                  }

                  animateOutPhase1Promise.then(function() {
                    // remove the phase 1 class and add the phase 2
                    _this4.classList.remove("animate-out--phase-1")

                    _this4.classList.add("animate-out--phase-2")

                    var animateOutPhase2Promise = _this4.props.animate(
                      "out:2",
                      $dest,
                      data
                    )

                    if (!animateOutPhase2Promise) {
                      animateOutPhase2Promise = _this4._animateOutPhase2(
                        "out:2",
                        $dest,
                        data
                      )
                    }

                    animateOutPhase2Promise.then(function() {
                      // resolve the promise
                      resolve(_this4) // remove the phase 2 class

                      _this4.classList.remove("animate-out--phase-2") // hide the transition

                      if (_this4.props.hideAtEnd) {
                        _this4.style.display = "none"
                      } // remove the "s-square-scale-transition" class from the body

                      document.body.classList.remove(_this4.componentNameDash)
                    })
                  })
                }, 20)
              }, 20)
            })
          }
          /**
           * Animate out phase 1
           * @param    {String}    phase    The current phase to animate
           * @param    {HTMLElement}    $dest    The destination element to where animate the transition
           * @return    {Promise}    A promise that will be resolved at the end of the phase
           */
        },
        {
          key: "_animateOutPhase1",
          value: function _animateOutPhase1(phase, $dest) {
            var _this5 = this

            var data =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : null
            return new Promise(function(resolve) {
              // get the position of the source
              var destPos = (0, _offset.default)($dest)
              var destX = destPos.left - (0, _scrollLeft.default)()
              var destY = destPos.top - (0, _scrollTop.default)()
              var destWidth = $dest.offsetWidth
              var destHeight = $dest.offsetHeight // set the transition position and size

              var stl = _this5.props.animateStyle.call(
                _this5,
                "out:1",
                $dest,
                data
              )

              if (stl) {
                ;(0, _style.default)(_this5, stl)
              } else {
                _this5.style.top = "".concat(destY, "px")
                _this5.style.left = "".concat(destX, "px")
                _this5.style.width = "".concat(destWidth, "px")
                _this5.style.height = "".concat(destHeight, "px")
              } // wait till the end of phase 1

              setTimeout(function() {
                resolve(_this5)
              }, (0, _getTransmationDuration.default)(_this5))
            })
          }
          /**
           * Animate out phase 2
           * @param    {String}    phase    The current phase to animate
           * @param    {HTMLElement}    $dest    The destination element to where animate the transition
           * @return    {Promise}    A promise that will be resolved at the end of the phase
           */
        },
        {
          key: "_animateOutPhase2",
          value: function _animateOutPhase2(phase, $dest) {
            var _this6 = this

            var data =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : null
            return new Promise(function(resolve) {
              // set the transition position and size
              var stl = _this6.props.animateStyle.call(
                _this6,
                "out:2",
                $dest,
                data
              )

              if (stl) {
                ;(0, _style.default)(_this6, stl)
              } else {
                _this6.style.width = 0
                _this6.style.height = 0
              } // wait till the end of phase 2

              setTimeout(function() {
                resolve(_this6)
              }, (0, _getTransmationDuration.default)(_this6))
            })
          }
        }
      ],
      [
        {
          key: "defaultCss",

          /**
           * Css
           * @protected
           */
          value: function defaultCss(componentName, componentNameDash) {
            return "\n      "
              .concat(
                componentNameDash,
                " {\n        display: block;\n        position: fixed;\n        top: 0; left: 0;\n        width: 0; height: 0;\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".animate-in--phase-1 {\n        transition: height 0s linear 0s,\n                    width .4s cubic-bezier(1,0,0,1) 0s;\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".animate-in--phase-2 {\n        transition: top .4s cubic-bezier(1,0,0,1) 0s,\n                    height .4s cubic-bezier(1,0,0,1) 0s,\n                    left .4s cubic-bezier(1,0,0,1) .2s,\n                    width .4s cubic-bezier(1,0,0,1) .2s;\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".animate-out--phase-1 {\n        transition: top .4s cubic-bezier(1,0,0,1) .2s,\n                    height .4s cubic-bezier(1,0,0,1) .2s,\n                    left .4s cubic-bezier(1,0,0,1) 0s,\n                    width .4s cubic-bezier(1,0,0,1) 0s;\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".animate-out--phase-2 {\n        transition: height 0s linear .4s,\n                    width .4s cubic-bezier(1,0,0,1) 0s;\n      }\n    "
              )
          }
        },
        {
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
              hideAtEnd: false,

              /**
               * Specify a function that will return a style object by phase
               * @prop
               * @type    {Function}
               * @default    null
               */
              animateStyle: function animateStyle() {
                return null
              },

              /**
               * Specify a function that will return a promise by phase and do whatever yoou want
               * @prop
               * @type    {Function}
               * @default    null
               */
              animate: function animate() {
                return null
              },

              /**
               * Specify the style to apply on the animate in phase 0 (initial state)
               * @prop
               * @type    {Object}
               */
              animateInPhase0Style: null,

              /**
               * Specify the style to apply on the animate in phase 1
               * @prop
               * @type    {Object}
               */
              animateInPhase1Style: null,

              /**
               * Specify the style to apply on the animate in phase 2
               * @prop
               * @type    {Object}
               */
              animateInPhase2Style: null,

              /**
               * Specify the style to apply on the animate out phase 1
               * @prop
               * @type    {Object}
               */
              animateOutPhase1Style: null,

              /**
               * Specify the style to apply on the animate out phase 2
               * @prop
               * @type    {Object}
               */
              animateOutPhase2Style: null,

              /**
               * Specify a special animation for the animate in phase 1 if you need more control over it
               * This function need to return a promise that need to be resolved at the end of the phase
               * @prop
               * @tyoe    {Function}
               */
              animateInPhase1: null,

              /**
               * Specify a special animation for the animate in phase 2 if you need more control over it
               * This function need to return a promise that need to be resolved at the end of the phase
               * @prop
               * @type    {Function}
               */
              animateInPhase2: null,

              /**
               * Specify a special animation for the animate out phase 1 if you need more control over it
               * This function need to return a promise that need to be resolved at the end of the phase
               * @prop
               * @tyoe    {Function}
               */
              animateOutPhase1: null,

              /**
               * Specify a special animation for the animate out phase 2 if you need more control over it
               * This function need to return a promise that need to be resolved at the end of the phase
               * @prop
               * @type    {Function}
               */
              animateOutPhase2: null
            }
          }
          /**
           * Physical props
           * @definition    SWebComponent.physicalProps
           * @protected
           */
        },
        {
          key: "physicalProps",
          get: function get() {
            return []
          }
        }
      ]
    )

    return Component
  })(_SWebComponent2.default)

exports.default = Component
