const form = document.querySelector("form");
const nameInput = document.querySelector("input[name='nombre']");
const tanks = document.querySelector(".tanks");
const img = document.querySelector(".image");
const emailInput = document.querySelector("input[name='email']");
const phoneInput = document.querySelector("input[name='telefono']");
const messageInput = document.querySelector("textarea[name='message']");

const inputs = [nameInput, emailInput, phoneInput, messageInput];

const isValidName = (nombre) => {
  const re = /^[a-zA-Z ]{2,254}$/;
  return re.test(String(nombre).toLowerCase());
};

const isValidEmail = (email) => {
  const re = /^[\w]+@{1}[\w]+\.+[a-z]{2,3}$/;
  return re.test(String(email).toLowerCase());
};

const isValidPhone = (telefono) => {
  const re = /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;
  return re.test(String(telefono).toLowerCase());
};

let isFormValid = false;
let isValidationOn = false;

const resetElm = (elm) => {
  elm.classList.remove("invalid");
  elm.nextElementSibling.classList.add("hidden");
};

const invalidateElm = (elm) => {
  elm.classList.add("invalid");
  elm.nextElementSibling.classList.remove("hidden");
};

const validateInputs = () => {
  if (!isValidationOn) return;
  isFormValid = true;
  resetElm(nameInput);
  resetElm(emailInput);
  resetElm(phoneInput);
  resetElm(messageInput);

  if (!isValidName(nameInput.value)) {
    isFormValid = false;
    invalidateElm(nameInput);
  }

  if (!isValidEmail(emailInput.value)) {
    isFormValid = false;
    invalidateElm(emailInput);
  }

  if (!isValidPhone(phoneInput.value)) {
    isFormValid = false;
    invalidateElm(phoneInput);
  }

  if (!messageInput.value) {
    isFormValid = false;
    invalidateElm(messageInput);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  isValidationOn = true;
  validateInputs();
  if (isFormValid) {
    form.remove();
    img.remove();
    tanks.classList.remove("hidden");
    // TODO: DO AJAX REQUEST
  }
});

inputs.forEach((input) => {
  i.addEventListener("input", () => {
    validateInputs();
  });
});
