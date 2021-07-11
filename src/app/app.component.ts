import { Component, OnInit } from '@angular/core';
import { ShareService } from './services/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'newApp';
  constructor(private shareService: ShareService) { 
  }

  ngOnInit(): void {
    
  }
}
