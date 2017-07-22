import cache from './idb.js';

export default async function(messageIds) {
  const result = [];
  const messagesToGet = [];
  for (const messageId of messageIds) {
    const message = await cache.get(messageId.id);
    if (message === undefined) {
      messagesToGet.push(messageId);
    } else {
      result.push(message);
    }
  }

  const getResult = await Promise.all(
    messageIds.map(message => {
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
  return [...result, ...getResult];
}
