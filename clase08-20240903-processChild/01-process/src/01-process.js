import fs from "fs"

console.log(process.pid, " - pid")
console.log(process.cwd(), " - cwd()")
console.log(process.cpuUsage(), " - cpuUsage()")
console.log(process.platform, " - platform")
console.log(process.version, " - version")

// console.log(process.env, " - env")
console.log(process.env.PRUEBA_PORT)
console.log(process.env.path)

console.log(process.argv, " - argv")
