import SWebComponent from "coffeekraken-sugar/js/core/SWebComponent"
import offset from 'coffeekraken-sugar/js/dom/offset'
import scrollTop from 'coffeekraken-sugar/js/dom/scrollTop'
import scrollLeft from 'coffeekraken-sugar/js/dom/scrollLeft'
import getTransitionProperties from 'coffeekraken-sugar/js/dom/getTransitionProperties'
import getAnimationProperties from 'coffeekraken-sugar/js/dom/getAnimationProperties'

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
      hideAtEnd: false

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
   * @return    {Promise}    A promise that will be resolved when the transition in is finished
   */
  animateIn($source) {
    return new Promise((resolve) => {
      // get the position of the source
      const sourcePos = offset($source)
      const sourceX = sourcePos.left - scrollLeft()
      const sourceY = sourcePos.top - scrollTop()
      const sourceWidth = $source.offsetWidth
      const sourceHeight = $source.offsetHeight

      // remove the "still-frame" class
      this.classList.remove('still-frame')

      // set the initial state of the transition
      this.style.display = 'block'
      this.style.width = 0
      this.style.height = 0

      setTimeout(() => {

        // add the animate-in class
        this.classList.add('animate-in--phase-1')

        setTimeout(() => {

          // set the transition position and size
          this.style.top = sourceY + 'px'
          this.style.left = sourceX + 'px'
          this.style.width = sourceWidth + 'px'
          this.style.height = sourceHeight + 'px'

          // get the transition and/or animation properties
          const phase1TransitionProps = getTransitionProperties(this)
          const phase1AnimationProps = getAnimationProperties(this)

          // wait till the end of phase 1
          setTimeout(() => {

            // remove the phase 1 class and add the phase 2
            this.classList.remove('animate-in--phase-1')
            this.classList.add('animate-in--phase-2')

            // set the position and the size
            this.style.top = 0
            this.style.left = 0
            this.style.width = '100vw'
            this.style.height = '100vh'

            // get the transition and/or animation properties
            const phase2TransitionProps = getTransitionProperties(this)
            const phase2AnimationProps = getAnimationProperties(this)

            // wait till the end of phase 2
            setTimeout(() => {

              // resolve the promise
              resolve(this)

              // remove the phase 2 class
              this.classList.remove('animate-in--phase-2')

              // add the "still-frame" class
              this.classList.add('still-frame')

              // hide the transition
              if (this.props.hideAtEnd) this.style.display = 'none'

            }, phase2TransitionProps.totalDuration || phase2AnimationProps.totalDuration)
          }, phase1TransitionProps.totalDuration || phase1AnimationProps.totalDuration)
        })
      })
    })
  }

  /**
   * Animate out
   * @param    {HTMLElement}    $source    The source HTMLElement to where the scale will happen
   * @return    {Promise}    A promise that will be resolved when the transition out is finished
   */
  animateOut($dest) {
    return new Promise((resolve) => {
      // get the position of the source
      const destPos = offset($dest)
      const destX = destPos.left - scrollLeft()
      const destY = destPos.top - scrollTop()
      const destWidth = $dest.offsetWidth
      const destHeight = $dest.offsetHeight

      // remove the "still-frame" class
      this.classList.remove('still-frame')

      // set the initial state of the transition
      this.style.display = 'block'
      this.style.width = '100vw'
      this.style.height = '100vh'
      this.style.top = 0
      this.style.left = 0

      setTimeout(() => {

        // add the animate-out class
        this.classList.add('animate-out--phase-1')

        setTimeout(() => {

          // set the transition position and size
          this.style.top = destY + 'px'
          this.style.left = destX + 'px'
          this.style.width = destWidth + 'px'
          this.style.height = destHeight + 'px'

          // get the transition and/or animation properties
          const phase1TransitionProps = getTransitionProperties(this)
          const phase1AnimationProps = getAnimationProperties(this)

          // wait till the end of phase 1
          setTimeout(() => {

            // remove the phase 1 class and add the phase 2
            this.classList.remove('animate-out--phase-1')
            this.classList.add('animate-out--phase-2')

            // set the transition position and size
            this.style.width = 0
            this.style.height = 0

            // get the transition and/or animation properties
            const phase2TransitionProps = getTransitionProperties(this)
            const phase2AnimationProps = getAnimationProperties(this)

            // wait till the end of phase 2
            setTimeout(() => {

              // resolve the promise
              resolve(this)

              // remove the phase 2 class
              this.classList.remove('animate-out--phase-2')

              // hide the transition
              if (this.props.hideAtEnd) this.style.display = 'none'

            }, phase2TransitionProps.totalDuration || phase2AnimationProps.totalDuration)
          }, phase1TransitionProps.totalDuration || phase1AnimationProps.totalDuration)
        })
      })
    })
  }
}
