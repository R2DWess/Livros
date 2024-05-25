const mongoose = require( 'mongoose' );

const connectDB = async () =>
{
    try
    { //ola
        await mongoose.connect( 'mongodb://localhost:27017/meuBanco', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } );
        console.log( 'MongoDB conectado' );
    } catch ( err )
    {
        console.error( err.message );
        process.exit( 1 );
    }
};

module.exports = connectDB;
