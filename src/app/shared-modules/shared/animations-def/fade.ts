import { 
    trigger, useAnimation, state, style, 
    transition, animate, keyframes, query, 
    stagger, animation
} from '@angular/animations'

export var fade = animation([
                            style({opacity: '{{start}}'}),
                            animate('{{time}}', style({opacity: '{{end}}'}))
                        ],
                        {params:{time: '3s',start:0, end: 1}}
                    );
                    
