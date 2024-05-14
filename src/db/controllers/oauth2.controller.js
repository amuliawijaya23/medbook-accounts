import oauth2orize from 'oauth2orize';
import { getClientByClientId } from '../models/client.model';
import { createCode, getCodeByValue } from '../models/code.model.js';
import { createToken } from '../models/token.model.js';
import { uid } from '../../helpers';

const server = oauth2orize.createServer();

server.serializeClient(async (client, done) => {
  try {
    return done(null, client.clientId);
  } catch (error) {
    return done(error);
  }
});

server.deserializeClient(async (clientId, done) => {
  try {
    const client = await getClientByClientId(clientId);
    return done(null, client);
  } catch (error) {
    return done(error);
  }
});

server.grant(
  oauth2orize.grant.code(async (client, redirectUri, ares, done) => {
    try {
      const value = {
        value: uid(16),
        clientId: client.clientId,
        redirectUri: redirectUri
      };

      const code = await createCode(value);

      return done(null, code.value);
    } catch (error) {
      return done(error);
    }
  })
);

server.exchange(
  oauth2orize.exchange.code(async (client, code, redirectUri, done) => {
    try {
      const authCode = await getCodeByValue(code);

      if (!authCode) return done(null, false);

      if (client.clientId !== authCode.clientId) return done(null, false);

      if (redirectUri !== authCode.redirectUri) return done(null, false);

      await authCode.remove();

      const accessToken = await createToken({
        value: uid(256),
        clientId: client.clientId
      });

      return done(null, accessToken);
    } catch (error) {
      return done(error);
    }
  })
);

export const authorization = [
  server.authorization(async (clientId, redirectUri, done) => {
    try {
      const client = await getClientByClientId(clientId);
      return done(null, client, redirectUri);
    } catch (error) {
      return done(error);
    }
  }),
  (req, res) => {
    res.render();
  }
];

export const decision = [server.decision()];

export const token = [server.token(), server.errorHandler()];
