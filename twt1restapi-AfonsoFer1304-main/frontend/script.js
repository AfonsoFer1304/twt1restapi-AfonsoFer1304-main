// JS para operações CRUD com Fetch APIconst API_URL = "http://localhost:3001/alunos";
const lista = document.getElementById("listaAlunos");
const form = document.getElementById("alunoForm");

const nome = document.getElementById("nome");
const apelido = document.getElementById("apelido");
const curso = document.getElementById("curso");
const anoCurricular = document.getElementById("anoCurricular");

// Lê todos os alunos
async function carregarAlunos() {
  const res = await fetch(API_URL);
  const alunos = await res.json();

  lista.innerHTML = "";
  alunos.forEach(aluno => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${aluno.nome} ${aluno.apelido} - ${aluno.curso} (${aluno.anoCurricular}º ano)
      <button onclick="editarAluno(${aluno.id})">Editar</button>
      <button onclick="apagarAluno(${aluno.id})">Apagar</button>
    `;
    lista.appendChild(li);
  });
}

// Adiciona ou atualiza aluno
form.onsubmit = async (e) => {
  e.preventDefault();

  const aluno = {
    nome: nome.value,
    apelido: apelido.value,
    curso: curso.value,
    anoCurricular: parseInt(anoCurricular.value)
  };

  if (form.dataset.editing) {
    const id = form.dataset.editing;
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno)
    });
    form.removeAttribute("data-editing");
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno)
    });
  }

  form.reset();
  carregarAlunos();
};

// Edita aluno
async function editarAluno(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const aluno = await res.json();

  nome.value = aluno.nome;
  apelido.value = aluno.apelido;
  curso.value = aluno.curso;
  anoCurricular.value = aluno.anoCurricular;
  form.dataset.editing = id;
}

// Apaga aluno
async function apagarAluno(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  carregarAlunos();
}

// Inicializa
carregarAlunos();
