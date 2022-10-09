const exp = require('express');
const app = exp();

app.get('/', (req, res)=>{
    // res.send("<h1>Im a confused man</h1>")
    res.render(__dirname +'/view/about.ejs')
});
app.listen(3000,()=>{
    console.log("Connected");
})