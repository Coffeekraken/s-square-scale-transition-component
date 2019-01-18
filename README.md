# Coffeekraken s-square-scale-transition-component <img src=".resources/coffeekraken-logo.jpg" height="25px" />

<p>
	<!-- <a href="https://travis-ci.org/coffeekraken-s-square-scale-transition-component">
		<img src="https://img.shields.io/travis/coffeekraken-s-square-scale-transition-component.svg?style=flat-square" />
	</a> -->
	<a href="https://www.npmjs.com/package/coffeekraken-s-square-scale-transition-component">
		<img src="https://img.shields.io/npm/v/coffeekraken-s-square-scale-transition-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken-s-square-scale-transition-component/blob/master/LICENSE.txt">
		<img src="https://img.shields.io/npm/l/coffeekraken-s-square-scale-transition-component.svg?style=flat-square" />
	</a>
	<!-- <a href="https://github.com/coffeekraken-s-square-scale-transition-component">
		<img src="https://img.shields.io/npm/dt/coffeekraken-s-square-scale-transition-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken-s-square-scale-transition-component">
		<img src="https://img.shields.io/github/forks/coffeekraken-s-square-scale-transition-component.svg?style=social&label=Fork&style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken-s-square-scale-transition-component">
		<img src="https://img.shields.io/github/stars/coffeekraken-s-square-scale-transition-component.svg?style=social&label=Star&style=flat-square" />
	</a> -->
	<a href="https://twitter.com/coffeekrakenio">
		<img src="https://img.shields.io/twitter/url/http/coffeekrakenio.svg?style=social&style=flat-square" />
	</a>
	<a href="http://coffeekraken.io">
		<img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=flat-square&label=coffeekraken.io&colorB=f2bc2b&style=flat-square" />
	</a>
</p>

<p class="lead">Nice little webcomponent to create fully customizable square scale transition from an HTMLElement to the entire screen and vice-versa.</p>

## Table of content

1. **[Demo](http://components.coffeekraken.io/app/s-square-scale-transition-component)**
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [Principle](#readme-principle)
5. [Advanced usage](#readme-advanced)
6. [Even more advanced usage](#readme-more-advanced)
7. [Javascript API](doc/js)
8. [Sugar Web Components Documentation](https://github.com/coffeekraken/sugar/blob/master/doc/webcomponent.md)
9. [Browsers support](#readme-browsers-support)
10. [Code linting](#readme-code-linting)
11. [Contribute](#readme-contribute)
12. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
13. [Licence](#readme-license)

<a name="readme-install"></a>

## Install

```
npm install coffeekraken-s-square-scale-transition-component --save
```

<a name="readme-get-started"></a>

## Get Started

First, import the component into your javascript file like so:

```js
import SSquareScaleTransitionComponent from "coffeekraken-s-square-scale-transition-component"
```

Then simply use it inside your html like so:

```html
<s-square-scale-transition></s-square-scale-transition>
```

set a color for our transition

```scss
s-square-scale-transition {
  background-color: red;
}
```

and control your transition with javascript like so:

```js
const $transition = document.querySelector("s-square-scale-transition")
await $transition.animateIn($target) // the target is an HTMLElement from where the transition will start
await $transition.animateOut($target) // the target is an HTMLElement to where the transition will end
```

<a id="readme-principle"></a>

## Principle

The principle of this component is quite simple. It is splited in 6 phases:

- `in:0` : This is the initial phase where the square is **set at the `$target` size and position**
- `in:1` : This is the phase where the square **scale to the `$target` size**
- `in:2` : This is the phase where the square **scale to the screen size**
- `still-frame` : This is when the animate in transition has ended
- `out:1` : This is the phase where the square **scale down to the `$dest` size and position**
- `out:2` : This is the phase where the square **scale down to dissapear**

At each phase, the transition element will have a **different class applied**:

- `in:0`: no class
- `in:1`: class `animate-in--phase-1`
- `in:2`: class `animate-in--phase-2`
- `still-frame`: class `still-frame`
- `out:1`: class `animate-out--phase-1`
- `out:2`: class `animate-out--phase-2`

> The class `s-square-scale-transition` will be applied on the **body** element during the transition

This principle allows you to override the transition between the different phases like so:

```scss
s-square-scale-transition {
  background: s-color(primary);

  &.animate-in--phase-1 {
    transition: height 0.4s cubic-bezier(1, 0, 0, 1) 0s, width 0.4s cubic-bezier(
          1,
          0,
          0,
          1
        ) 0s, top 0.4s cubic-bezier(1, 0, 0, 1) 0s, left 0.4s cubic-bezier(
          1,
          0,
          0,
          1
        ) 0s;
  }
}
```

> Note that the component will automatically take care of sequencing the phases depending on your phases animation/transition durations

<a id="readme-advanced"></a>

## Advanced usage

For each phases we've seen that you can override the css transition. Now you want maybe to override more than that. Let's say that you want the transition to start from the mouse click position in the `$target` element. Here's how to proceed:

### `animateIn`

First, here's our code to trigger the transition:

```js
Array.from(document.querySelectorAll("a"), $a => {
  $a.addEventListener("click", e => {
    e.preventDefault()
    $transition.animateIn(e.target, e).then(() => {
      console.log("in finished")
      setTimeout(() => {
        $transition.animateOut(e.target).then(() => {
          console.log("out finished")
        })
      }, 2000)
    })
  })
})
```

> Note that we've passed two parameters to the `animateIn` function. The first `e.target` is the `$target` and as the second parameter we pass the mouse click event to use it later

### `in:0` style

In the phase 0, we are going to place the transition element where the user has clicked inside the \$target element:

```js
SSquareScaleTransitionComponent.setProps({
  animateStyle: (phase, $target, data) => {
    switch (phase) {
      case "in:0":
        return {
          top: data.clientY + "px",
          left: data.clientX + "px",
          width: 0,
          height: 0
        }
      default:
    }
  }
})
```

> Note the `data` argument here. This is the mouse click event that we've passed in the `animateIn` function

### `in:1` style

In the phase 1, we want to transition element to fill the `$target` element. Here's how to do that:

```js
SSquareScaleTransitionComponent.setProps({
  animateStyle: (phase, $target, data) => {
    switch (phase) {
      case "in:0":
      // ...
      case "in:1":
        const targetPos = $target.getBoundingClientRect()
        return {
          top: targetPos.top - window.pageYOffset + "px",
          left: targetPos.left - window.pageXOffset + "px",
          width: $target.offsetWidth + "px",
          height: $target.offsetHeight + "px"
        }
      default:
    }
  }
})
```

Then we can leave the default behavior of the transition so our update is complete.

<a id="readme-more-advanced"></a>

## Event more advanced

If you need to customize even more your transition, you can hook each phase with your own function like so:

```js
SSquareScaleTransitionComponent.setProps({
  animateStyle: (phase, $target, data) => {
    // we've already seen this function
  },
  animate: (phase, $target, data) => {
    switch (phase) {
      case "in:1":
        return new Promise(resolve => {
          // do whatever you want here
          // and resolve the phase when it is finished
          resolve()
        })
      case "in:2":
      // etc...
      default:
    }
  }
})
```

<a id="readme-browsers-support"></a>

## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11+                                                                                                                                                              | last 2 versions                                                                                                                                                   | last 2 versions                                                                                                                                                | last 2 versions                                                                                                                                                |

> As browsers are automatically updated, we will keep as reference the last two versions of each but this component can work on older ones as well.

> The webcomponent API (custom elements, shadowDOM, etc...) is not supported in some older browsers like IE10, etc... In order to make them work, you will need to integrate the [corresponding polyfill](https://www.webcomponents.org/polyfills).

<a id="readme-code-linting"></a>

## Code linting

This package uses some code linting rules. Here's the list:

1. [StandardJS](https://standardjs.com/) for javascript files
2. [Stylelint](https://github.com/stylelint/stylelint) with [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) for `scss` files

> Your commits will not been accepted if the code style is not respected!

<a id="readme-contribute"></a>

## Contribute

This is an open source project and will ever be! You are more that welcomed to contribute to his development and make it more awesome every day.
To do so, you have several possibilities:

1. [Share the love ❤️](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-share-the-love)
2. [Declare issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-declare-issues)
3. [Fix issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-fix-issues)
4. [Add features](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-add-features)
5. [Build web component](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-build-web-component)

<a id="readme-who-are-coffeekraken"></a>

## Who are Coffeekraken

We try to be **some cool guys** that build **some cool tools** to make our (and yours hopefully) **every day life better**.

#### [More on who we are](https://github.com/Coffeekraken/coffeekraken/blob/master/who-are-we.md)

<a id="readme-license"></a>

## License

The code is available under the [MIT license](LICENSE.txt). This mean that you can use, modify, or do whatever you want with it. This mean also that it is shipped to you for free, so don't be a hater and if you find some issues, etc... feel free to [contribute](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md) instead of sharing your frustrations on social networks like an asshole...
