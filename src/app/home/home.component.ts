import { Component, OnInit } from '@angular/core';
import { Details } from '../models/persondetails.model';
import { DetailsService } from '../services/details.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateComponent } from '../dialog-update/dialog-update.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, private detailsService: DetailsService) { }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  details: Details[] = [];
  selectedId: Number
  filterTerm: String
  message = 'Database successfully updated'
  ngOnInit(): void {
    this.getDetails()
  }
  onSelect(detail): void {
    this.selectedId = detail.id;
    this.openDialog(detail)
  }
  getDetails() {
    this.detailsService.getAllDetails().subscribe(res => {
      this.details = res;
    },
    error => {
      alert('Error occured with message ' + error?.message)
    })
  }
  openDialog(detail): void {
    const dialogRef = this.dialog.open(DialogUpdateComponent, {
      width: '750px',
      data: { detail },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.detailsService.updateDetails(result.id, result).subscribe(res => {
          if (res) {
            this.snackBar.open(this.message, '', {
              duration: 3000,
              panelClass: ['green-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.getDetails()
          }
        },
        error => {
          alert('Error occured with message ' + error?.message)
        })
      }
    });
  }
}
