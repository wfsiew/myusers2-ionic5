import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Utils } from 'src/app/helpers/utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  title = 'USERS';
  users: any = [];
  page = 1;

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll, { static: false }) virtualScroll: IonVirtualScroll;

  constructor(
    private router: Router,
    private userService: UserService,
    public loadingController: LoadingController
  ) {
  }

  ngOnInit() {
    this.loadData(null);
  }

  async load() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    this.userService.getUsers(this.page).subscribe((k: any) => {
      for (let i = 0; i < k.length; i++) {
        this.users.push(k[i]);
      }
      this.page = this.page + 1;
      this.virtualScroll.checkEnd();
      this.infiniteScroll.complete();
      Utils.dismissLoading(loading);
    });
  }

  async refresh(event) {
    this.page = 1;
    this.users = [];
    await this.load();
    event.target.complete();
  }

  async loadData(event) {
    await this.load();
  }

  createUser() {
    this.router.navigate(['/create']);
  }

  itemTapped(event, user) {
    this.router.navigate(['/detail', user.id]);
  }
}
