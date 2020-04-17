import defaultData from './defaultData';
import DrawUI from './DrawUI';
import Popovers from './Popovers';
import Confirm from './Confirm';
import XHR from './XHR';

const drawUI = new DrawUI();
const popup = new Popovers(document.body);
const confirm = new Confirm();
const xhrRequest = new XHR();

export default class Main {
  constructor() {
    this.ticketsField = document.querySelector('#list-ticket');
    this.addTicketButton = document.querySelector('#add-ticket');
    this.id = null;
    this.itemIndex = null;
  }

  async init() {
    defaultData();
    const currentTickets = await xhrRequest.getTickets();
    drawUI.draw(currentTickets);

    popup.bindToDOM();
    popup.saveTickets(this.saveTickets.bind(this));
    this.inputName = document.querySelector('#name');
    this.inputDescription = document.querySelector('#description');
    this.popupTitle = document.querySelector('#title-popup');
    confirm.ask();
    this.addEvents();
  }

  addEvents() {
    this.ticketsField.addEventListener('click', async (event) => {
      const elementClassList = event.target.classList;
      this.id = event.target.closest('.item-ticket').dataset.id;
      if (elementClassList.contains('change-status')) {
        const itemStatus = event.target.dataset.status;
        const sendStatus = itemStatus === 'true' ? 'false' : 'true';
        await xhrRequest.changeStatus(this.id, sendStatus);
        const currentTickets = await xhrRequest.getTickets();
        drawUI.draw(currentTickets);
      }
      if (elementClassList.contains('change-ticket')) {
        const itemName = event.target.closest('.item-ticket').querySelector('.td-name').innerText;
        const description = await xhrRequest.getDescription(this.id);
        this.inputName.value = itemName;
        this.inputDescription.value = description;
        this.popupTitle.innerText = 'Изменить тикет';
        popup.showPopup();
      }
      if (elementClassList.contains('del-ticket')) {
        confirm.delete(this.deleteTicket.bind(this));
      }
      if (elementClassList.contains('td-name')) {
        const itemDescription = event.target.parentNode.querySelector('.description');
        if (!itemDescription) {
          const description = await xhrRequest.getDescription(this.id);
          const elDescription = document.createElement('div');
          elDescription.className = 'description';
          elDescription.innerHTML = `
          <p>${description}</p>
          `;
          event.target.parentNode.appendChild(elDescription);
        } else {
          itemDescription.classList.toggle('hidden');
        }
      }
    });

    this.addTicketButton.addEventListener('click', () => {
      this.id = null;
      this.popupTitle.innerText = 'Add a new ticket';
      popup.showPopup();
    });
  }

  async deleteTicket() {
    await xhrRequest.delTicket(this.id);
    const currentTickets = await xhrRequest.getTickets();
    drawUI.draw(currentTickets);
  }

  async saveTickets() {
    if (this.id !== null) {
      await xhrRequest.changeTickets(this.id, this.inputName.value, this.inputDescription.value);
    } else {
      await xhrRequest.addTicket(this.inputName.value, this.inputDescription.value);
    }
    const currentTickets = await xhrRequest.getTickets();
    drawUI.draw(currentTickets);
  }
}
