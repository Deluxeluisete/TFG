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
  imports: [FooterComponent,MenuComponent,CommonModule,
    ReactiveFormsModule,],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user!: User;
   usuario = JSON.parse(localStorage.getItem('user')!);

  constructor(private readonly router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    console.log(this.usuario.id)
    console.log(this.usuario.nombre)

    this.route.data.subscribe((data) => (this.user = data['profile']));
  }


}
