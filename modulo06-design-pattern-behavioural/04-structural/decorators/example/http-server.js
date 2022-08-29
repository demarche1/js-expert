import http from 'http'
import {InjectHttpInterceptor} from '../src/index.js'

InjectHttpInterceptor()
function handleRequest(request, response) {
    response.end('Hello World')
}

const server = http.createServer(handleRequest)
const port = 3000
server.listen(port, () => {
    console.log('Server is up at: ', server.address().port);
})