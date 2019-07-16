import makeAddPostOrder from './add-post-order'
//import makeEditPostOrder from './edit-post-order'
import ltheDb from '../data-access'

const addPostOrder = makeAddPostOrder({ ltheDb});
//const editPostOrder = makeEditPostOrder({ ltheDb});

const postOrderService = Object.freeze({
    addPostOrder
});

export default postOrderService
export { addPostOrder }