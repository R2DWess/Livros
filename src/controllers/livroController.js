const LivroService = require('../service/livroService'); // Corrigir o caminho

exports.getAllLivros = (req, res) => {
    const livros = LivroService.getAllLivros();
    res.json(livros);
};

exports.getLivroByTitulo = (req, res) => {
    const { titulo } = req.params;
    const livro = LivroService.getLivroByTitulo(titulo);
    if (livro) {
        res.json(livro);
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
};

exports.adicionarLivro = (req, res) => {
    const { titulo, autor, genero, numeroExemplares, imagem } = req.body;
    const novoLivro = { titulo, autor, genero, numeroExemplares, imagem };
    const livro = LivroService.adicionarLivro(novoLivro);
    res.status(201).json(livro);
};

exports.atualizarLivro = (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    const livro = LivroService.atualizarLivro(id, dadosAtualizados);
    if (livro) {
        res.json(livro);
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
};

exports.deletarLivro = (req, res) => {
    const { id } = req.params;
    const livro = LivroService.deletarLivro(id);
    if (livro) {
        res.json(livro);
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
};

exports.comprarLivro = (req, res) => {
    const { titulo } = req.body;
    const result = LivroService.comprarLivro(titulo);
    if (result.success) {
        res.status(200).json({ message: `Livro "${titulo}" comprado com sucesso!` });
    } else {
        res.status(result.success ? 200 : 400).json({ message: result.message });
    }
};
