import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';

@Component({
  selector: 'app-owners-page',
  templateUrl: './owners-page.component.html',
  styleUrls: ['./owners-page.component.scss']
})
export class OwnersPageComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.title = 'Owners';
    this.titleService.subtitle = 'Track your customers';
  }
}
