import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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

  constructor(
    private router: Router,
    private userService: UserService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.load().then(() => {});
  }

  async load() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    this.userService.getUsers(this.page).subscribe(k => {
      this.users = k;
      Utils.dismissLoading(loading);
    });
  }

  async refresh(event) {
    await this.load();
    event.target.complete();
  }

  createUser() {
    this.router.navigate(['/create']);
  }

  itemTapped(event, user) {
    this.router.navigate(['/detail', user.id]);
  }
}
