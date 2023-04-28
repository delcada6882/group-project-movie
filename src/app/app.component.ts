import { Component, OnInit } from '@angular/core';
import { ApiCallService } from './services/api-call.service';
import { Movie } from './interfaces/movie';
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    public appPages = [
        { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
        { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
        { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
        { title: 'Archived', url: '/folder/archived', icon: 'archive' },
        { title: 'Trash', url: '/folder/trash', icon: 'trash' },
        { title: 'Spam', url: '/folder/spam', icon: 'warning' },
    ];
    public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    constructor(private ApiCallService: ApiCallService) { }

    showData() {
        this.ApiCallService.getData()
            .subscribe((data: Movie) => {
                console.log(data);
            });
    }

    ngOnInit() {
        this.showData();

    }
}
