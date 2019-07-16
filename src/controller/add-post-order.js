export default function makePostOrder ({ addPostOrder }) {
    return async function postOrder (httpRequest) {
        try {
            const { source = {}, ...postOrderInfo } = httpRequest.body;
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            const poAdded = await addPostOrder({
                ...postOrderInfo,
                source
            });
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date(poAdded.updatedDate).toUTCString()
                },
                statusCode: 201,
                body: { poAdded }
            }
        } catch (e) {
            // TODO: Error logging
            console.log(e);

            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}
