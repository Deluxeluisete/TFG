import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
@Component({
  standalone: true,
  imports: [FooterComponent,MenuComponent,RouterOutlet, RouterLink,RouterLinkActive],
    selector: 'app-peniscola-component',
  templateUrl: './peniscola-component.component.html',
  styleUrls: ['./peniscola-component.component.scss']
})
export class PeniscolaComponentComponent {

}
