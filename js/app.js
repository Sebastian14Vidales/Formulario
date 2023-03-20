document.addEventListener('DOMContentLoaded', () => {

  const datos = {
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    password: ''
  }
  const formulario = document.querySelector('.formulario');
  const parrafo = document.createElement('P');

  const inputNombre = document.querySelector('#nombre');
  const inputApellido = document.querySelector('#apellido');
  const inputTelefono = document.querySelector('#telefono');
  const inputCorreo = document.querySelector('#correo');
  const inputPassword = document.querySelector('#password');

  const btnEnviar = document.querySelector('#boton-submit');
  const btnReset = document.querySelector('#boton-reset');

  const spinner = document.querySelector('#spinner');

  inputNombre.addEventListener('input', ejecutarInput);
  inputApellido.addEventListener('input', ejecutarInput);
  inputTelefono.addEventListener('blur', ejecutarInput);
  inputCorreo.addEventListener('blur', ejecutarInput);
  inputPassword.addEventListener('blur', ejecutarInput);

  btnEnviar.addEventListener('click', registrarUsuario);
  btnReset.addEventListener('click', (e) => {
    e.preventDefault();
    resetearFormulario();
    parrafo.remove();
    
  });

  function ejecutarInput(e) {
    const nombre = e.target.name;
    const elementoPadre = e.target.parentElement;

    if (e.target.value.trim() === '') {
      insertHTML(`El campo ${nombre} está vacio`, elementoPadre);
      datos[nombre] = '';
      habilitarBotonEnviar(datos);
      return;
    }

    if (nombre === 'telefono' && !validarTelefono(e.target.value)) {
      insertHTML(`Digite bien el ${nombre}`, elementoPadre);
      datos[nombre] = '';
      habilitarBotonEnviar(datos);
      return;
    }

    if (nombre === 'correo' && !validarCorreo(e.target.value)) {
      insertHTML(`Digite bien el ${nombre}`, elementoPadre);
      datos[nombre] = '';
      habilitarBotonEnviar(datos);
      return;
    }

    if (nombre === 'password' && !validarContraseña(e.target.value)) {
      insertHTML(`El ${nombre} debe tener una letra minúscula, una letra mayúscula, un número, un carácter especial y mínimo 8 dígitos.`, elementoPadre);
      datos[nombre] = '';
      habilitarBotonEnviar(datos);
      return;
    }
    datos[nombre] = e.target.value.trim().toLowerCase();
    habilitarBotonEnviar(datos);
    borrarHTML(elementoPadre);
  }

  function insertHTML(mensaje, referencia) {
    borrarHTML(referencia);

    parrafo.classList.add('bg-danger', 'mt-1', 'p-1', 'text-white', 'text-center');
    parrafo.textContent = mensaje;
    referencia.appendChild(parrafo);
  }

  function borrarHTML(referencia) {
    const alerta = referencia.querySelector('.bg-danger');
    if (alerta) {
      alerta.remove();
      return;
    }
    // console.log('Solo hay una alerta');
  }

  function validarCorreo(e) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const validar = regex.test(e)
    return validar;
  }

  function validarContraseña(e) {
    const regex = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
    const validar = regex.test(e);
    return validar;
  }

  function validarTelefono(e) {
    const regex = /^\d{3}-\d{3}-\d{4}$/;
    const validar = regex.test(e);
    console.log(validar);
    return validar;
  }

  function habilitarBotonEnviar() {
    if (Object.values(datos).includes('')) {
      btnEnviar.disabled = true;
      return;
    }
    btnEnviar.disabled = false;
  }

  function registrarUsuario(e) {

    e.preventDefault();
    spinner.classList.remove('visually-hidden');
    spinner.classList.add('d-flex');

    setTimeout(() => {
      spinner.classList.add('visually-hidden');
      spinner.classList.remove('d-flex');

      resetearFormulario();

      const exito = document.createElement('P');
      exito.classList.add('bg-success', 'text-white', 'text-center', 'rounded', 'mt-3', 'p-2');
      exito.textContent = 'Usuario registrado con éxito';
      formulario.children[0].appendChild(exito);

      setTimeout(() => {
        exito.remove();
      }, 3000);
    }, 3000);
  }

  function resetearFormulario() {
    datos.nombre = '';
    datos.apellido = '';
    datos.telefono = '';
    datos.correo = '';
    datos.password = '';

    formulario.reset();
    habilitarBotonEnviar();
  }

  const typed = new Typed('.typed', {
    strings: [
      '<span class="tecnologias">JavaScript</span>',
      '<span class="tecnologias">HTML y CSS</span>',
      '<span class="tecnologias">React Native</span>',
      '<span class="tecnologias">Bootstrap 5</span>',
    ],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true
  });
});