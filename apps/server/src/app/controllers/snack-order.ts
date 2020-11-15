import mongoose, { Schema } from 'mongoose';
import { ISnackOrderModel, ISnackInCart, ISnack, IUser } from '@csl/shared';
import { Snack } from '@controllers/snack';
import { User } from '@controllers/user';
import { Class } from '@controllers/classe';
import { Server } from 'socket.io';

const SnackOrderSchema = new Schema(
  {
    id: { type: String, required: true },
    cart: { type: Array, required: true },
    date: { type: String, required: true },
    total: { type: Number, required: true },
    confirmed: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    classID: { type: String, required: true },
  },
  { versionKey: false }
);

export const SnackOrder = mongoose.model<ISnackOrderModel>(
  'snackorder',
  SnackOrderSchema,
  'snack-orders'
);

export const addSnackToCart = async (id: ISnack['id'], user: IUser) => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const today = `${day}-${month}-${year}`;

  const result = await SnackOrder.findOne({ id: user.id, date: today }).then(
    async (order) => {
      if (order && order.confirmed) {
        return {
          success: false,
          code: 'order-confirmed',
        };
      }

      const snack = await Snack.findOneAndUpdate(
        { id },
        { $inc: { maxQuantity: -1 } }
      );

      if (!order) {
        const productInCart: ISnackInCart = {
          id,
          name: snack!.name,
          quantity: 1,
        };

        return new SnackOrder({
          id: user.id,
          cart: [productInCart],
          date: today,
          total: snack!.price,
          classID: user.classID,
          name: `${user.firstName} ${user.lastName}`,
        })
          .save()
          .then((res) => {
            return { success: true };
          })
          .catch((err) => {
            return {
              success: false,
              error: err,
            };
          });
      } else if (order) {
        let index: number | undefined;
        const productExists = order.cart.find((x) => x.id === id);

        if (productExists) {
          index = order.cart.findIndex((x) => x.id === id);
        } else {
          index = undefined;
        }

        if (typeof index !== 'undefined') {
          const quantityQuery = `cart.${index}.quantity`;
          let update = {
            $inc: { [quantityQuery]: 1, total: snack!.price },
          };

          return SnackOrder.findOneAndUpdate(
            { id: user.id, date: today },
            update
          )
            .then((res) => {
              return { success: true };
            })
            .catch((err) => {
              return { success: false, err };
            });
        } else {
          const productInCart: ISnackInCart = {
            id,
            name: snack!.name,
            quantity: 1,
          };

          return SnackOrder.findOneAndUpdate(
            { id: user.id, date: today },
            {
              $push: { cart: productInCart },
              $inc: { total: snack!.price },
            }
          )
            .then((res) => {
              return { success: true };
            })
            .catch((err) => {
              return { success: false, err };
            });
        }
      }
    }
  );

  return result;
};

export const getSnacksCart = async (id: IUser['id']) => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const today = `${day}-${month}-${year}`;

  const result = await SnackOrder.findOne({ id, date: today });

  return result;
};

export const deleteSnackFromCart = async (
  id: ISnack['id'],
  userID: IUser['id']
) => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const today = `${day}-${month}-${year}`;

  const previousOrder = await SnackOrder.findOne({ id: userID, date: today });

  if (previousOrder!.confirmed === true) {
    return {
      success: false,
      err: 'order-confirmed',
    };
  }

  const index: number = previousOrder!.cart.findIndex((x) => x.id === id);
  const quantity: number = previousOrder!.cart[index].quantity;

  const snack = await Snack.findOneAndUpdate(
    { id },
    { $inc: { maxQuantity: quantity } }
  );

  const price: number = snack!.price;

  const removedTotal = -quantity * price;

  const result = await SnackOrder.findOneAndUpdate(
    { id: userID, date: today },
    {
      $pull: {
        cart: {
          id,
        },
      },
      $inc: {
        total: removedTotal,
      },
    },
    { new: true }
  )
    .then(async (res) => {
      if (res!.cart.length === 0) {
        await SnackOrder.findOneAndRemove({ id: userID, date: today });
      }

      return { success: true };
    })
    .catch((err) => {
      return { success: false, err };
    });

  return result;
};

export const confirmSnackOrder = async (user: IUser) => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const today = `${day}-${month}-${year}`;

  const result = await SnackOrder.findOne({ id: user.id, date: today })
    .then((order) => {
      if (order!.total > user.snackCredit) {
        return { success: false, err: 'no-credit' };
      } else {
        return User.findOneAndUpdate(
          { id: user.id },
          { $inc: { snackCredit: -order!.total } },
          { new: true }
        ).then((res) => {
          Class.findOneAndUpdate(
            { id: user.classID, 'members.email': user.email },
            { $set: { 'members.$.snackCredit': res!.snackCredit } }
          ).then();

          return SnackOrder.findOneAndUpdate(
            { id: user.id, date: today },
            { confirmed: true }
          )
            .then((res) => {
              return { success: true };
            })
            .catch((err) => {
              return { success: false, err };
            });
        });
      }
    })
    .catch((err) => {
      return { success: false, err };
    });

  return result;
};

export const snackOrderConfig = (io: Server) => {
  SnackOrder.watch([], {
    fullDocument: 'updateLookup',
  }).on('change', (change: any) => {
    if (change.operationType === 'insert' || 'replace') {
      io.to('Bar Admin').emit('Orders', {
        change: change.fullDocument,
        operationType: change.operationType,
      });
    } else if (change.operationType === 'delete') {
      io.to('Bar Admin').emit('Orders', {
        change: { _id: change.documentKey._id },
        operationType: change.operationType,
      });
    }
  });

  io.on('connection', async (socket) => {
    socket.join('Bar Admin');

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const today = `${day}-${month}-${year}`;

    const orders = await SnackOrder.find({ date: today });

    const classes = [...new Set(orders.map((order) => order.classID).sort())];

    io.to('Bar Admin').emit('Orders', {
      orders,
      classes,
    });
  });
};
