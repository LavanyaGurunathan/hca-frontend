import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-patient-triage',
  templateUrl: './patient-triage.html',
  styleUrl: './patient-triage.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PatientTriage {
  constructor(
    private httpClient: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }
  step: 'form' | 'result' = 'form';

  bloodGroupOptions: any[] = [
    { "label": "O Positive", "value": "O+" },
    { "label": "O Negative", "value": "O-" },
    { "label": "A Positive", "value": "A+" },
    { "label": "A Negative", "value": "A-" },
    { "label": "B Positive", "value": "B+" },
    { "label": "B Negative", "value": "B-" },
    { "label": "AB Positive", "value": "AB+" },
    { "label": "AB Negative", "value": "AB-" }
  ];

  symptomOptions: any[] = [
    { "label": "Chest Pain", "value": "chest pain" },
    { "label": "Chest Pressure", "value": "chest pressure" },
    { "label": "Tight Chest", "value": "tight chest" },
    { "label": "Arm Pain", "value": "arm pain" },
    { "label": "Jaw Pain", "value": "jaw pain" },
    { "label": "Breathlessness", "value": "breathlessness" },
    { "label": "Sweating", "value": "sweating" },
    { "label": "Nausea", "value": "nausea" },
    { "label": "Vomiting", "value": "vomiting" },
    { "label": "Fainting", "value": "fainting" },
    { "label": "Rapid Pulse", "value": "rapid pulse" },

    { "label": "Seizures", "value": "seizures" },
    { "label": "Confusion", "value": "confusion" },
    { "label": "Headache", "value": "headache" },
    { "label": "Memory Loss", "value": "memory loss" },
    { "label": "Speech Issue", "value": "speech issue" },
    { "label": "Coordination Loss", "value": "coordination loss" },
    { "label": "Paralysis", "value": "paralysis" },

    { "label": "Fever", "value": "fever" },
    { "label": "Chills", "value": "chills" },
    { "label": "Weakness", "value": "weakness" },
    { "label": "Dehydration", "value": "dehydration" },
    { "label": "Low Bp", "value": "low bp" },
    { "label": "Fatigue", "value": "fatigue" },

    { "label": "Throat Pain", "value": "throat pain" },
    { "label": "Ear Pain", "value": "ear pain" },
    { "label": "Hearing Loss", "value": "hearing loss" },
    { "label": "Blocked Nose", "value": "blocked nose" },
    { "label": "Nasal Congestion", "value": "nasal congestion" },
    { "label": "Voice Loss", "value": "voice loss" },
    { "label": "Swallow Pain", "value": "swallow pain" },

    { "label": "Rash", "value": "rash" },
    { "label": "Itching", "value": "itching" },
    { "label": "Redness", "value": "redness" },
    { "label": "Blisters", "value": "blisters" },
    { "label": "Skin Peeling", "value": "skin peeling" },
    { "label": "Infection", "value": "infection" },
    { "label": "Lesions", "value": "lesions" },

    { "label": "Joint Pain", "value": "joint pain" },
    { "label": "Bone Pain", "value": "bone pain" },
    { "label": "Swelling", "value": "swelling" },
    { "label": "Stiffness", "value": "stiffness" },
    { "label": "Fracture", "value": "fracture" },
    { "label": "Mobility Loss", "value": "mobility loss" },

    { "label": "Abdominal Pain", "value": "abdominal pain" },
    { "label": "Blood Stool", "value": "blood stool" },
    { "label": "Black Stool", "value": "black stool" },
    { "label": "Bloating", "value": "bloating" },
    { "label": "Reflux", "value": "reflux" },

    { "label": "Burning Urination", "value": "burning urination" },
    { "label": "Frequent Urination", "value": "frequent urination" },
    { "label": "Blood Urine", "value": "blood urine" },
    { "label": "Flank Pain", "value": "flank pain" },
    { "label": "Urine Infection", "value": "urine infection" },
    { "label": "Urine Retention", "value": "urine retention" },

    { "label": "Period Pain", "value": "period pain" },
    { "label": "Bleeding", "value": "bleeding" },
    { "label": "Pelvic Pain", "value": "pelvic pain" },
    { "label": "Cramps", "value": "cramps" },
    { "label": "Pregnancy Issue", "value": "pregnancy issue" },

    { "label": "Fever Child", "value": "fever child" },
    { "label": "Crying", "value": "crying" },
    { "label": "Lethargy", "value": "lethargy" },
    { "label": "Feeding Issue", "value": "feeding issue" }
  ];

  form = new FormGroup({
    name: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(2)
    ]),

    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(120)
    ]),

    gender: new FormControl<string | null>(null, [
      Validators.required
    ]),

    contact: new FormControl<string | null>(null, [
      Validators.required
    ]),

    address: new FormControl<string | null>(null, [
      Validators.required
    ]),

    bloodGroup: new FormControl<string | null>(null, [
      Validators.required
    ]),

    symptoms: new FormControl<any[]>([], [
      Validators.required
    ])
  });

  analysisResponse: any;
  isLoading = false;
  analysisList: any[] = [];
  isTableLoading: boolean = false;
  tableErrorMessage: string | null = null;

  ngOnInit() {
    this.getAllAnalysis();
  }

  getAllAnalysis() {
    this.analysisList = [];
    this.isTableLoading = true;
    this.tableErrorMessage = null;
    this.httpClient.get(
      'http://localhost:3000/api/patient/analysisList',
      {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        params: {
          _t: new Date().getTime() // cache buster
        }
      }
    ).subscribe({
      next: (res: any) => {
        if (res?.data?.length) {
          this.analysisList = res.data;
          this.tableErrorMessage = null;
          // this.goToResult(this.analysisList?.[0]?.analysis);
        } else {
          this.analysisList = [];
          this.tableErrorMessage = 'No Analysis found';
        }
        this.isTableLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isTableLoading = false;
        this.analysisList = [];
        this.tableErrorMessage = 'Server Error';
        this.cdr.detectChanges();
      }
    });
  }

  goToResult(analysis: any) {
    console.log(analysis)
    this.analysisResponse = analysis;
    this.step = 'result';
    this.form.reset();
    this.cdr.detectChanges();
  }

  analyze() {
    this.isLoading = true;
    this.analysisResponse = null;
    this.httpClient.post('http://localhost:3000/api/patient/generateAnalysis', this.form?.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
        this.analysisResponse = res.data;
        this.step = 'result';
        this.form.reset();
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  get f() {
    return this.form?.controls;
  }

  back() {
    this.form.reset();
    this.step = 'form';
    this.analysisResponse = null;
    this.getAllAnalysis();
  }
}