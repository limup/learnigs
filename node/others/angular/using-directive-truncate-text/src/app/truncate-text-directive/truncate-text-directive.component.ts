import { Component, NgZone } from '@angular/core';
import { TruncateText } from '../pipe/truncate-text';

@Component({
  selector: 'app-truncate-text-directive',
  standalone: true,
  imports: [
    TruncateText
  ],
  templateUrl: './truncate-text-directive.component.html',
  styleUrl: './truncate-text-directive.component.scss'
})

export class TruncateTextDirectiveComponent {
  maxCharacters = 50;
  text: string = 'Teste de Arnaldo de letras grande tem que funcioar pois tem mais de 50 caracteres vamos la tem que funcionar se não fico bravo de mais'

  constructor(private ngZone: NgZone) {
    this.ngZone.run(() => {
      this.updateMaxCharacters();
      this.addResizeListener();
    });
  }

  updateMaxCharacters() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) {
        this.maxCharacters = 30;
      } else if (window.innerWidth <= 1024) {
        this.maxCharacters = 40;
      } else {
        this.maxCharacters = 50;
      }
    }
  }

  addResizeListener() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateMaxCharacters.bind(this));
    }
  }
}
