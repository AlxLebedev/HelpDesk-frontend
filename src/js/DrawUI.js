/* eslint-disable class-methods-use-this */
export default class DrawUI {
  constructor() {
    this.tableTickets = document.querySelector('#list-ticket');
  }

  draw(arrTicket) {
    this.tableTickets.innerHTML = '';
    for (const item of arrTicket) {
      const itemDate = new Date(item.created);
      const date = this.dateFormat(itemDate.getDate());
      const month = this.dateFormat(itemDate.getMonth() + 1);
      const year = this.dateFormat(itemDate.getFullYear());
      const hours = this.dateFormat(itemDate.getHours());
      const minut = this.dateFormat(itemDate.getMinutes());
      const itemCreated = `${date}.${month}.${year} ${hours}:${minut}`;
      const ticket = document.createElement('div');
      ticket.className = 'item-ticket';
      ticket.dataset.id = item.id;
      ticket.innerHTML = `
      <div class="div-status"><span class="change-status pointer" data-status="${item.status}"></span></div>
      <div class="td-name">${item.name}
      </div>
      <div class="td-created">${itemCreated}</div>
      <div class="change-del">
        <span class="change-ticket pointer"></span>
        <span class="del-ticket pointer"></span>
      </div>
      `;
      this.tableTickets.appendChild(ticket);
    }
  }

  dateFormat(value) {
    const rValue = value < 10 ? `0${value}` : value;
    return rValue;
  }
}
