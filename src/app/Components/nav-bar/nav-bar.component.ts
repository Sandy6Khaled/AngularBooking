import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { NavbarAuthService } from '../../Services/navbar-auth.service';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../Services/wishlist.service';
import { TokenService } from '../../Services/token.service';
import { ProfileService } from '../../Services/profile.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfileUpdateServiceService } from '../../Services/profile-update-service.service';
import { ProfileImageService } from '../../Services/profile-image.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, RegisterComponent, LoginComponent, CommonModule,HttpClientModule],
  providers: [WishlistService, TokenService, ProfileService, NavbarAuthService,ProfileImageService],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  @Output() userId: EventEmitter<number> = new EventEmitter<number>();
  image: string | null = null;
  Id: number = 0;
  constructor(
    public myService: NavbarAuthService,
    public router: Router,
    private readonly profile: ProfileService,
    private profileUpdateService:ProfileUpdateServiceService,
    private cd:ChangeDetectorRef,
    private profileImageService:ProfileImageService
  ) {}
  ngOnInit(): void {
    this.getProfileImage();
    this.checkLocalStorageChanges();
  }
 
  // ngAfterViewInit(): void {
  //   // Use ngAfterViewInit if you want to ensure the view is initialized
  //   this.profileUpdateService.profileUpdated$.subscribe(() => {
  //     this.getProfileImage();
  //     this.cd.detectChanges();  // Manually trigger change detection
  //   });
  //   // before triggering updates
  // }

  isLoggedIn(): boolean {
    return this.myService.isLoggedIn();
  }

  getUserName(): string {
    return this.myService.getUserName();
  }
  LogoutAndRedirect() {
    this.router.navigate(['home']);
    this.myService.Logout();
    this.deletelocalImage();
  }
  getUserRole() {
    return this.myService.getUserRole();
  }
  getProfileImage() {
    if (this.isLoggedIn()) {
      this.Id = +this.myService.getUserId();
      this.profile.GetClientData(this.Id).subscribe({
        next: (data) => {
          if(data.body !== null){

            this.image = data.body.image;
            console.log('profile Image', this.image);
          }else{
            this.image = null;
            console.log('profile Image null', this.image);

          }
          // this.cd.detectChanges(); 
        },
        error: (err) => {
          console.log('Error on getting image nav bar', err);
        },
      });
    }
  }
  updatedImageUrl(){
    this.image = this.profileImageService.getProfileImage();
  }
  checkLocalStorageChanges(): void {
    setInterval(() => {
      this.updatedImageUrl();
    }, 1000); // Check every second for changes (adjust interval as needed)
  }
  deletelocalImage(){
    this.profileImageService.clearProfileImage();
  }
  // toggleWishlist() {
  //   console.log("WishList Toggled");

  //   // this.wishlistService.toggleWishlist();
  // }
}
