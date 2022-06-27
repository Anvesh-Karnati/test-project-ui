import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressDetails, Details, PersonDetails } from '../models/persondetails.model';
import { DetailsService } from '../services/details.service';
@Component({
  selector: 'app-dialog-update',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.css']
})
export class DialogUpdateComponent implements OnInit {
  addressDetails: AddressDetails
  personDetail: PersonDetails
  constructor(
    private detailsService: DetailsService, public dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.detailsService.getAddressDetailsById(this.data.detail.id).subscribe(res => {
      this.addressDetails = res
    },
    error=>{
      alert('Error occured with message '+error?.message)
    })

  }
  updateDetails() {
    const personDetails: PersonDetails = {
      addr: this.personDetail?.addr,
      city: this.personDetail?.city,
      st: this.personDetail?.st,
      addrtype: this.personDetail?.addrtype,
      zip: this.personDetail?.zip,
      lname: this.personDetail?.lname,
      fname: this.personDetail?.fname,
      tel: this.personDetail?.tel,
      id: this.personDetail?.id
    }
    personDetails.addr = this.addressDetails.addr?this.addressDetails.addr:''
    personDetails.city =this.addressDetails.city?this.addressDetails.city:'' 
    personDetails.st = this.addressDetails.st?this.addressDetails.st:'' 
    personDetails.addrtype = this.addressDetails.addrtype?this.addressDetails.addrtype:'' 
    personDetails.zip = this.addressDetails.zip?this.addressDetails.zip:'' 
    personDetails.id = this.addressDetails.id
    personDetails.lname=this.data.detail.lname?this.data.detail.lname:''
    personDetails.fname=this.data.detail.fname?this.data.detail.fname:''
    personDetails.tel=this.data.detail.tel?this.data.detail.tel:''
    this.dialogRef.close(personDetails);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
