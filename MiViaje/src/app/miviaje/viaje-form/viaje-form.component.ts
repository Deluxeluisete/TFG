import { MenuComponent } from 'src/app/menu-component/menu.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { Itinerario } from '../interfaces/itinerario';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ItinerarioService } from '../services/itinerario.service';
@Component({
  standalone: true,
  imports: [FooterComponent, MenuComponent, CommonModule, ReactiveFormsModule],
  selector: 'app-viaje-form',
  templateUrl: './viaje-form.component.html',
  styleUrls: ['./viaje-form.component.scss'],
})
export class ViajeFormComponent {
  newItinerario: Itinerario;
  datosControl!: FormControl<string>;
  emailControl!: FormControl<string>;
  destinoControl!: FormControl<string>;
  telefonoItiControl!: FormControl<string>;
  desdeControl!: FormControl<Date>;
  hastaControl!: FormControl<Date>;
  formItinerario!: FormGroup;
  saved = false;
  usuario: any;

  constructor(
    private readonly itinerarioService: ItinerarioService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder
  ) {
    this.newItinerario = this.resetItinerario();
  }

  fechaValida(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fecha = control.value as Date;
      const esFechaValida = !isNaN(fecha.getTime()); // Comprueba si la fecha es válida

      return esFechaValida ? null : { fechaInvalida: { value: control.value } };
    };
  }

  ngOnInit(): void {
    this.resetItinerario();
    if (localStorage.getItem('user') != '') {
      this.usuario = JSON.parse(localStorage.getItem('user')!);
      this.newItinerario.datos =
        this.usuario.nombre + ' ' + this.usuario.apellidos;

      this.newItinerario.email = this.usuario.email;
      this.newItinerario.telefono = this.usuario.telefono;
    }
    this.datosControl = this.fb.control('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)+$'),
    ]);

    this.emailControl = this.fb.control('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail.com$'),
    ]);
    this.destinoControl = this.fb.control('', [Validators.required]);

    this.telefonoItiControl = this.fb.control('', [
      Validators.required,
      Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$'),
    ]);
    this.desdeControl = this.fb.control(new Date(), [
      Validators.required,
      Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    ]);
    this.hastaControl = this.fb.control(new Date(), [
      Validators.required,
      Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    ]);

    this.formItinerario = this.fb.group({
      datos: this.datosControl,
      email: this.emailControl,
      telefonoIti: this.telefonoItiControl,
      destino: this.destinoControl,
      desde: this.desdeControl,
      hasta: this.hastaControl,
    });
  }

  resetItinerario() {
    return {
      datos: '',
      email: '',
      destino: '',
      telefono: '',
      desde: new Date(),
      hasta: new Date(),
    };
  }

  addItinerario() {
    this.newItinerario.datos = this.datosControl.value;
    this.newItinerario.email = this.emailControl.value;
    this.newItinerario.telefono = this.telefonoItiControl.value;
    this.newItinerario.destino = this.destinoControl.value;
    this.newItinerario.desde = this.desdeControl.value;
    this.newItinerario.hasta = this.hastaControl.value;
    //se añade un itinerario
    this.itinerarioService
      .addItinerario(this.newItinerario)
      .subscribe((itinerario: any) => {
        this.saved = true;
        this.router.navigate(['/miviaje']);
      });
  }
  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid,
    };
  }
}
