import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Tabela from './components/Tabela';
import Header from './components/Header';

function App() {

  const urlBase = "http://localhost:8080";

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState({
    codigo: 0,
    nome: '',
    marca: ''
  });

  const obterProdutos = () => {
    fetch(urlBase + "/listar", {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido))
      .catch(erro => console.error("Erro ao listar produtos:", erro));
  }

  useEffect(() => {
    obterProdutos();
  }, []);

  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  }

  const cadastrar = () => {
    const { codigo, ...produtoSemCodigo } = objProduto;

    fetch(urlBase + "/cadastrar", {
      method: 'POST',
      body: JSON.stringify(produtoSemCodigo),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          setProdutos([...produtos, retorno_convertido]);
          alert('Produto cadastrado com sucesso!');
          limparFormulario();
        }
      })
      .catch(erro => console.error("Erro ao cadastrar produto:", erro));
  }

  const alterar = () => {
    fetch(urlBase + "/alterar", {
      method: 'PUT',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          alert('Produto alterado com sucesso!');
          limparFormulario();
          obterProdutos();
        }
      })
      .catch(erro => console.error("Erro ao alterar produto:", erro));
  }

  const remover = (codigo) => {
    fetch(urlBase + "/remover/" + codigo, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        alert(retorno_convertido.mensagem);
        limparFormulario();
        obterProdutos();
      })
      .catch(erro => console.error("Erro ao remover produto:", erro));
  }

  const limparFormulario = () => {
    setObjProduto({ codigo: 0, nome: '', marca: '' });
    setBtnCadastrar(true);
  }

  const selecionarProduto = (produtoSelecionado) => {
    setObjProduto(produtoSelecionado);
    setBtnCadastrar(false);
  }

  return (
    <>
      <Header />
      <div className="container">
        <Formulario
          btnCadastrar={btnCadastrar}
          aoDigitar={aoDigitar}
          cadastrar={cadastrar}
          objProduto={objProduto}
          cancelar={limparFormulario}
          alterar={alterar}
          remover={remover}
        />
        <Tabela
          vetor={produtos}
          selecionar={selecionarProduto}
          remover={remover}
        />
      </div>
    </>
  );
}

export default App;