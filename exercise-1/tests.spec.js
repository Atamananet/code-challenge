const { normalizeUsers, toggleField } = require('./public/data-script');

const users = [
  {
    id: '14',
    createdAt: '2021-03-31T15:59:27.302Z',
    name: 'Tina White',
    avatar: '',
  },
  {
    id: '15',
    createdAt: '2021-03-31T10:02:15.415Z',
    name: 'Allen Durgan',
    avatar: '',
  },
  {
    id: '16',
    createdAt: '2021-03-31T13:24:14.020Z',
    name: 'Ryann Wiegand',
    avatar: '',
  },
];

formatedUsers = [
  {
    id: '14',
    name: 'Tina White',
    avatar: '',
    createdAt: '31.03.2021, 18:59:27',
  },
  {
    id: '15',
    name: 'Allen Durgan',
    avatar: '',
    createdAt: '31.03.2021, 13:02:15',
  },
  {
    id: '16',
    name: 'Ryann Wiegand',
    avatar: '',
    createdAt: '31.03.2021, 16:24:14',
  },
];

test('normalizes users data', () => {
  expect(normalizeUsers).toThrow();
  expect(normalizeUsers.bind(null, users)).not.toThrow();
  expect(normalizeUsers([])).toEqual([]);
});

test('displays a user after a click', () => {
  document.body.innerHTML = `
    <li class='user'>
        <div
          class='user__avatar'
          style='background-image: url(https://www.serietotaal.nl/images/nieuws/t/6fbi52rzy3ly-full.jpg)'
        ></div>
        <h3 class='user__name'>${users[0].name}</h3>
        <p class='user__id addition hidden'> ID: <b>${users[0].id}</b></p>
        <i class='user__createdAt addition hidden'>${users[0].createdAt}</i>
        <button class='btn-toggle btn_primary'></button>
    </li>`;

  document.addEventListener('click', toggleField)
  
  document.querySelector('.btn-toggle').click();
  expect(document.querySelector('.user__id').classList.contains('hidden')).toBe(false);
  expect(document.querySelector('.user__createdAt').classList.contains('hidden')).toBe(false);

  document.querySelector('.btn-toggle').click();
  expect(document.querySelector('.user__id').classList.contains('hidden')).toBe(true);
  expect(document.querySelector('.user__createdAt').classList.contains('hidden')).toBe(true);
});
