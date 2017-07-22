const table = document.getElementById('results');

function byDate(a, b) {
  if (a.date < b.date) return 1;
  if (a.date > b.date) return -1;
  return 0;
}

export default function(parsed) {
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
}
