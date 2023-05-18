import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MenuComponent } from 'src/app/menu-component/menu.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { UserService } from '../services/user.service';
// import { CanDeactivateComponent } from 'src/app/guards/leave-page.guard';
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
import { User } from '../interfaces/user';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FooterComponent, MenuComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  newUser: User;
  nombreControl!: FormControl<string>;
  apellidosControl!: FormControl<string>;
  contrasenaControl!: FormControl<string>;
  emailControl!: FormControl<string>;
  telefonoControl!: FormControl<string>;
  nacimientoControl!: FormControl<Date>;
  formUser!: FormGroup;
  saved = false;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder
  ) {
    this.newUser = this.resetUser();
  }

  fechaValida(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fecha = control.value as Date;
      const esFechaValida = !isNaN(fecha.getTime()); // Comprueba si la fecha es válida

      return esFechaValida ? null : { fechaInvalida: { value: control.value } };
    };
  }

  ngOnInit(): void {
    this.resetUser();
    this.nombreControl = this.fb.control('', [Validators.required]);
    this.apellidosControl = this.fb.control('', [Validators.required]);
    this.contrasenaControl = this.fb.control('', [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.emailControl = this.fb.control('', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\.com$')]);
    this.telefonoControl = this.fb.control('', [Validators.required,Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$')]);
    this.nacimientoControl = this.fb.control(new Date());

    this.formUser = this.fb.group({
      nombre: this.nombreControl,
      apellidos: this.apellidosControl,
      contrasena: this.contrasenaControl,
      email: this.emailControl,
      telefono: this.telefonoControl,
      nacimiento: this.nacimientoControl,
    });
  }

  resetUser() {
    return {
      nombre: '',
      apellidos: '',
      contrasena: '',
      email: '',
      telefono: '',
    };
  }

  addUser() {
    this.newUser.nombre = this.nombreControl.value;
    this.newUser.apellidos = this.apellidosControl.value;
    this.newUser.contrasena = this.contrasenaControl.value;
    this.newUser.email = this.emailControl.value;
    this.newUser.telefono = this.telefonoControl.value;
    this.newUser.nacimiento = this.nacimientoControl.value;

    this.userService.addUser(this.newUser).subscribe((user) => {
      this.saved = true;
      this.router.navigate(['/auth/login']);
    });
  }
  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid,
    };
  }
}
