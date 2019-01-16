import "babel-polyfill"
import "coffeekraken-sugar/js/features/all"
import SSquareScaleTransitionComponent from "../../../dist/index"

const $transition = document.querySelector('s-square-scale-transition')
Array.from(document.querySelectorAll('a'), ($a) => {
  $a.addEventListener('click', (e) => {
    e.preventDefault()
    $transition.animateIn(e.target).then(() => {
      console.log('in finished')
      setTimeout(() => {
        $transition.animateOut(e.target).then(() => {
          console.log('out finished')
        })
      }, 2000)
    })
  })
})
