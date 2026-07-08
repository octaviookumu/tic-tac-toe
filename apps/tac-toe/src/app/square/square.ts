import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-square',
  imports: [NgClass],
  templateUrl: './square.html',
  styleUrl: './square.scss',
})
export class Square {
  value = input<'X' | 'O'>();
  disabled = input<boolean>(false);
}
