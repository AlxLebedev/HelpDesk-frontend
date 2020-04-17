export default class confirm {
  ask() {
    const newConfirmBox = document.createElement('div');
    newConfirmBox.id = 'confirm-del';
    newConfirmBox.className = 'popup hidden';
    newConfirmBox.innerHTML = `
    <p>Confirm deletion, please!</p>
    <p>Are you shure to delete this ticket?</p>
    <div class="buttons">
      <div id="ok-del" class="button">ОК</div>
      <div id="cancel-del" class="button">Cancel</div>
    </div>
    `;
    document.body.appendChild(newConfirmBox);
    this.confirmBox = document.getElementById('confirm-del');
    this.okButton = document.getElementById('ok-del');
    this.cancelButton = document.getElementById('cancel-del');
  }

  delete(callback) {
    this.confirmBox.classList.remove('hidden');
    this.confirmBox.style.top = `${(window.innerHeight
      - this.confirmBox.offsetHeight) / 2}px`;
    this.confirmBox.style.left = `${(window.innerWidth
      - this.confirmBox.offsetWidth) / 2}px`;
    this.okButton.addEventListener('click', () => {
      this.confirmBox.classList.add('hidden');
      callback();
    });

    this.cancelButton.addEventListener('click', () => {
      this.confirmBox.classList.add('hidden');
    });
  }
}
