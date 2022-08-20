const app = require('./app');
const PORT = 9002;

app.listen(PORT, () => {
    console.log(`Connected server on : ${PORT}`);
})