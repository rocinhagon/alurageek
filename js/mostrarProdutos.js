import { conectaAPI } from "./conectaAPI.js"

const formulario = document.querySelector("[data-formulario]");
const cards = document.querySelector("[data-card]");

async function novosGames(event) {
  event.preventDefault()

  const nome = document.querySelector("[data-name]").value;
  const preco = document.querySelector("[data-price]").value;
  const imagem = document.querySelector("[data-image]").value;

  try {
    await conectaAPI.novoGame(nome, preco, imagem)
    carregarGames(); 
  } catch (error) {
    console.log('mostrar erro', error.message);
  }
}

formulario.addEventListener("submit", novosGames);

function constroiCard(id, nome, preco, imagem) {
  
  const newProduct = document.createElement("li")
  newProduct.className = "card"
  newProduct.innerHTML = `
    <div class="card">
      <img class="image-card" src="${imagem}" alt="${nome}">
      <h3 class="name-card">${nome}</h3>
      <div class="preco-card">
        <p>$ ${preco}</p>
        <img src="../assets/trashicon.png" alt="trash icon" class="delete-icon" data-id="${id}">
      </div>
    </div>`

  const deleteIcon = newProduct.querySelector(".delete-icon")
  deleteIcon.addEventListener("click", async () => {
    try {
      await conectaAPI.excluirGame(id)
      carregarGames() 
    } catch (error) {
      alert(error.message)
    }
  })

  return newProduct;

} 


async function carregarGames() {
  cards.innerHTML = "" 
  try {
    const listaApi = await conectaAPI.games()
    listaApi.forEach((elemento) =>
      cards.appendChild(
        constroiCard(
          elemento.id,
          elemento.nome,
          elemento.preco,
          elemento.imagem
        )
      )
    )
  } catch {
    cards.innerHTML = `<div class="formulario">
      <h2>Não foi possível cadastrar o seu produto, tente novamente</h2>
      </div>`
  }
}

function limparInputs() {
  inputNome.value = "";
  inputPreco.value = "";
  inputImagem.value = "";

  return;
}

carregarGames();


