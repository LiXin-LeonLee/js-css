window.speedUpByLx = () => {
  let el = document.getElementById("video-toolbar");
  el.innerHTML = '';
  let rate = ["0.5", "0.7", "1.0", "1.2", "1.5", "1.7", "2.0", "2.5", "3.0"];
  let playerSpeed = window.videojs.getPlayers("video-player").html5player.tech_;
  window.currentRateByLx = 1;

  let htmlStr = '';
  let styleStr = `<style>
  #video-toolbar {
    height: 100px;
  }
  
  .lx-speed {
    width: 100%;
    height: 100px;
    border: 1px solid #aaa0a0;
    border-radius: 6px;
    text-align: center;
    color: #000000cc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .rateBtn {
    display: inline-block;
    width: 56px;
    color: #000000cc;
  }
  
  .lx-speed>div {
    box-sizing: border-box;
    height: 50px;
  }
  
  .lx-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .rateBtn,
  .current-rate,
  .range-ctl {
    margin: 0 5px;
    height: 36px;
    box-sizing: border-box;
    border: 1px solid #aaa0a0;
    border-radius: 6px;
    background-color: #fff;
    font-size: 14px;
  }</style>`;
  let days = Math.ceil((new Date('April 12 2020').getTime() - new Date().getTime()) / 86400000);
  let restartMsg = `<button class="rateBtn" onclick="speedUpByLx()" title="切换视频，点击重新激活">🔄</button>`;
  let loveMsg = `<button class="rateBtn" onclick="alert('❤ 谨以此代码献给我深爱的 THM\\n💪 Fighting! 独立自信的女人最美\\n🕗 教招倒计时：${days} 天')">⭐</button>`;
  let speedMsg = `<button class="rateBtn" onclick="playerByLx(currentRateByLx - 0.1)">-</button>
    <div class="current-rate lx-flex" style="width: 150px;"><span id="speedText">当前倍速：×1.0</span></div>
    <button class="rateBtn" onclick="playerByLx(currentRateByLx + 0.1)">+</button>`;
  let btnStr = ``;
  rate.map((r) => {
    btnStr += `<button class="rateBtn" onclick="playerByLx(${r})">${r}</button>`;
  });
  let rangeStr = `<div class="range-ctl lx-flex" style="width:230px;">
    <input style="width:180px;" type="range" min="0.5" max="3.0" value="1.0" step="0.1" oninput="rangeText.innerText = (+this.value).toFixed(1)" onchange="playerByLx(this.value)">
    <span id="rangeText" style="width:26px;">1.0</span></div>`;
  htmlStr += `${styleStr}
    <div class="lx-flex">${restartMsg}${loveMsg}${speedMsg}${rangeStr}</div>
    <div class="lx-flex">${btnStr}</div>`;

  let pane = document.createElement('div');
  pane.className = 'lx-speed';
  pane.innerHTML = htmlStr;
  el.appendChild(pane);
  let rangeText = document.getElementById('rangeText');
  let speedText = document.getElementById('speedText');
  window.playerByLx = (rate) => {
    let r = +(+rate).toFixed(1);
    if (!(r >= 0.5 && r <= 3)) {
      console.log("Error: Speed Rate Fucked");
      return;
    }
    currentRateByLx = r;
    playerSpeed.setPlaybackRate(currentRateByLx);
    speedText.innerText = '当前倍速：×' + (currentRateByLx).toFixed(1);
    return 'ok';
  };
};
speedUpByLx();
