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
    menuButton: cc.Button,
    startButton: cc.Button,
  },

  // LIFE-CYCLE CALLBACKS:
  start() {
    var url = cc.url.raw('resources/difficulty.json')
    cc.loader.load(url, function (err, res) {
      localStorage.setItem('difficulty', JSON.stringify(res))
    })
    if(localStorage.getItem('level')===undefined){
      localStorage.setItem('level', '1')
    }
  },

  onLoad() {
    localStorage.setItem('score_points', '0')
    localStorage.setItem('step', '1')
  },


  // update (dt) {},
  openMenu: function () {
    cc.director.loadScene('Menu Scene')
  },

  startGame: function () {
    cc.director.loadScene('First Timer Scene')
  },
})
