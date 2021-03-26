import { Component, OnInit,} from '@angular/core';
import { ImportExcelService }  from 'src/app/Service/import-excel.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})


export class ImportExcelComponent implements OnInit {
    
  constructor(private importExcelService: ImportExcelService) { }
  
  selectedFiles?: FileList;
  currentFile?: File;  
  progress = 0;
  message = '';
  opcion =0;

  ngOnInit(): void {
  
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
  
    if (this.selectedFiles && (this.opcion ==1 ||this.opcion ==2)) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.importExcelService.upload(this.currentFile,this.opcion).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;              
            }
            this.message = "Archivo enviado";
          });
      }
      this.selectedFiles = undefined;
    }
  }
}