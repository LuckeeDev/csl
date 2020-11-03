import mongoose, { Schema } from 'mongoose';
import {
  TRole,
  IUser,
  IUserModel,
  IHttpRes,
  IAccount,
} from '@csl/shared';

// Stripe initialization
import { environment as env } from '@environments/environment';
import Stripe from 'stripe';
import { Class, updateSnackCreditInClass } from '@controllers/classe';
import { Order } from './order';
const stripe = new Stripe(env.STRIPE_KEY, {
  apiVersion: '2020-08-27',
  typescript: true,
});

const UserSchema = new Schema(
  {
    id: { type: String },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    classID: { type: String },
    snackCredit: { type: Number, default: 0 },
    photoURL: { type: String },
    stripeID: { type: String },
    isVice: { type: Boolean },
    isRappre: { type: Boolean },
    isQp: { type: Boolean },
    isRappreDiClasse: { type: Boolean },
    isBar: { type: Boolean },
    isAdmin: { type: Boolean },
  },
  { skipVersioning: true }
);

export const User = mongoose.model<IUserModel>('user', UserSchema);

// Create an account (for admin)
export const createAccount = async (
  account: IAccount
): Promise<IHttpRes<any>> => {
  console.log(account.email);
  await Class.findOneAndUpdate(
    { id: account.classID },
    {
      $push: {
        members: { email: account.email, snackCredit: 0 },
      },
    }
  )
    .then()
    .catch((err) => {
      return {
        success: false,
        err,
      };
    });

  return new User(account)
    .save()
    .then(() => {
      return {
        success: true,
      };
    })
    .catch((err) => {
      return {
        success: false,
        err,
      };
    });
};

// Remove an account (for admin)
export const removeAccount = async (
  email: IUser['email']
): Promise<IHttpRes<any>> => {
  const user = await User.findOneAndDelete({ email }).then();

  const classe = await Class.findOne({ id: user.classID });

  const elementToPull = classe.members.find((x) => x.email === email);

  return Class.findOneAndUpdate(
    { id: user.classID },
    {
      $pull: {
        members: elementToPull,
      },
    }
  )
    .then(() => {
      return {
        success: true,
      };
    })
    .catch((err) => {
      return {
        success: false,
        err,
      };
    });
};

// Add a role to a user
export const addRole = async (email: IUser['email'], role: TRole) => {
  const classID = await User.findOneAndUpdate(
    { email: email },
    { [role]: true }
  ).then((user) => {
    return user!.classID;
  });

  return Class.findOne({ id: classID })
    .then((classe) => {
      const member = classe!.members.find((x) => x.email === email);

      member!.roles.push(role);

      return Class.findOneAndUpdate(
        { id: classID, members: { $elemMatch: { email } } },
        { 'members.$': member }
      )
        .then((res) => {
          return {
            success: true,
          };
        })
        .catch((err) => {
          return {
            success: false,
            err,
          };
        });
    })
    .catch((err) => {
      return {
        success: false,
        err,
      };
    });
};

// Remove a role from a user
export const removeRole = async (email: IUser['email'], role: TRole) => {
  const classID = await User.findOneAndUpdate(
    { email: email },
    { $unset: { [role]: true } }
  ).then((user) => {
    return user!.classID;
  });

  return Class.findOne({ id: classID }).then((classe) => {
    const member = classe!.members.find((x) => x.email === email);

    const i = member!.roles.findIndex((x) => x === role);

    member!.roles.splice(i, 1);

    return Class.findOneAndUpdate(
      { id: classID, members: { $elemMatch: { email } } },
      { 'members.$': member }
    )
      .then((res) => {
        return {
          success: true,
        };
      })
      .catch((err) => {
        return {
          success: false,
          err,
        };
      });
  });
};

// Get roles of a user
export const getRoles = (email: any) => {
  return User.findOne({ email: email }).then((user: any) => {
    const roles = [];
    if (user.isVice) {
      roles.push('isVice');
    }
    if (user.isRappre) {
      roles.push('isRappre');
    }
    if (user.isRappreDiClasse) {
      roles.push('isRappreDiClasse');
    }
    if (user.isQp) {
      roles.push('isQp');
    }
    return roles;
  });
};

// Get the stripe customer ID of a user
export const getStripeID = async (
  id: IUser['id']
): Promise<string | undefined> => {
  const stripeID = await User.findOne({ id }).then((user) => {
    if (user && user.isRappreDiClasse && user.stripeID) {
      return user.stripeID;
    } else if (user) {
      return stripe.customers
        .create({
          name: `${user.firstName} ${user.lastName}`,
          email: `${user.email}`,
          description: `Rappresentante della ${user.classID}`,
        })
        .then(async (customer) => {
          const newID = await User.findOneAndUpdate(
            { id },
            { stripeID: customer.id }
          ).then((res: any) => {
            return customer.id;
          });

          return newID;
        });
    }
  });

  return stripeID;
};

// Update credit (for bar)
export const updateCredit = async (
  email: IUser['email'],
  money: IUser['snackCredit']
) => {
  const result = await User.findOne({ email })
    .then(async (user) => {
      const snackCredit = money + user!.snackCredit;
      const classID = user!.classID;

      await updateSnackCreditInClass(email, snackCredit, classID);

      return await User.findOneAndUpdate({ email }, { snackCredit })
        .then((res) => {
          return {
            success: true,
          };
        })
        .catch((err) => {
          return {
            success: false,
            err,
          };
        });
    })
    .catch((err) => {
      return {
        success: false,
        err,
      };
    });

  return result;
};
