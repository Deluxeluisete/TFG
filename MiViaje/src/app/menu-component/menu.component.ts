import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../auth/interfaces/user';

@Component({
  selector: 'mv-menu-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  usuario: User | undefined;
  constructor(private readonly router: Router) {}
  ngOnInit(): void {

    if (localStorage.getItem('user') != '') {
      this.usuario = JSON.parse(localStorage.getItem('user')!);
    }
  }
  logout() {
    localStorage.setItem('user', '');
    this.router.navigate(['/miviaje']);
  }
}
