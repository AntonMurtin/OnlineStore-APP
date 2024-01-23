const express = require('express');
const cors = require('cors')

const expressConfig = require('./config/express');
const dbConnect = require('./config/mongoose');
const { port } = require('./config/constants');

const routes = require('./routes');

const app = express();

expressConfig(app);
app.use(cors( {
    "AllowedHeaders": [
        "*"
    ],
    "AllowedMethods": [
        "PUT",
        "POST",
        "DELETE",
        "GET"
    ],
    "AllowedOrigins": [
        "http://localhost:3000/"
    ],
    "ExposeHeaders": [
        "x-amz-server-side-encryption",
        "x-amz-request-id",
        "x-amz-id-2"
    ],
    "http://localhost:": 3000
}))
dbConnect()
    .then(console.log('Db is conect'))
    .catch((err) => console.log(`Db error:${err}`));


app.use(routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));