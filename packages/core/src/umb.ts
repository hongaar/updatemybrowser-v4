import Bowser from 'bowser'

export class UMB {
  constructor(private detector = Bowser) {}

  public detect() {
    return this.detector.parse(window.navigator.userAgent)
  }
}
