let circles = [];
let N = 4000;
let S = 0.02;
let G = 0.012;
let H = 0.1;
let R = 300;
let Q = 10;

let X = [];
let Y = [];
let Z = [];
let L, dX, dY, dZ, P, U;
let I, NX, NY, NZ, KN;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  noSmooth();
  colorMode(HSB);
  background(0); // 背景設為黑色

  // 初始化圓的屬性
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(30, 100),
      color: color(random(255), random(255), random(255)) // 隨機鮮豔顏色
    });
  }

  // 初始化 Attractor 的參數
  for (I = 0; I < N; I++) {
    X[I] = random(+10, +90);
    Y[I] = random(-90, +90);
    Z[I] = random(+10, +90);
  }
  KN = N;
}

function draw() {
  // 背景效果
  if (KN == N) {
    fill(0, 0, 0, 0.1);
    noStroke();
    rect(-1, -1, width + 1, height + 1);
    fill(255);
  }
  translate(0, 200);

  for (I = 0; I < KN; I++) {
    L = sqrt(pow(X[I], 2) + pow(Y[I], 2));
    P = (atan((L - R) / Z[I]) + (PI / 2)) / PI;
    U = abs(Y[I]) / L;
    dX = (-Z[I] * H * P * U * X[I] / L) + (L * G * X[I] / L) + (-Y[I] * S) + (Q * X[I] / pow(L, 3));
    dY = (-Z[I] * H * P * U * Y[I] / L) + (L * G * Y[I] / L) + (+X[I] * S) + (Q * Y[I] / pow(L, 3));
    dZ = ((L - R) * H * P * U);
    NX = X[I] + dX;
    NY = Y[I] + dY;
    NZ = Z[I] + dZ;
    stroke(U * 360 % 360, 80, 100); // 彩色漸變效果
    line(X[I] - (Y[I] / 2) + width / 2, -Z[I] + (Y[I] / 2) + height / 2, NX - (NY / 2) + width / 2, -NZ + (NY / 2) + height / 2);
    X[I] = NX;
    Y[I] = NY;
    Z[I] = NZ;
  }

  // 根據滑鼠位置調整圓的大小
  let sizeOffset = map(mouseX, 0, width, 20, 120);

  // 繪製圓
  for (let circle of circles) {
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size + sizeOffset);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布隨視窗大小調整
}

function mousePressed() {
  background(0); // 重置背景
  if (KN != N) {
    for (I = 1; I < N; I++) {
      X[I] = X[0] + random(-10, +10);
      Y[I] = Y[0] + random(-10, +10);
      Z[I] = Z[0] + random(-10, +10);
    }
    KN = N;
  } else {
    KN = 1;
  }
}
