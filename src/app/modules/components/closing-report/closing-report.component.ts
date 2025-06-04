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
    selector: 'app-closing-report',
    templateUrl: './closing-report.component.html',
    styleUrls: ['./closing-report.component.scss'],
})
export class ClosingReportComponent implements OnInit {
    @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
    constructor(
        public dialogRef: MatDialogRef<ClosingReportComponent>,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {}

    // public async downloadAsPDF() {
    //     const doc = new jsPDF();

    //     const specialElementHandlers = {
    //         '#editor': function (element, renderer) {
    //             return true;
    //         },
    //     };

    //     const pdfTable = this.pdfTable.nativeElement;

    //     const div = pdfTable.innerHTML;
    //     await doc.html(div, {
    //         callback: function (doc) {
    //             doc.save();
    //         },
    //         x: 10,
    //         y: 10,
    //     });
    // }

    // public downloadAsPDF() {
    //     var data = document.getElementById('contentToConvert');
    //     html2canvas(data).then((canvas) => {
    //         // Few necessary setting options
    //         var imgWidth = 208;
    //         var pageHeight = 295;
    //         var imgHeight = (canvas.height * imgWidth) / canvas.width;
    //         var heightLeft = imgHeight;

    //         const contentDataURL = canvas.toDataURL('image/png');
    //         let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    //         var position = 0;
    //         pdf.html(
    //             contentDataURL,
    //             'PNG',
    //             0,
    //             position,
    //             imgWidth,
    //             imgHeight
    //         );
    //         pdf.save('new-file.pdf'); // Generated PDF
    //     });
    // }


}
