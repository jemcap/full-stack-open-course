// info for printing normal log messages
// error for all error messages

const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.log(...params)
}

module.exports = {
    info, error
}