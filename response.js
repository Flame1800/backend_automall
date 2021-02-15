`use strict`

exports.status = (code, response, res) => {
    const result = {
        status: 'succes',
        errorcode: 0,
        message: 'ok',
        response
    }

    res.status(code)
    res.json(result)
    res.end()
}

exports.error = (code, message, res) => {
    const data = {
        status: 'error',
        errorcode: code,
        message: message
    }

    res.status(code)
    res.json(data)
    res.end()
}