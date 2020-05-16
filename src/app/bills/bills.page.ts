import { Component, OnInit, ViewChild, Renderer, ElementRef } from '@angular/core';
import { BillService } from '../services/bill.service';
import { AuthService } from '../services/auth.service';
import { AppService } from '../services/app.service';
import { Chart } from 'chart.js';
import { Bill } from '../models/Bill';
@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {

  // @ViewChild('barCanvas') barCanvas: ElementRef;
  // @ViewChild('barCanvas', {static: true}) barCanvas: any;
  // @ViewChild('doughnutCanvas', {static: true}) doughnutCanvas: any;
  @ViewChild('lineCanvas', {static: true}) lineCanvas: any;

  @ViewChild('myFlag', {static: true})
  products: any;

  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  ITER = 1;
  myBills: Array<any> = new Array<any>();
  monthSum; // = new Array(12).fill(0);
  months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 
  'lipiec','sierpień', 'wrzesień', 'pażdziernik', 'listopad', 'grudzień']
  customAlertOptions: any = {
    header: 'Wybierz okres podsumowania:',
    // subHeader: 'Select your toppings',
    // message: '$1.00 per topping',
    translucent: true,
  };
  size = 0;


  constructor(private billService: BillService,
              private authService: AuthService,
              private appService: AppService,
              private renderer: Renderer
    ) {
      this.config();
    }

  async ngOnInit() {
    await this.configureBills();
    this.makeCanva();
  }

  config(){
    let count = this.appService.getTime().substr(5, 2);

    this.monthSum = new Array(+count).fill(0);
    this.months = this.months.slice(0, +count + 1);

  }


  makeCanva(){
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: this.months,
          datasets: [
            {
              label: 'kwota',
              fill: false,
              lineTension: 0.05,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.monthSum,
              spanGaps: false
            }
          ]
        }
      });

  }

  getBillss() {
    return this.myBills.slice(0, this.ITER);
  }

  async configureBills() {
    this.myBills = await (await this.billService.getBillsFromService()).sort(this.compare);
    this.size = this.myBills.length;
    if (this.size) {
      this.renderer.setElementStyle( this.products.nativeElement, 'visibility', 'visible' );
    }

    this.myBills.forEach( (bill) => {
      const month = bill.date.substr(5, 2);
      this.monthSum[month - 1] += bill.price;
    }
    );

  }

  compare(a, b) {
    const bandA = a.date.toUpperCase();
    const bandB = b.date.toUpperCase();

    let comparison = 0;
    if (bandA < bandB) {
      comparison = 1;
    } else if (bandA > bandB) {
      comparison = -1;
    }
    return comparison;
  }

  increment() {
    this.ITER++;
  }

  getValue(): string {

    if ( this.ITER >= this.myBills.length ) {
        return '';
    }
    return 'następny...';

  }

}
/*
  async getBills() {


    this.myBills = await (await this.billService.getBillsFromService()).sort(this.compare);
    this.myBills.forEach( (bill) => {

      let month = bill.date.substr(5, 2);
      this.monthSum[month - 0] += bill.price;
      console.log(month);
     // if (bill.date > '2020.05.10') {
        // this.monthSum.push(bill);
     // }
    } 
   
    );
    console.log(this.monthSum);
    //this.billService.getBills(this.authService.getUserName()).subscribe(((myBills) => {
     // this.myBills = myBills.sort(this.compare); // .filter((task: Task) => task.name === 'f 31.60.228.28');
   // }));
  }

  */

  //getLastMonthBills() {

   // return this.myBills.filter( (item) => {  } );
  //}

 
/*
this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      }
    });

*/