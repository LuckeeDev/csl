import { IProduct } from '@csl/shared';
import { Order, Product } from '@models';

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
  });

  const category = productInDb.category;
  const singlePrice = productInDb.price;
  const categoryConfirmed =
    category === 'gadgets' ? 'gadgetsConfirmed' : 'photosConfirmed';

  const newTotal: number | false = await Order.findOne({ id }).then(
    async (res) => {
      if (res[categoryConfirmed] === true) {
        return false;
      }

      const productInCart = res[category].find(
        (obj) =>
          obj.id == product.id &&
          obj.size == product.size &&
          obj.color == obj.color &&
          obj.quantity == product.quantity
      );

      const quantity = productInCart.quantity;
      const oldTotal =
        category === 'gadgets' ? res.gadgetTotal : res.photoTotal;

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
    .then(() => {
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
