import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'stepper-container',
    templateUrl: './stepper-container.component.pug'
})
export class StepperContainer implements OnInit{

    setOrientation: String = 'horizontal';

    ngOnInit():void{

    }
}