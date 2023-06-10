import { Component, OnInit } from '@angular/core';
import { LugarService } from '../services/lugar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder } from '@angular/forms';
import { Lugar } from '../interfaces/lugar';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
@Component({
  standalone: true,
  imports: [FooterComponent, MenuComponent, CommonModule],
  selector: 'app-ver-lugar',
  templateUrl: './ver-lugar.component.html',
  styleUrls: ['./ver-lugar.component.scss'],
})
export class VerLugarComponent implements OnInit {
  lugares: Lugar[] = [];

  constructor(
    private readonly lugarService: LugarService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder
  ) {}
  ngOnInit(): void {
    this.obtenerLugares();
  }
  obtenerLugares() {
    //se carga el listado de los lugares
    this.lugarService.getLugars().subscribe({
      next: (lg: Lugar[]) => (this.lugares = lg),
      error: (error: any) => console.log(error),
      complete: () => {},
    });
  }
  borrar(numLugar: number) {
    this.lugarService.borrarLugar(this.lugares[numLugar]).subscribe({
      error: (error: any) => console.log(error),
      complete: () => {
        this.obtenerLugares();
      },
    });
  }
}
