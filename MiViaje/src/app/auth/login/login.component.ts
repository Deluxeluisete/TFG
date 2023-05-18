import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FooterComponent } from 'src/app/footer/footer.component';
import { UserService } from '../services/user.service';
import { User, UserLogin } from '../interfaces/user';
import { MenuComponent } from 'src/app/menu-component/menu.component';
@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    FooterComponent,
    MenuComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  newUserLogin: UserLogin;
  formLogin!: FormGroup;
  contrasenaControl!: FormControl<string>;
  emailControl!: FormControl<string>;
  loginAngular: User | undefined;

  constructor(
    private readonly router: Router,
    private fb: NonNullableFormBuilder,
    private readonly usersService: UserService,
  ) {
    this.newUserLogin = this.resetUser();
  }

  resetUser() {
    return {
      email: '',
      contrasena: '',
    };
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  async newLoginForm() {
    this.newUserLogin.contrasena = this.contrasenaControl.value;
    this.newUserLogin.email = this.emailControl.value;
    const save$ = this.usersService.login(this.newUserLogin);
    this.usersService.getUsuario(this.newUserLogin.email).subscribe({
      next: (usuario) => (this.loginAngular = usuario),
      error: (error) => console.log(error),
      complete: () => console.log('Restaurants loading complete!'),
    });
    console.log(this.loginAngular + "sale")
    this.usersService.getUsuario(this.newUserLogin.email).subscribe({
      next: (usuario) => {
        this.loginAngular = usuario;
        console.log(this.loginAngular?.email +"aaaa");
        localStorage.setItem('user', JSON.stringify(this.loginAngular));
        // const usuario3 = JSON.parse(localStorage.getItem('user')!);
        // const nombre = usuario.nombre;

      },
      error: (error) => console.log(error),
      complete: () => console.log('Usuario loading complete!'),
    });
    // save$.subscribe((user) => {
    //   this.usersService.getUsuario(this.newUserLogin.email).subscribe(
    //     (resultado: any) => {
    //       this.loginAngular = resultado;
    //       console.log('Resultado de la búsqueda:', this.loginAngular);
    //     },
    //     (error: any) => {
    //       console.error('Error en la búsqueda:', error);
    //     }
    //   );
    //   console.log('angular recibe ');
    //   this.router.navigate(['/miviaje']);
    // });

    this.router.navigate(['/miviaje']);

  }

  // this.gptService.login(this.newUserLogin).subscribe(
  //   (user: User) => alert(`Hola ${user.nombre} ${user.apellidos} (${user.email})`),
  //   (error: any) => console.error(error)
  // );
  // this.usersService.logine(this.newUserLogin);
  // console.log(localStorage.getItem('user'));
  // if(this.isLoggedIn()){

  //   this.router.navigate(['/miviaje']);

  // }

  users$: Observable<any> | undefined;
  ngOnInit(): void {
    console.log(this.users$);
    this.contrasenaControl = this.fb.control('', [Validators.required]);
    this.emailControl = this.fb.control('', [Validators.required]);
    this.formLogin = this.fb.group({
      email: this.emailControl,
      password: this.contrasenaControl,
    });
  }
  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid,
    };
  }
}
