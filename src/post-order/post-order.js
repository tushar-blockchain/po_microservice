export default function buildMakePostOrder({Id, md5, makeSource}) {
    return function makePostOrder({
                                      id = Id.makeId(),
                                      poNumber,
                                      soldToParty,
                                      vendorCode,
                                      vendorDescription,
                                      projectName,
                                      projectCode,
                                      poStatus,
                                      createdDate = Date.now(),
                                      createdBy,
                                      updatedDate = Date.now(),
                                      updatedBy
                                  } ={}){
        if (!Id.isValidId(id)) {
            throw new Error('Post Order must have a valid id.')
        }

        if (!poNumber) {
            throw new Error('Comment must have an author.')
        }

        const validSource = makeSource(source);
        let hash;

        return Object.freeze({
            getPONumber: () => poNumber,
            getSoldToParty: () => soldToParty,
            getVendorCode: () => vendorCode,
            getVendorDescription: () => vendorDescription,
            getProjectName: () => projectName,
            getProjectCode: () => projectCode,
            getPoStatus: () => poStatus,
            getCreatedDate: () => createdDate,
            getCreatedBy: () => createdBy,
            getUpdatedDate: () => updatedDate,
            getUpdatedBy: () => updatedBy,
            getHash: () => hash || (hash = makeHash()),
            getId: () => id,
            getSource: () => validSource,
        });

        function makeHash () {
            return md5(
                poNumber +
                (soldToParty || '') +
                (vendorCode || '') +
                (vendorDescription || '') +
                (projectName || '') +
                (projectCode || '') +
                (poStatus || '')
            )
        }
    }
}