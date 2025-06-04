import { Inject, Injectable, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilitiesService } from './utilitiesService';
import { Languages } from 'app/shared/constants';
export interface language {
    id: any;
    name: string;
    dir: string;
}

@Injectable({
    providedIn: 'root',
})
export class TranslationService {
    language = new Languages().languages;
    private _languageBehaviorSubject$ = new BehaviorSubject<{
        lang: string;
    }>({
        lang: null,
    });

    reloadPage = () => {
        window.location.reload();
    };

    get currentLang(): string {
        return this._languageBehaviorSubject$.getValue().lang;
    }

    constructor(
        private translateService: TranslateService,
        private utilitiesService: UtilitiesService
    ) {
        this.setDefaultLanguage(this.language[0].id);

        this.translateService.onLangChange.subscribe(({ lang }) => {
            this._languageBehaviorSubject$.next({ lang });
        });

        const lang = this.getLanguageStorage();
        this._languageBehaviorSubject$.next({ lang: lang ? lang : this.language[0].id });
        lang && this.changeLanguage(lang, true);
    }

    getCurrentLang(): string {
        return this._languageBehaviorSubject$.getValue().lang;
    }

    getLanguageStorage() {
        return this.utilitiesService.getStorageItem('language');
    }

    setLanguageStorage(lang: string) {
        this.utilitiesService.setStorageItem('language', lang);
    }

    onLanguageChange(): Observable<{ lang: string; translations: Object }> {
        return this.translateService.onLangChange;
    }

    getLanguageSubject(): Observable<{ lang: string }> {
        return this._languageBehaviorSubject$;
    }

    getDirection(): string {
        return this.language.filter(
            (data) => data.id == this.getCurrentLang()
        )[0].dir || 'ltr';
    }

    changeLanguage(lang, changeDirection = false) {
        if (lang == this.translateService.currentLang) {
            return;
        }

        this.translateService.use(lang);
        this._languageBehaviorSubject$.next({ lang });
    }

    setDefaultLanguage(lang: string) {
        this.translateService.setDefaultLang(lang);
    }

    getCurrentLangaugeName(): string {
        return this.language.filter(
            (data) => data.id == this.getCurrentLang()
        )[0].name;
    }

    async setLanguage(lang: string, confirmation = false) {
        this.setLanguageStorage(lang);
        this.changeLanguage(lang, true);
    }

    async toggleLanguage(lang) {
        if (lang == this.translateService.currentLang) {
            return;
        }
        this.setLanguageStorage(lang);
        this.reloadPage();
    }

    getTranslatedField(item: any, field_name: string) {
        const id = this.language.filter(
            (data) => data.id == this.getCurrentLang()
        )[0].id;
        return item
            ? item?.[`${field_name}_${id}`]
                ? item?.[`${field_name}_${id}`]
                : item?.[`${field_name}`]
            : '';
    }
}
