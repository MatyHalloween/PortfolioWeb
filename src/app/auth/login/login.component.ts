import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modalLoginForm: FormGroup;
  loginError: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
      this.modalLoginForm = this.formBuilder.group(
        {
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
        }
      )
     }

  ngOnInit(): void {
  }

  onSubmit(event: Event) {
    event.preventDefault;

    this.authService.login(this.modalLoginForm.value).subscribe(
      (response: Boolean) => {
        if (response)
          this.router.navigate(['/home']);
        else
          this.loginError = true;
      }
    );
  }

  get Email() {
    return this.modalLoginForm.get('email');
  }

  get Password() {
    return this.modalLoginForm.get('password');
  }

}
