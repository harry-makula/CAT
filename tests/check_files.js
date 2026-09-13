const fs = require('fs')
const files = ['index.html','src/styles.css','src/app.js','README.md']
let ok = true
files.forEach(f=>{
  if(!fs.existsSync(f)){ console.error('MISSING:',f); ok=false } else { console.log('OK:',f) }
})
process.exit(ok?0:1)
