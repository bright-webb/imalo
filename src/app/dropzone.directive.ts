import { Directive, ElementRef, AfterViewInit, EventEmitter, Output  } from '@angular/core';
import { Helper } from './helpers/helper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective implements AfterViewInit{
    @Output() addedFilesEvent = new EventEmitter<any[]>();
    
    constructor(private el: ElementRef, private helper: Helper, private http: HttpClient, private toastr: ToastrService) {
      
    }

    ngAfterViewInit() {
    this.initializeDropzone();
  }

    private initializeDropzone(): void {
     let property_id: number | null = null;
      const propertyData = localStorage.getItem('propertyData');
      if (propertyData) { // check if user has an active session of property posting
        const property: any = JSON.parse(propertyData);
        property_id = property.property_id;
      }

      console.log(this.helper.getToken());
    const options = {
      dictDefaultMessage: "<i class='sl sl-icon-plus'></i> Click here or drop files to upload",
      url: "https://api.imbapano.com/api/upload/files",
       maxFiles: 5, 
      maxFilesize: 4,
      acceptedFiles: ".jpeg,.jpg,.png,.gif",
      
      timeout: 50000,
       renameFile: function(file: any) {
            var dt = new Date();
            var time = dt.getTime();
            return time+"-"+file.name; 
          },
    headers: {
      Authorization: 'Bearer ' + this.helper.getToken()
    },
      params: {
        property_id: property_id 
    },
  
  };

    $(this.el.nativeElement).dropzone(options);
  }


}
