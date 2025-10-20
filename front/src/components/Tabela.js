import React from 'react';

function Tabela({ vetor, selecionar, remover }) {
  return (
    <div className="card table-card">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome do produto</th>
            <th>Marca</th>
            <th className="action-column">Ações</th>
          </tr>
        </thead>
        <tbody>
          {vetor.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#718096' }}>Nenhum produto cadastrado.</td>
            </tr>
          ) : (
            vetor.map((obj) => (
              <tr key={obj.codigo}>
                <td>{obj.codigo}</td>
                <td>{obj.nome}</td>
                <td>{obj.marca}</td>
                <td className="action-column">
                  <button
                    onClick={() => selecionar(obj)}
                    className="btn btn-table-action btn-edit"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => remover(obj.codigo)}
                    className="btn btn-table-action btn-delete"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Tabela;