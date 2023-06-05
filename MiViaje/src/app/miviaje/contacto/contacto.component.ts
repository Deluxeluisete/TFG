import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
import { Contacto } from '../interfaces/contacto';
import { ContactoService } from '../services/contacto.service';
@Component({
  standalone: true,
  imports: [FooterComponent, MenuComponent, CommonModule, ReactiveFormsModule],
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit {
   contactar: Contacto;
  nombreControl!: FormControl<string>;
  emailControl!: FormControl<string>;
  motivoControl!: FormControl<string>;
  mensajeControl!: FormControl<string>;
  formContacto!: FormGroup;
  saved = false;

  ngOnInit(): void {
    this.resetContacto();
    this.nombreControl = this.fb.control('', [Validators.required]);
    this.emailControl = this.fb.control('', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\.com$')]);
    this.motivoControl = this.fb.control('', [Validators.required]);
    this.mensajeControl = this.fb.control('', [Validators.required]);
    this.formContacto = this.fb.group({
      nombre: this.nombreControl,
      email: this.emailControl,
      motivo: this.motivoControl,
      mensaje: this.mensajeControl,
    });
  }
  constructor(
    private readonly contactoService:ContactoService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder
  ) {
    this.contactar = this.resetContacto();
  }

  resetContacto() {
    return {
      nombre: '',
      email: '',
      motivo: '',
      mensaje: '',
    };
  }
  enviarMail() {
    this.contactar.nombre = this.nombreControl.value;
    this.contactar.email = this.emailControl.value;
    this.contactar.motivo = this.motivoControl.value;
    this.contactar.mensaje = this.mensajeControl.value;

    this.contactoService.sendMail(this.contactar).subscribe(() => {
      this.saved = true;
    });

  }

  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid,
    };
  }
}
