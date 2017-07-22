export default function(withCategory) {
  Highcharts.chart('chart', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'All',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.0f}</b> ({point.percentage:.1f}%)',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
          },
        },
      },
    },
    series: [
      {
        name: 'Expenses',
        colorByPoint: true,
        data: [
          {
            name: 'Groceries',
            y: -1 * withCategory.filter(x => x.category === 'Groceries').reduce((prev, curr) => prev + curr.amount, 0),
          },
          {
            name: 'Healthcare',
            y: -1 * withCategory.filter(x => x.category === 'Healthcare').reduce((prev, curr) => prev + curr.amount, 0),
          },
          {
            name: 'Cash',
            y: -1 * withCategory.filter(x => x.category === 'Cash').reduce((prev, curr) => prev + curr.amount, 0),
          },
          {
            name: 'Entertainment',
            y:
              -1 *
              withCategory.filter(x => x.category === 'Entertainment').reduce((prev, curr) => prev + curr.amount, 0),
          },
          {
            name: 'Utilities',
            y: -1 * withCategory.filter(x => x.category === 'Utilities').reduce((prev, curr) => prev + curr.amount, 0),
          },
          {
            name: 'Travel',
            y: -1 * withCategory.filter(x => x.category === 'Travel').reduce((prev, curr) => prev + curr.amount, 0),
          },
          {
            name: 'Shopping',
            y: -1 * withCategory.filter(x => x.category === 'Shopping').reduce((prev, curr) => prev + curr.amount, 0),
          },
          {
            name: 'Travel savings',
            y:
              -1 *
              withCategory.filter(x => x.category === 'Travel savings').reduce((prev, curr) => prev + curr.amount, 0),
          },
          {
            name: 'Safety savings',
            y:
              -1 *
              withCategory.filter(x => x.category === 'Safety savings').reduce((prev, curr) => prev + curr.amount, 0),
          },
          {
            name: 'Personal care',
            y:
              -1 *
              withCategory.filter(x => x.category === 'Safety savings').reduce((prev, curr) => prev + curr.amount, 0),
          },
          {
            name: 'Restaurant',
            y: -1 * withCategory.filter(x => x.category === 'Restaurant').reduce((prev, curr) => prev + curr.amount, 0),
          },
          {
            name: 'Clothing',
            y: -1 * withCategory.filter(x => x.category === 'Clothing').reduce((prev, curr) => prev + curr.amount, 0),
          },
          {
            name: 'Sports',
            y: -1 * withCategory.filter(x => x.category === 'Sports').reduce((prev, curr) => prev + curr.amount, 0),
          },
          {
            name: 'Other',
            y:
              -1 *
              withCategory
                .filter(x => x.category === undefined && x.amount < 0)
                .reduce((prev, curr) => prev + curr.amount, 0),
          },
        ],
      },
    ],
  });
}
