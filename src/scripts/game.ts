import 'phaser'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from './game.config'
import TowerScene from './scenes/towerScene'

/*const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})*/

var config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  scene: [TowerScene],
  physics: {
    default: 'arcade'
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
