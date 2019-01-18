import SWebComponent from "coffeekraken-sugar/js/core/SWebComponent"
import offset from "coffeekraken-sugar/js/dom/offset"
import scrollTop from "coffeekraken-sugar/js/dom/scrollTop"
import scrollLeft from "coffeekraken-sugar/js/dom/scrollLeft"
import getTransmationDuration from "coffeekraken-sugar/js/dom/getTransmationDuration"
import style from "coffeekraken-sugar/js/dom/style"

/**
 * @name    SSquareScaleTransitionComponent
 * Nice little webcomponent to create fully customizable square scale transition from an HTMLElement to the entire screen and vice-versa.
 *
 * example    html
 * <s-square-scale-transition></s-square-scale-transition>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class Component extends SWebComponent {
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps() {
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
      animateStyle: () => null,

      /**
       * Specify a function that will return a promise by phase and do whatever yoou want
       * @prop
       * @type    {Function}
       * @default    null
       */
      animate: () => null,

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
  static get physicalProps() {
    return []
  }

  /**
   * Css
   * @protected
   */
  static defaultCss(componentName, componentNameDash) {
    return `
      ${componentNameDash} {
        display: block;
        position: fixed;
        top: 0; left: 0;
        width: 0; height: 0;
      }
      ${componentNameDash}.animate-in--phase-1 {
        transition: height 0s linear 0s,
                    width .4s cubic-bezier(1,0,0,1) 0s;
      }
      ${componentNameDash}.animate-in--phase-2 {
        transition: top .4s cubic-bezier(1,0,0,1) 0s,
                    height .4s cubic-bezier(1,0,0,1) 0s,
                    left .4s cubic-bezier(1,0,0,1) .2s,
                    width .4s cubic-bezier(1,0,0,1) .2s;
      }
      ${componentNameDash}.animate-out--phase-1 {
        transition: top .4s cubic-bezier(1,0,0,1) .2s,
                    height .4s cubic-bezier(1,0,0,1) .2s,
                    left .4s cubic-bezier(1,0,0,1) 0s,
                    width .4s cubic-bezier(1,0,0,1) 0s;
      }
      ${componentNameDash}.animate-out--phase-2 {
        transition: height 0s linear .4s,
                    width .4s cubic-bezier(1,0,0,1) 0s;
      }
    `
  }

  /**
   * Component will mount
   * @definition    SWebComponent.componentWillMount
   * @protected
   */
  componentWillMount() {
    super.componentWillMount()
  }

  /**
   * Mount component
   * @definition    SWebComponent.componentMount
   * @protected
   */
  componentMount() {
    super.componentMount()
  }

  /**
   * Component unmount
   * @definition    SWebComponent.componentUnmount
   * @protected
   */
  componentUnmount() {
    super.componentUnmount()
  }

  /**
   * Component will receive prop
   * @definition    SWebComponent.componentWillReceiveProp
   * @protected
   */
  componentWillReceiveProp(name, newVal, oldVal) {
    super.componentWillReceiveProp(name, newVal, oldVal)
  }

  /**
   * Animate in
   * @param    {HTMLElement}    $source    The source HTMLElement from where the scale will happen
   * @param    {Mixed}    [data=null]    Some data to pass to the animateInPhase1, animateInPhase1Style, etc... function
   * @return    {Promise}    A promise that will be resolved when the transition in is finished
   */
  animateIn($source, data = null) {
    return new Promise(resolve => {
      // remove the "still-frame" class
      this.classList.remove("still-frame")

      // add the "s-square-scale-transition" class from the body
      document.body.classList.add(this.componentNameDash)

      // set the initial state of the transition
      this.style.display = "block"
      const stl = this.props.animateStyle.call(this, "in:0", $source, data)
      if (stl) {
        style(this, stl)
      } else {
        // get the position of the source
        const sourcePos = offset($source)
        const sourceX = sourcePos.left - scrollLeft()
        const sourceY = sourcePos.top - scrollTop()
        // apply the initial state
        this.style.width = 0
        this.style.height = 0
        this.style.top = `${sourceY}px`
        this.style.left = `${sourceX}px`
      }

      setTimeout(() => {
        // add the animate-in class
        this.classList.add("animate-in--phase-1")

        setTimeout(() => {
          let animateInPhase1Promise = this.props.animate("in:1", $source, data)
          if (!animateInPhase1Promise) {
            animateInPhase1Promise = this._animateInPhase1(
              "in:1",
              $source,
              data
            )
          }
          animateInPhase1Promise.then(() => {
            // remove the phase 1 class and add the phase 2
            this.classList.remove("animate-in--phase-1")
            this.classList.add("animate-in--phase-2")

            let animateInPhase2Promise = this.props.animate(
              "in:2",
              $source,
              data
            )
            if (!animateInPhase2Promise) {
              animateInPhase2Promise = this._animateInPhase2(
                "in:2",
                $source,
                data
              )
            }
            animateInPhase2Promise.then(() => {
              // resolve the promise
              resolve(this)

              // remove the phase 2 class
              this.classList.remove("animate-in--phase-2")

              // add the "still-frame" class
              this.classList.add("still-frame")

              // hide the transition
              if (this.props.hideAtEnd) {
                this.style.display = "none"
                // remove the "s-square-scale-transition" class from the body
                document.body.classList.remove(this.componentNameDash)
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
  _animateInPhase1(phase, $source, data = null) {
    return new Promise(resolve => {
      const stl = this.props.animateStyle.call(this, "in:1", $source, data)
      if (stl) {
        style(this, stl)
      } else {
        // set the source size
        const sourceWidth = $source.offsetWidth
        const sourceHeight = $source.offsetHeight
        // set the transition size
        this.style.width = `${sourceWidth}px`
        this.style.height = `${sourceHeight}px`
      }

      // wait till the end of phase 1
      setTimeout(() => {
        resolve(this)
      }, getTransmationDuration(this))
    })
  }

  /**
   * Animate in phase 2
   * @param    {String}    phase    The current phase to animate
   * @param    {HTMLElement}    $source    The source element from where to animate the transition
   * @param    {Mixed}    [data=null]    Some data passed to the animateIn function
   * @return    {Promise}    A promise that will be resolved at the end of the phase
   */
  _animateInPhase2(phase, $source, data = null) {
    return new Promise(resolve => {
      // set the position and the size
      const stl = this.props.animateStyle.call(this, "in:2", $source, data)
      if (stl) {
        style(this, stl)
      } else {
        this.style.top = 0
        this.style.left = 0
        this.style.width = "100vw"
        this.style.height = "100vh"
      }

      // wait till the end of phase 2
      setTimeout(() => {
        resolve(this)
      }, getTransmationDuration(this))
    })
  }

  /**
   * Animate out
   * @param    {HTMLElement}    $source    The source HTMLElement to where the scale will happen
   * @param    {Mixed}    [data=null]    Some data to pass to the animateOutPhase1, animateOutPhase1Style, etc... function
   * @return    {Promise}    A promise that will be resolved when the transition out is finished
   */
  animateOut($dest, data = null) {
    return new Promise(resolve => {
      // remove the "still-frame" class
      this.classList.remove("still-frame")

      // add the "s-square-scale-transition" class from the body
      document.body.classList.add(this.componentNameDash)

      // set the initial state of the transition
      const stl = this.props.animateStyle.call(this, "in:2", $dest, data)
      if (stl) {
        style(this, stl)
      } else {
        this.style.display = "block"
        this.style.width = "100vw"
        this.style.height = "100vh"
        this.style.top = 0
        this.style.left = 0
      }

      setTimeout(() => {
        // add the animate-out class
        this.classList.add("animate-out--phase-1")

        setTimeout(() => {
          let animateOutPhase1Promise = this.props.animate("out:1", $dest, data)
          if (!animateOutPhase1Promise) {
            animateOutPhase1Promise = this._animateOutPhase1(
              "out:1",
              $dest,
              data
            )
          }
          animateOutPhase1Promise.then(() => {
            // remove the phase 1 class and add the phase 2
            this.classList.remove("animate-out--phase-1")
            this.classList.add("animate-out--phase-2")

            let animateOutPhase2Promise = this.props.animate(
              "out:2",
              $dest,
              data
            )
            if (!animateOutPhase2Promise) {
              animateOutPhase2Promise = this._animateOutPhase2(
                "out:2",
                $dest,
                data
              )
            }
            animateOutPhase2Promise.then(() => {
              // resolve the promise
              resolve(this)

              // remove the phase 2 class
              this.classList.remove("animate-out--phase-2")

              // hide the transition
              if (this.props.hideAtEnd) {
                this.style.display = "none"
              }

              // remove the "s-square-scale-transition" class from the body
              document.body.classList.remove(this.componentNameDash)
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
  _animateOutPhase1(phase, $dest, data = null) {
    return new Promise(resolve => {
      // get the position of the source
      const destPos = offset($dest)
      const destX = destPos.left - scrollLeft()
      const destY = destPos.top - scrollTop()
      const destWidth = $dest.offsetWidth
      const destHeight = $dest.offsetHeight

      // set the transition position and size
      const stl = this.props.animateStyle.call(this, "out:1", $dest, data)
      if (stl) {
        style(this, stl)
      } else {
        this.style.top = `${destY}px`
        this.style.left = `${destX}px`
        this.style.width = `${destWidth}px`
        this.style.height = `${destHeight}px`
      }

      // wait till the end of phase 1
      setTimeout(() => {
        resolve(this)
      }, getTransmationDuration(this))
    })
  }

  /**
   * Animate out phase 2
   * @param    {String}    phase    The current phase to animate
   * @param    {HTMLElement}    $dest    The destination element to where animate the transition
   * @return    {Promise}    A promise that will be resolved at the end of the phase
   */
  _animateOutPhase2(phase, $dest, data = null) {
    return new Promise(resolve => {
      // set the transition position and size
      const stl = this.props.animateStyle.call(this, "out:2", $dest, data)
      if (stl) {
        style(this, stl)
      } else {
        this.style.width = 0
        this.style.height = 0
      }

      // wait till the end of phase 2
      setTimeout(() => {
        resolve(this)
      }, getTransmationDuration(this))
    })
  }
}
