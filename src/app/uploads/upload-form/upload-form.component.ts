import {Component, EventEmitter, Output} from '@angular/core';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';


@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent {
  @Output() onUpload = new EventEmitter<string>();
  currentUpload: Upload;
  selectedFiles: FileList;
  constructor(private upSvc: UploadService) { }
  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
    return false;
  }
  copy() {
    this.onUpload.emit(this.currentUpload.url);
    return false;
  }
}
