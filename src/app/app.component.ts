import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'al-test';
  qType: string;
  qNumber: string;
  qSubject: string;

  paperForm = new FormGroup({

    qTypeValidator : new FormControl('', [Validators.required]),
    qNumberValidator : new FormControl('',[Validators.required]),
    qSubjectValidator : new FormControl('', [Validators.required])
    
  });

  get qTypeValidator() : any {
    return this.paperForm.get('qTypeValidator');
  }

  get qSubjectValidator() : any {
    return this.paperForm.get('qSubjectValidator');
  }

  get qNumberValidator() : any {
    return this.paperForm.get('qNumberValidator');
  }

  onFormSubmit() {
    if(this.paperForm.valid) {

      alert(this.paperForm.get('qNumberValidator').value);
    }
  }

}
