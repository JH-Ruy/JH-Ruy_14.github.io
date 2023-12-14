class Drop {
	// 생성자 함수로 초기화
	constructor(args) {
	  // 빗방울의 반지름과 이력을 저장하는 배열 초기화
	  this.r = args.r;
	  this.rs = [];
	  this.rs.push(this.r);
  
	  // 빗방울의 위치와 이력을 저장하는 배열 초기화
	  this.p = args.p;
	  this.ps = [];
	  this.ps.push(this.p);
  
	  // 빗방울의 색상과 이력을 저장하는 배열 초기화
	  this.c = cityImg.get(this.p.x, this.p.y);
	  this.cs = [];
	  this.cs.push(this.c);
  
	  // 빗방울 상태 설정 ("alive" 또는 "dead")
	  this.state = "alive";
  
	  // 빗방울 업데이트 타이머 시작 프레임 설정
	  this.timerStart = frameCount;
	  this.timer = 0;
	}
  
	// 빗방울 업데이트 함수
	update() {
	  // 업데이트 타이머 값 계산
	  this.timer = frameCount - this.timerStart;
  
	  // 일정 주기마다 업데이트 수행
	  if (this.timer % 20 && this.state == "alive") {
		// 빗방울의 위치 조정
		this.p = createVector(this.p.x + random(-this.r / 5, this.r / 5), this.p.y + random(this.r / 2));
		
		// 빗방울의 크기 조정
		this.r += random(0.2);
  
		// 빗방울의 색상 조정
		this.c = cityImg.get(this.p.x, this.p.y);
		this.c[0] += 70;
		this.c[1] += 70;
		this.c[2] += 70;
		this.c[3] = 150;
  
		// 빗방울이 화면 안에 있을 때만 위치, 크기, 색상 정보를 배열에 추가
		if (this.p.y <= height + this.r) {
		  this.ps.push(this.p);
		  this.rs.push(this.r);
		  this.cs.push(this.c);
		}
	  }
  
	  // 배열에 저장된 색상 정보 갱신
	  for (let co of this.cs) {
		co[3] -= 5;
		if (co[3] <= 0) {
		  this.cs.shift();
		  this.ps.shift();
		  this.rs.shift();
		}
	  }
  
	  // 빗방울이 화면을 벗어나면 상태를 "dead"로 변경
	  if (this.cs.length <= 1 && this.p.y > height + this.r) {
		this.state = "dead";
	  }
	}
  
	// 빗방울을 그리는 함수
	draw() {
	  // 배열에 저장된 정보를 기반으로 빗방울을 그림
	  for (let [key, d] of this.ps.entries()) {
		push();
		fill(this.cs[key]);
		ellipseMode(CENTER);
		ellipse(d.x, d.y, this.rs[key]);
		pop();
	  }
	}
  }
  