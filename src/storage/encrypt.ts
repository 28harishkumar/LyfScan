import { NativeModules, Platform } from 'react-native'
const Aes = NativeModules.Aes;

async function generateUUID() {
  return Aes.randomUuid().then(uuid => {
    return uuid.toLowerCase();
  });
}

async function generateRandomKey() {
  return Aes.randomKey(256);
}

export async function decryptNote(note, mk) {
  let components: string[];
  let enc_version: string;
  let enc_item_key: string;
  let iv: string;

  return new Promise(function (resolve, reject) {
    components = note.enc_item_key.split(':');
    enc_version = components[0];
    enc_item_key = components[1];
    iv = components[2];

    Aes
      .decrypt(enc_item_key, mk, iv)
      .then(async (note_key) => {
        try {
          let hash = await Aes.hmac256(note.content, mk);

          if (hash !== note.auth_hash) {
            reject('Hmac doesn\'t match');
          }

          return Aes.decrypt(note.content, note_key, iv)
            .then((result) => resolve(result))
            .catch(err => console.info('Decrypt error:', err));
        } catch (e) {
          reject('Hash error' + e.message);
        }

      }).catch(err => console.info('Key decrypt error:', err));
  });
}

export async function encryptNote(note, mk) {
  let note_key: string;
  let iv: string;
  let enc_item_key: string;
  
  //if key is still to be set, throw an alert
  if (!note.uuid) {
    note.uuid = await generateUUID();
  }

  try {
    note_key = await Aes.sha256(generateRandomKey());
    iv = await Aes.sha256(generateRandomKey());
    enc_item_key = await Aes.encrypt(note_key, mk, iv);
  } catch (e) {
    return Promise.reject(e)
  }

  if (note._id)
    delete note._id;

  return new Promise(function (resolve, reject) {
    Aes
      .encrypt(JSON.stringify(note), note_key, iv)
      .then((cipher) => {
        let copy: any = {};
        copy.uuid = note.uuid;
        copy.created_at = note.created_at;
        copy.updated_at = note.updated_at;
        copy.content = cipher;
        copy.content_type = 'Note';
        copy.enc_item_key = '001:' + enc_item_key + ':' + iv;
        copy.deleted = note.deleted;
        copy.dirty = note.dirty != undefined && note.dirty;
        Aes.hmac256(copy.content, mk).then((hash) => {
          copy.auth_hash = hash;
          resolve(copy);
        });
      });
  })
}
