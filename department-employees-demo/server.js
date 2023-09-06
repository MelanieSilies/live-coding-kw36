import express from "express";
import departmentRouter from "./routes/departmentRoute.js";
import employeeRouter from "./routes/employeeRoute.js";
/* 
Unsere Datenbankanbindung wir in das Verzeichnis "lib"
ausgelagert. Die Verbindung wird aufgebaut, indem wir
die connect_db.js imortieren
*/
import "./lib/connect_db.js";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();
/* 
Alternativ können wir dotenv als Einzeiler importieren: 
import "dotenv/config.js" 

Nachteil: wir können keine Parameter an config() übergeben, 
z.B. dotenv.config({ override: true });
 */

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());


app.use("/api", departmentRouter);
app.use("/api", employeeRouter);

/* 
Unser 404 error handler ist dazu da, um alle Anfragen ans
Backend abzufangen, die an eine ungültige Route (weil nicht vorhanden) gestellt wurden. 
Wichtig dabei ist, dass die Funktion unterhalb von existierenden Routes gestellt werden muss.
*/

app.use((req, res)=>{
    res.status(404).json({msg:"Page not found"});
});

/* 
Eine weitere Middleware die wir uns angesehen haben, ist die error-handling
Middleware von Express. 

app.use((err, req, res, next)=>{
    console.log({err});
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send(err.message);
});

Üblicherweise wird diese ans Ende unserer Middleware-Reihe gestellt.
Sie funktioniert etwas anders als eine "normale" Middleware. Essentiell ist auch, 
dass wir 4 Parameter haben, alle werden benötigt, auch wenn "next" in
der Funktion selber nicht benutzt wird!
Wenn wir in unseren Controllern im catch-Block die next-Funktion aufrufen und den
Fehler als Argument übergeben, landet dieser im error-handler, z.B. so:

catch(error) {
    next(error);
}

Auf die Art und Weise könnten wir alle Fehler, die bei Datenbankanfragen in unseren Controllern auftreten, gebündelt in einer Funktion auffangen.
*/

app.listen(port, () => console.log("Server is running on port: " + port));
