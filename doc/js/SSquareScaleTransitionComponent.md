# SSquareScaleTransitionComponent

Nice little webcomponent to create fully customizable square scale transition from an HTMLElement to the entire screen and vice-versa.

example html
<s-square-scale-transition></s-square-scale-transition>

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)

Extends **SWebComponent**

## Attributes

Here's the list of available attribute(s).

### hideAtEnd

Specify if want the transition element to be hided at the end of the transition

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**

### animateStyle

Specify a function that will return a style object by phase

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**

### animate

Specify a function that will return a promise by phase and do whatever yoou want

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**

### animateInPhase0Style

Specify the style to apply on the animate in phase 0 (initial state)

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**

Default : **null**

### animateInPhase1Style

Specify the style to apply on the animate in phase 1

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**

Default : **null**

### animateInPhase2Style

Specify the style to apply on the animate in phase 2

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**

Default : **null**

### animateOutPhase1Style

Specify the style to apply on the animate out phase 1

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**

Default : **null**

### animateOutPhase2Style

Specify the style to apply on the animate out phase 2

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**

Default : **null**

### animateInPhase1

Specify a special animation for the animate in phase 1 if you need more control over it
This function need to return a promise that need to be resolved at the end of the phase

Default : **null**

### animateInPhase2

Specify a special animation for the animate in phase 2 if you need more control over it
This function need to return a promise that need to be resolved at the end of the phase

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**

### animateOutPhase1

Specify a special animation for the animate out phase 1 if you need more control over it
This function need to return a promise that need to be resolved at the end of the phase

Default : **null**

### animateOutPhase2

Specify a special animation for the animate out phase 2 if you need more control over it
This function need to return a promise that need to be resolved at the end of the phase

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**

## Methods

### animateIn

Animate in

#### Parameters

| Name     | Type                                                                             | Description                                                                     | Status   | Default |
| -------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------- | ------- |
| \$source | **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }** | The source HTMLElement from where the scale will happen                         | required |
| data     | **{ Mixed }**                                                                    | Some data to pass to the animateInPhase1, animateInPhase1Style, etc... function | optional | null    |

Return **{ [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise) }** A promise that will be resolved when the transition in is finished

### animateOut

Animate out

#### Parameters

| Name     | Type                                                                             | Description                                                                       | Status   | Default |
| -------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------- | ------- |
| \$source | **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }** | The source HTMLElement to where the scale will happen                             | required |
| data     | **{ Mixed }**                                                                    | Some data to pass to the animateOutPhase1, animateOutPhase1Style, etc... function | optional | null    |

Return **{ [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise) }** A promise that will be resolved when the transition out is finished
