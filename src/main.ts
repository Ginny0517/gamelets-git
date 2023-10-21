import { Application, Graphics } from "pixi.js";
import { Dice } from "./dice";
import "./style.css";

let app = new Application<HTMLCanvasElement>();
document.body.appendChild(app.view);

let stageSize = {
  width: 0,
  height: 0,
};

let stageFrame = new Graphics();
app.stage.addChild(stageFrame);

// Draw to check stage size
function redrawStageFrame(): void {
  stageFrame.clear();
  stageFrame.lineStyle({
    color: 0xff0000,
    width: 2,
  });
  stageFrame.drawRect(0, 0, stageSize.width, stageSize.height);
}

function setStageSize(width: number, height: number): void {
  stageSize.width = width;
  stageSize.height = height;
  redrawStageFrame();
  refreshCanvasAndStage();
}

function refreshCanvasAndStage(): void {
  let winSize = {
    width: innerWidth,
    height: innerHeight,
  };

  app.renderer.resize(window.innerWidth, window.innerHeight);

  let scale = Math.min(
    winSize.width / stageSize.width,
    winSize.height / stageSize.height
  );

  app.stage.scale.set(scale);

  let stageRealSize = {
    width: stageSize.width * scale,
    heigth: stageSize.height * scale,
  };

  app.stage.position.set(
    (winSize.width - stageRealSize.width) / 2,
    (winSize.height - stageRealSize.heigth) / 2
  );
}

setStageSize(640, 480);

window.addEventListener("resize", refreshCanvasAndStage);

export function setStageFrameVisible(visible: boolean) {
  stageFrame.visible = visible;
}

export function getStageSize() {
  return {
    width: stageSize.width,
    height: stageSize.height,
  };
}

let dice = new Dice(12);
let reust_dice = dice.roll();
