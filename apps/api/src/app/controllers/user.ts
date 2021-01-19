import { TRole, IUser, IHttpRes, IAccount } from '@csl/shared';
import { Class, User } from '@models';

// Stripe initialization
import { environment as env } from '@environments/environment';
import Stripe from 'stripe';
import { updateSnackCreditInClass } from '@controllers/classe';
import { saveError, saveEvent } from '@common/logs';
const stripe = new Stripe(env.STRIPE_KEY, {
  apiVersion: '2020-08-27',
  typescript: true,
});

// Create an account (for admin)
export const createAccount = async (
  account: IAccount,
  user: IUser
): Promise<IHttpRes<any>> => {
  try {
    await User.findOne({ email: account.email }).then((user) => {
      if (!user) {
        return new User(account).save().then();
      }
    });

    await Class.findOne({ id: account.classID }).then((classe) => {
      if (classe) {
        return classe
          .updateOne({
            $push: {
              members: { email: account.email, snackCredit: 0, roles: [] },
            },
          })
          .then();
      } else {
        new Class({
          id: account.classID,
          members: [{ email: account.email, snackCredit: 0, roles: [] }],
          membersCount: 1,
        })
          .save()
          .then();
      }
    });

    saveEvent(`Manually created an account for ${account.name}`, {
      category: 'accounts',
      user: user.email,
    });

    return {
      success: true,
    };
  } catch (err) {
    saveError(
      `Error during the manual creation of an account for ${account.name}`,
      {
        category: 'accounts',
        user: user.email,
        err,
      }
    );
  }
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
      $inc: {
        membersCount: -1,
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
  let updateQuery: { [key: string]: boolean | string };

  if (role.includes('isReferente')) {
    const regExp = /\[([^)]+)\]/;
    const commissione = regExp.exec(role)[1];

    updateQuery = { isReferente: commissione };
  } else {
    updateQuery = { [role]: true };
  }

  try {
    const classID = await User.findOneAndUpdate({ email }, updateQuery).then(
      (user) => user.classID
    );

    return Class.findOne({ id: classID }).then(async (classe) => {
      const member = classe.members.find((x) => x.email === email);

      member.roles.push(role);

      try {
        await Class.findOneAndUpdate(
          { id: classID, members: { $elemMatch: { email } } },
          { 'members.$': member }
        );

        return {
          success: true,
        };
      } catch (err) {
        return {
          success: false,
          err,
        };
      }
    });
  } catch (err) {
    return {
      success: false,
      err,
    };
  }
};

// Remove a role from a user
export const removeRole = async (email: IUser['email'], role: TRole) => {
  let updateClassQuery: any;

  if (role.includes('isReferente')) {
    const regExp = /\[([^)]+)\]/;
    const commissione = regExp.exec(role)[1];

    updateClassQuery = { isReferente: commissione };
  } else {
    updateClassQuery = { [role]: true };
  }

  const classID = await User.findOneAndUpdate(
    { email: email },
    { $unset: updateClassQuery }
  ).then((user) => {
    return user.classID;
  });

  return Class.findOne({ id: classID }).then((classe) => {
    const member = classe.members.find((x) => x.email === email);

    const i = member.roles.findIndex((x) => x === role);

    member.roles.splice(i, 1);

    return Class.findOneAndUpdate(
      { id: classID, members: { $elemMatch: { email } } },
      { 'members.$': member }
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
          name: `${user.name}`,
          email: `${user.email}`,
          description: `Rappresentante della ${user.classID}`,
        })
        .then(async (customer) => {
          const newID = await User.findOneAndUpdate(
            { id },
            { stripeID: customer.id }
          ).then(() => customer.id);

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
      const snackCredit = money + user.snackCredit;
      const classID = user.classID;

      await updateSnackCreditInClass(email, snackCredit, classID);

      return await User.findOneAndUpdate({ email }, { snackCredit })
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
    })
    .catch((err) => {
      return {
        success: false,
        err,
      };
    });

  return result;
};
