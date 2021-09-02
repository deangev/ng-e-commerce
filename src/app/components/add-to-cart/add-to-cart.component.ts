import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  @Input() isAdded: boolean | undefined = false;
  constructor() { }

  ngOnInit(): void {
    document.querySelectorAll('.button').forEach(button => button.addEventListener('click', e => {
      if (!button.classList.contains('loading')) {
        button.classList.add('loading');

        setTimeout(() => button.classList.remove('loading'), 3700);
      }
      e.preventDefault();
    }));

  }
}
