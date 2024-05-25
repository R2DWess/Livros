const express = require( 'express' );
const router = express.Router();
const livroController = require( '../controllers/livroController' );

router.get( '/', livroController.getAllLivros );
router.get( '/:titulo', livroController.getLivroByTitulo );
router.post( '/comprar', livroController.comprarLivro );
router.post( '/', livroController.adicionarLivro );
router.put( '/:id', livroController.atualizarLivro );
router.delete( '/:id', livroController.deletarLivro );

module.exports = router;
