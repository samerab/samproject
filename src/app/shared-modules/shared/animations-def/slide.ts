import { 
    trigger, useAnimation, state, style, 
    transition, animate, keyframes, query, 
    stagger, animation
} from '@angular/animations'


export var slideY = animation([
    animate('{{time}}', keyframes([
        style({opacity: '{{fromOpacity}}', transform: "translateY({{start}}%)", offset: 0}),
        style({opacity: '{{toOpacity}}', transform: "translateY({{end}}%)",     offset: 1})
      ]))
    ],
    {params:{time: '3s linear',start:0, end: 700, fromOpacity: 1, toOpacity: 1}}
);

export var slideX = animation([
    animate('{{time}}', keyframes([
        style({opacity: '{{fromOpacity}}', transform: "translateX({{start}}%)", offset: 0}),
        style({opacity: '{{toOpacity}}', transform: "translateX({{end}}%)",     offset: 1})
      ]))
    ],
    {params:{time: '3s linear',start:0, end: 700, fromOpacity: 1, toOpacity: 1}}
);

