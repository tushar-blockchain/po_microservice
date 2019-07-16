import makePostOrder from '../post-order'
export default function makeAddPostOrder ({ ltheDb, postOrderInfo }) {
    return async function addPostOrder (postOrderInfo) {
        const postOrder = makePostOrder(postOrderInfo);

        const exists = await ltheDb.findByHash({ hash: postOrder.getHash() });
        if (exists) {
            return exists
        }

        const postOrderSource = postOrder.getSource();
        return ltheDb.insert({
            poNumber: postOrder.getPONumber(),
            soldToParty: postOrder.getSoldToParty(),
            vendorCode: postOrder.getVendorCode(),
            vendorDescription: postOrder.getVendorDescription(),
            projectName: postOrder.getProjectName(),
            projectCode: postOrder.getProjectCode(),
            poStatus: postOrder.getPoStatus(),
            createdDate: postOrder.getCreatedDate(),
            createdBy: postOrder.getCreatedBy(),
            updatedDate: postOrder.getUpdatedDate(),
            updatedBy : postOrder.getUpdatedBy(),
            hash: postOrder.getHash(),
            id: postOrder.getId(),
            source: {
                ip: postOrderSource.getIp(),
                browser: postOrderSource.getBrowser(),
            }
        })
    }
}