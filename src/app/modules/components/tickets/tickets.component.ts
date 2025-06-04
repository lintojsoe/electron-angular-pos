import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from 'app/services/homeService';
import { TranslationService } from 'app/services/translation.service';
import { WebSocketService } from 'app/services/websocketService';
import { Pagination } from 'app/shared/constants';
import { of } from 'rxjs';
import { concatMap, debounceTime, delay, retryWhen, tap } from 'rxjs/operators';

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
    @Output()
    selectTicketHandler: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    closeHandler: EventEmitter<any> = new EventEmitter<any>();
    form: FormGroup;
    page = new Pagination().page;
    selectedTicket: any = null;
    tabs = [
        {
            id: 1,
            index: 0,
            icon: 'heroicons_outline:ticket',
            name: 'Live Tickets',
            name_ar: 'تذاكر حية',
            name_en: 'Live Tickets',
            name_ur: '',
        },
        {
            id: 2,
            index: 1,
            icon: 'history',
            name: 'History',
            name_ar: 'تاريخ',
            name_en: 'History',
            name_ur: '',
        },
    ];
    loading = false;
    tickets = [];
    isCash: boolean = false;
    selectedTabIndex = 0;
    isLoading = false;
    constructor(
        private fb: FormBuilder,
        public translationService: TranslationService,
        private homeService: HomeService,
        private webSocketService: WebSocketService
    ) {}

    close() {
        this.closeHandler.emit();
    }

    getDate(date) {
        if (date) {
            return new Date(date);
        }
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            search: [''],
        });
        this.getTickets();
        this.form
            .get('search')
            .valueChanges.pipe(debounceTime(400))
            .subscribe((data) => {
                this.page.offset = 0;
                this.getTickets();
            });
    }

    async getActiveTicket() {
        try {
            const activeTickets = await this.homeService
                .getActiveTickets({
                    offset: this.page.offset,
                    limit: this.page.pageSize,
                    query: this.form.get('search').value || '',
                })
                .toPromise();
            if (activeTickets) {
                this.loading = false;
                this.page.length = activeTickets.count;
                this.tickets = activeTickets.results;
                this.page.offset = this.tickets.length;
            }
        } catch {
            this.loading = false;
        } finally {
        }
    }

    async getTickets() {
        this.loading = true;
        switch (this.selectedTabIndex) {
            case 0: {
                this.getActiveTicket();
                break;
            }
            case 1: {
                this.getHistory();
                break;
            }
            default: {
                this.getActiveTicket();
                break;
            }
        }
    }

    tabChanged() {
        this.page.offset = 0;
        this.tickets = null;
        this.form.controls.search.setValue('');
    }

    async getHistory() {
        try {
            const history = await this.homeService
                .getHistory({
                    offset: this.page.offset,
                    limit: this.page.pageSize,
                    query: this.form.get('search').value || '',
                })
                .toPromise();
            if (history) {
                this.loading = false;
                this.page.length = history.count;
                this.tickets = history.results;
                this.page.offset = this.tickets.length;
            }
        } catch {
            this.loading = false;
        } finally {
        }
    }

    checkPagination() {
        return this.page.offset >= this.page.length ? false : true;
    }

    async loadMore() {
        try {
            this.page.offset = this.tickets.length;
            let history = null;
            this.isLoading = true;
            if (this.selectedTabIndex == 1) {
                history = await this.homeService
                    .getHistory({
                        offset: this.page.offset,
                        limit: this.page.pageSize,
                    })
                    .toPromise();
            } else if (this.selectedTabIndex == 0) {
                history = await this.homeService
                    .getActiveTickets({
                        offset: this.page.offset,
                        limit: this.page.pageSize,
                    })
                    .toPromise();
            }
            if (history) {
                this.isLoading = false;
                this.page.length = history.count;
                this.tickets = this.tickets.concat(history.results);
                this.page.offset = this.tickets.length;
                console.log(this.page.offset);
            }
        } catch {
            this.isLoading = false;
        } finally {
        }
    }

    selectTickets(ticketObject) {
        this.selectedTicket = ticketObject;
        this.selectTicketHandler.emit(this.selectedTicket);
        this.close();
    }
}
