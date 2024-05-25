const express = require( 'express' );
const app = express();
const port = process.env.PORT || 3001;
const livroRoutes = require( './src/routes/livroRoutes' ); // Atualize o caminho aqui

app.use( express.json() );
app.use( '/api/livros', livroRoutes );

app.listen( port, () =>
{
    console.log( `Servidor rodando em http://localhost:${ port }` );
} );
