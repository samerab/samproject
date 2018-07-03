import { 
    trigger, useAnimation, state, style, 
    transition, animate, keyframes, query, 
    stagger, animation
} from '@angular/animations'


export var backToX = animation([
    animate('{{time}}', keyframes([
        style({ zIndex: -1, opacity: 1, transform: 'scale(1,1)', offset: 0}),
        style({zIndex: -1, opacity: .9, transform: 'scale(.7,.7) translateX({{direction}}10%)', offset: 0.3}),
        style({zIndex: -1, opacity: .5, transform: 'scale(.5,.5)  translateX({{direction}}30%)', offset: 0.7}),
        style({zIndex: -1, opacity: .1, transform: 'scale(.3,.3) translateX({{direction}}100%)', offset: 1.0})
      ]))
    ],
    {params:{time: '.1s linear', direction: '-'}}
);



  export var forwardToX = animation([
    animate('{{time}}', keyframes([
        style({ zIndex: -1, opacity: 0, transform: 'translateX(0)  scale(0, 0)', offset: 0}),
        style({zIndex: -1, opacity: 1, transform: 'translateX({{direction}}50%) scale(1, 1)', offset: 0.5}),
        style({zIndex: -1, opacity: 1, transform: 'translateX(0) scale(1, 1)',  offset: 1.0})
      ]))
    ],
    {params:{time: '1s linear', direction: '-'}}
);
