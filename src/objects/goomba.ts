/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land: Goomba
 * @license      Digitsensitive
 */

import { Enemy } from "./enemy";

export class Goomba extends Enemy {
  constructor(params) {
    super(params);
    this.speed = -20;
    this.dyingScoreValue = 100;
  }

}
