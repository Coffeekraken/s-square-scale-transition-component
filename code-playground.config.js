module.exports = {
  // server port
  port: 3000,

  // title
  title: "s-square-scale-transition-component",

  // layout
  layout: "right",

  // compile server
  compileServer: {
    // compile server port
    port: 4000
  },

  // demos
  demos: {
    advanced: {
      title: "Advanced",
      editors: {
        css: {
          language: "scss",
          data: `
            @import 'node_modules/coffeekraken-sugar/index';
            @import 'node_modules/coffeekraken-s-typography-component/index';
            @import 'node_modules/coffeekraken-s-button-component/index';

            @include s-setup(());
            @include s-init();
            @include s-classes();

            @include s-typography-classes();
            @include s-button-classes();

            body {
              padding: s-space(bigger);

              &.s-square-scale-transition {
                overflow: hidden;
              }
            }

            s-square-scale-transition {
              background: s-color(secondary);

              &.animate-in--phase-1 {
                transition: height .4s cubic-bezier(1,0,0,1) 0s,
                            width .4s cubic-bezier(1,0,0,1) 0s,
                            top .4s cubic-bezier(1,0,0,1) 0s,
                            left .4s cubic-bezier(1,0,0,1) 0s;
              }
            }
          `
        },
        js: {
          language: "js",
          data: `
            import SSquareScaleTransitionComponent from './dist/index'
            import scrollTop from 'coffeekraken-sugar/js/dom/scrollTop'
            import scrollLeft from 'coffeekraken-sugar/js/dom/scrollLeft'
            import offset from 'coffeekraken-sugar/js/dom/offset'

            const $transition = document.querySelector('s-square-scale-transition')
            $transition.setProps({
              animateStyle: (phase, $source, data) => {
                switch(phase) {
                  case 'in:0':
                    return {
                      top: data.clientY + 'px',
                      left: data.clientX + 'px',
                      width: 0,
                      height: 0
                    }
                  case 'in:1':
                    const sourcePos = offset($source)
                    return {
                      top: sourcePos.top - scrollTop() + 'px',
                      left: sourcePos.left - scrollLeft() + 'px',
                      width: $source.offsetWidth + 'px',
                      height: $source.offsetHeight + 'px'
                    }
                  case 'in:2':
                    return {
                      top: '10vh',
                      left: '10vw',
                      height: '80vh',
                      width: '80vw'
                    }
                  default:
                }
              }
            })
            Array.from(document.querySelectorAll('a'), ($a) => {
              $a.addEventListener('click', (e) => {
                e.preventDefault()
                $transition.animateIn(e.target, e).then(() => {
                  console.log('in finished')
                  setTimeout(() => {
                    $transition.animateOut(e.target).then(() => {
                      console.log('out finished')
                    })
                  }, 2000)
                })
              })
            })
          `
        }
      }
    }
  },

  // editors
  editors: {
    html: {
      language: "html",
      data: `
        <div class="tf vr">
          <p>
            Vivamus facilisis dapibus <a href="#">lectus</a>, vel scelerisque lacus sodales quis. Etiam risus ipsum, maximus sed iaculis vitae, consequat et lectus. Sed mi purus, congue nec tincidunt quis, placerat eu ligula. Praesent faucibus pharetra lorem imperdiet condimentum. Nulla vitae enim pharetra, malesuada erat sit amet, porta ex. Maecenas eget massa id ante cursus malesuada. Donec et ipsum et felis suscipit imperdiet nec ac urna. Pellentesque et rutrum lectus. In porttitor purus sit amet tellus dapibus, vitae egestas enim elementum. Ut varius est varius nibh vestibulum, a vulputate nisi porttitor. Nam vel ultricies quam. Donec tempor euismod ultricies. Suspendisse sagittis nulla a ipsum.
          </p>
          <p>
            Vivamus facilisis dapibus lectus, vel scelerisque lacus sodales quis. Etiam risus ipsum, maximus sed iaculis vitae, consequat et lectus. Sed mi purus, congue nec tincidunt quis, placerat eu ligula. Praesent faucibus pharetra lorem imperdiet condimentum. Nulla vitae enim pharetra, malesuada erat sit amet, porta ex. Maecenas eget massa id ante cursus malesuada. Donec et ipsum et felis suscipit imperdiet nec ac urna. Pellentesque et rutrum lectus. In porttitor purus sit amet tellus dapibus, vitae egestas enim elementum. Ut varius est varius nibh vestibulum, a vulputate nisi porttitor. Nam vel ultricies quam. Donec tempor euismod ultricies. Suspendisse sagittis nulla a ipsum.
          </p>
          <p>
            Vivamus facilisis dapibus lectus, vel <a href="#">scelerisque lacus sodales</a> quis. Etiam risus ipsum, maximus sed iaculis vitae, consequat et lectus. Sed mi purus, congue nec tincidunt quis, placerat eu ligula. Praesent faucibus pharetra lorem imperdiet condimentum. Nulla vitae enim pharetra, malesuada erat sit amet, porta ex. Maecenas eget massa id ante cursus malesuada. Donec et ipsum et felis suscipit imperdiet nec ac urna. Pellentesque et rutrum lectus. In porttitor purus sit amet tellus dapibus, vitae egestas enim elementum. Ut varius est varius nibh vestibulum, a vulputate nisi porttitor. Nam vel ultricies quam. Donec tempor euismod ultricies. Suspendisse sagittis nulla a ipsum.
          </p>
          <p>
            Vivamus facilisis dapibus lectus, vel scelerisque lacus sodales quis. Etiam risus ipsum, maximus sed iaculis vitae, consequat et lectus. Sed mi purus, congue nec tincidunt quis, placerat eu ligula. Praesent faucibus pharetra lorem imperdiet condimentum. Nulla vitae enim pharetra, malesuada erat sit amet, porta ex. Maecenas eget massa id ante cursus malesuada. Donec et ipsum et felis suscipit imperdiet nec ac urna. Pellentesque et rutrum lectus. In porttitor purus sit amet tellus dapibus, vitae egestas enim elementum. Ut varius est varius nibh vestibulum, a vulputate nisi porttitor. Nam vel ultricies quam. Donec tempor euismod ultricies. Suspendisse sagittis nulla a ipsum.
          </p>
          <p>
            <a class="btn btn--primary" href="#">
              Click me to launch a nice transition
            </a>
          </p>
        </div>

        <s-square-scale-transition></s-square-scale-transition>
      `
    },
    css: {
      language: "scss",
      data: `
        @import 'node_modules/coffeekraken-sugar/index';
        @import 'node_modules/coffeekraken-s-typography-component/index';
        @import 'node_modules/coffeekraken-s-button-component/index';

        @include s-setup(());
        @include s-init();
        @include s-classes();

        @include s-typography-classes();
        @include s-button-classes();

        body {
          padding: s-space(bigger);

          &.s-square-scale-transition {
            overflow: hidden;
          }
        }

        s-square-scale-transition {
          background: s-color(secondary);
        }
      `
    },
    js: {
      language: "js",
      data: `
        import SSquareScaleTransitionComponent from './dist/index'

        const $transition = document  .querySelector('s-square-scale-transition')
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
      `
    }
  }
}
