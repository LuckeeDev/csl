import mongoose, { Schema } from 'mongoose';
import { Product } from '@controllers/product';
import { IOrder, IOrderModel, IProductInCart, IProduct, IUser, IHttpRes } from '@csl/shared';

const OrderSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    gadgets: { type: Array, required: true, default: [] },
    photos: { type: Array, required: true, default: [] },
    gadgetTotal: { type: Number, required: true, default: 0 },
    photoTotal: { type: Number, required: true, default: 0 },
    gadgetsConfirmed: { type: Boolean, required: true, default: false },
    photosConfirmed: { type: Boolean, required: true, default: false },
    classID: { type: String, required: true },
  },
  { skipVersioning: true }
);

export const Order = mongoose.model<IOrderModel>('order', OrderSchema, 'gadget-orders');

// Create a new order
export const addToCart = async (product: IProductInCart, user: IUser): Promise<IHttpRes<any>> => {
  const productInDb = await Product.findOne({ id: product.id }).then(
    (res: IProduct | null) => {
      return {
        price: res!.price * product.quantity * 100,
        category: res!.category,
      };
    }
  );

  const categoryConfirmed =
    productInDb.category === 'gadgets' ? 'gadgetsConfirmed' : 'photosConfirmed';

  return Order.findOne({
    id: user.id,
  }).then((order: IOrder | null) => {
    if (!order) {
      // Case in which an order with this ID doesn't exist
      const gadgetTotal =
        productInDb.category === 'gadgets' ? productInDb.price : 0;
      const photoTotal =
        productInDb.category === 'photos' ? productInDb.price : 0;

      const gadgets = productInDb.category === 'gadgets' ? [product] : [];
      const photos = productInDb.category === 'photos' ? [product] : [];

      return new Order({
        gadgets,
        photos,
        id: user.id,
        gadgetTotal,
        photoTotal,
        confirmed: false,
        classID: user.classID,
      })
        .save()
        .then((res) => {
          return {
            success: true,
          };
        });
    } else if (order[categoryConfirmed] === true) {
      // Case in which the order for this category is already confirmed
      return {
        success: false,
        err: 'already-confirmed',
      };
    } else {
      // Case in which an order exists, is not confirmed but needs to be updated
      const gadgetTotal =
        productInDb.category === 'gadgets'
          ? order.gadgetTotal + productInDb.price
          : order.gadgetTotal;

      const photoTotal =
        productInDb.category === 'photos'
          ? order.photoTotal + productInDb.price
          : order.photoTotal;

      return Order.findOneAndUpdate(
        { id: user.id },
        { $push: { [productInDb.category]: product }, gadgetTotal, photoTotal }
      ).then((res) => {
        return {
          success: true,
        };
      });
    }
  });
};

// Confirm an order
export const confirmOrder = async (id: any, category: any) => {
  const confirmedCategory =
    category === 'gadgets' ? 'gadgetsConfirmed' : 'photosConfirmed';

  const confirmedTotal = category === 'gadgets' ? 'gadgetTotal' : 'photoTotal';

  return Order.findOneAndUpdate(
    { id },
    {
      [confirmedCategory]: true,
    }
  ).then((res: any) => {
    return res[confirmedTotal];
  });
};

// Get all orders of a user
export const getAllOrders = async (id: any) => {
  return Order.findOne({ id }).then((res: any) => {
    return {
      gadgets: res.gadgets,
      photos: res.photos,
      gadgetsConfirmed: res.gadgetsConfirmed,
      photosConfirmed: res.photosConfirmed,
    };
  });
};

// Delete an order
export const deleteFromCart = async (id: any, product: any) => {
  const productInDb: IProduct = await Product.findOne({
    id: product.id,
  }).then((res) => {
    return res!;
  });

  const category = productInDb.category;
  const singlePrice = productInDb.price;
  const categoryConfirmed =
    category === 'gadgets' ? 'gadgetsConfirmed' : 'photosConfirmed';

  const newTotal: number | false = await Order.findOne({ id }).then(
    async (res) => {
      if (res![categoryConfirmed] === true) {
        return false;
      }

      const productInCart = res![category].find(
        (obj) =>
          obj.id == product.id &&
          obj.size == product.size &&
          obj.color == obj.color &&
          obj.quantity == product.quantity
      );

      const quantity = productInCart!.quantity;
      const oldTotal =
        category === 'gadgets' ? res!.gadgetTotal : res!.photoTotal;

      return oldTotal - singlePrice * quantity * 100;
    }
  );

  if (newTotal === false) {
    return {
      success: false,
      err: 'Your order has already been confirmed',
    };
  }

  const totalToChange = category === 'gadgets' ? 'gadgetTotal' : 'photoTotal';

  const res = await Order.findOneAndUpdate(
    { id },
    {
      $pull: {
        [category]: {
          id: product.id,
          size: product.size,
          color: product.color,
          quantity: product.quantity,
        },
      },
      [totalToChange]: newTotal,
    }
  )
    .then((res) => {
      return {
        success: true,
        msg: 'Order deleted',
      };
    })
    .catch((err) => {
      return {
        success: false,
        err,
      };
    });

  return res;
};
