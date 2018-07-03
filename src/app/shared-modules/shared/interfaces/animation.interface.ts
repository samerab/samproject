import { AnimationReferenceMetadata } from '@angular/animations';

export interface IAnimationData {
    animationName: string, 
    animationDef: AnimationReferenceMetadata, 
    animationParams: any
    
}

export interface ISlideAnimation {
    groupName: string,
    enterAnimationNext: string;
    enterAnimationPrev: string;
    leaveAnimationNext: string;
    leaveAnimationPrev: string;
}

