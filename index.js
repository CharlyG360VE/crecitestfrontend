const express = require( 'express' );
const path = require( 'path' );
const cors = require( 'cors' );

//Declarando variables
const app = express();

//midlewares
app.use( cors() );
app.use( express.static( __dirname + '/dist/frontend' ) );

app.get( '*', ( req, res ) => {
  res.sendFile( path.join( __dirname + '/dist/frontend/index.html' ) )
} );

//Server listening

app.listen( process.env.PORT || 8080 );