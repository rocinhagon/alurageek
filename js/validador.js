const camposDoFormulario = document.querySelectorAll("[required]")
const formulario = document.querySelector("[data-formulario]")

formulario.addEventListener("submit", (event) => {
  event.preventDefault()

  const listaRespostas = {
    nome: e.target.elements["name"].value,
    preco: e.target.elements["price"].value,
    imagem: e.target.elements["image"].value,
  }

  localStorage.setItem("cadastro", JSON.stringify(listaRespostas))

  window.location.href = "index.html"
})

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo))
  campo.addEventListener("invalid", (event) => event.preventDefault())
})

const tiposDeErro = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "customError"
]

const mensagens = {
  name: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, coloque um nome válido.",
    tooShort: "Por favor, coloque um nome válido.",
  },
  price: {
    valueMissing: "O campo de preço não pode estar vazio.",
    typeMismatch: "Por favor, coloque um preço válido.",
    tooShort: "Por favor, coloque um preço válido.",
  },
  image: {
    valueMissing: "O campo de imagem não pode estar vazio.",
    typeMismatch: "Por favor, coloque uma URL válida.",
    tooShort: "Por favor, coloque uma URL válida.",
    customError: "A URL deve começar com https://",
  }
}

function verificaCampo(campo) {
  let mensagem = "";
  campo.setCustomValidity("");

  if (campo.name === "image" && campo.value && !campo.value.startsWith("https://")) {
    campo.setCustomValidity(mensagens.image.customError);
  }

  tiposDeErro.forEach(erro => {
    if (campo.validity[erro]) {
      mensagem = mensagens[campo.name][erro];
      console.log(mensagem);
    }
  })


  const mensagemErro = campo.nextElementSibling;
  const validadorDeInput = campo.checkValidity();

  if (!validadorDeInput) {
    mensagemErro.textContent = mensagem;
  
  } else {
    mensagemErro.textContent = "";
  }
}
