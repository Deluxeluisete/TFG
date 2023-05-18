import { Component, OnInit } from '@angular/core';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
@Component({
  standalone: true,
  imports: [FooterComponent, MenuComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    const usuario3 = JSON.parse(localStorage.getItem('user')!);
    const nombre = usuario3.nombre;
    console.log(nombre + "grrr")
  }
}
