import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MaterialModule } from '../../material.module'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [MaterialModule] 
})
export class NavComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
