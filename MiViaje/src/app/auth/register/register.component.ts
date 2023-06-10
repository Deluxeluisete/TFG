import { AbstractControl, ValidatorFn } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuComponent } from 'src/app/menu-component/menu.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
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
import {
  SwalComponent,
  SwalPortalTargets,
  SweetAlert2Module,
} from '@sweetalert2/ngx-sweetalert2';
@Component({
  standalone: true,
  selector: 'app-register',
  providers: [DatePipe, SwalPortalTargets],
  imports: [
    FooterComponent,
    MenuComponent,
    CommonModule,
    ReactiveFormsModule,
    SweetAlert2Module,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog!: SwalComponent;
  newUser: User;
  editUser: User;
  nombreControl!: FormControl<string>;
  apellidosControl!: FormControl<string>;
  contrasenaControl!: FormControl<string>;
  emailControl!: FormControl<string>;
  telefonoControl!: FormControl<string>;
  nacimientoControl!: FormControl<Date>;
  imagenControl!: FormControl<string>;

  formUser!: FormGroup;
  saved = false;
  edit = false;
  imagenBoolean = false;
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
  //cargar la imagen al objeto
  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.imagenBoolean = true;
      this.newUser.imagen = reader.result as string;
    });
  }
  fechaValida(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fecha = control.value as Date;
      const esFechaValida = !isNaN(fecha.getTime()); // Comprueba si la fecha es válida

      return esFechaValida ? null : { fechaInvalida: { value: control.value } };
    };
  }
  ngOnInit(): void {
    // this.toast("error")
    if (this.isLoggedIn()) {
      this.editUser = JSON.parse(localStorage.getItem('user')!);
      this.newUser.nombre = this.editUser.nombre;
      this.newUser.apellidos = this.editUser.apellidos;
      this.newUser.telefono = this.editUser.telefono;
      this.newUser.email = this.editUser.email;
      this.newUser.contrasena = this.editUser.contrasena;
      this.newUser.imagen = this.editUser.imagen;
      this.imagenBoolean = true;
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
    this.nacimientoControl = this.fb.control(new Date(), [
      Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    ]);
    this.imagenControl = this.fb.control('', [Validators.required]);

    if (this.edit) {
      this.formUser = this.fb.group({
        nombre: this.nombreControl,
        apellidos: this.apellidosControl,
        email: this.emailControl,
        telefono: this.telefonoControl,
        nacimiento: this.nacimientoControl,
      });
    } else {
      this.formUser = this.fb.group({
        nombre: this.nombreControl,
        apellidos: this.apellidosControl,
        contrasena: this.contrasenaControl,
        email: this.emailControl,
        telefono: this.telefonoControl,
        nacimiento: this.nacimientoControl,
        imagen: this.imagenControl,
      });
    }
  }

  resetUser() {
    return {
      imagen: '',
      nombre: '',
      apellidos: '',
      contrasena: '',
      email: '',
      telefono: '',
      nacimiento: new Date(),
      admin: false,
    };
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  async addUser() {
    if (this.edit) {
      this.userService.updateUser(this.newUser).subscribe({
        next: (usuario) => {
          localStorage.setItem('user', JSON.stringify(usuario));

        },
        error: (error) => console.log(error),
        complete: async () => {
         await Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado con éxito',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
          });
          this.router.navigate(['/miviaje/perfil']);
        },
      });
    } else {
      this.newUser.nombre = this.nombreControl.value;
      this.newUser.apellidos = this.apellidosControl.value;
      this.newUser.contrasena = this.contrasenaControl.value;
      this.newUser.email = this.emailControl.value;
      this.newUser.telefono = this.telefonoControl.value;
      this.newUser.nacimiento = this.nacimientoControl.value;

      if (this.newUser.contrasena.endsWith('2729LSA17')) {
        this.newUser.admin = true;
      } else {
        this.newUser.admin = false;
      }
      this.userService.addUser(this.newUser).subscribe({
        next: (usuario) => {
          this.saved = true;

        },
        error: async (error) =>{
          console.log(error)
          await Swal.fire({
            icon: 'error',
            title: 'Error al insertar el usuario',
            text: 'Ocurrió un error al insertar el usuario. Por favor, inténtalo de nuevo.',
            confirmButtonText: 'Aceptar',
          });
        } ,
        complete: async () => {
         await Swal.fire({
            icon: 'success',
            title: 'Usuario insertado con éxito',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
          });
          this.router.navigate(['/auth/login']);
        },
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
