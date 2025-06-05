if (document.getElementById("FormLogin")) {

  document.getElementById("FormLogin").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    if (email === "admin@admin.com" && senha === "admin") {
      localStorage.setItem("logado", "true");
      window.location.href = "crud.html"; 
    } else {
      alert("Credenciais inválidas!");
    }
  });
} else {

  
  if (localStorage.getItem("logado") !== "true") {
    window.location.href = "login.html";
  }

  const form = document.getElementById("form");
  const tabela = document.querySelector("#tabela tbody");
  const dialog = document.getElementById("dialogEditar");
  const btnSalvar = document.getElementById("btnSalvar");
  const btnListar = document.getElementById("btnListar");
let editandoId = null;

function carregarDados() {
  tabela.innerHTML = "";
  const registros = JSON.parse(localStorage.getItem("registros") || "[]");
  registros.forEach((item, index) => {
    const linha = tabela.insertRow();
    linha.innerHTML = `
      <td>${item.data}</td>
      <td>${item.temp}</td>
      <td>
        <button onclick="editar(${index})">Editar</button>
        <button onclick="excluir(${index})">Excluir</button>
      </td>`;
  });
}

let listagemAtiva = false;

btnSalvar.addEventListener("click", function (e) {
  e.preventDefault();  
  const data = document.getElementById("data").value;
  const temp = document.getElementById("temp").value;

  if (data === "" || temp === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const registros = JSON.parse(localStorage.getItem("registros") || "[]");
  registros.push({ data, temp });
  localStorage.setItem("registros", JSON.stringify(registros));
  form.reset();

  if (listagemAtiva) {
    carregarDados();
  }

});

btnListar.addEventListener("click", function () {
  carregarDados();
  listagemAtiva = true;
});

window.editar = function (index) {
  const registros = JSON.parse(localStorage.getItem("registros") || "[]");
  const item = registros[index];
  document.getElementById("editarData").value = item.data;
  document.getElementById("editarTemp").value = item.temp;
  editandoId = index;
  dialog.showModal();
};

document.getElementById("SalvarEdicao").addEventListener("click", function (e) {
  e.preventDefault();
  const data = document.getElementById("editarData").value;
  const temp = document.getElementById("editarTemp").value;

  if (data === "" || temp === ""){
    alert("Por favor, preencha todos os campos.");
    return;
  }
  
  const registros = JSON.parse(localStorage.getItem("registros") || "[]");
  registros[editandoId] = { data, temp };
  localStorage.setItem("registros", JSON.stringify(registros));
  dialog.close();
  carregarDados();
});

window.excluir = function (index) {
  const registros = JSON.parse(localStorage.getItem("registros") || "[]");
  registros.splice(index, 1);
  localStorage.setItem("registros", JSON.stringify(registros));
  carregarDados();
  };

  carregarDados();
}  
