const app = require('./app')
const PORT = 3000

app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`)
})