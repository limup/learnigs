import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TruncateTextDirectiveComponent } from "./truncate-text-directive/truncate-text-directive.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TruncateTextDirectiveComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'using-directive-truncate-text';
}
