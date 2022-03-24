export default {
    deepcopy(data) {
        let dataTmp = undefined

        if (data === null || !(typeof data === 'object')) {
            dataTmp = data
        } else {
            dataTmp = data.constructor.name === 'Array' ? [] : {}

            for (let key in data) {
                dataTmp[key] = this.deepcopy(data[key])
            }
        }

        return dataTmp
    }
};
