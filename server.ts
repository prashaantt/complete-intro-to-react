import express = require('express')
import React = require('react')
import ReactDOMServer = require('react-dom/server')
import { StaticRouter } from "react-router";
import { template } from "lodash";
import { readFileSync } from "fs";
import { App } from "./src/App";

const baseTemplate = readFileSync('./index.html', "utf-8");
const PORT = 5050

const server = express()
const templ = template(baseTemplate);

server.use('/public', express.static('./public'))

server.use((req, res) => {
    // const context = ReactRouter.createServerRenderContext()
    const context = {};
    const body = ReactDOMServer.renderToString(
        React.createElement(StaticRouter, { location: req.url, context: context },
            React.createElement(App)
        )
    )

    res.write(templ({ body: body }))
    res.end()
})

console.log('listening on port', PORT)
server.listen(PORT)
