import { Component, OnInit } from '@angular/core';
import { ApiCallService } from './services/api-call.service';
import { Movie } from './interfaces/api/movie';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Movie', url: '/movies', icon: 'mail' },
    { title: 'Movie Search', url: '/movieSearch', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private ApiCallService: ApiCallService) {}

  ngOnInit() {}
}
