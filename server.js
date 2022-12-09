const express = require("express");
const gridGen = require("./utils");
console.log(gridGen)

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/api/gen", async (req, res) => {
    let {rows, columns, pieces} = req.query;
    rows = parseInt(rows);
    columns = parseInt(columns);
    pieces = parseInt(pieces);
    if (rows < 1 || columns < 1 || pieces < 1 || isNaN(rows) || isNaN(columns) || isNaN(pieces) || pieces > rows * columns) {
        res.status(400).send("Bad Request");
        return;
    }
    console.log
    console.log(rows, columns, pieces)
    const places = await gridGen.cycleGenerator(rows, columns, pieces);
    console.log(places)
    const grid = await gridGen.drawPieces(rows, columns, places);
    cssData = await gridGen.convertToCSS(rows, columns, places);
    res.json({cssData , grid, places});
}
)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
