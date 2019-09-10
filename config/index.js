const production = require('./production')

module.exports = (processEnv, profile) => {
  console.log(`\n================================\n`)
  console.log(`running for config: ${profile}`)
  console.log(`\n================================\n`)
  let configEnv = {}
  if (profile && profile !== 'production') {
    configEnv = require(`./${profile}`)
  }
  return Object.assign({}, processEnv, production, configEnv)
}