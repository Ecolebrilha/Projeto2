import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    descricao: '',
    cliente: '',
    fornecedor: '',
    valor: '',
    formPagamento: '',
    categoria: '',
    tipo: '',
  });
  const [loading, setLoading] = useState(true);
  const [isReceita, setIsReceita] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const receitasResponse = await axios.get('http://10.5.1.166:3005/api/receita/');
      const despesasResponse = await axios.get('http://10.5.1.166:3005/api/despesa/');
      setReceitas(receitasResponse.data);
      setDespesas(despesasResponse.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.valor <= 0) {
      alert('O valor deve ser maior que zero.');
      return;
    }

    const url = isReceita
      ? `http://10.5.1.166:3005/api/receita/${formData.id || ''}`
      : `http://10.5.1.166:3005/api/despesa/${formData.id || ''}`;
    const method = formData.id ? 'put' : 'post';

    try {
      await axios[method](url, formData);
      setFormData({ id: '', nome: '', descricao: '', cliente: '', fornecedor: '', valor: '', formPagamento: '', categoria: '', tipo: '' });
      loadData();
    } catch (error) {
      console.error('Erro ao salvar:', error.message);
      alert('Ocorreu um erro ao processar sua solicitação.');
    }
  };

  const handleDelete = async (id) => {
    const url = isReceita
      ? `http://10.5.1.166:3005/api/receita/${id}`
      : `http://10.5.1.166:3005/api/despesa/${id}`;
    try {
      await axios.delete(url);
      loadData();
    } catch (error) {
      console.error('Erro ao deletar:', error.message);
      alert('Erro ao deletar o item.');
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsReceita(!!item.cliente);
  };

  useEffect(() => {
    loadData();
  }, []);

  const listData = isReceita ? receitas : despesas;

  return (
    <div className="App">
      <h1>Gerenciamento de Receitas e Despesas</h1>
      <button
        style={{ fontWeight: isReceita ? 'bold' : 'normal' }}
        onClick={() => setIsReceita(true)}
      >
        Receitas
      </button>
      <button
        style={{ fontWeight: !isReceita ? 'bold' : 'normal' }}
        onClick={() => setIsReceita(false)}
      >
        Despesas
      </button>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
        {!isReceita && (
          <input
            type="text"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          />
        )}
        <input
          type="text"
          placeholder={isReceita ? 'Cliente' : 'Fornecedor'}
          value={isReceita ? formData.cliente : formData.fornecedor}
          onChange={(e) => setFormData({
            ...formData,
            cliente: isReceita ? e.target.value : '',
            fornecedor: !isReceita ? e.target.value : ''
          })}
          required
        />
        <input
          type="number"
          placeholder="Valor"
          value={formData.valor}
          onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Forma de Pagamento"
          value={formData.formPagamento}
          onChange={(e) => setFormData({ ...formData, formPagamento: e.target.value })}
          required
        />
        <select
          value={formData.categoria}
          onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
        >
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
          <option value="propriedade">Propriedade</option>
        </select>
        <select
          value={formData.tipo}
          onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
        >
          <option value="Vendas">Vendas</option>
          <option value="Servicos">Serviços</option>
          <option value="Operacionais">Operacionais</option>
        </select>
        <button type="submit">{formData.id ? 'Atualizar' : 'Adicionar'}</button>
      </form>

      <h2>Lista de {isReceita ? 'Receitas' : 'Despesas'}</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              {!isReceita && <th>Descrição</th>}
              <th>{isReceita ? 'Cliente' : 'Fornecedor'}</th>
              <th>Valor</th>
              <th>Forma de Pagamento</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listData.map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                {!isReceita && <td>{item.descricao}</td>}
                <td>{isReceita ? item.cliente : item.fornecedor}</td>
                <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}</td>
                <td>{item.formPagamento}</td>
                <td>{item.categoria}</td>
                <td>{item.tipo}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Editar</button>
                  <button onClick={() => handleDelete(item.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
