import { Component, OnInit } from '@angular/core';
import { SnacksService } from '@global/services/snacks/snacks.service';
import { Observable } from 'rxjs';
import { ISnack } from '@global/@types/snacks';
import { DialogService } from '@global/ui/services/dialog/dialog.service';
import { ToastrService } from '@global/ui/services/toastr/toastr.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'maxQuantity',
    'options',
  ];

  snacks: Observable<ISnack[]>;

  constructor(
    private snacksService: SnacksService,
    private dialog: DialogService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.snacks = this.snacksService.getSnacks();
  }

  deleteProduct(id) {
    this.dialog
      .open({
        title: 'Sei sicuro?',
        text:
          'Una volta eliminato questo prodotto, non sarà più possibile recuperarlo',
        color: 'warn',
        answer: 'Sì, elimina il prodotto',
      })
      .subscribe((res) => {
        this.snacksService.deleteSnack(id).subscribe((res) => {
          this.toastr.show({
            message: 'Prodotto eliminato',
            action: 'Chiudi',
            duration: 5000,
          });

          this.snacks = this.snacksService.getSnacks();
        });
      });
  }

  updateQuantity(id, quantity) {
    this.dialog
      .open({
        title: 'Sei sicuro?',
        text: `La nuova quantità disponibile sarà ${quantity}`,
        color: 'warn',
        answer: 'Sì, modifica il prodotto',
      })
      .subscribe((res) => {
        this.snacksService.updateQuantity(id, quantity).subscribe((res) => {
          this.toastr.show({
            message: `Prodotto modificato`,
            action: 'Chiudi',
            duration: 5000,
          });

          this.snacks = this.snacksService.getSnacks();
        });
      });
  }
}
