const fs = require( 'fs' );
const path = require( 'path' );
const livrosFilePath = path.join( __dirname, '../data/livros.json' );

class LivroService
{
    static loadLivros ()
    {
        const data = fs.readFileSync( livrosFilePath );
        return JSON.parse( data ).livros;
    }

    static saveLivros ( livros )
    {
        fs.writeFileSync( livrosFilePath, JSON.stringify( { livros }, null, 2 ) );
    }

    static getAllLivros ()
    {
        return this.loadLivros();
    }

    static getLivroByTitulo ( titulo )
    {
        const livros = this.loadLivros();
        return livros.find( livro => livro.titulo.toLowerCase() === titulo.toLowerCase() );
    }

    static adicionarLivro ( livro )
    {
        const livros = this.loadLivros();
        livro.id = livros.length + 1;
        livro.status = livro.numeroExemplares > 0 ? 'estoque' : 'esgotado';
        livros.push( livro );
        this.saveLivros( livros );
        return livro;
    }

    static atualizarLivro ( id, dadosAtualizados )
    {
        const livros = this.loadLivros();
        const livroIndex = livros.findIndex( livro => livro.id === parseInt( id ) );
        if ( livroIndex !== -1 )
        {
            livros[ livroIndex ] = { ...livros[ livroIndex ], ...dadosAtualizados, status: dadosAtualizados.numeroExemplares > 0 ? 'estoque' : 'esgotado' };
            this.saveLivros( livros );
            return livros[ livroIndex ];
        }
        return null;
    }

    static deletarLivro ( id )
    {
        const livros = this.loadLivros();
        const livroIndex = livros.findIndex( livro => livro.id === parseInt( id ) );
        if ( livroIndex !== -1 )
        {
            const livroDeletado = livros.splice( livroIndex, 1 );
            this.saveLivros( livros );
            return livroDeletado;
        }
        return null;
    }

    static comprarLivro ( titulo )
    {
        const livros = this.loadLivros();
        const livro = livros.find( livro => livro.titulo.toLowerCase() === titulo.toLowerCase() );
        if ( livro )
        {
            if ( livro.numeroExemplares > 0 )
            {
                livro.numeroExemplares -= 1;
                livro.status = livro.numeroExemplares === 0 ? 'esgotado' : 'estoque';
                this.saveLivros( livros );
                return { success: true, livro };
            } else
            {
                return { success: false, message: `Livro "${ titulo }" está esgotado.` };
            }
        } else
        {
            return { success: false, message: `Livro "${ titulo }" não encontrado.` };
        }
    }
}

module.exports = LivroService;
