const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio ')
const PLAYER_STORAGE_KEY = 'F8_PLAYER';
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Intro',
            singer: 'Obito, Shinki',
            path: './assets/music/Intro-Obito-11836717.mp3',
            image: './assets/img/img1.jpg'
        },
        {
            name: 'Xuất Phát Điểm',
            singer: 'Obito, Shinki',
            path: './assets/music/XuatPhatDiem-Obito-11836718.mp3',
            image: './assets/img/img2.jpg'
        },
        {
            name: 'CL5',
            singer: 'Obito, Shinki',
            path: './assets/music/Cl5Interlude-Obito-11836719.mp3',
            image: './assets/img/img3.jpg'
        },
        {
            name: 'Đầu Đường Xó Chợ',
            singer: 'Obito, Shinki, Lăng LD',
            path: './assets/music/DauDuongXoCho-Obito-11836720.mp3',
            image: './assets/img/img3.jpg'
        },
        {
            name: 'Biên Giới Long Bình',
            singer: 'Obito, Shinki',
            path: './assets/music/BienGioiLongBinh-Obito-11836721.mp3',
            image: './assets/img/img3.jpg'
        },
        {
            name: '16',
            singer: 'Obito, Shinki',
            path: './assets/music/16-Obito-11836722.mp3',
            image: './assets/img/img3.jpg'
        },
        {
            name: 'Sài Gòn ơi',
            singer: 'Obito, Shinki',
            path: './assets/music/SaiGonOi-Obito-11836723.mp3',
            image: './assets/img/img4.jpg'
        },
        {
            name: 'Trốn Chạy',
            singer: 'Obito, Shinki',
            path: './assets/music/TronChay-Obito-11836724.mp3',
            image: './assets/img/img4.jpg'
        },
        {
            name: 'Cất Cánh(interlude)',
            singer: 'Obito, Shinki',
            path: './assets/music/CatCanhInterlude-Obito-11836725.mp3',
            image: './assets/img/img4.jpg'
        },
        {
            name: 'Hà Nội',
            singer: 'Obito, Shinki, VSTRA',
            path: './assets/music/HaNoi-Obito-11836726.mp3',
            image: './assets/img/img4.jpg'
        },
        {
            name: 'Vô Điều Kiện',
            singer: 'Obito, Shinki',
            path: './assets/music/VoDieuKien-Obito-11836727.mp3',
            image: './assets/img/img5.jpg' 
        },
        {
            name: 'Đánh Đổi',
            singer: 'Obito, Shinki, RPT MCK',
            path: './assets/music/DanhDoi-Obito-11836728.mp3',
            image: './assets/img/img5.jpg' 
        },
        {
            name: 'Backstage Freestyle',
            singer: 'Obito, Shinki',
            path: './assets/music/BackstageFreestyle-Obito-11836729.mp3',
            image: './assets/img/img5.jpg' 
        },
        {
            name: 'Tell The Kids I Love Them',
            singer: 'Obito, Shinki',
            path: './assets/music/TellTheKidsILoveThem-ObitoShikii-11836730.mp3',
            image: './assets/img/img6.jpg'
        },
        {
            name: 'Ước Mơ Của Mẹ(interlude)',
            singer: 'Obito, Shinki',
            path: './assets/music/',
            image: './assets/img/img6.jpg'
        },
        {
            name: 'Con Kể Ba Nghe',
            singer: 'Obito, Shinki',
            path: './assets/music/ConKeBaNghe-Obito-11836732.mp3',
            image: './assets/img/img6.jpg'
        },
        {
            name: 'Champion',
            singer: 'Obito, Shinki',
            path: './assets/music/Champion-Obito-11836733.mp3',
            image: './assets/img/img6.jpg'
        },
        {
            name: 'Chưa Xong',
            singer: 'Obito, Shinki',
            path: './assets/music/ChuaXong-Obito-11836734.mp3',
            image: './assets/img/img6.jpg'
        },
        {
            name: 'Tự Sự',
            singer: 'Obito, Shinki',
            path: './assets/music/TuSu-Obito-11836735.mp3',
            image: './assets/img/img6.jpg'
        },
        {
            name: 'Outro',
            singer: 'Obito, Shinki',
            path: './assets/music/Outro-Obito-11836736.mp3',
            image: './assets/img/img6.jpg'
        },
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function() {
        const htmls = this.songs.map((song, index) =>   {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" 
                        style="background-image: url('${song.image}');">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent: function() {
        const _this = this
        const cdWidth = cd.offsetWidth

        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10 seconds
            iterations: Infinity,
        });
        cdThumbAnimate.pause();

        // Xử lý phóng to thu nhỏ cd 
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop 
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()   
            } else {           
                audio.play()
            }
        }

        // Playing
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // Pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Progress update song
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // Handle seek time song
        progress.oninput = function(e) {
            const seekTime = e.target.value * audio.duration / 100;
            audio.currentTime = seekTime;
        };

        // When next song is played
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // When prev song is played
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // When random song is played 
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom);
            // _this.randomSong()
        }

        // Xử lý khi bài hát kết thúc
        audio.onended = function() {
            if(!_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // Xử lý phát lại bài hát
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }
        
        // Xử lý khi bấm vào bài hát để chuyển đổi
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')) {
                // Xử lý click vào bài hát
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                // Xử lý click vào option
                if(e.target.closest('.option')) {

                }
            }
        }

    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
        }, 300);
    },
    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
        this.currentIndex = this.config.currentIndex || 0;
    },
    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length)
            this.currentIndex = 0;
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0)
            this.currentIndex = this.songs.length - 1;
        this.loadCurrentSong();
    },
    randomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex);
        this.currentIndex = newIndex
        this.loadCurrentSong();
    },
    start: function() {
        // Gán cấu hình config vòa ứng dụng
        this.loadConfig()
        // Định nghĩa các thuộc tính cho object
        this.defineProperties()

        // Lắng nghe / Xử lý các sự kiện (DOM Events)
        this.handleEvent()

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // Render playlist
        this.render()

        // Hiển thị trạng thai bắt đầu button repeat & random
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    }

}

app.start()





