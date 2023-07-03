class UserTransformer {
    userData(data) {
        const newData = {
            _id: data._id,
            userName: data.userName,
        }
        return newData;
    }
}

export default new UserTransformer