const pagarServices = require("../services/pagamentoServices");

class pagamentoController {

  async listenReceitas(req, res) {
    try {
      const receitas = await pagarServices.selectAllReceitas();
      res.status(200).json(receitas);
    } catch (error) {
      console.error("Erro ao listar receitas:", error);
      res.status(400).json({ message: "Erro ao listar receitas." });
    }
  }

  async selectReceitasById(req, res) {
    const { id } = req.params;
    try {
      const receita = await pagarServices.selectReceitaById(id);
      if (!receita) {
        return res.status(404).json({ message: "Receita não encontrada." });
      }
      res.status(200).json(receita);
    } catch (error) {
      console.error("Erro ao buscar receita:", error);
      res.status(400).json({ message: "Erro ao buscar receita." });
    }
  }

  async insertReceitas(req, res) {
    const novaReceita = req.body;
    try {
      const receitaCriada = await pagarServices.insertReceita(novaReceita);
      res.status(201).json({
        message: "Receita criada com sucesso!",
        receita: receitaCriada,
      });
    } catch (error) {
      console.error("Erro ao inserir receita:", error);
      res.status(400).json({ message: "Erro ao inserir receita." });
    }
  }

  async updateReceita(req, res) {
    const { id } = req.params;
    const atualizacao = req.body;
    try {
      const receitaAtualizada = await pagarServices.updateReceita(id, atualizacao);
      if (!receitaAtualizada) {
        return res.status(404).json({ message: "Receita não encontrada." });
      }
      res.status(200).json({
        message: "Receita atualizada com sucesso!",
        receita: receitaAtualizada,
      });
    } catch (error) {
      console.error("Erro ao atualizar receita:", error);
      res.status(400).json({ message: "Erro ao atualizar receita." });
    }
  }

  async deleteReceita(req, res) {
    const { id } = req.params;
    try {
      const receitaDeletada = await pagarServices.deleteReceita(id);
      if (!receitaDeletada) {
        return res.status(404).json({ message: "Receita não encontrada." });
      }
      res.status(200).json({ message: "Receita deletada com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar receita:", error);
      res.status(400).json({ message: "Erro ao deletar receita." });
    }
  }

  async listenDespesas(req, res) {
    try {
      const despesas = await pagarServices.selectAllDespesas();
      res.status(200).json(despesas);
    } catch (error) {
      console.error("Erro ao listar despesas:", error);
      res.status(400).json({ message: "Erro ao listar despesas." });
    }
  }

  async selectDespesasById(req, res) {
    const { id } = req.params;
    try {
      const despesa = await pagarServices.selectDespesaById(id);
      if (!despesa) {
        return res.status(404).json({ message: "Despesa não encontrada." });
      }
      res.status(200).json(despesa);
    } catch (error) {
      console.error("Erro ao buscar despesa:", error);
      res.status(400).json({ message: "Erro ao buscar despesa." });
    }
  }

  async insertDespesas(req, res) {
    const novaDespesa = req.body;
    try {
      const despesaCriada = await pagarServices.insertDespesa(novaDespesa);
      res.status(201).json({
        message: "Despesa criada com sucesso!",
        despesa: despesaCriada,
      });
    } catch (error) {
      console.error("Erro ao inserir despesa:", error);
      res.status(400).json({ message: "Erro ao inserir despesa." });
    }
  }

  async updateDespesa(req, res) {
    const { id } = req.params;
    const atualizacao = req.body;
    try {
      const despesaAtualizada = await pagarServices.updateDespesa(id, atualizacao);
      if (!despesaAtualizada) {
        return res.status(404).json({ message: "Despesa não encontrada." });
      }
      res.status(200).json({
        message: "Despesa atualizada com sucesso!",
        despesa: despesaAtualizada,
      });
    } catch (error) {
      console.error("Erro ao atualizar despesa:", error);
      res.status(400).json({ message: "Erro ao atualizar despesa." });
    }
  }

  async deleteDespesa(req, res) {
    const { id } = req.params;
    try {
      const despesaDeletada = await pagarServices.deleteDespesa(id);
      if (!despesaDeletada) {
        return res.status(404).json({ message: "Despesa não encontrada." });
      }
      res.status(200).json({ message: "Despesa deletada com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar despesa:", error);
      res.status(400).json({ message: "Erro ao deletar despesa." });
    }
  }
}

module.exports = new pagamentoController();
