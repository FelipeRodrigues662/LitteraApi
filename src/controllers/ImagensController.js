const Imagems = require('../models/Imagems.js');

exports.getImagemByBookId = async (req, res) => {
    try{
        const { BookId } = req.params;  
        const Imagem = await Imagems.findAll({ where: BookId });
        if(!Imagem){
            return res.status(404).json({ message: 'Imagem não encontrada'});
        }
        res.status(200).json({ message: 'Erro ao buscar Imagems'})
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Imagens' , error: error.message });
    }
}

exports.postImagem = async (req, res) => {
    try {
        const { Imagem } = req.body;
        Imagem = await Imagems.create( Imagem);
        res.status(200).json("Imagem criada com sucesso!");
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar Imagem', error: error.message });
    }   
}

exports.patchImagem = async (req, res) => {
    try {
        const { Id } = req.params;
        const { Body } = req.body;

        const Imagem = await Imagems.findByPk(Id);

        if(Imagem != Body){
            Imagem = Body;
            await Imagem.save();
        }
        
        res.status(200).json({ message: 'Imagem atualizada com sucesso', Imagem });
        
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar Imagem', error: error.message });
    }   
}

exports.deleteImagem = async (req, res) => {
    try {
      const { id } = req.params;
      const Imagem = await Imagems.findByPk(id);
      if (!Imagem) {
        return res.status(404).json({ message: 'Imagem não encontrada' });
      }
      await Imagem.destroy();
      res.status(200).json({ message: 'Imagem deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar Imagem', error: error.message });
    }
  };