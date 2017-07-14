import parser from './parser.js';
import categorizer from './categorizer.js';
import drawTimeChart from './timechart.js';
import drawPieChart from './piechart.js';
import drawBucketChart from './bucketchart.js';
import renderTableTop10 from './top10.js';
import renderTableAll from './all_table.js';
import googleApi from './gapi.js';
import getAllMessages from './get_messages.js';

googleApi(init);

async function getSMSLabel() {
    const {result: { labels }} = await gapi.client.gmail.users.labels.list({'userId': 'me'});
    return labels.find(x => x.name === 'SMS').id;
}

async function getMessageList() {
    const sms_label = await getSMSLabel();
    return getMessageBatch(sms_label, [], undefined);
}

async function getMessageBatch(sms_label, messages, pageToken) {
    const query = location.hash;
    const {result} = await gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'labelIds': sms_label,
        'q': `OTPDirekt ${query}`,
        pageToken,
    });
    if (result.nextPageToken === undefined) return [...messages, ...result.messages];
    return await getMessageBatch(sms_label, [...messages, ...result.messages], result.nextPageToken);
}

/**
 * Print all Labels in the authorized user's inbox. If no labels
 * are found an appropriate message is printed.
 */
async function init() {
    const messageIds = await getMessageList();
    const fullMessages = await getAllMessages(messageIds);
    const parsed = Array.from(new Set(fullMessages)).map(parser).filter(x => x !== undefined);
    const withCategory = parsed.map(categorizer);
    drawTimeChart(withCategory);
    renderTableAll(parsed);
    renderTableTop10(withCategory);
    drawPieChart(withCategory);
    drawBucketChart(withCategory);
}
