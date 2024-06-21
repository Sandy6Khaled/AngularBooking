import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  // form: FormGroup;
  // isSubmitted = false;
  // states = ['State1', 'State2', 'State3'];

  // constructor(private fb: FormBuilder) {
  //   this.form = this.fb.group({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     username: ['', Validators.required],
  //     city: ['', Validators.required],
  //     state: ['', Validators.required],
  //     zip: ['', Validators.required],
  //     agree: [false, Validators.requiredTrue]
  //   });
  // }

  // ngOnInit(): void {}

  // get f() {
  //   return this.form.controls;
  // }

  // onSubmit() {
  //   this.isSubmitted = true;
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   alert('Form submitted successfully!');
  // }
}
