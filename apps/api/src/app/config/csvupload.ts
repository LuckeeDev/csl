import csvtojson from 'csvtojson';
import { User } from '@controllers/user';
import { Class } from '@controllers/classe';
import { IUserInCsv } from '@csl/shared';
import { saveEvent } from './winston';

function findDuplicates(array: IUserInCsv['email'][]) {
  const object = {};
  const result = [];

  array.forEach((item) => {
    if (!object[item]) object[item] = 0;
    object[item] += 1;
  });

  for (const prop in object) {
    if (object[prop] >= 2) {
      result.push(prop);
    }
  }

  return result;
}

function processJSON(person: IUserInCsv) {
  const email = person.email.split('.');

  // The email address is always made up of 4 parts
  email.splice(2, 2);

  email.reverse();

  const name = email
    .map((string) => {
      const newString = string.split('_');

      return newString;
    })
    .reduce((a, b) => a.concat(b), [])
    .map((string) => {
      const regex = /\d/g;

      if (regex.test(string)) {
        string = string.slice(0, -1);
      }

      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    })
    .join(' ');

  person.nome = name;

  return person;
}

export async function uploadCSV(filePath: string) {
  const json: IUserInCsv[] = await csvtojson({ delimiter: 'auto' }).fromFile(
    filePath
  );

  const emails = [];

  for (const obj of json) {
    emails.push(obj.email);
  }

  const duplicates = findDuplicates(emails);

  if (duplicates.length > 0) {
    return { success: false, duplicates };
  } else {
    // Process CSV content to get name from email
    json.map(processJSON);

    const classes = [];

    for (const account of json) {
      const newUser = {
        email: account.email,
        name: account.nome,
        classID: account.classe,
      };

      const classObj = classes.find((x) => x.classID === newUser.classID);

      if (classObj) {
        const classIndex = classes.indexOf(classObj);

        classes[classIndex].members.push({
          email: newUser.email,
          snackCredit: 0,
          roles: [],
        });
      } else {
        classes.push({
          classID: newUser.classID,
          members: [{ email: newUser.email, snackCredit: 0, roles: [] }],
        });
      }

      new User(newUser).save();
    }

    classes.forEach((classObj) => {
      new Class({
        id: classObj.classID,
        members: classObj.members,
        membersCount: classObj.members.length,
      }).save();
    });

    saveEvent('Created accounts for the school through a CSV file', {
      category: 'accounts',
    })

    return { success: true };
  }
}
