const groceries = [
  'SPAR',
  'TESCO',
  'CO-OP',
  'LIDL',
  'CBA ',
  'Mazsa Kalvin',
  'BORTàRSASàG ',
  'DARLINGTON TEABOLT',
  'CULINARIS',
];
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
  'Zara,',
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
  'HM.COM',
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
  'ZARAHOME.COM',
  'BUDAPEST KIRàLY U.52.',
  'EMAG.HU',
  'WWW.EDIGITAL.HU',
];
const sports = ['Speed-Way', 'ALPINBIKE', 'Radwelt', 'FITNESS'];
const travel = ['M?V', 'Máv ', 'MàV', 'Lokalbah', 'MINIBUD'];
const entertainment = ['CINEMA CITY', 'INTERTICKET ', 'Spotify', 'cinemacity', 'HOTEL PEST KFT', 'SIMPLE'];
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
  'DUNA TOWER',
];

const categoryMatch = (category, entry) =>
  category.some(token => entry.message.toLowerCase().includes(token.toLowerCase()));

export default function(entry) {
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
}
