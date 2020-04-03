import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/models';
import { Utils } from 'src/app/helpers/utils';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  title = 'CREATE';
  mform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastController: ToastController
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.mform = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  createUser() {
    let m = this.mform.value;
    let o = new User(0, m.first_name, m.last_name, '');
    this.userService.createUser(o).subscribe(k => {
      Utils.showToast('User has been successfully created', this.toastController);
      this.router.navigate(['/list']);
    });
  }
}
