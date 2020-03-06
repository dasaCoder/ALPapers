import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import {  finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent implements OnInit {
  title = 'al-test';
  qType: string;
  qNumber: string;
  qSubject: string;

  task: AngularFireUploadTask;
  ref: AngularFireStorageReference;
  downloadURL :Observable<any>;
  uploadProgress: Observable<number>;
  imageURL:string;
  imageFile: any;
  dataObj: any = [];
  imageSrc: any;

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

  constructor(private afStorage: AngularFireStorage, private firedb: AngularFireDatabase) {}

  ngOnInit(){}

  onFormSubmit() {
    if(this.paperForm.valid) {

      alert(this.paperForm.get('qNumberValidator').value);
      console.log(this.paperForm.value);
      this.dataObj = this.paperForm.value;
      this.upload();
    }
  }

  setImage(event) {
    console.log(event.target.files);
    this.imageFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(this.imageFile);
  }

  upload() {

    if(this.imageFile == undefined) {
      alert("Please upload file");
      return;
    }
    // create a random id
    const randomId = Math.floor(Date.now() / 1000).toString();
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref(randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(this.imageFile);
    this.uploadProgress = this.task.percentageChanges();

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();

        this.downloadURL.subscribe(url => {
          this.imageURL = url;

          this.dataObj['url'] = this.imageURL;

          console.log(this.dataObj);
          this.saveOnFirestore();
        });
        
      })
    ).subscribe();

  }

  saveOnFirestore() {
    this.firedb
    .list("/answers")
    .push(this.dataObj);

    location.reload();
  }

}
