cc.Class({
    extends: cc.Component,

    properties: {
        clickTarget: [cc.Node],
        tips: cc.Node
    },

    onLoad() {
        this.node.width = cc.winSize.width;
        this.node.height = cc.winSize.height;
        // this.resetRadius();
        // this.setCurrentStep(0);
    },

    setCurrentStep(step) {
        this.tips.getComponent(cc.Label).string =step == this.clickTarget.length? "已完成了一轮," + "这是第" + (step + 1) % this.clickTarget.length + "步" : "这是第" + (step +1) + "步";
        this.currentStep = step % this.clickTarget.length;

        let tipsPos = this.node.parent.convertToNodeSpaceAR(this.clickTarget[this.currentStep].convertToWorldSpaceAR(cc.v2(0, 0)));
        this.tips.setPosition(cc.v2(tipsPos.x, tipsPos.y - 100));

        let localPos = this.node.convertToNodeSpaceAR(this.clickTarget[this.currentStep].convertToWorldSpaceAR(cc.v2(0, 0)));
        let circleCenter = cc.v2((localPos.x + this.node.width / 2) / this.node.width, (this.node.height / 2 - localPos.y) / this.node.height);
        let sprite = this.node.getComponent(cc.Sprite);
        material = sprite.getMaterial(0);
        material.setProperty('whRadio', this.node.width / this.node.height);
        material.setProperty('circleCenter', circleCenter);
        sprite.setMaterial(0, material);

        this.node.getComponent("BolckInputEvents").setCurrentClickTarget(this.clickTarget[this.currentStep]);
    },

    nextStep(reset) {
        if (reset) {
            this.resetRadius();
            this.setCurrentStep(0);
        } else {
            this.resetRadius();
            this.setCurrentStep(++this.currentStep);
        }
    },

    finishGuide() {
        this.node.active = false;
    },


    resetRadius() {
        this.bigRadius = 0.5;
        this.smallRadius = 0.45;
        this.node.getComponent("BolckInputEvents").setTouchEnable(false);
    },

    update(dt) {
        if (this.bigRadius <= 0.1) {
            this.node.getComponent("BolckInputEvents").setTouchEnable(true);
            return;
        }
        this.bigRadius -= 0.01;
        this.smallRadius -= 0.01;

        let sprite = this.node.getComponent(cc.Sprite);
        material = sprite.getMaterial(0);
        material.setProperty('bigRadius', this.bigRadius);
        material.setProperty('smallRadius', this.smallRadius);
        sprite.setMaterial(0, material);
    }

});