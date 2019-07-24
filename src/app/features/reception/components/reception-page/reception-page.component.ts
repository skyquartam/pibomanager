import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';

@Component({
  selector: 'app-reception-page',
  templateUrl: './reception-page.component.html',
  styleUrls: ['./reception-page.component.scss']
})
export class ReceptionPageComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.title = 'Reception';
    this.titleService.subtitle = 'Manage your PetSitting activites';
  }
}
