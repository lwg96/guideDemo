// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        _touchEnable: false,
    },

    onEnable() {
        this.node.on("touchstart", this.touchStart, this);
    },

    start() {
        this.node._touchListener.setSwallowTouches(false);
    },

    onDisable() {
        this.node.off("touchstart", this.touchStart, this);
    },


    touchStart(EventTouch) {
        if (this.clickTarget && this._touchEnable) {
            let isContain = this.clickTarget.getBoundingBoxToWorld().contains(EventTouch.getLocation());
            if (!isContain) {
                EventTouch.stopPropagation();
            } else {
                this.clickTarget = undefined;
            }

        } else {
            EventTouch.stopPropagation();
        }
    },

    setCurrentClickTarget(node) {
        this.clickTarget = node;
    },

    setTouchEnable(bool) {
        this._touchEnable = bool;
    },


});