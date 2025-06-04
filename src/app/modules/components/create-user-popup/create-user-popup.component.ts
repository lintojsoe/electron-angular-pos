import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-user-popup',
    templateUrl: './create-user-popup.component.html',
    styleUrls: ['./create-user-popup.component.scss'],
})
export class CreateUserPopupComponent implements OnInit {
    @Input() userDetails: any;
    @Output()
    closeHandler: EventEmitter<void> = new EventEmitter<void>();
    form: FormGroup;
    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.formInit()
    }

    formInit() {
        this.form = this.fb.group({
            username: [this.userDetails ? this.userDetails.username : null, Validators.required],
            password: [this.userDetails ? this.userDetails.password : null, Validators.required],
            group_ids: [this.userDetails ? this.userDetails.group_ids : null, Validators.required],
            first_name: [this.userDetails ? this.userDetails.first_name : null, Validators.required],
            last_name: [this.userDetails ? this.userDetails.last_name : null, Validators.required],
            email: [this.userDetails ? this.userDetails.email : null, Validators.required],
            is_active: [this.userDetails ? this.userDetails.is_active : true, Validators.required],
        })
    }

    close() {
        this.closeHandler.emit();
    }
}
