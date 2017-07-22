import cache from './idb.js';

export default async function(messageIds) {
  const messagesToGet = [];
  const result = await Promise.all(
    messageIds.map(messageId =>
      cache.get(messageId.id).then(message => {
        if (message === undefined) {
          messagesToGet.push(messageId);
        } else {
          return message;
        }
      }),
    ),
  );

  const getResult = await Promise.all(
    messagesToGet.map(message => {
      return new Promise(resolve =>
        gapi.client.gmail.users.messages
          .get({
            userId: 'me',
            id: message.id,
          })
          .then(response => response.result.snippet)
          .then(snippet => {
            cache.set(message.id, snippet).then(() => resolve(snippet));
          }),
      );
    }),
  );
  return [...result.filter(message => message !== undefined), ...getResult];
}
