const apiUrl = 'https://5dc588200bbd050014fb8ae1.mockapi.io/assessment';
const templateUrl = 'users-list.hbr';

const renderHandlebarsTemplate = (withTemplate, inElement, withData) => {
  const template = Handlebars.compile(withTemplate);
  const element = document.querySelector(inElement);

  element.innerHTML = template(withData);
};

const fetchTemplate = async (url) => {
  const hbr = await fetch(url);
  return await hbr.text();
};

const toggleFields = (fields) => (event) => {
  event.target.classList.toggle('btn-toggle_clicked');
  fields.forEach((element) => element.classList.toggle('hidden'));
};

const formatDate = (asString) => {
  const asDateObj = new Date(asString);
  return asDateObj.toLocaleString();
};

const normalizeUsers = (users) =>
  users.map(({ createdAt, ...user }) => ({
    ...user,
    createdAt: formatDate(createdAt),
  }));

document.addEventListener('DOMContentLoaded', async function () {
  const response = await fetch(apiUrl);
  const data = await response.json(response);
  const users = normalizeUsers(data);

  const template = await fetchTemplate(templateUrl);
  renderHandlebarsTemplate(template, '#users-list', { users });

  const additionFields = document.querySelectorAll('.addition');
  const switcher = document.querySelector('.btn-toggle');
  switcher.addEventListener('click', toggleFields(additionFields));
});
