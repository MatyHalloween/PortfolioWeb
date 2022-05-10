import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  modalLoginForm: FormGroup;
  loginError: Boolean = false;
  isUserLogged: boolean = false;

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
    this.isUserLogged = this.authService.isUserLogged();
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

  private clearForm(){
    this.modalLoginForm.setValue({
      email:"",
      password:""
  })
}

logout(): void {
  this.authService.logout();
  this.isUserLogged = false;
  window.location.reload();
}

  get Email() {
    return this.modalLoginForm.get('email');
  }

  get Password() {
    return this.modalLoginForm.get('password');
  }


  onNewLogin() {
    this.clearForm();
  }
}
