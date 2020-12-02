import { Schema, model } from 'mongoose';
import { ILogModel, IUser } from '@csl/shared';
import { saveError } from '@config/winston';

const LogSchema = new Schema(
  {
    timestamp: { type: Date, required: true },
    level: { type: String, required: true },
    message: { type: String, required: true },
    metadata: { type: Object, required: true },
  },
  { skipVersioning: true }
);

const Error = model<ILogModel>('error', LogSchema, 'errors');
const Event = model<ILogModel>('event', LogSchema, 'events');

export const getErrors = async (user: IUser) => {
  try {
    const errors = await Error.find();

    return {
      success: true,
      data: errors,
    };
  } catch (err) {
    saveError("Error during errors' retrieving", {
      category: 'logs',
      user: user.email,
      err: err,
    });

    return {
      success: false,
    };
  }
};

export const emptyErrors = async () => {
  try {
    await Error.remove({});

    return {
      success: true,
    };
  } catch (err) {
    saveError('Error occurred while emptying errors', {
      category: 'logs',
    });

    return {
      success: false,
    };
  }
};

export const getEvents = async (user: IUser) => {
  try {
    const events = await Event.find();

    return {
      success: true,
      data: events,
    };
  } catch (err) {
    saveError("Error during events' retrieving", {
      category: 'logs',
      user: user.email,
      err: err,
    });

    return {
      success: false,
    };
  }
};

export const emptyEvents = async () => {
  try {
    await Event.remove({});

    return {
      success: true,
    };
  } catch (err) {
    saveError('Error occurred while emptying events', {
      category: 'logs',
    });

    return {
      success: false,
    };
  }
};
