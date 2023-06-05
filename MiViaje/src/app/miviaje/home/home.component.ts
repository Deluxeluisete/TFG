import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
@Component({
  standalone: true,
  imports: [FooterComponent, MenuComponent, RouterLink],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder
  ) {
  }
  ngOnInit(): void {

  }
  personalizarViaje() {
    const animateButton = (e: Event) => {
      e.preventDefault();
      (e.target as HTMLElement).classList.remove('animate');

      (e.target as HTMLElement).classList.add('animate');
      setTimeout(() => {
        (e.target as HTMLElement).classList.remove('animate');
      }, 700);
    };

    const bubblyButtons = document.getElementsByClassName('bubbly-button');

    for (let i = 0; i < bubblyButtons.length; i++) {
      const button = bubblyButtons[i] as HTMLElement;
      button.addEventListener('click', animateButton, false);
    }
    this.router.navigate(['/miviaje/formulario-viaje']);

  }
}
