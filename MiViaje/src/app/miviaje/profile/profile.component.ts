import { FooterComponent } from 'src/app/footer/footer.component';
import { MenuComponent } from 'src/app/menu-component/menu.component';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from 'src/app/auth/interfaces/user';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


@Component({
  standalone: true,
  imports: [FooterComponent,MenuComponent,CommonModule,RouterLink,
    ReactiveFormsModule,],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user!: User;
  //cargamos el usuario de la variable local para mostrar sus datos
   usuario = JSON.parse(localStorage.getItem('user')!);
   constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder
  ) {
  }  ngOnInit(): void {


    this.route.data.subscribe((data) => (this.user = data['profile']));
  }


}
