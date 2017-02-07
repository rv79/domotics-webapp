import { Component } from '@angular/core';

@Component({
  selector: 'text-box',
  templateUrl: 'text.component.html',
})

export class TextComponent {

  private textValue = "initial value";
  private log: string ='';

  private logText(value: string): void {
    this.log += `Text changed to '${value}'\n`
  }
}
