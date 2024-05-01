import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import moment from 'moment';

import Router from './router/index.js'

dotenv.config();
const app = express();

app.use(express.json());

const { PORT, CORS_ORIGIN, CORS_METHODS } = process.env;
const corsOptions ={
    origin: CORS_ORIGIN,
    methods: CORS_METHODS.split(',')
}


app.listen(PORT, () => {
    console.log(`Server is runnning on port ${PORT} on ${moment().format(
        "DD-MMM-YYYY-T-HH:mm:ss.S"
    )}`);
})

// Cross Origin setup
app.use(cors(corsOptions));

// Body Parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


app.use('/', Router)


export default { app }