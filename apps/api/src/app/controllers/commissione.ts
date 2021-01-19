import { ICommissione, IHttpRes, IUser } from '@csl/shared';
import { saveError, saveEvent } from '@common/logs';
import { Commissione } from '@models';

export const getCommissioni = async (): Promise<IHttpRes<ICommissione[]>> => {
  const commissioni = await Commissione.find();

  return {
    success: true,
    data: commissioni,
  };
};

export const getCommissione = async (
  id: ICommissione['id']
): Promise<IHttpRes<ICommissione>> => {
  try {
    const commissione = await Commissione.findOne({ id });

    return {
      success: true,
      data: commissione,
    };
  } catch (err) {
    return {
      success: false,
      err,
    };
  }
};

export const setPage = async (
  id: ICommissione['id'],
  page: ICommissione['page'],
  user: IUser
): Promise<IHttpRes<any>> => {
  try {
    await Commissione.findOneAndUpdate({ id }, { page });

    saveEvent(`Modificata la pagina della commissione ${id}`, {
      user: user.email,
      category: 'commissioni',
    });

    return {
      success: true,
    };
  } catch (err) {
    saveError(
      `Errore durante la modifica della pagina della commissione ${id}`,
      {
        user: user.email,
        category: 'commissioni',
        err,
      }
    );

    return {
      success: false,
    };
  }
};

export const createCommissione = async (
  commissione: ICommissione,
  user: IUser
): Promise<IHttpRes<ICommissione[]>> => {
  try {
    await new Commissione(commissione).save().then();

    const commissioni = await Commissione.find();

    saveEvent(`Created commissione "${commissione.id}"`, {
      user: user.email,
      category: 'commissioni',
    });

    return {
      success: true,
      data: commissioni,
    };
  } catch (err) {
    saveError(`Error during the creation of commissione "${commissione.id}"`, {
      user: user.email,
      category: 'commissioni',
      err,
    });
  }
};

export const removeCommissione = async (
  id: ICommissione['id'],
  user: IUser
): Promise<IHttpRes<ICommissione[]>> => {
  try {
    await Commissione.findOneAndDelete({ id });

    const commissioni = await Commissione.find();

    saveEvent(`Removed commissione "${id}"`, {
      category: 'commissioni',
      user: user.id,
    });

    return {
      success: true,
      data: commissioni,
    };
  } catch (err) {
    saveError(`Error during the deletion of commissione "${id}"`, {
      err,
      category: 'commissioni',
      user: user.id,
    });

    return {
      success: false,
    };
  }
};

export const addPDF = async (pdf: string, commissione: ICommissione['id']) => {
  try {
    const files = await Commissione.findOneAndUpdate(
      { id: commissione },
      { $push: { files: pdf } },
      { new: true }
    ).then((c) => c.files);

    saveEvent(`Uploaded file "${pdf} for "${commissione}"`, {
      category: 'commissioni',
    });

    return {
      success: true,
      data: files,
    };
  } catch (err) {
    saveError(`Error during the upload of a PDF`, {
      err,
      category: 'commissioni',
    });

    return {
      success: false,
    };
  }
};

export const removePDF = async (
  pdf: string,
  commissione: ICommissione['id']
) => {
  try {
    const files = await Commissione.findOneAndUpdate(
      { id: commissione },
      { $pull: { files: pdf } },
      { new: true }
    ).then((c) => c.files);

    saveEvent(`Removed "${pdf} from "${commissione}"`, {
      category: 'commissioni',
    });

    return {
      success: true,
      data: files,
    };
  } catch (err) {
    saveError(`Error occurred while removing "${pdf}" from "${commissione}"`, {
      category: 'commissioni',
    });

    return {
      success: false,
    };
  }
};
