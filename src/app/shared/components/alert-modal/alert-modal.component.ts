import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-alert-modal",
    templateUrl: "./alert-modal.component.html",
    styleUrls: ["./alert-modal.component.scss"],
})
export class AlertModalComponent implements OnInit {
    content: any = "";
    heading: any = "";
    constructor(
        public dialogRef: MatDialogRef<AlertModalComponent>,
        private formBuilder: FormBuilder,
        private translate:TranslateService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.content = data.content ? data.content : this.translate.instant("Are you sure, Do you want to continue ?");
        this.heading = data.heading ? data.heading : this.translate.instant("Confirmation");
    }

    ngOnInit(): void {}

    yes() {
        this.dialogRef.close(true);
    }
    no() {
        this.dialogRef.close(false);
    }
}
