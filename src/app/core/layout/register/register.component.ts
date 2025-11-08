import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator, Validators.maxLength(16)]],
      rePassword: ['', [Validators.required]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/)
      ]]
    }, {
      validators: this.passwordMatchValidator
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

  
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    if (!password || !rePassword) return null;

    if (password.value !== rePassword.value) {
      rePassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.registerForm.reset();
    }
  }
}
