const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export default function (message) {
    const date = '20' + message.match(/1(\d){5}/);
    const year = date.substring(0, 4);
    const month = parseInt(date.substring(4, 6)) - 1;
    const day = date.substring(6, 8);
    const hour = date.substring(9, 11);
    const minute = date.substring(12, 14);
    const parsedDate = new Date(year, month, day, hour, minute);
    const amountRaw = message.match(/:(.?)[-+]([\d]*).([\d]*)/);
    if (amountRaw === null) return;
    const currency = message.match(/EUR;/) === null ? 'HUF' : 'EUR';
    const amount = parseFloat(amountRaw[0].replace(/[^\d\-,]*/g, '').replace(/,/g, '.'));
    const vendorRaw = message.match(/(.*?);(.*?);(.*)/);
    if (vendorRaw === null) debugger;
    const vendor = vendorRaw[2];
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    try {
        const niceDate = parsedDate ? parsedDate.toISOString() : '';
        return {
            date: niceDate.substring(0, 10),
            date2: new Intl.DateTimeFormat('hu-HU', options).format(parsedDate),
            amount,
            amountDisplay: numberWithCommas(amount),
            vendor,
            message,
            currency,
        }
    } catch (e) {

    }
}
