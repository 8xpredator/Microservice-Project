import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() show:any;
  @Input() receipt:any;
  @Input() receipt1:any;
  @Input() rec2:any;
  rno:any;
  title = 'app';
  elementType = 'url';
  constructor() { }

  ngOnInit(): void {
    this.rno = parseInt(localStorage.getItem("Receiptno"));
    //localStorage.removeItem('Receiptno');

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    localStorage.removeItem('Receiptno');
    
  }

}
