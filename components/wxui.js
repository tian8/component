
class wxui {
    constructor(scope) {
        Object.assign(this, { scope });
        this.init();
    }
    init() {
        this.dataDefult();
        this.initTools();
        this.initComponent();
    }
    /**
     * 初始化工具方法
     */
    initTools() {
        this.tools = {
            isArray(value) {
                return Array.isArray(value);
            },
            isFunction(value) {
                return typeof value == 'function';
            },
            isDefine(value) {
                return typeof value !== 'undefine';
            },
            isObject(value) {
                return value !== null && typeof value == 'object';
            },
            clone(obj) {
                if (typeof obj !== 'object' || !obj) {
                    return obj;
                }
                let copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) {
                        copy[attr] = obj[attr];
                    }

                }
                return copy;
            },
            extend(destination, source){
            for (var property in source) {
                destination[property] = source[property];
            }
            return destination;
        }
    }
}
/**
 * 默认初始化参数
 */
dataDefult(){
    this.wxui = {
        background: {
            visible: !1
        },
        dialog:{
            visible: !1
        },
        rater:{
            visible: !1
        }
    }
    this.scope.setData({
        'wxui': this.wxui
    })
}
//初始化组件
initComponent(){
    this.initBackground();
    this.initDialog();
    this.initRater();
}

/**
 * 背景幂
 */
initBackground(){
    const that = this;
    const scope = that.scope;

    
    that.background = {
        //锁定次数
        backgroundHolds: 0,

        //保持锁定
        retain() {
            this.backgroundHolds++
            if (this.backgroundHolds === 1) {
                that.setVisible(['background'], !0);
            }
        },
        //锁定释放
        release() {
            if (this.backgroundHolds === 1) {
                that.setVisible(['background'], !1);
            }
            this.backgroundHolds = Math.max(0, this.backgroundHolds - 1);
        }
    }
}
initDialog(){
        const that = this;
        const scope = that.scope;
        const clone = that.tools.clone;
        const extend = that.tools.extend;
        that.dialog={
        /**
         * 默认参数
         */
            defaults:{
                showCancel: !0, 
                title:"",
                content:"",
                confirmText:"确定",
                cancelText:"取消",
                confirm:function(){},
                cancel:function(){},
                dialogConfirm:"dialogConfirm",
                dialogCancel:"dialogCancel"
            },
            //显示组件
            show(opt={}){
                const options = extend(clone(this.defaults),opt||{})
            
                scope.dialogConfirm =()=>hideDialog(options.confirm);
                scope.dialogCancel =()=>hideDialog(options.cancel);

                function hideDialog(cb){
                    that.setVisible(['dialog'],!1);
                    that.tools.isFunction(cb)&&cb();
                }
                function showDialog(){
                    scope.setData({
                        'wxui.dialog':options
                    })
                    that.setVisible(['dialog'],!0);
                }
                showDialog();
                return scope.dialogCancel;
            }
        }
    }
    initRater() {
        const that = this;
        const scope = that.scope;
        const clone = that.tools.clone;
        const extend = that.tools.extend;
		that.rater = {
			/**
			 * 默认参数
			 */
			defaults: {
				max: 5, 
				star: '★', 
				value: 0, 
				activeColor: '#fc6', 
				margin: 2, 
				fontSize: 25, 
				disabled: !1, 
				callback: function() {}, 
			},
			
			/**
			 * 渲染评分组件
			 */
			render(id, opts) {
				//const data = this.data()
				const options = extend(clone(this.defaults), opts || {})

				// 渲染组件
				scope.setData({
					['wxui.rater.'+id]: options, 
					['wxui.rater.'+id+'.handleClick']: id+'HandleClick',
				})
                //return scope.data;

				// 绑定tap事件
				scope[id+'HandleClick'] = (e) => {
					const i = e.currentTarget.dataset.index
					const rater = scope.data.wxui.rater[id]
					const value = rater.value
					const disabled = rater.disabled

					if (disabled) return

					if (value === i + 1) {
						scope.setData({
							['wxui.rater.'+id+'.value']: i
						})
					} else {
						scope.setData({
							['wxui.rater.'+id+'.value']: i + 1
						})
					}

					updateStyle()
					typeof options.callback === 'function' && options.callback(e)
				}

				// 更新stars
				function updateStars() {
					const rater = scope.data.wxui.rater[id]
					const max = rater.max
					const stars = []

					for (let i = 0; i < max; i++) {
						stars.push(i)
					}

					scope.setData({
						['wxui.rater.'+id+'.stars']: stars
					})
			    }

			    // 更新style
				function updateStyle() {
					const rater = scope.data.wxui.rater[id]
					const max = rater.max
					const value = rater.value
					const activeColor = rater.activeColor
					const colors = []

					for (let j = 0; j < max; j++) {
						if (j <= value - 1) {
							colors.push(activeColor)
						} else {
							colors.push('#ccc')
						}
						scope.setData({
							['wxui.rater.'+id+'.colors']: colors
						})
					}
				}
				updateStars()
				updateStyle()
                //console.log(scope);
                return ;
			}
		}
	}
setVisible(keys, value){
    keys.forEach(key => {
        this.scope.setData({
            // wxui[key]:value
            // ['wxui'.${key}.'visible']:value
            //'wxui.${key}.visible':value,
            // [`wxui.${key}.visible`]: value, 
            ["wxui." + key + ".visible"]: value,
        })
    })
}
}

export {wxui};


