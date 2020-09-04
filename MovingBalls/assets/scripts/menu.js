// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
    back_button: cc.Button,
    levels: cc.ToggleContainer,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    const level = localStorage.getItem('level') - 1
    this.levels.toggleItems[level].check()
  },

  // update (dt) {},
  backToMainPage: function () {
    cc.director.loadScene('Start Scene')
  },

  changeLevel: function () {
    let toggleItems = this.levels.toggleItems
    for (let i = 0; i < toggleItems.length; i++) {
      if (toggleItems[i].isChecked) {
        switch (toggleItems[i].name[6]) {
          case '1':
            localStorage.setItem('level', '1')
            break
          case '2':
            localStorage.setItem('level', '2')
            break
          case '3':
            localStorage.setItem('level', '3')
            break
          case '4':
            localStorage.setItem('level', '4')
            break
          case '5':
            localStorage.setItem('level', '5')
            break

        }
      }
    }
  },
})
