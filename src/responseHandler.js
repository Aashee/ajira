function handleResponse(body, metadata) {
    const response = {
        status: 'SUCCESS',
        payload: body
    };
    if (metadata) {
        response.metadata = metadata;
    }
    return response;
}

function handleError(error, status) {
    const errorObject = {
        msg: error,
    };
    return errorObject;
}

function handleJOIError(error, status) {
    const messages = [];
    error.details.forEach(errorDetail => {
        errorDetail.message = errorDetail.message.replace(/"/g, '');
        messages.push(errorDetail.message);
    });
    const errorObject = {
        error: messages,
        status: status
    };
    return errorObject;
}

module.exports = { handleResponse, handleError, handleJOIError };
