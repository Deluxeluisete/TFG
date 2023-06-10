import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
@Component({
  standalone: true,
  imports: [FooterComponent,MenuComponent,RouterOutlet, RouterLink,RouterLinkActive],
  selector: 'app-castellon-component',
  templateUrl: './castellon-component.component.html',
  styleUrls: ['./castellon-component.component.scss']
})
export class CastellonComponentComponent implements OnInit {
  constructor(private readonly router: Router) {}
  ngOnInit(): void {
  }


}
