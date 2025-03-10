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
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ categoria: '', tipo: '', valor: '', data: '' });
  const [sort, setSort] = useState({ field: '', order: '' });
  // const [token, setToken] = useState(localStorage.getItem('token') || '');

  const loadData = async () => {
    setLoading(true);
    try {
      // const headers = { Authorization: `Bearer ${token}` };
      const receitasResponse = await axios.get('http://10.5.1.166:3005/api/receita/' /*, { headers }*/);
      const despesasResponse = await axios.get('http://10.5.1.166:3005/api/despesa/' /*, { headers }*/);
      setReceitas(receitasResponse.data);
      setDespesas(despesasResponse.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // const handleLogin = async (username, password) => {
  //   try {
  //     const response = await axios.post('http://10.5.1.166:3005/api/login', { username, password });
  //     setToken(response.data.token);
  //     localStorage.setItem('token', response.data.token);
  //   } catch (error) {
  //     console.error('Erro ao fazer login:', error.message);
  //   }
  // };

  // const handleLogout = () => {
  //   setToken('');
  //   localStorage.removeItem('token');
  // };

  const handleEdit = (item) => {
    setFormData(item);
    setIsReceita(item.tipo === 'Receita');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://10.5.1.166:3005/api/${isReceita ? 'receita' : 'despesa'}/${id}`);
      loadData();
    } catch (error) {
      console.error('Erro ao deletar item:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`http://10.5.1.166:3005/api/${isReceita ? 'receita' : 'despesa'}/${formData.id}`, formData);
      } else {
        await axios.post(`http://10.5.1.166:3005/api/${isReceita ? 'receita' : 'despesa'}`, formData);
      }
      setFormData({
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
      loadData();
    } catch (error) {
      console.error('Erro ao salvar item:', error.message);
    }
  };

  const filteredData = (isReceita ? receitas : despesas)
    .filter(item => item.nome.includes(searchTerm))
    .filter(item => !filter.categoria || item.categoria === filter.categoria)
    .filter(item => !filter.tipo || item.tipo === filter.tipo)
    .filter(item => !filter.valor || item.valor === parseFloat(filter.valor))
    .filter(item => !filter.data || item.data === filter.data)
    .sort((a, b) => {
      if (!sort.field) return 0;
      if (sort.order === 'asc') {
        return a[sort.field] > b[sort.field] ? 1 : -1;
      } else {
        return a[sort.field] < b[sort.field] ? 1 : -1;
      }
    });

  return (
    <div className="App">
      <h1>Gerenciamento de Receitas e Despesas</h1>
      <div>
        <button onClick={() => setIsReceita(true)}>Receitas</button>
        <button onClick={() => setIsReceita(false)}>Despesas</button>
      </div>
      <div className="search-filter-container">
  <div className="search-bar">
    <input
      type="text"
      placeholder="Buscar..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  <div className="filter-options">
    <select
      value={filter.categoria}
      onChange={(e) => setFilter({ ...filter, categoria: e.target.value })}
    >
      <option value="">Categoria</option>
      <option value="casa">Casa</option>
      <option value="apartamento">Apartamento</option>
      <option value="propriedade">Propriedade</option>
    </select>
    <select
      value={filter.tipo}
      onChange={(e) => setFilter({ ...filter, tipo: e.target.value })}
    >
      <option value="">Tipo</option>
      <option value="Vendas">Vendas</option>
      <option value="Servicos">Serviços</option>
      <option value="Operacionais">Operacionais</option>
    </select>
    <input
      type="number"
      placeholder="Valor"
      value={filter.valor}
      onChange={(e) => setFilter({ ...filter, valor: e.target.value })}
    />
    <input
      type="date"
      placeholder="Data"
      value={filter.data}
      onChange={(e) => setFilter({ ...filter, data: e.target.value })}
    />
  </div>
  <div className="sort-options">
    <select
      value={sort.field}
      onChange={(e) => setSort({ ...sort, field: e.target.value })}
    >
      <option value="">Ordenar por</option>
      <option value="nome">Nome</option>
      <option value="valor">Valor</option>
      <option value="data">Data</option>
    </select>
    <select
      value={sort.order}
      onChange={(e) => setSort({ ...sort, order: e.target.value })}
    >
      <option value="">Ordem</option>
      <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option>
    </select>
  </div>
</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Cliente"
          value={formData.cliente}
          onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Fornecedor"
          value={formData.fornecedor}
          onChange={(e) => setFormData({ 
            ...formData, 
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
      <div>
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
              {filteredData.map((item) => (
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
    </div>
  );
}

export default App;