import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _router: Router) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator, Validators.maxLength(16)]],
    });
  }

  
  passwordStrengthValidator(control: AbstractControl) {
    const password: string = control.value || '';

    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;

    for (let i = 0; i < password.length; i++) {
      const char = password.charAt(i);
      if (char >= 'A' && char <= 'Z') hasUppercase = true;
      else if (char >= 'a' && char <= 'z') hasLowercase = true;
      else if (char >= '0' && char <= '9') hasNumber = true;
    }

    const isLongEnough = password.length >= 8;
    const errors: any = {};

    if (!isLongEnough) errors.tooShort = true;
    if (!hasUppercase) errors.missingUppercase = true;
    if (!hasLowercase) errors.missingLowercase = true;
    if (!hasNumber) errors.missingNumber = true;

    return Object.keys(errors).length ? errors : null;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.loginForm.reset();
    this._router.navigate(['/home']);
    }
  }
}
