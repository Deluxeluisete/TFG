import { Component } from '@angular/core';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
@Component({
  standalone: true,
  imports: [FooterComponent,MenuComponent],
  selector: 'app-alcossebre-component',
  templateUrl: './alcossebre-component.component.html',
  styleUrls: ['./alcossebre-component.component.scss']
})
export class AlcossebreComponentComponent {

}
