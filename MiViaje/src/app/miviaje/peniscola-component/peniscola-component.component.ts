import { Component } from '@angular/core';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
@Component({
  standalone: true,
  imports: [FooterComponent,MenuComponent],
  selector: 'app-peniscola-component',
  templateUrl: './peniscola-component.component.html',
  styleUrls: ['./peniscola-component.component.scss']
})
export class PeniscolaComponentComponent {

}
