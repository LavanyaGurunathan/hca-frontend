import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientTriage } from './patient-triage/patient-triage';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  imports: [RouterOutlet, PatientTriage],
})
export class App {
  protected readonly title = signal('hca-frontend');
}
