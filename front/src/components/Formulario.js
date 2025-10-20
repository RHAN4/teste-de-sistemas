import React from 'react';

function Formulario({ btnCadastrar, aoDigitar, cadastrar, objProduto, cancelar, alterar }) {
  return (
    <div className="card form-card">
      <form>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="nomeProduto">Nome do produto</label>
            <input
              id="nomeProduto"
              type="text"
              value={objProduto.nome}
              onChange={aoDigitar}
              name="nome"
              placeholder="Digite o nome do produto"
              className="form-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="marcaProduto">Marca</label>
            <input
              id="marcaProduto"
              type="text"
              value={objProduto.marca}
              onChange={aoDigitar}
              name="marca"
              placeholder="Digite a marca"
              className="form-input"
            />
          </div>
        </div>

        <div className="button-group">
          {btnCadastrar ? (
            <button
              type="button"
              onClick={cadastrar}
              className="btn btn-primary-add"
            >
              Adicionar produto
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={alterar}
                className="btn btn-warning"
              >
                Salvar alterações
              </button>
              <button
                type="button"
                onClick={cancelar}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Formulario;