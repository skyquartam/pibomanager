import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';

@Component({
  selector: 'app-pets-page',
  templateUrl: './pets-page.component.html',
  styleUrls: ['./pets-page.component.scss']
})
export class PetsPageComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.title = 'Pets';
    this.titleService.subtitle = 'Track your pets';
  }
}
