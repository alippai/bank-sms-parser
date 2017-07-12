export default function (messageIds) {
    return Promise.all(messageIds.map(message => {
        return new Promise(resolve => gapi.client.gmail.users.messages.get({
            'userId': 'me',
            'id': message.id,
        }).then(response => resolve(response.result.snippet)));
    }))
}