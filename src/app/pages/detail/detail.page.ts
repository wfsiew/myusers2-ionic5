import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Utils } from 'src/app/helpers/utils';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  title = 'DETAIL';
  user: any = {
    first_name: '',
    last_name: ''
  }
  id: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.load().then(() => {});
  }

  async load() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    this.userService.getUser(this.id).subscribe(k => {
      this.user = k;
      Utils.dismissLoading(loading);
    });
  }

  edit() {
    this.router.navigate(['/edit', this.id]);
  }

  async delete() {
    let cfm = await this.alertController.create({
      header: '',
      subHeader: '',
      message: 'Are you sure to delete this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.userService.deleteUser(this.id).subscribe(k => {
              this.router.navigate(['/list']);
            });
          }
        }
      ]
    });
    await cfm.present();
  }
}
