import { Injectable } from '@angular/core';
import {Upload} from './upload';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {
  constructor(private db: AngularFireDatabase) { }

  private basePath = '/uploads';
  private uploadTask: firebase.storage.UploadTask;

  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    return new Promise((resolve, reject) => {
      this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          // upload in progress
          upload.progress = (this.uploadTask.snapshot.bytesTransferred / this.uploadTask.snapshot.totalBytes) * 100;
        },
        (error) => {
          // upload failed
          console.log(error);
          reject(error);
        },
        () => {
          // upload success
          upload.url = this.uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          this.saveFileData(upload);
          resolve(upload.url);
        }
      );
    });
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }
}
