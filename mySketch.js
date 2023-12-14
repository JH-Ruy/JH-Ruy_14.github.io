// 이미지와 소리를 저장할 변수들
var cityImg, noiseImg;
var sound, sound0, sound1, sound2, soundArray = [], temps;

// 이미지의 크기를 조절하는 변수
var imgscale = 0.4;

// 마우스 움직임을 추적하기 위한 변수 및 소리 재생 주기를 조절하는 변수
let mvalue = 0;
var freqdrop = 5; // 5~10

// 비 오는 효과를 생성하는 물방울 객체를 저장하는 배열
var drops = [];

// 브레이크 컬러 설정
var breaC;

let forestSound, windSound, rainSound;

// 이미지와 소리를 미리 로드
function preload() {
  cityImg = loadImage("autumn.jpg");
  sound = loadSound("street-in-rainy-weather.ogg");
  sound0 = loadSound("horn.mp3");
  sound1 = loadSound("car-by.mp3");
  sound2 = loadSound("car-by1.mp3");
  soundArray.push(sound0);
  soundArray.push(sound1);
  soundArray.push(sound2);
  forestSound = loadSound('A Thick Forest.mp3');
  windSound = loadSound('wind.mp3');
	rainSound = loadSound('rain.mp3');
}

function setup() {
  // 캔버스 생성 및 기본 설정
  createCanvas(cityImg.width * imgscale, cityImg.height * imgscale);
  background(100);
  noStroke();
  rectMode(CENTER);
  ellipseMode(CENTER);

  // 이미지 크기 조절 및 배경으로 출력
  cityImg.resize(cityImg.width * imgscale, cityImg.height * imgscale);
  image(cityImg, 0, 0);

  // 소리 설정 및 반복 재생
  sound.setVolume(1.4);
  sound.loop();
}

function draw() {
  // 이미지에 노이즈 효과 적용
  push();
  let o = noise(frameCount * 0.02);
  tint(255, o * 2.5);
  image(cityImg, 0, 0);
  pop();

  // 일정 주기로 도시의 물방울 효과 생성
  if (frameCount % 30 == 0) {
    // 도시 이미지를 일정 간격으로 순회하면서 물방울 효과 생성
    for (var i = 0; i < cityImg.width; i += random(20, 50)) {
      for (var j = 0; j < cityImg.height; j += random(20, 50)) {
        let c = cityImg.get(i, j);
        push();
        fill(
          c[0] - random(10),
          c[1] - random(10),
          c[2] - random(5),
          random(50, 150)
        );
        translate(i, j);
        rect(0, 0, random(50), random(50));
        pop();
      }
    }

    // 일정 확률로 소리의 볼륨 조절
    if (random(10) < 1) {
      var soundran = random(1.4, 1.6);
      sound.setVolume(soundran, 0.05);
    }
  }

  // 다양한 빛 효과 생성
  if (frameCount % 10 == 0) {
    for (var ci = 0; ci < cityImg.width; ci += random(10, 50)) {
      for (var cj = 0; cj < cityImg.height; cj += random(10, 50)) {
        let c = cityImg.get(ci, cj);

        // 특정 조건에 따라 빛 효과 적용
        if (c[0] > 120 + random(-10, 10) && c[2] > 120 + random(-10, 10)) {
          c[0] *= (1 + random(0.3));
          c[2] *= (1 + random(0.3));
        }

        push();
        fill(
          c[0],
          c[1],
          c[2],
          random(70, 100)
        );
        blendMode(LIGHTEST);
        translate(ci, cj);
        ellipse(0, 0, random(40));
        pop();
      }
    }
  }

  // 일정 주기로 레인 효과 생성
  if (frameCount % 9 == 0) {
    for (var ri = 0; ri < cityImg.width; ri += random(10, 20)) {
      for (var rj = 0; rj < cityImg.height; rj += random(20, 50)) {
        let c = cityImg.get(ri, rj);
        push();
        fill(
          c[0] + random(10, 20),
          c[1] + random(10, 20),
          c[2] + random(20, 30),
          random(30, 60)
        );
        translate(ri, rj);
        rect(0, 0, random(5), random(50));
        pop();
      }
    }
  }

  // 일정 주기로 빗방울 효과 생성
  if (frameCount % 20 == 0 && random(freqdrop) < 1) {
    let dropdr = new Drop({
      r: random(5, 7),
      p: createVector(random(width), random(height))
    });
    drops.push(dropdr);
  }

  // 생성된 빗방울 효과 갱신 및 그리기
  for (let [key, dropd] of drops.entries()) {
    dropd.update();
    dropd.draw();

    // 빗방울 효과가 사라지면 배열에서 제거
    if (dropd.state == "dead") {
      drops.splice(key, 1);
    }
  }
}

// 마우스 클릭 시 배경 이미지로 재설정
function mousePressed() {
  image(cityImg, 0, 0);
}

// 마우스 움직임에 따라 소리 조절 및 재생
function mouseMoved() {
  mvalue++;
  freqdrop = map(mvalue, 0, 100, 10, 5);

  // 일정 조건이 충족되면 소리를 재생하고 볼륨 조절
  if (mvalue > random(80, 100)) {
    freqdrop = 5;
    mvalue = 0;
    temps = random([0, 1, 2]);
    if (temps == 0) soundArray[temps].setVolume(random(0.2, 0.4));
    else soundArray[temps].setVolume(random(0.7, 0.9));
    soundArray[temps].play();
  }
}
