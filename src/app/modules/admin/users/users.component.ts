import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'app/core/user/user.service';
import { TranslationService } from 'app/services/translation.service';
import { UsersService } from 'app/services/usersService';
import { UtilitiesService } from 'app/services/utilitiesService';
import { Pagination } from 'app/shared/constants';
import { AlertModalComponent } from 'app/shared/components/alert-modal/alert-modal.component';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    @ViewChild('createUser') createUser;
    users = [];
    userDetails: any = null;
    page = new Pagination().page;
    customerList = [];
    breadcrumbs = [];
    columns: string[] = [
        'name',
        'email',
        'username',
        'group',
        'is_active',
        'action',
    ];
    form: FormGroup;
    groups = [];
    isLoading = false;
    constructor(
        public translationService: TranslationService,
        private usersService: UsersService,
        private fb: FormBuilder,
        private utilitiesService: UtilitiesService,
        private dialog: MatDialog,
        private translate: TranslateService
    ) { }

    get getUserDetails() {
        return this.userDetails;
    }

    async ngOnInit(): Promise<void> {
        this.formInit();
        await this.getAllUsers();
        await this.getGroups();
    }

    async getGroups() {
        try {
            const groups = await this.usersService
                .getGroups({ limit: 9999, offset: 0 })
                .toPromise();
            if (groups) {
                this.groups = groups.results;
            }
        } catch {
        } finally {
        }
    }

    formInit() {
        this.form = this.fb.group({
            id: [this.userDetails ? this.userDetails.id : null],
            username: [
                this.userDetails ? this.userDetails.username : null,
                Validators.required,
            ],
            password: [
                this.userDetails ? this.userDetails.password : null,
            ],
            group_ids: [null, Validators.required],
            first_name: [
                this.userDetails ? this.userDetails.first_name : null,
                Validators.required,
            ],
            last_name: [
                this.userDetails ? this.userDetails.last_name : null,
                Validators.required,
            ],
            email: [
                this.userDetails ? this.userDetails.email : null,
                Validators.compose([Validators.required, Validators.email]),
            ],
            is_active: [
                this.userDetails ? this.userDetails.is_active : true,
                Validators.required,
            ],
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    async getAllUsers() {
        try {
            this.isLoading = true;
            this.users = [];
            const users = await this.usersService
                .getUserList({
                    limit: this.page.pageSize,
                    offset: this.page.offset,
                })
                .toPromise();
            if (users) {
                this.page.length = users.count;
                this.users = users.results;
                this.isLoading = false;
            }
        } catch {
            this.isLoading = false;
        } finally {
        }
    }

    async handlePageEvent(event) {
        this.page.length = event.length;
        this.page.pageSize = event.pageSize;
        this.page.pageIndex = event.pageIndex;
        this.page.offset = this.page.pageIndex * this.page.pageSize;
        this.getAllUsers();
    }

    deleteUser(id) {
        let content = this.translate.instant(
            'Are you sure, Do you want to delete this user ?'
        );
        let heading = this.translate.instant('Delete');
        let size = this.utilitiesService.isMobileAlertModal();
        const dialogRef = this.dialog.open(AlertModalComponent, {
            data: { heading, content },
            maxWidth: '',
            width: `${size.width}`,
            height: `${size.height}`,
            panelClass: 'no-padding',
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe(async (resp) => {
            if (resp) {
                try {
                    this.usersService.deleteUser(id).subscribe((data) => {
                        this.utilitiesService.showSuccessToast(
                            'User deleted successfully'
                        );
                        this.getAllUsers();
                    });
                } catch {
                } finally {
                }
            }
        });
    }

    addCustomer() {
        this.userDetails = null;
        this.formInit();
        this.toggle()
    }

    getGroupsName(group = []) {
        return group.filter((data) => data.id).map((item) => { return item.name }).toString();
    }

    updateUser(userDetail) {
        this.userDetails = userDetail;
        let ids = this.userDetails.groups.filter((data) => data.id).map((items) => { return items.id });

        this.formInit();
        this.form.controls.group_ids.setValue(ids);
        this.toggle()
    }

    toggle() {
        this.createUser.toggle();
    }

    visibility(){

    }

    save() {
        if (this.form.valid) {
            let form = this.form.value;
            for (let key in form) {
                let value = form[key];
                if (!value) {
                    delete form[key];
                }
            }
            if (form.id) {
                this.update(form);
            } else {
                this.saveUser(form);
            }
        }
    }



    async saveUser(form) {
        try {
            const saveUser = await this.usersService.saveUser(form).toPromise();
            if (saveUser) {
                this.utilitiesService.showSuccessToast(
                    'User created successfully'
                );
                this.toggle()
                this.getAllUsers();
            }
        } catch {
        } finally {
        }
    }

    async update(form) {
        try {
            const saveUser = await this.usersService
                .updateUser(form)
                .toPromise();
            if (saveUser) {
                this.utilitiesService.showSuccessToast(
                    'User updated successfully'
                );
                this.toggle()
                this.getAllUsers()
            }
        } catch {
        } finally {
        }
    }
}
