import 'babel-polyfill';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';
import bodyParser from 'body-parser';
import 'isomorphic-fetch';

import App from './src/App';

const app = express();
const PORT = process.env.port || 3000;

app.use(bodyParser.json());
app.use(express.static('build/public'));

app.get('/',(req,res)=>{
    const {page = 1} = req.query;
   fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
   .then(response=> response.json())
    .then((initialData)=>{
        const hits = initialData.hits;
        const context =  {hits,page} ;
        const content = ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
                <App/>
            </StaticRouter>
        );
        const html = `
            <html>
                <head>
                <script>window.__storiesList__= ${JSON.stringify(hits)};window.__page__=${page}</script>
                </head>
                <body>
                    <div id="root">
                        ${content}
                    </div>
                </body>
                <script src="client_bundle.js"></script>
            </html>
        `;
        res.send(html);
    });
    
});

app.listen(PORT,()=>{
    console.log(`App listening on port : ${PORT}`);
});
