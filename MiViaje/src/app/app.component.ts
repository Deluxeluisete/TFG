import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RestaurantsPageComponent } from './restaurants/restaurants-page/restaurants-page.component';
import { MenuComponent } from './menu-component/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
//import { LoginPageComponent } from './auth/login-page/login-page.component';

@Component({
  selector: 'fs-root',
  standalone: true,
  imports: [CommonModule ,RouterOutlet, RouterLink, MenuComponent,RouterLinkActive,FooterComponent],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FoodScore';

}
