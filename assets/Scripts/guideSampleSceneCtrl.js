cc.Class({
    extends: cc.Component,

    properties: {
        guideNode: cc.Node
    },

    onLoad() {
        this.guideNode.getComponent("guideNodeCtrl").nextStep(true);
    },

    onClick(event, comstonData) {
        this.guideNode.getComponent("guideNodeCtrl").nextStep();
    }
});