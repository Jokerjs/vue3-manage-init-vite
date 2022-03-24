Date.format = (date, fmt) => {
    date = Date.new(date);
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
        }
    }
    return fmt;
};

// 参数分别为日期对象，增加的类型，增加的数量
Date.puls = (date, key, n) => {
    switch (key) {
        case 's':
            return new Date(Date.parse(date) + (1000 * n));
        case 'm':
            return new Date(Date.parse(date) + (60000 * n));
        case 'h':
            return new Date(Date.parse(date) + (3600000 * n));
        case 'd':
            return new Date(Date.parse(date) + (86400000 * n));
        case 'w':
            return new Date(Date.parse(date) + ((86400000 * 7) * n));
        case 'M':
            return new Date(date.getFullYear(), date.getMonth() + n, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        case 'y':
            return new Date(date.getFullYear() + n, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    }
};

Date.new = (val) => {
    if (val) {
        if (typeof val === 'object') {
            return val;
        } else if (typeof val === 'string') {
            return new Date(val.replace(/-/g, '/'));
        } else {
            return new Date(val);
        }
    } else return new Date();
};

// 返回时间间隔 xx天xx小时xx分钟xx秒
Date._interval = (_t) => {
    return Math.floor(_t / 86400) + '天' + Math.floor(_t % 86400 / 3600) + '小时' + Math.floor(_t % 86400 % 3600 / 60) + '分钟';
};
// 判断是否时间类型
Date.isDate = (value) => {
    return Object.prototype.toString.call(value) === '[object Date]';
};
// 删除数组
Array.prototype.indexOf = function(val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    let index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
