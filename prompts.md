*ESSE É O ARQUIVO DOS COMANDOS UTILIZADOS NO GEMINI PARA A GEREÇÃO DO CÓDIGO ATUALIZADO DA PAGINA DE LOGIN DO PROJETO PA DO GRUPO AGNUS DEI!!1!!1*

*Aqui o comando começa com o banco de dados mySQL, antes a ele também enviei os arquivos do login.html e style.css da pagina, mas como aqui não tem como colocar esses arquivos... LEMBRNADO, toda essa pagina de login feita é uma versão REMASTERIZADA e MELHORADA da pagina de login ja existente do projeto LEX IQ da equipe Agnus Dei*
Banco de dados mySQL
create database if not exists usuarios_db;
use usuarios_db;

create table usuarios (
id int primary key auto_increment,
email varchar(100) not null,
senha varchar(100) not null unique
);

insert into usuarios (email,senha)
values ('coolskeleton@unnet.com','theGREAT1_ne'),
('whatisanemail@gmail.com','iTeleportBread111---1');

select * from usuarios;

*Aqui é os codigos do script.js*
Arquivo do script.js
const form = document.getElementById("loginForm");
form.addEventListener("submit", async (e) => {
e.preventDefault();

const email = document.getElementById("email").value;
const senha = document.getElementById("password").value;

try {

const response = await fetch("http://localhost:3000/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({ email, senha })

});

const data = await response.json();
const message = document.getElementById("message");

if (response.ok) {

message.style.color = "purple";
message.innerText = data.message;

console.log("Dados que vieram do Backand no Login:", data);

if (data.usuario) {
        localStorage.setItem("usuarioLogado", JSON.stringify(data.usuario));
    }

setTimeout(() => {

window.location.assign("../inicio/home.html");

}, 1000);

} else {

message.style.color = "red";

message.innerText = data.message;

}

} catch (error) {

console.error("Erro ao conectar com o servidor:", error);

alert("Não foi possível conectar ao servidor backend.");
}
});


*A partir daqui é o comando em si, o que da as instruções para a IA do Gemini.*
Segue os arquivos de html, script, css e o banco de dados mySQL de uma pagina de login de um projeto. Quero que torne essa pagina mais moderna e detalhada. A estrutura basica ja esta pronta (realizada por mim), so quero que a transforme em algo mais bem feito e detalhado. No html faça as atualizações necessárias para deixar mais visivelmente detalhado ou adicione outros blocos de <main>, <form>,  <label>, <input> <button> e entre outros se for precisso.

Adicione também à essa página (além dos campos de email e senha que ja estão presentes) a checkbox de "lembrar desse dispositivo", botão de esqueceu a senha e o 'olho' para visualizar ou esconder a senha.

No script não creio que precise de mudanças significativas, no entanto, graças a algumas linhas de codigo de simulação (se não me engano) de 'salvar' os dados de login no cachê da pagina, o computador de onde estou esta rejeitando esse arquivo script.js, acreditando que é um codigo malicioso (por isso eu coloquei ele inteiro aqui em vez de mandar o arquivo), então modifique esse arquivo para que esse arquivo não cause mais isso.

No CSS siga o esquema de cores que nem na pagina inicial da pagina do site, tanto os gradientes e outras cores (se tiver errado eu aviso depois). Aqui esta um exemplo de :root para exemplo das cores, mas não é necessario realmente seguir exatamente isso. 
:root {
    --bg-pagina: #f7f4ff;
    --bg-card-header: #ffffff;
    --texto-principal: #000000;
    --texto-secundario: #555555;
    --borda-dropdown: #eae1ff;
    --sombra-card: #ffecffc2;
    --banner-hero-bg: linear-gradient(to right, #d2d7ff, #abb3ff);
    --banner-hero-texto: #1a3bf5;
}

Ainda no CSS não deixe de utilizar elementos como flexbox, grid, padding, transition e outros para deixar apresentavel (mas peço que mantenha as coisas mais no centro da tela). A e também torne toda essa pagina responsiva utilizando o @media por exemplo: @media screen and (max-width: 768px) (não estou pedindo para seguir exatamente isso)


*Desse ponto é o segundo comando apos as alterações da IA*
*Aqui as instruções, e como pode ver, eu fiqui satisfeito com o resultado. So quis resolver outros porblemas a parte, não necessariamente relacionados ao frontend*
a parte visual ficou otima! No entanto, quando fui testar, ficou resultando em que não foi possivel se conectar ao servidor backend mesmo que no terminal do vscode esteja dizendo que sim. Então por via dúvidas, vou mandar aqui o aqui db.js e server.js so para ver se você consegue indentificar o problema (sim, no arquivo db.js existe DOIS bancos de dados. E antes que pergunte também, sim, todos o node modulos e packages ja estão instalados).

*aqui é os codigos do arquivo db.js, ignore se quiser*
arquivo db.js:
const mysql = require('mysql2');

const dbUsuarios = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usuarios_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const dbUsuariosES = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usuariosES_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

dbUsuarios.getConnection((err, conn) => {
  if (err) {
    console.error('Erro ao conectar ao banco de usuarios "Ai que burrro dá 0 pra ele!":', err.message);
  } else {
    console.log('Conectado com sucesso ao MySQL do banco de usuarios "YA ARE DOING GOOD LAD!!"');
    conn.release();
  }
});

dbUsuariosES.getConnection((err, conn) => {
  if (err) {
    console.error('Erro ao conectar ao banco de usuarios escolar "VOCÊ NÃO VAI COM A MINHA CARA?":', err.message);
  } else {
    console.log('Conectado com sucesso ao MySQL do banco de usuarios escolar "You were good son, reeal good, maybe even the best!"');
    conn.release();
  }
});

module.exports = {
  dbUsuarios,
  dbUsuariosES
};

arquivo server.js:
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Servir a pasta de uploads estaticamente (para conseguir visualizar as imagens depois)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuração do Multer para salvar os arquivos de imagem
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Garanta que a pasta 'uploads' exista no seu backend
  },
  filename: (req, file, cb) => {
    // Cria um nome único com timestamp para não sobrescrever arquivos
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const { dbUsuarios, dbUsuariosES } = require('./db');

// ROTA: Criar usuário normal
app.post('/usuarios', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e Senha são obrigatórios' });
  }

  dbUsuarios.query(
    'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
    [email, senha],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        id: result.insertId,
        email
      });
    }
  );
});

// ROTA: Criar usuário escolar (Com Upload de Imagem e FormData)
app.post('/usuariosES', upload.single('imagem'), (req, res) => {
  const { email, cpf, senha } = req.body;
  const fotoPerfil = req.file ? req.file.filename : null;

  if (!email || !cpf || !senha) {
    return res.status(400).json({ erro: 'Email, CPF e Senha são obrigatórios!' });
  }

  // Corrigido para gravar na tabela 'usuariosES' do seu MySQL
  const query = 'INSERT INTO usuariosES (email, CPF, senha, foto_perfil) VALUES (?, ?, ?, ?)';

  dbUsuariosES.query(query, [email, cpf, senha, fotoPerfil], (err, result) => {
    if (err) {
      console.error("Erro ao inserir no banco:", err);
      return res.status(500).json({ erro: 'Erro no banco de dados', detalhe: err });
    }

    res.status(201).json({
      mensagem: 'Usuário Escolar criado com sucesso!',
      id: result.insertId,
      email,
      cpf
    });
  });
});

// Listar usuários normais
app.get('/usuarios', (req, res) => {
  dbUsuarios.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Listar usuários escolares
app.get('/usuariosES', (req, res) => {
  dbUsuariosES.query('SELECT id, email, CPF, foto_perfil, criado_em FROM usuariosES', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});



*E aqui é o terceiro e ultimo comando que eu solicitei, também relacionado mais ao back do que o front, leia se desejar*

*comando*
ok! perfeito! funcionou corretamente, no entanto so tem mais um detalhe. Na home (o lugar que sou redirecionado após realizar o login) eu coloquei uma função que so permite que eu acesse aquela área com o login realizado. O código que determina essa função antes funcionava normalmente, no entanto com essas modificações agora isso deixou de funcionar. Nota: essa função também esta presente em outra página. Então como se pode resolver isso? Aqui esta o código do script da home:

*scipt.js da pagina home do projeto da minha equipe*
const btnMenuToggle = document.getElementById('btnMenuToggle');
const dropdownMenu = document.getElementById('dropdownMenu');

if (btnMenuToggle && dropdownMenu) {
    btnMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('mostrar');
    });
    
    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('mostrar');
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");

    if (!usuarioSalvo){
        alert("Você não fez login ainda, crie ou entre em uma conta!")
        window.location.assign("../main/index.html");
        return;
    }

    const usuarios = JSON.parse(usuarioSalvo);

    console.log("ID do usuario logado encontrado!!:", usuarios.id);

    const elementoEmail = document.getElementById("emailUsuario");
    if (elementoEmail) {
        elementoEmail.textContent = usuarios.email;
    }
});

//Botao do DarkMode
function Funcao() {
    document.documentElement.classList.toggle("dark-mode");

    if (document.documentElement.classList.contains("dark-mode")) {
        localStorage.setItem("tema", "escuro");
    } else {
        localStorage.setItem("tema", "claro");
    }
}