import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-print-report',
    templateUrl: './print-report.component.html',
    styleUrls: ['./print-report.component.scss'],
})
export class PrintReportComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<PrintReportComponent>,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {}


}
