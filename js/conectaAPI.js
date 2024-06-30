const API = "http://localhost:3000/games"

async function games() {
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Erro ao conectar com o servidor")
    }
    return await response.json();

  } catch (error) {
    console.error(error)
    return { error: 'Erro ao carregar dados' } 
  }
}

async function novoGame(nome, preco, imagem) {
  try {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, preco, imagem }),
    })
    if (!response.ok) {
      throw new Error("Erro ao adicionar seu jogo")
    }
      return await response.json();
      
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function excluirGame(id) {
  try {
    const response = await fetch(`${API}/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error("Erro ao excluir jogo")
    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function carregarDadosLocais() {
  const response = await fetch("db.json")
  const data = await response.json()

  return data.games
}

export const conectaAPI = {
  games,
  novoGame,
  excluirGame,
}
