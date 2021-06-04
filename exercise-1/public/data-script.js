const apiUrl = 'https://5dc588200bbd050014fb8ae1.mockapi.io/assessment';
const templateUrl = 'users-list.hbr';

import { normalizeUsers, toggleFields, fetchTemplate, renderHandlebarsTemplate} from '../libs'; 

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
