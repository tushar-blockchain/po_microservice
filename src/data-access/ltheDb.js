import Id from '../Id'

export default function makeLTHEDb ({ makeDb }) {
    return Object.freeze({
        findAll,
        findByHash,
        findById,
        insert,
        update
    })

    async function findAll ({ publishedOnly = true } = {}) {
        const db = await makeDb();
        const result = await db.collection('post-order');
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }))
    }
    async function findById ({ id: _id }) {
        const db = await makeDb();
        const result = await db.collection('post-order').find({ _id });
        const found = await result.toArray();
        if (found.length === 0) {
            return null
        }
        const { _id: id, ...info } = found[0];
        return { id, ...info }
    }

    async function insert ({ id: _id = Id.makeId(), ...postOrderInfo }) {
        const db = await makeDb();
        const result = await db
            .collection('post-order')
            .insertOne({ _id, ...postOrderInfo });
        const { _id: id, ...insertedInfo } = result.ops[0];
        return { id, ...insertedInfo }
    }

    async function findByHash (postOrder) {
        const db = await makeDb();
        const result = await db.collection('post-order').find({ hash: postOrder.hash });
        const found = await result.toArray();
        if (found.length === 0) {
            return null
        }
        const { _id: id, ...insertedInfo } = found[0];
        return { id, ...insertedInfo }
    }

    async function update ({ id: _id, ...postOrderInfo }) {
        const db = await makeDb()
        const result = await db
            .collection('comments')
            .updateOne({ _id }, { $set: { ...commentInfo } })
        return result.modifiedCount > 0 ? { id: _id, ...commentInfo } : null
    }
}
