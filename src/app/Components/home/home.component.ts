import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { RegisterComponent } from '../register/register.component';
import { RouterModule } from '@angular/router';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { AboutComponent } from '../about/about.component';
import { ServicesComponent } from '../services/services.component';
import { PopularDestinationComponent } from '../popular-destination/popular-destination.component';
import { PackagesComponent } from '../packages/packages.component';
import { BookingComponent } from '../booking/booking.component';
import { ProcessComponent } from '../process/process.component';
import { TeamComponent } from '../team/team.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarComponent,
    RegisterComponent,
    RouterModule,
    HeroSectionComponent,
    AboutComponent,
    ServicesComponent,
    PopularDestinationComponent,
    PackagesComponent,
    BookingComponent,
    ProcessComponent,
    TeamComponent,
    TestimonialComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
