import { Component, OnInit, Input, ViewChild, Renderer } from '@angular/core';
import { Bill } from '../models/Bill';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {

  @Input() bill: Bill;

  @ViewChild('products', {static: true})
  products: any;

  accordation = false;
  constructor(private renderer: Renderer) { }

  ngOnInit() {
      this.renderer.setElementStyle(this.products.nativeElement, 'webkitTransition', 'opacity 500ms, max-height 500ms, padding 500ms' );
  }
  toggleShowBill() {

 
   if (this.accordation) {
     this.renderer.setElementStyle( this.products.nativeElement, 'max-height', '0px' );
     this.renderer.setElementStyle( this.products.nativeElement, 'padding', '0px 0px' );
     this.renderer.setElementStyle( this.products.nativeElement, 'opacity', '0.0' );
     // this.renderer.setElementStyle( this.products.nativeElement, 'visibility', 'hidden' );
   } else {
     this.renderer.setElementStyle( this.products.nativeElement, 'max-height', '200px' );
     this.renderer.setElementStyle( this.products.nativeElement, 'padding', '8px 0px' );
     this.renderer.setElementStyle( this.products.nativeElement, 'opacity', '1.0' );
     // this.renderer.setElementStyle( this.products.nativeElement, 'visibility', 'visible' );
   }
 
     //console.log(this.accordation);
       this.accordation = !this.accordation;
 
   }

}
