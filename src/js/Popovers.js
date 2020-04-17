/* eslint-disable class-methods-use-this */
export default class Popovers {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.popover = document.createElement('div');
    this.saveTicket = '';
  }

  get markup() {
    return `
      <p id="title-popup">New Ticket</p>
      <p>Short description</p>
      <input type="text" id="name" class="input" value="">
      <p>Full description</p>
      <input type="text" id="description" class="input" value="">
      <div class="buttons">
        <div id="pSave" class="button">ОК</div>
        <div id="pCancel" class="button">Cancel</div>
      </div>
    `;
  }

  addErrorElement(parentElement) {
    const error = document.createElement('div');
    error.id = 'form-error';
    error.className = 'form-error hidden';
    error.textContent = 'Ooops, thomething went wrong...';
    parentElement.appendChild(error);
  }

  saveTickets(callback) {
    this.saveTicket = callback;
  }

  bindToDOM() {
    this.popover.id = 'popup';
    this.popover.className = 'popup hidden';
    this.popover.innerHTML = this.markup;
    this.addErrorElement(this.popover);
    this.parentEl.appendChild(this.popover);
    this.getConstants();
    this.eventsPopup();
  }

  showPopup() {
    this.selectPopup.classList.remove('hidden');
    this.selectPopup.style.top = `${(window.innerHeight
      - this.selectPopup.offsetHeight) / 2}px`;
    this.selectPopup.style.left = `${(window.innerWidth
      - this.selectPopup.offsetWidth) / 2}px`;
  }

  getConstants() {
    this.selectPopup = document.querySelector('#popup');
    this.inputName = document.querySelector('#name');
    this.inputDescription = document.querySelector('#description');

    this.btnSave = document.getElementById('pSave');
    this.btnCancel = document.getElementById('pCancel');
    this.elError = document.querySelector('#form-error');
  }

  eventsPopup() {
    this.btnSave.addEventListener('click', () => {
      if (this.inputName.value === '') {
        this.inputName.focus();
        this.showError(this.inputName, 'Enter some text, please');
        return;
      }
      this.selectPopup.classList.add('hidden');
      this.saveTicket();
      this.clearInput();
    });
    this.btnCancel.addEventListener('click', () => {
      this.selectPopup.classList.add('hidden');
      this.hidenError();
      this.clearInput();
    });
    this.inputName.addEventListener('input', () => {
      this.hidenError();
    });
  }

  hidenError() {
    if (!this.elError.classList.contains('hidden')) {
      this.elError.classList.add('hidden');
    }
  }

  clearInput() {
    this.inputName.value = '';
    this.inputDescription.value = '';
  }

  showError(element, message) {
    this.elError.textContent = message;
    this.elError.classList.remove('hidden');
    this.elError.style.top = `${element.offsetTop + element.offsetHeight}px`;
    this.elError.style.left = `${element.offsetLeft + ((element.offsetWidth - this.elError.offsetWidth) / 2)}px`;
  }
}
