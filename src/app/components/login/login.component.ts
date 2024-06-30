import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Ajuste o caminho conforme necessário
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';  
  password: string = '';
  error: string = '';  
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);  
        this.error = '';  
      },
      error: (error) => {
        this.error = 'Falha ao fazer login. Verifique suas credenciais.';
        console.error('Error during login:', error);
      }
    });
  }
}
