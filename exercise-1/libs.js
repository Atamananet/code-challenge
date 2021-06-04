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

module.exports = {
    normalizeUsers,
    formatDate,
    toggleFields,
    fetchTemplate,
    renderHandlebarsTemplate,
};
