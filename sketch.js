let spriteSheet;
let spriteSheet2;
const animation = [];
const animation2 = [];

// 第一個動畫的參數
const frameWidth = 89;
const frameHeight = 86;
const numFrames = 9;

// 第二個動畫的參數
const frameWidth2 = 69;
const frameHeight2 = 71;
const numFrames2 = 10;

let song;
let amp;

function preload() {
  // 載入音樂檔案
  song = loadSound('LEX.mp3/Erick_Fill_&_Alwaro_-_You\'ll_Be_Fine_ft._Crushboys_(Original_Mix)_-_erickfill.mp3');

  // 載入位於 '1' 資料夾中的圖片精靈
  spriteSheet = loadImage('1/aii-1.png');
  // 載入位於 '2' 資料夾中的第二個圖片精靈
  spriteSheet2 = loadImage('2/all-2.png');
}

function setup() {
  // 建立一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);

  amp = new p5.Amplitude();
  // 從圖片精靈中擷取每一格動畫
  for (let i = 0; i < numFrames; i++) {
    let frame = spriteSheet.get(i * frameWidth, 0, frameWidth, frameHeight);
    animation.push(frame);
  }

  // 從第二個圖片精靈中擷取每一格動畫
  for (let i = 0; i < numFrames2; i++) {
    let frame = spriteSheet2.get(i * frameWidth2, 0, frameWidth2, frameHeight2);
    animation2.push(frame);
  }
}

function draw() {
  // 設定背景顏色
  background('#89c2d9');

  // 取得當前的音量 (0 to 1)
  const level = amp.getLevel();

  // 將音量大小映射到動畫速度
  // 音量為 0 時，animationSpeed 為 20 (慢)
  // 音量為 1 時，animationSpeed 為 2 (快)
  const animationSpeed = map(level, 0, 0.5, 20, 2);

  // 計算目前要顯示的影格
  const currentFrameIndex = floor(frameCount / animationSpeed) % numFrames;
  const currentFrameIndex2 = floor(frameCount / animationSpeed) % numFrames2;

  // 將圖片的繪製原點設定在中心
  imageMode(CENTER);

  // 定義一個放大比例
  const scaleFactor = 1.7;

  // 在畫布中央附近並排顯示兩個動畫
  // 將第一個動畫向左移動 80 像素，並放大 1.5 倍
  image(animation[currentFrameIndex], width / 2 - 80, height / 2, frameWidth * scaleFactor, frameHeight * scaleFactor);
  // 將第二個動畫向右移動 80 像素，並放大 1.5 倍
  image(animation2[currentFrameIndex2], width / 2 + 80, height / 2, frameWidth2 * scaleFactor, frameHeight2 * scaleFactor);
}

function windowResized() {
  // 當瀏覽器視窗大小改變時，自動調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // 點擊滑鼠來播放或暫停音樂
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}
