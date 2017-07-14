(function () {
'use strict';

const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

var parser = function (message) {
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
};

const groceries = ['SPAR', 'TESCO', 'CO-OP', 'LIDL', 'CBA ', 'Mazsa Kalvin', 'BORTàRSASàG ', 'DARLINGTON TEABOLT', 'CULINARIS'];
const healthcare = ['PATIKA', 'GY.TàR', 'GYòGYSZERTàR', 'GYOGYSZERTAR', 'DATA-OBJECT BT', 'VISION EXPRES'];
const cash = ['ATM '];
const utilities = [
  'Google storage',
  'BKK ',
  'DIJBESZEDÖ ',
  'DIGI ',
  'Fundamenta',
  'SMS CSOMAG',
  'IDÖSZAKOS KÖLTSÉGEK',
  'TRANZAKCIòS CSOMAG',
  'KÖZÖS KÖLTSÉG',
  'GENERALI ',
  'ELMÜ-ÉMàSZ ',
  'ELMUEMASZENERGIASZOLGA',
  'TàVHÖ',
  'Fötàv',
  'FEDEZETLENSÉGI KAMAT',
  'Partner NAV Illetékek ',
  'BANKKàRTYàVAL KAPCS. DIJ',
  'SÉF ASZTALA',
  'FIDO',
  'Dropbox',
];
const clothing = [
  'ZARA ',
  'ZARA.',
  'TIZPRBA ',
  'PULL ',
  'H&M',
  'TRIUMPH ',
  'MANGO ',
  'BERSHKA',
  'INTIMISSIMI',
  'DECATHLON',
  'CALZEDONIA',
  'TEZENIS',
  'Humanic',
  'DRESSMANN',
];
const shopping = [
  'PAYPAL',
  'AMAZON',
  'ALIEXPRESS',
  'LIBRI',
  'PIREX ',
  'RELAY ',
  'STILE INTERIO',
  'PEPCO',
  'KIKA ',
  'GREEN PAPIR',
  'KREATIV HOBBY ',
  'IKEA',
  'OBI',
  'MEDIA MARKT',
  'INMEDIO ',
  'BESTON-OTTHON',
  'JYSK ',
  'BUDAPEST KIRàLY U.52.',
  'EMAG.HU',
  'WWW.EDIGITAL.HU',
];
const sports = [ 'Speed-Way', 'ALPINBIKE', 'Radwelt', 'FITNESS' ];
const travel = ['M?V', 'Máv ', 'MàV', 'Lokalbah', 'MINIBUD'];
const entertainment = ['CINEMA CITY', 'INTERTICKET ', 'Spotify', 'cinemacity'];
const travel_savings = ['Közl UTAZàS'];
const safety_savings = ['Közl BIZTONSàG'];
const personal_care = ['ROSSMANN ', 'DM ', 'Mueller ', 'Harmonia Reformhaz', 'DOUGLAS ', 'TINAMU ', 'BARBER SHOP'];
const restaurant = [
  'AMBER',
  'Madal Cafe',
  'KFC ',
  'EIFFEL BISTRO',
  'ARRIBA TAQUERIA',
  'MADE IN PASTA',
  'MCDHU',
  'AL DENTE',
  'THEBOX DONUT',
  'Burger House',
  'BAMBA MARHA',
  'THAI BT',
  'MEDITERRàN GRILL',
  'MOST) BISZTR',
  'ISTANBUL ÉTTEREM',
  'LAZA CAFE',
  'BURGER KING',
  'SOTE NET',
  'ZING BURGER',
  'MOST) BISZTR',
  'This is Melbourne',
  'STOCZEK ETTEREM',
  'INFO I ÉTTEREM',
  'SZENDVICS DELIKAT KFT.',
  'CAFE FREI',
  'COSTA COFFEE',
];

const categoryMatch = (category, entry) => category.some(token => entry.message.toLowerCase().includes(token.toLowerCase()));

var categorizer = function (entry) {
  if (categoryMatch(groceries, entry)) entry.category = 'Groceries';
  if (categoryMatch(healthcare, entry)) entry.category = 'Healthcare';
  if (categoryMatch(cash, entry)) entry.category = 'Cash';
  if (categoryMatch(utilities, entry)) entry.category = 'Utilities';
  if (categoryMatch(clothing, entry)) entry.category = 'Clothing';
  if (categoryMatch(entertainment, entry)) entry.category = 'Entertainment';
  if (categoryMatch(shopping, entry)) entry.category = 'Shopping';
  if (categoryMatch(travel, entry)) entry.category = 'Travel';
  if (categoryMatch(travel_savings, entry)) entry.category = 'Travel savings';
  if (categoryMatch(safety_savings, entry)) entry.category = 'Safety savings';
  if (categoryMatch(personal_care, entry)) entry.category = 'Personal care';
  if (categoryMatch(restaurant, entry)) entry.category = 'Restaurant';
  if (categoryMatch(sports, entry)) entry.category = 'Sports';
  return entry;
};

const base = {
  Clothing: {},
  Groceries: {},
  Healthcare: {},
  Cash: {},
  Entertainment: {},
  Utilities: {},
  Travel: {},
  Shopping: {},
  'Travel savings': {},
  'Safety savings': {},
  'Personal care': {},
  Restaurant: {},
  Sports: {},
  Other: {},
};

var drawTimeChart = function (withCategory) {
  const forTimeChart = withCategory.reduce((acc, entry) => {
    const category = entry.category === undefined ? 'Other' : entry.category;
    const month = entry.date.substring(0, 7);
    for (const c of Object.keys(base)) {
      if (acc[c][month] === undefined) acc[c][month] = 0;
    }
    if (entry.amount < 0) acc[category][month] += -1 * entry.amount;
    return acc;
  }, base);
  const series = Object.keys(base).map(x => {
    const data = [];
    const c = x === undefined ? 'Other' : x;
    for (const e of Object.values(base[c])) {
      data.push(e);
    }
    return { name: c, data, visible: c !== 'Other' };
  });
  Highcharts.chart('timechart', {
    chart: {
      type: 'area'
    },
    title: {
      text: 'Expenses by month'
    },
    xAxis: {
      categories: Object.keys(forTimeChart.Other),
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    yAxis: {
      title: {
        text: 'eFt'
      },
      labels: {
        formatter: function () {
          return this.value / 1000;
        }
      }
    },
    tooltip: {
      split: true,
      valueSuffix: ' Ft'
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#666666'
        }
      }
    },
    series,
  });
};

var drawPieChart = function (withCategory) {
  Highcharts.chart('chart', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'All'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.0f}</b> ({point.percentage:.1f}%)'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [{
      name: 'Expenses',
      colorByPoint: true,
      data: [{
        name: 'Groceries',
        y: -1 * withCategory.filter(x => x.category === 'Groceries').reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: 'Healthcare',
        y: -1 * withCategory.filter(x => x.category === 'Healthcare').reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: 'Cash',
        y: -1 * withCategory.filter(x => x.category === 'Cash').reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: 'Entertainment',
        y: -1 * withCategory.filter(x => x.category === 'Entertainment').reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: 'Utilities',
        y: -1 * withCategory.filter(x => x.category === 'Utilities').reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: 'Travel',
        y: -1 * withCategory.filter(x => x.category === 'Travel').reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: 'Shopping',
        y: -1 * withCategory.filter(x => x.category === 'Shopping').reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: 'Travel savings',
        y: -1 * withCategory.filter(x => x.category === 'Travel savings').reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: 'Safety savings',
        y: -1 * withCategory.filter(x => x.category === 'Safety savings').reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: 'Personal care',
        y: -1 * withCategory.filter(x => x.category === 'Safety savings').reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: 'Restaurant',
        y: -1 * withCategory.filter(x => x.category === 'Restaurant').reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: 'Clothing',
        y: -1 * withCategory.filter(x => x.category === 'Clothing').reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: 'Sports',
        y: -1 * withCategory.filter(x => x.category === 'Sports').reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: 'Other',
        y: -1 * withCategory.filter(x => x.category === undefined && x.amount < 0).reduce((prev, curr) => prev + curr.amount, 0),
      }]
    }]
  });
};

var drawBucketChart = function (withCategory) {
  Highcharts.chart('bucketchart', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'All'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.0f}</b> ({point.percentage:.1f}%)'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [{
      name: 'Expenses',
      colorByPoint: true,
      data: [{
        name: '< 1000',
        y: -1 * withCategory.filter(x => x.amount >= -1000 && x.amount < 0).reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: '< 5000',
        y: -1 * withCategory.filter(x => x.amount >= -5000 && x.amount > -1000).reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: '< 10000',
        y: -1 * withCategory.filter(x => x.amount >= -10000 && x.amount > -5000).reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: '< 50000',
        y: -1 * withCategory.filter(x => x.amount > -50000 && x.amount > -10000).reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: '< 100000',
        y: -1 * withCategory.filter(x => x.amount > -100000 && x.amount > -50000).reduce((prev, curr) => prev + curr.amount, 0),
      }, {
        name: '< 500000',
        y: -1 * withCategory.filter(x => x.amount > -500000 && x.amount > -100000).reduce((prev, curr) => prev + curr.amount, 0),
      }]
    }]
  });
};

const t10table = document.getElementById('top10');

var renderTableTop10 = function (withCategory) {
    const byAmount = withCategory.sort((a, b) => a.amount - b.amount);
    for (let i = 0; i < 10; i++) {
        const entry = byAmount[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.date2}</td>
            <td>${entry.vendor}</td>
            <td>${entry.amountDisplay} ${entry.currency}</td>
            <td>${entry.category}</td>`;
        t10table.appendChild(row);
    }
};

const table = document.getElementById('results');

function byDate(a, b) {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
}

var renderTableAll = function (parsed) {
    parsed.sort(byDate).forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.date2}</td>
            <td>${entry.vendor}</td>
            <td>${entry.amountDisplay} ${entry.currency}</td>
            <td>${entry.category}</td>
            <td>${entry.message}</td>`;
        table.appendChild(row);
    });
};

var googleApi = function (init) {
// Client ID and API key from the Developer Console
    const CLIENT_ID = '1040067958858-cp794nt3httcg68idu3grqia4nr339ts.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
    const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

    const authorizeButton = document.getElementById('authorize-button');
    const signoutButton = document.getElementById('signout-button');

    /**
     *  On load, called to load the auth2 library and API client library.
     */
    gapi.load('client:auth2', initClient);

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    function initClient() {
        gapi.client.init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
        }).then(function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            authorizeButton.onclick = handleAuthClick;
            signoutButton.onclick = handleSignoutClick;
        });
    }

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            authorizeButton.style.display = 'none';
            signoutButton.style.display = 'block';
            init();
        } else {
            authorizeButton.style.display = 'block';
            signoutButton.style.display = 'none';
        }
    }

    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
    }

    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
    }
};

var getAllMessages = function (messageIds) {
    return Promise.all(messageIds.map(message => {
        return new Promise(resolve => gapi.client.gmail.users.messages.get({
            'userId': 'me',
            'id': message.id,
        }).then(response => resolve(response.result.snippet)));
    }))
};

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

}());
