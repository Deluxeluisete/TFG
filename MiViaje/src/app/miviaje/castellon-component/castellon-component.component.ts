import { Component } from '@angular/core';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
@Component({
  standalone: true,
  imports: [FooterComponent,MenuComponent],
  selector: 'app-castellon-component',
  templateUrl: './castellon-component.component.html',
  styleUrls: ['./castellon-component.component.scss']
})
export class CastellonComponentComponent {

}
