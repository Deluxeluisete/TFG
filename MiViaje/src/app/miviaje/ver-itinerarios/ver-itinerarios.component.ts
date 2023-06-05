import { Component } from '@angular/core';
import { Itinerario } from '../interfaces/itinerario';
import { ItinerarioService } from '../services/itinerario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder } from '@angular/forms';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';

@Component({
  standalone: true,
  imports: [FooterComponent, MenuComponent, CommonModule],
  selector: 'app-ver-itinerarios',
  templateUrl: './ver-itinerarios.component.html',
  styleUrls: ['./ver-itinerarios.component.scss'],
})
export class VerItinerariosComponent {
  itinerarios: Itinerario[] = [];
  usuario = JSON.parse(localStorage.getItem('user')!);

  constructor(
    private readonly itinerarioService: ItinerarioService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder
  ) {}
  ngOnInit(): void {
    this.obtenerItinerarios();
  }
  obtenerItinerarios() {
    console.log(this.usuario.email)
    this.itinerarioService.getItinerarioByEmail(this.usuario.email).subscribe({
      next: (it: Itinerario[]) => {this.itinerarios = it.map((itinerario: Itinerario) => {
        const fecha = new Date(itinerario.desde);
        const fechaLegible =
        itinerario.desde= new Date(format(fecha, 'dd MMMM yyyy'));
        return { ...itinerario, fechaItinerario: fechaLegible };
      });},

      error: (error: any) => console.log(error),
      complete: () => {},
    });
  }
}
