import csvtojson from 'csvtojson';
import { User } from '@controllers/user';
import { Class } from '@controllers/classe';
import { IUserInCsv } from '@csl/shared';

// Function to find duplicates
const findDuplicates = (array: any) => {
  var object: any = {};
  var result: any = [];

  array.forEach((item: any) => {
    if (!object[item]) object[item] = 0;
    object[item] += 1;
  });

  for (var prop in object) {
    if (object[prop] >= 2) {
      result.push(prop);
    }
  }

  return result;
};

// Function to upload CSV to database
export default async (filePath: any) => {
  return csvtojson({ delimiter: 'auto' })
    .fromFile(filePath)
    .then((json: IUserInCsv[]) => {
      const emails = [];

      for (let obj of json) {
        emails.push(obj.email);
      }

      const duplicates = findDuplicates(emails);

      if (duplicates.length > 0) {
        return { success: false, duplicates };
      } else {
        const classes = [];

        for (let account of json) {
          let newUser = {
            email: account.email,
            firstName: account.nome,
            lastName: account.cognome,
            classID: account.classe,
          };

          let classObj = classes.find((x) => x.classID === newUser.classID);

          if (classObj) {
            let classIndex = classes.indexOf(classObj);
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

          User.findOne({ email: newUser.email }).then((user: any) => {
            if (!user) {
              new User(newUser).save();
            }
          });
        }

        classes.forEach((classObj) => {
          Class.findOne({ classID: classObj.classID }).then((classDoc: any) => {
            if (!classDoc) {
              new Class({
                id: classObj.classID,
                members: classObj.members,
                membersCount: classObj.members.length,
                gadgetTotal: 0,
                photoTotal: 0,
              }).save();
            }
          });
        });

        return { success: true };
      }
    });
};
