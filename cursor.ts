// const isTerminalApp = Deno.env.get("TERM_PROGRAM") === "Apple_Terminal";

const ESC = "\x1B[";

// const SAVE = isTerminalApp ? "\x1B7" : ESC + "s";
// const RESTORE = isTerminalApp ? "\x1B8" : ESC + "u";
const SAVE = "\x1B7";
const RESTORE = "\x1B8";
const POSITION = "6n";
const HIDE = "?25l";
const SHOW = "?25h";
const SCROLL_UP = "T";
const SCROLL_DOWN = "S";

const UP = "A";
const DOWN = "B";
const RIGHT = "C";
const LEFT = "D";

const CLEAR_RIGHT = "0K";
const CLEAR_LEFT = "1K";
const CLEAR_LINE = "2K";

const CLEAR_DOWN = "0J";
const CLEAR_UP = "1J";
const CLEAR_SCREEN = "2J";

const NEXT_LINE = "1E";
const PREV_LINE = "1F";
const HOME = "H";

class Cursor {
  private encoder = new TextEncoder();
  private writer = Deno.stdout.writable.getWriter();

  write(msg: string) {
    this.writer.write(this.encoder.encode(msg));
  }

  private cursor(action: string) {
    this.write(ESC + action);
  }

  breakLine() {
    this.write("\n");
  }

  hide() {
    this.cursor(HIDE);
  }

  show() {
    this.cursor(SHOW);
  }

  clearUp() {
    this.cursor(CLEAR_UP);
  }

  clearDown() {
    this.cursor(CLEAR_DOWN);
  }

  clearScreen() {
    this.cursor(CLEAR_SCREEN);
  }

  to(x: number, y: number) {
    this.cursor(`${y};${x}${HOME}`);
  }

  goUp(y = 1) {
    this.cursor(y + UP);
  }

  goDown(y = 1) {
    this.cursor(y + DOWN);
  }

  goLeft(x = 1) {
    this.cursor(x + LEFT);
  }

  goRight(x = 1) {
    this.cursor(x + RIGHT);
  }

  save() {
    this.cursor(SAVE);
  }

  restore() {
    this.cursor(RESTORE);
  }

  position() {
    this.cursor(POSITION);
  }

  scrollUp() {
    this.cursor(SCROLL_UP);
  }

  scrollDown() {
    this.cursor(SCROLL_DOWN);
  }

  clearLeft() {
    this.cursor(CLEAR_LEFT);
  }

  clearRight() {
    this.cursor(CLEAR_RIGHT);
  }

  clearLine() {
    this.cursor(CLEAR_LINE);
  }

  nextLine() {
    this.cursor(NEXT_LINE);
  }

  prevLine() {
    this.cursor(PREV_LINE);
  }

  goHome() {
    this.cursor(HOME);
  }
}

export const cursor = new Cursor();
