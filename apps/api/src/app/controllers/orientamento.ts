import { Schema, model } from 'mongoose';
import { IEvent, IEventModel, IHttpRes } from '@csl/shared';
import { v4 } from 'uuid';
import { saveError, saveEvent } from '@config/winston';

const EventSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  cover: { type: String, required: true },
  signup: { type: String, required: true },
});

const Event = model<IEventModel>(
  'orientamento-event',
  EventSchema,
  'orientamento-events'
);

export const getEvent = async (id?: IEvent['id']): Promise<IHttpRes<IEvent | IEvent[]>> => {
  try {
    const data = id
      ? await Event.findOne({ id })
      : await Event.find();

    return {
      success: true,
      data,
    };
  } catch(err) {
    return {
      success: false,
      err
    }
  }
}

export const createEvent = async (event: IEvent): Promise<IHttpRes<IEvent>> => {
  try {
    event.id = v4();

    const data = await new Event(event).save();

    saveEvent(`Creato l'evento "${event.title}"`, {
      category: 'orientamento',
    });

    return {
      success: true,
      data,
    }
  } catch(err) {
    saveError(`Errore durante la creazione di un evento`, {
      category: 'orientamento',
      err,
    });

    return {
      success: false,
      err,
    }
  }
}

export const deleteEvent = async (id: string): Promise<IHttpRes<any>> => {
  try {
    const event = await Event.findOneAndDelete({ id });

    saveEvent(`Eliminato l'evento "${event.title}`, {
      category: 'orientamento',
    });

    return {
      success: true,
    }
  } catch(err) {
    saveError(`Errore durante l'eliminazione dell'evento con ID "${id}"`, {
      category: 'orientamento',
    });

    return {
      success: false,
      err,
    }
  }
}
