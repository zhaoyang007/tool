

// observer.js 遍历data, 在get中给每个data中的数据添加依赖, 并在set中监听数据变化

// 监听data中的数据变化
function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    // 遍历data中的数据, 取出data中的key和value并传入convert中
    walk: function(data) {
        var me = this;
        // Object.keys(data)把data中的key取出来放进一个数组中并返回
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });
    },
    // 将data, key, value传入defineReactive中
    convert: function(key, val) {
        this.defineReactive(this.data, key, val);
    },
    // 定义响应
    defineReactive: function(data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                // 添加订阅者
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            // 监听到data中的属性变化
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话, 进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;


// watcher.js 数据变化时进行更新

function Watcher(vm, expOrFn, cb) {
    this.cb = cb;
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.depIds = {};

    if (typeof expOrFn === 'function') {
        this.getter = expOrFn;
    } else {
        this.getter = this.parseGetter(expOrFn);
    }

    this.value = this.get();
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(dep) {
        // 1. 每次调用run()的时候会触发相应属性的getter
        // getter里面会触发dep.depend()，继而触发这里的addDep
        // 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已
        // 则不需要将当前watcher添加到该属性的dep里
        // 3. 假如相应属性是新的属性，则将当前watcher添加到新属性的dep里
        // 如通过 vm.child = {name: 'a'} 改变了 child.name 的值，child.name 就是个新属性
        // 则需要将当前watcher(child.name)加入到新的 child.name 的dep里
        // 因为此时 child.name 是个新值，之前的 setter、dep 都已经失效，如果不把 watcher 加入到新的 child.name 的dep中
        // 通过 child.name = xxx 赋值的时候，对应的 watcher 就收不到通知，等于失效了
        // 4. 每个子属性的watcher在添加到子属性的dep的同时，也会添加到父属性的dep
        // 监听子属性的同时监听父属性的变更，这样，父属性改变时，子属性的watcher也能收到通知进行update
        // 这一步是在 this.get() --> this.getVMVal() 里面完成，forEach时会从父级开始取值，间接调用了它的getter
        // 触发了addDep(), 在整个forEach过程，当前wacher都会加入到每个父级过程属性的dep
        // 例如：当前watcher的是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    },
    get: function() {
        Dep.target = this;
        var value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    },

    parseGetter: function(exp) {
        if (/[^\w.$]/.test(exp)) return; 

        var exps = exp.split('.');

        return function(obj) {
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            return obj;
        }
    }
};





