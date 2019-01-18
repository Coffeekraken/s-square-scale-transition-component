import "babel-polyfill"
import "coffeekraken-sugar/js/features/all"
import SSquareScaleTransitionComponent from "../../../dist/index"
import scrollTop from "coffeekraken-sugar/js/dom/scrollTop"
import scrollLeft from "coffeekraken-sugar/js/dom/scrollLeft"
import offset from "coffeekraken-sugar/js/dom/offset"

const $transitionStandard = document.querySelector(
  "s-square-scale-transition[standard]"
)
Array.from(document.querySelectorAll("a[standard]"), $a => {
  $a.addEventListener("click", e => {
    e.preventDefault()
    $transitionStandard.animateIn(e.target).then(() => {
      console.log("in finished")
      setTimeout(() => {
        $transitionStandard.animateOut(e.target).then(() => {
          console.log("out finished")
        })
      }, 2000)
    })
  })
})

const $transitionAdvanced = document.querySelector(
  "s-square-scale-transition[advanced]"
)
$transitionAdvanced.setProps({
  animateStyle: (phase, $source, data) => {
    switch (phase) {
      case "in:0":
        return {
          top: `${data.clientY}px`,
          left: `${data.clientX}px`,
          width: 0,
          height: 0
        }
      case "in:1":
        const sourcePos = offset($source)
        return {
          top: `${sourcePos.top - scrollTop()}px`,
          left: `${sourcePos.left - scrollLeft()}px`,
          width: `${$source.offsetWidth}px`,
          height: `${$source.offsetHeight}px`
        }
      case "in:2":
        return {
          top: "10vh",
          left: "10vw",
          height: "80vh",
          width: "80vw"
        }
      default:
    }
  }
})
Array.from(document.querySelectorAll("a[advanced]"), $a => {
  $a.addEventListener("click", e => {
    e.preventDefault()
    $transitionAdvanced.animateIn(e.target, e).then(() => {
      console.log("in finished")
      setTimeout(() => {
        $transitionAdvanced.animateOut(e.target).then(() => {
          console.log("out finished")
        })
      }, 2000)
    })
  })
})
