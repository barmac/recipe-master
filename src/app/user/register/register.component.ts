import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../user';
import {AlertService} from '../../alert/alert.service';
import {UserService} from '../user.service';


@Component({
    templateUrl: './register.component.html'
})

export class RegisterComponent {
  public user: User = new User;
  public loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.user)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
