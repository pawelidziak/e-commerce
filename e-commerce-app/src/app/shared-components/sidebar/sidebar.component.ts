import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav') input;
  public hideSidenav = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/menu.svg'));
    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/close.svg'));
    iconRegistry.addSvgIcon('account-circle', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/account-circle.svg'));

    if (window.innerWidth < 960) {
      this.hideSidenav = true;
      console.log(this.hideSidenav);
    }
  }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.hideSidenav = event.target.innerWidth <= 960;
  }

}
