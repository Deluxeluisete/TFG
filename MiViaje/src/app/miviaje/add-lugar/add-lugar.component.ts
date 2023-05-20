import { Component, OnInit } from '@angular/core';
import { Lugar } from '../interfaces/lugar';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LugarService } from '../services/lugar.service';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-add-lugar',
  imports: [FooterComponent, MenuComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './add-lugar.component.html',
  styleUrls: ['./add-lugar.component.scss']
})
export class AddLugarComponent implements OnInit{

  newLugar: Lugar;
  nombreControl!: FormControl<string>;
  descripcionControl!: FormControl<string>;
  imagenControl!: FormControl<string>;
  formLugar!: FormGroup;
  saved = false;
  constructor(
    private readonly lugarService: LugarService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder
  ) {
    this.newLugar = this.resetLugar();
  }

  ngOnInit(): void {
    this.resetLugar();
    this.nombreControl = this.fb.control('', [Validators.required]);
    this.descripcionControl = this.fb.control('', [Validators.required]);
    this.imagenControl = this.fb.control('', [Validators.required]);
    this.formLugar = this.fb.group({
      nombre: this.nombreControl,
      descripcion:this.descripcionControl,
      imagen: this.imagenControl,
    });
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.newLugar.imagen = reader.result as string;
    });
  }
  resetLugar() {
    return {
      nombre: '',
      descripcion: '',
      imagen: '',
    };
  }
  addLugar() {
    this.newLugar.nombre = this.nombreControl.value;
    this.newLugar.descripcion = this.descripcionControl.value;


    this.lugarService.addLugar(this.newLugar).subscribe((lugar) => {
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
