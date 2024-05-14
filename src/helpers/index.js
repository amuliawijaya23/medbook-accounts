import crypto from 'crypto';

export const uid = (len) => {
  return crypto.randomBytes(len).toString('base64');
};
