const RULES = {
  nombre:   { required: true,  minLen: 2,  label: 'Nombre' },
  empresa:  { required: false, minLen: 2,  label: 'Empresa' },
  email:    { required: true,  email: true, label: 'Email' },
  personas: { required: true,  label: 'Cantidad de personas' },
  mensaje:  { required: false, minLen: 10, label: 'Mensaje' },
};

const MESSAGES = {
  required: (label) => `${label} es obligatorio.`,
  minLen:   (label, n) => `${label} debe tener al menos ${n} caracteres.`,
  email:    () => 'Ingresá un email válido.',
};

function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function validate(id, value) {
  const rule = RULES[id];
  if (!rule) return null;

  const trimmed = value.trim();

  if (rule.required && !trimmed) return MESSAGES.required(rule.label);
  if (!rule.required && !trimmed) return null;
  if (rule.email && !isValidEmail(trimmed)) return MESSAGES.email();
  if (rule.minLen && trimmed.length < rule.minLen) return MESSAGES.minLen(rule.label, rule.minLen);

  return null;
}

function showError(field, message) {
  const group = field.closest('.form-group');
  let hint = group.querySelector('.form-hint');

  if (!hint) {
    hint = document.createElement('span');
    hint.className = 'form-hint';
    group.appendChild(hint);
  }

  if (message) {
    hint.textContent = message;
    hint.classList.add('form-hint--error');
    field.classList.add('field--error');
  } else {
    hint.textContent = '';
    hint.classList.remove('form-hint--error');
    field.classList.remove('field--error');
    field.classList.add('field--ok');
  }
}

function clearOk(field) {
  field.classList.remove('field--ok');
}

function initForm() {
  const form = document.querySelector('.contacto__form form');
  if (!form) return;

  const fields = form.querySelectorAll('input, select, textarea');

  fields.forEach(field => {
    field.addEventListener('blur', () => {
      const error = validate(field.id, field.value);
      showError(field, error);
    });

    field.addEventListener('input', () => {
      const error = validate(field.id, field.value);
      if (!error) {
        showError(field, null);
      }
    });

    field.addEventListener('focus', () => clearOk(field));
  });

  form.addEventListener('submit', (e) => {
    let hasErrors = false;

    fields.forEach(field => {
      const error = validate(field.id, field.value);
      showError(field, error);
      if (error) hasErrors = true;
    });

    if (hasErrors) {
      e.preventDefault();
      const firstError = form.querySelector('.field--error');
      if (firstError) firstError.focus();
      return;
    }

    showSuccess(form);
  });
}

function showSuccess(form) {
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = '✓ Consulta enviada';
  btn.disabled = true;
  btn.style.background = '#25a244';
  btn.style.color = '#fff';
}

initForm();
