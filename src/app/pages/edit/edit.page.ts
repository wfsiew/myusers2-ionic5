import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { User } from 'src/app/models/models';
import { Utils } from 'src/app/helpers/utils';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  title = 'EDIT';
  mform: FormGroup;
  user: any;
  id: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private msService: MessageService,
    private toastController: ToastController
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.load();
  }

  createForm() {
    this.mform = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  load() {
    this. user = this.userService.getUser(this.id).subscribe(k => {
      this.user = k;
      this.mform.patchValue({
        first_name: this.user.first_name,
        last_name: this.user.last_name
      });
    });
  }

  updateUser() {
    let m = this.mform.value;
    let o = new User(this.id, m.first_name, m.last_name, '');
    this.userService.updateUser(o).subscribe(k => {
      this.msService.send('user:updated', o);
      Utils.showToast('User has been successfully updated', this.toastController);
      this.router.navigate(['/list']);
    });
  }
}
