import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import addPo from './controller'
import makeCallback from './express-callback'

dotenv.config();

const apiRoot = process.env.LTHE_API_ROOT;
const app = express();
app.use(bodyParser.json());

app.use((_, res, next) => {
    res.set({ Tk: '!' });
    next()
});
app.post(`${apiRoot}/addPostOrder`, makeCallback(addPo));

if (process.env.LTHE_ENV === 'dev') {
    // listen for requests
    app.listen(3000, () => {
        console.log('Server is listening on port 3000')
    })
}

export default app