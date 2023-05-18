import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
import { CommentService } from '../services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from '../interfaces/comment';
import { User } from 'src/app/auth/interfaces/user';
@Component({
  standalone: true,
  imports: [FooterComponent, MenuComponent, CommonModule, ReactiveFormsModule],
    selector: 'app-comentarios-component',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent  implements OnInit {
    newComment: Comentario;
    mensajeControl!: FormControl<string>;
    formComment!: FormGroup;
    saved = false;

  constructor(
    private readonly commentService: CommentService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder
  ) {
    this.newComment = this.resetComment();
  }
  usuario = JSON.parse(localStorage.getItem('user')!);
  ngOnInit(): void {
    this.resetComment();
    this.mensajeControl = this.fb.control('', [Validators.required]);

    this.formComment = this.fb.group({
      mensaje: this.mensajeControl,
    });
  }

  resetComment() {
    return {
      mensaje: '',
      tematica:'',
      Usuario: this.usuario
    };
  }

  addComentario() {
    this.newComment.mensaje = this.mensajeControl.value;
    this.newComment.tematica="Alcala";
    this.newComment.Usuario=this.usuario;

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
