let videosInfo = ['dony', 'maev', 'JSJS', 'jane', 'jwuu', 'dott', 'ideu', 'hemd', 'khan', 'mill', 'pokk', 'oliv', 'cron'];

class Video {
  constructor() {
    this.title = '',
    this.id = '',
    this.time = 1,
    this.next = null;
  }
}

class VideoMaker {
  makeTime(min, max) {
    const random = Math.random() * (max - min) + min;
    return parseInt(random);
  }

  initVideoData() {
    videosInfo = videosInfo.map((id, index) => {
      const newVideo = new Video();
      newVideo.title = `μ λͺ©${index + 1}`;
      newVideo.id = id;
      newVideo.time = this.makeTime(1, 15.1);

      return newVideo;
    });

    return videosInfo;
  }
}

class VideoListManager {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  findVideoInfo(id) {
    return videosInfo.find(el => el['id'] === id);
  }

  push(id) {
    const newVideo = this.findVideoInfo(id);
    if(!newVideo) return "π« ν΄λΉ IDμ λΉλμ€κ° μμ΅λλ€."; // ν΄λΉ IDμ λΉλμ€κ° μμ κ²½μ°

    if(this.tail) {
      this.tail.next = newVideo;
      this.tail = newVideo;
    } else {
      this.head = newVideo;
      this.tail = newVideo;
    }
    
    this.length++;
    return this;
  }

  pop() {
    if(!this.head) return "β μ­μ ν  λΉλμ€κ° μμ΅λλ€."; // λ¦¬μ€νΈκ° λΉμμ μ

    let currentVideo = this.head;
    let newTail = currentVideo;
    while(currentVideo.next) {
      newTail = currentVideo;
      currentVideo = currentVideo.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if(this.length === 0) { // λΈλκ° νλμΈλ° μ­μ νμ κ²½μ°
      this.head = null;
      this.tail = null;
    }

    return this;
  }

  shift() {
    if(!this.head) return "β μ­μ ν  λΉλμ€κ° μμ΅λλ€."; // λ¦¬μ€νΈκ° λΉμμ μ

    const oldHead = this.head;
    this.head = oldHead.next;
    this.length--;

    if(this.length === 0) { // λΈλκ° νλμΈλ° μ­μ νμ κ²½μ°
      this.tail = null;
    }

    return this;
  }

  unshift(id) {
    const newVideo = this.findVideoInfo(id);
    if(!newVideo) return "π« ν΄λΉ IDμ λΉλμ€κ° μμ΅λλ€."; // ν΄λΉ IDμ λΉλμ€κ° μμ κ²½μ°
    
    if(this.head) { // κΈ°μ‘΄μ λΈλκ° μμΌλ©΄
      newVideo.next = this.head;
      this.head = newVideo;
    } else {
      this.head = newVideo;
      this.tail = this.head;
    }
    
    this.length++;
    return this;
  }

  insert(id, index) {
    if(index < 0) return "βοΈindexλ₯Ό λ€μ νμΈν΄μ£ΌμΈμ.";
    if(index >= this.length) return this.push(id);
    const newVideo = this.findVideoInfo(id);
    if(!newVideo) return "π« ν΄λΉ IDμ λΉλμ€κ° μμ΅λλ€."; // ν΄λΉ IDμ λΉλμ€κ° μμ κ²½μ°
    if(index === 0) return this.unshift(id);
    
    let currentVideo = this.head;
    for(let i = 0; i < index - 1; i++) {
      currentVideo = currentVideo.next;
    }
    const nextVideo = currentVideo.next;
    currentVideo.next = newVideo;
    newVideo.next = nextVideo;
    this.length++;

    return this;
  }

  remove(id) {
    if(this.head.id === id) return this.shift();

    let previousVideo = this.head;
    let currentVideo = this.head.next;
    let currentVideoIndex = 1;
    
    while(currentVideo.next) {
      if(currentVideo.id === id) break;

      previousVideo = currentVideo;
      currentVideo = currentVideo.next;
      currentVideoIndex++;
    }

    // if(!currentVideoIndex) return "π« ν΄λΉ IDμ λΉλμ€κ° μμ΅λλ€.";
    if(currentVideoIndex >= this.length - 1) return this.pop();
    
    previousVideo.next = currentVideo.next;
    this.length--;

    return this;
  }
}

module.exports = [ VideoMaker, VideoListManager ];