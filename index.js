import app from "./app.js";

const main = () => {
  app.listen(app.get('port'))
  console.log(`Server on port ${8000}`)
}

main()