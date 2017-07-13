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
  Other: {},
};

export default function (withCategory) {
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
}
