import { Component } from '@angular/core';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private persona: PersonaService) {}

  launchFlow = () => {
    this.persona.createEmbeddedInquiry();
  };
}
