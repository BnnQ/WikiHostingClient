import {Component, OnInit} from '@angular/core';
import {ModalService} from "ngx-modal-ease";

@Component({
  selector: 'app-modal-report',
  templateUrl: './modal-report.component.html',
  styleUrl: './modal-report.component.css'
})
export class ModalReportComponent implements OnInit {
  showOtherInput: boolean = false;
  complaintType: string="";
  complaintDetails: string="";
  constructor(private readonly modalService : ModalService) { }

  ngOnInit() {}

  async submitForm():Promise<void>{
    if(this.complaintType==="other"){
      this.complaintType+=": "+this.complaintDetails;
    }

    this.modalService.close(this.complaintType);
  }

}
