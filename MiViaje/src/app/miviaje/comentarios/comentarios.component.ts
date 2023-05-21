import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
import { CommentService } from '../services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from '../interfaces/comment';
import { User } from 'src/app/auth/interfaces/user';
import { LugarService } from '../services/lugar.service';
import { Lugar } from '../interfaces/lugar';
@Component({
  standalone: true,
  imports: [FooterComponent, MenuComponent, CommonModule, ReactiveFormsModule],
  selector: 'app-comentarios-component',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {
  newComment: Comentario;
  newLugar: Lugar;
  mensajeControl!: FormControl<string>;
  formComment!: FormGroup;
  saved = false;
  comentarios: Comentario[] = [];
  lugares: Lugar[] = [];
  tematica!: string;

  constructor(
    private readonly commentService: CommentService,
    private readonly lugarService: LugarService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder
  ) {
    this.newComment = this.resetComment();
    this.newLugar = this.resetLugar();
  }
  usuario = JSON.parse(localStorage.getItem('user')!);
  ngOnInit(): void {
    this.tematica = this.route.snapshot.params['tematica'];
    this.resetComment();
    this.mensajeControl = this.fb.control('', [Validators.required]);
    this.commentService.getComentarios().subscribe({
      next: (cm: Comentario[]) => (this.comentarios = cm),
      error: (error: any) => console.log(error),
      complete: () => {},
    });
    this.lugarService.getLugars().subscribe({
      next: (lg: Lugar[]) => (this.lugares = lg),
      error: (error: any) => console.log(error),
      complete: () => {
        console.log(this.lugares);
        this.convertStringToBitmap(this.lugares[2].imagen);

      },
    });
    this.formComment = this.fb.group({
      mensaje: this.mensajeControl,
    });
  }
  convertStringToBitmap(imagenBase64: string) {
     imagenBase64 = this.lugares[2].imagen;
    const bytes = atob(imagenBase64.split(',')[1]);
    // Crear un ArrayBuffer y una vista de 8 bits
    const buffer = new ArrayBuffer(bytes.length);
    const view = new Uint8Array(buffer);
    // Copiar los bytes en la vista
    for (let i = 0; i < bytes.length; i++) {
      view[i] = bytes.charCodeAt(i);
    }
    // Crear un objeto Blob a partir del ArrayBuffer
    const blob = new Blob([view], { type: 'image/jpeg' }); // Asegúrate de especificar el tipo correcto de imagen
    this.newLugar.imagen = URL.createObjectURL(blob);
  }
  resetComment() {
    return {
      mensaje: '',
      tematica: '',
      Usuario: this.usuario,
    };
  }
  resetLugar() {
    return {
      nombre: '',
      descripcion: '',
      imagen: '',
    };
  }
  addComentario() {
    this.newComment.mensaje = this.mensajeControl.value;
    this.newComment.tematica = this.tematica;
    this.newComment.Usuario = this.usuario;
    console.log(this.newComment);
    this.commentService.addComment(this.newComment).subscribe((user) => {
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
