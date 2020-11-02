import { ISnackOrder } from '@global/@types/snacks';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SnacksService } from '@global/services/snacks/snacks.service';
import { Subscription } from 'rxjs';
import { SocketData } from '@global/@types/snacks';
import produce from 'immer';

export namespace OrdersConnection {
  export class Open {
    static readonly type = '[Orders Socket] Open';
  }

  export class Close {
    static readonly type = '[Orders Socket] Close';
  }
}

export interface OrdersStateModel {
  orders: ISnackOrder[];
  classes: string[];
}

@State<OrdersStateModel>({
  name: 'orders',
})
@Injectable()
export class OrdersState {
  private connection: Subscription;

  constructor(private snacks: SnacksService) {}

  @Action(OrdersConnection.Open)
  listen(ctx: StateContext<OrdersStateModel>) {
    this.connection = this.snacks.socket$().subscribe((data: SocketData) => {
      if (data.orders) {
        return ctx.setState({
          orders: data.orders,
          classes: data.classes,
        });
      } else if (data.change) {
        return ctx.setState(
          produce(ctx.getState(), (draft) => {
            if (data.operationType === 'insert') {
              draft.orders.push(data.change);

              if (!draft.classes.includes(data.change.classID)) {
                draft.classes.push(data.change.classID);
                draft.classes.sort();
              }
            } else if (data.operationType === 'replace' || 'update') {
              const i = draft.orders.findIndex((x) => x.id === data.change.id);

              draft.orders[i] = data.change;
            } else if (data.operationType === 'delete') {
              const i = draft.orders.findIndex(
                (x) => x._id === data.change._id
              );

              draft.orders.splice(i, 1);
            }
          })
        );
      }
    });
  }

  @Action(OrdersConnection.Close)
  closeConnection() {
    this.connection.unsubscribe();
  }
}
