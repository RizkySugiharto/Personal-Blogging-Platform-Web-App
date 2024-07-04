async function convertMultipartToJSON(data) {
    const json = {}
    let field, buffer

    for (fieldname in data) {
        field = data[fieldname]

        if (field.type === 'file') {
            buffer = await field.toBuffer()
            json[fieldname] = `data:${field.mimetype};base64,${buffer.toString('base64')}`
        } else {
            json[fieldname] = field.value
        }
    }
    
    return json
}

module.exports.convertMultipartToJSON = convertMultipartToJSON