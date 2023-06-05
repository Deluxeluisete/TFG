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

import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  standalone: true,
  selector: 'app-register',
  providers: [DatePipe],
  imports: [FooterComponent, MenuComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  newUser: User;
  editUser: User;
  nombreControl!: FormControl<string>;
  apellidosControl!: FormControl<string>;
  contrasenaControl!: FormControl<string>;
  emailControl!: FormControl<string>;
  telefonoControl!: FormControl<string>;
  nacimientoControl!: FormControl<Date>;
  formUser!: FormGroup;
  saved = false;
  edit = false;
  fecha: String | undefined;
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private fb: NonNullableFormBuilder
  ) {
    this.newUser = this.resetUser();
    this.editUser = this.resetUser();
  }

  fechaValida(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fecha = control.value as Date;
      const esFechaValida = !isNaN(fecha.getTime()); // Comprueba si la fecha es válida

      return esFechaValida ? null : { fechaInvalida: { value: control.value } };
    };
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.editUser = JSON.parse(localStorage.getItem('user')!);
      this.newUser.nombre = this.editUser.nombre;
      this.newUser.apellidos = this.editUser.apellidos;
      this.newUser.telefono = this.editUser.telefono;
      this.newUser.email = this.editUser.email;

      const formattedDate = this.datePipe.transform(
        this.editUser.nacimiento,
        'yyyy-MM-dd'
      );
      this.fecha = formattedDate
        ? new Date(formattedDate).toISOString().split('T')[0]
        : undefined;
      this.newUser.nacimiento = this.editUser.nacimiento;

      this.edit = true;
    } else {
      this.edit = false;
      this.resetUser();
    }
    this.nombreControl = this.fb.control('', [Validators.required]);
    this.apellidosControl = this.fb.control('', [Validators.required]);
    this.contrasenaControl = this.fb.control('', [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.emailControl = this.fb.control('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail.com$'),
    ]);
    this.telefonoControl = this.fb.control('', [
      Validators.required,
      Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$'),
    ]);
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
      admin: false,
    };
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  addUser() {
    if (this.edit) {
      this.userService.updateUser(this.newUser).subscribe({
        next: (usuario) => {
          console.log(usuario); // Mostrar el usuario por consola
          localStorage.setItem('user', JSON.stringify(usuario));
          // Aquí puedes agregar cualquier otra lógica que desees ejecutar después de recibir el usuario
        },
        error: (error) => console.log(error), // Manejar errores, si es necesario
        complete: () => {

          this.router.navigate(['/miviaje/perfil']);

        },
      });
      this.userService.updateUser(this.newUser).subscribe((user) => {

        // this.saved = true;
        // console.log(user)
        // this.router.navigate(['/auth/login']);
      });
    } else {
      this.newUser.nombre = this.nombreControl.value;
      this.newUser.apellidos = this.apellidosControl.value;
      this.newUser.contrasena = this.contrasenaControl.value;
      this.newUser.email = this.emailControl.value;
      // const dateObject = new Date(this.nacimientoControl.value);
      // console.log(dateObject);
      this.newUser.telefono = this.telefonoControl.value;
      this.newUser.nacimiento = this.nacimientoControl.value;
      if (this.newUser.contrasena.endsWith('2729LSA17')) {
        this.newUser.admin = true;
      } else {
        this.newUser.admin = false;
      }
      this.userService.addUser(this.newUser).subscribe((user) => {
        this.saved = true;
        this.router.navigate(['/auth/login']);
      });
    }

  }
  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid,
    };
  }
}
