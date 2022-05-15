export const getTemplateFromLocalStorage = () => {
  if (localStorage.template) return JSON.parse(localStorage.getItem('template'));
  return null;
}

export const saveTemplateToLocalStorage = (template) => {
  if (!template || template.length < 10) return false;
  const whitelistRegex = /[^a-zA-Z*:<>.-\s\d()]/;
  // Check for invalid characters
  // Returns true if a character not in the whitelist is found
  if (whitelistRegex.test(template)) return false;
  // Save template in local storage
  localStorage.setItem('template', JSON.stringify(template));
  // Check if it was saved correctly
  return (JSON.parse(localStorage.getItem('template')) === template);
}