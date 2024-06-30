// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { Component } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   FormsModule,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { OwnerService } from '../../Services/owner.service';
// import { addedHotel } from '../../Models/AddHotel';
// import { TokenService } from '../../Services/token.service';

// @Component({
//   selector: 'app-add-hotel-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
//   providers: [OwnerService, TokenService],
//   templateUrl: './add-hotel-form.component.html',
//   styleUrl: './add-hotel-form.component.css',
// })
// export class AddHotelFormComponent {
//   hotelForm: addedHotel = {
//     name: '',
//     description: '',
//     numOfStars: 0,
//     city: '',
//     street: '',
//     postalCode: '',
//     userId: 0,
//     imagesSource: [], // Initialize as empty array for multiple files
//   };
//   formData: any;
//   // newAddedHotel :addedHotel = {
//   //   name: '',
//   //   description: '',
//   //   numOfStars: 0,
//   //   city: '',
//   //   street: '',
//   //   postalCode: '',
//   //   userId: 0,
//   //   imagesSource: [],
//   // };

//   constructor(
//     private fb: FormBuilder,
//     private ownerService: OwnerService,
//     private readonly token: TokenService
//   ) {
//     // this.hotelForm = this.fb.group({
//     //   name: ['', Validators.required],
//     //   description: ['', Validators.required],
//     //   numberOfStars: [0, Validators.required],
//     //   city: ['', Validators.required],
//     //   street: ['', Validators.required],
//     //   postalCode: ['', Validators.required],
//     //   userId: [0, Validators.required],
//     //   imagesSource: [], // Initialize as empty array for multiple files
//     // });
//   }

//   onFileChange(event: any) {
//     if (event.target.files.length > 0) {
//       this.hotelForm.imagesSource = Array.from(event.target.files);
//     }
//   }

//   onSubmit() {
//     this.hotelForm.userId = +this.token.getUserId();
//     const formData = new FormData();
//     formData.append("name", this.hotelForm.name);
//     formData.append("description", this.hotelForm.description);
//     formData.append("numOfStars", this.hotelForm.numOfStars.toString());
//     formData.append("city", this.hotelForm.city);
//     formData.append("street", this.hotelForm.street);
//     formData.append("postalCode", this.hotelForm.postalCode);
//     formData.append("userId", this.hotelForm.userId.toString());
//     for (let i = 0; i < this.hotelForm.imagesSource.length; i++) {
//       formData.append("imagesSource", this.hotelForm.imagesSource[i].name);
//     }
//     console.log('FormData entries:');
//     formData.forEach((value, key) => {
//       console.log(key, value);
//     });
//     console.log('HotelForm:', this.formData.entities());

//     this.ownerService.addNewHotel(this.formData.value).subscribe({
//       next: (res) => {
//         console.log('Hotel added', res);
//       },
//       error: (err) => {
//         console.log('Error in Added Hotel Form', err);
//       },
//     });
//   }
// }

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { OwnerService } from '../../Services/owner.service';
import { addedHotel } from '../../Models/AddHotel';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-add-hotel-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [OwnerService, TokenService],
  templateUrl: './add-hotel-form.component.html',
  styleUrls: ['./add-hotel-form.component.css'],
})
export class AddHotelFormComponent {
  hotelForm: addedHotel = {
    name: '',
    description: '',
    numOfStars: 0,
    city: '',
    street: '',
    postalCode: '',
    userId: 0,
    imagesSource: [], // Initialize as empty array for multiple files
  };
  formData = new FormData();
  constructor(
    private fb: FormBuilder,
    private ownerService: OwnerService,
    private readonly token: TokenService
  ) {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.hotelForm.imagesSource = Array.from(event.target.files);
    }
  }

  onSubmit() {
    this.hotelForm.userId = +this.token.getUserId();
    // formData = new FormData();
    this.formData.append("name", this.hotelForm.name);
    this.formData.append("description", this.hotelForm.description);
    this.formData.append("numOfStars", this.hotelForm.numOfStars.toString());
    this.formData.append("city", this.hotelForm.city);
    this.formData.append("street", this.hotelForm.street);
    this.formData.append("postalCode", this.hotelForm.postalCode);
    this.formData.append("userId", this.hotelForm.userId.toString());
    for (let i = 0; i < this.hotelForm.imagesSource.length; i++) {
      this.formData.append("imagesSource", this.hotelForm.imagesSource[i]);
    }

    console.log('FormData entries:');
    this.formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.ownerService.addNewHotel(this.formData).subscribe({
      next: (res) => {
        console.log('Hotel added', res.body);
      },
      error: (err) => {
        console.log('Error in Added Hotel Form', err);
      },
    });
  }
}
