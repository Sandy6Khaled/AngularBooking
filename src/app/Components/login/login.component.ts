import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,
    RegisterComponent

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
