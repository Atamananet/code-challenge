const apiUrl = 'https://5dc588200bbd050014fb8ae1.mockapi.io/assessment';
const templateUrl = 'users-list.handlebars';

const renderHandlebarsTemplate = (withTemplate, inElement, withData) => {
  const template = Handlebars.compile(withTemplate);
  const element = document.querySelector(inElement);

  element.innerHTML = template(withData);
};

const fetchTemplate = async (url) => {
  const hbr = await fetch(url);
  return await hbr.text();
};

const toggleField = (event) => {
  if (!event.target.classList.contains('btn-toggle')) {
    return;
  }

  event.target.querySelectorAll('* + .addition');
  const userListItem = event.target.closest('.user');
  const additionFields = [...userListItem.querySelectorAll('.addition')];
  additionFields.forEach(field => {
    field.classList.toggle('hidden');
  });
  event.target.classList.toggle('btn-toggle_clicked');

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

  const usersList = document.querySelector('.users-container');
  usersList.addEventListener('click', toggleField);
});

module.exports = { normalizeUsers, toggleField }