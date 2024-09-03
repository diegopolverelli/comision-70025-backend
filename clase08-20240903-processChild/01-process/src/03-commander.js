import {Command, Option} from "commander"

const program=new Command()

program.option("-p, --port <port>", "Puerto donde estará escuchando el server", 3000)
program.option("-c, --color <color>", "Permite ingresar un color...", )
program.option("-d, --debug", "Activa modo debug", false)
program.option("-n, --numeros [numeros...]", "Permite ingresar una serie de números", )
program.option("-h, --heroes [heroes...]", "Permite ingresar una serie de heroes", )
program.requiredOption("-u, --user <username>", "Usuario que ejecuta el proceso", )
program.addOption(new Option("-m, --mode <mode>", "mode de ejecución del script").choices(["dev", "prod", "test" ]).default("test"))

program.allowUnknownOption()
program.parse()
const opts=program.opts()
console.log(opts)
console.log(`El servidor ejecutará en el puerto ${opts.port}`)
console.log(program.args)
