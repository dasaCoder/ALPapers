import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, of } from 'rxjs';
import {  finalize } from 'rxjs/operators';

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

  task: AngularFireUploadTask;
  ref: AngularFireStorageReference;
  downloadURL :Observable<any>;
  image:string;

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

  constructor(private afStorage: AngularFireStorage) {

  }

  onFormSubmit() {
    if(this.paperForm.valid) {

      alert(this.paperForm.get('qNumberValidator').value);
      console.log(this.paperForm.value);
    }
  }

  upload(event) {
      // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref(randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => {
          this.image = url;
          console.log(this.image);
        });
        
      })
    )
    .subscribe(() => {

      console.log(this.image);
    });


  }

}
