export default function(withCategory) {
  Highcharts.chart('bucketchart', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'All',
    },
    xAxis: {
      categories: ['< 1000', '< 5000', '< 10000', '< 50000', '< 100000', '> 100000'],
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.0f}</b> ({point.percentage:.1f}%)',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
        },
      },
    },
    series: [
      {
        colorByPoint: true,
        data: [
          {
            name: '< 1000',
            y:
              -1 *
              withCategory
                .filter(x => x.amount >= -1000 && x.amount < 0)
                .reduce((prev, curr) => prev + Math.round(curr.amount), 0),
          },
          {
            name: '< 5000',
            y:
              -1 *
              withCategory
                .filter(x => x.amount >= -5000 && x.amount < -1000)
                .reduce((prev, curr) => prev + Math.round(curr.amount), 0),
          },
          {
            name: '< 10000',
            y:
              -1 *
              withCategory
                .filter(x => x.amount >= -10000 && x.amount < -5000)
                .reduce((prev, curr) => prev + Math.round(curr.amount), 0),
          },
          {
            name: '< 50000',
            y:
              -1 *
              withCategory
                .filter(x => x.amount >= -50000 && x.amount < -10000)
                .reduce((prev, curr) => prev + Math.round(curr.amount), 0),
          },
          {
            name: '< 100000',
            y:
              -1 *
              withCategory
                .filter(x => x.amount >= -100000 && x.amount < -50000)
                .reduce((prev, curr) => prev + Math.round(curr.amount), 0),
          },
          {
            name: '> 100000',
            y:
              -1 *
              withCategory.filter(x => x.amount < -100000).reduce((prev, curr) => prev + Math.round(curr.amount), 0),
          },
        ],
      },
    ],
  });
}
