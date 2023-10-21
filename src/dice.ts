export class Dice {
  constructor(public face: number) {}

  roll(): number {
    return Math.floor(1 + Math.random() * this.face);
  }
}
