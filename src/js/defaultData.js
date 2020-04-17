export default function degaultData() {
  const params = new URLSearchParams();
  params.append('name', 'Call to Mia');
  params.append('description', 'Tell her to by some drink for an evening))');

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://helpdesk-hw7.herokuapp.com/tickets');
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.log(xhr.responseText);
    }
  });
  xhr.send(params);
}
