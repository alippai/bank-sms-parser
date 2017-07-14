export default function (withCategory) {
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
}
