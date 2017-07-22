const t10table = document.getElementById('top10');

export default function(withCategory) {
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
}
