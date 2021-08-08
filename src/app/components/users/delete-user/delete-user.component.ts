import { User } from '../../../models/users';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  @Input() user: User;
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cancelDelete(){
    this.cancel.emit();
  }

  confirmDelete(){
    this.confirm.emit();
  }

}
