const API_URL = 'https://api.xiaotuo.net/api.php?act=Api_send&id=86&apikey=987bbfa9-aa4f-2406-631d-a2d384ae4e44d45bd690';

// 状态管理
const state = {
    currentVideoUrl: '',
    currentVideoId: '',
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    history: JSON.parse(localStorage.getItem('history') || '[]'),
    stats: JSON.parse(localStorage.getItem('stats') || '{"views":0,"downloads":0,"shares":0}'),
    theme: localStorage.getItem('theme') || 'dark',
    quality: 'auto',
    autoPlay: true,
    loopVideo: false,
    isPlaying: false
};

// DOM 元素
const elements = {
    video: document.getElementById('randomVideo'),
    loading: document.getElementById('loading'),
    error: document.getElementById('errorMsg'),
    loadBtn: document.getElementById('loadBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    favoriteBtn: document.getElementById('favoriteBtn'),
    favoriteIcon: document.getElementById('favoriteIcon'),
    fullscreenOverlay: document.getElementById('fullscreenOverlay'),
    fullscreenVideo: document.getElementById('fullscreenVideo'),
    sharePanel: document.getElementById('sharePanel'),
    favoritesList: document.getElementById('favoritesList'),
    historyList: document.getElementById('historyList'),
    viewCount: document.getElementById('viewCount'),
    favoriteCount: document.getElementById('favoriteCount'),
    downloadCount: document.getElementById('downloadCount'),
    shareCount: document.getElementById('shareCount'),
    playBtn: document.getElementById('playBtn'),
    muteBtn: document.getElementById('muteBtn'),
    volumeSlider: document.getElementById('volumeSlider'),
    progressFill: document.getElementById('progressFill'),
    currentTime: document.getElementById('currentTime'),
    totalTime: document.getElementById('totalTime'),
    autoPlay: document.getElementById('autoPlay'),
    loopVideo: document.getElementById('loopVideo')
};

// 初始化
function init() {
    createParticles();
    loadStats();
    loadFavorites();
    loadHistory();
    setupQualitySelector();
    setupPlaybackOptions();
    applyTheme();
    setupVideoEvents();
    loadRandomVideo();
}

// 创建粒子背景
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// 1. 随机视频加载
function loadRandomVideo() {
    showLoading();
    
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                state.currentVideoUrl = data.data;
                state.currentVideoId = new Date().getTime().toString();
                
                elements.video.src = state.currentVideoUrl;
                elements.video.load();
                
                hideLoading();
                addToHistory();
                updateStats('views');
                updateFavoriteButton();
            } else {
                throw new Error(data.msg || '视频获取失败');
            }
        })
        .catch(error => {
            hideLoading();
            showError();
            console.error('视频加载失败:', error);
        });
}

// 设置视频事件监听
function setupVideoEvents() {
    elements.video.addEventListener('loadedmetadata', function() {
        elements.totalTime.textContent = formatTime(elements.video.duration);
    });
    
    elements.video.addEventListener('timeupdate', function() {
        const percent = (elements.video.currentTime / elements.video.duration) * 100;
        elements.progressFill.style.width = percent + '%';
        elements.currentTime.textContent = formatTime(elements.video.currentTime);
    });
    
    elements.video.addEventListener('play', function() {
        state.isPlaying = true;
        elements.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    
    elements.video.addEventListener('pause', function() {
        state.isPlaying = false;
        elements.playBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    elements.video.addEventListener('volumechange', function() {
        elements.volumeSlider.value = elements.video.volume;
        if (elements.video.muted || elements.video.volume === 0) {
            elements.muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (elements.video.volume < 0.5) {
            elements.muteBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            elements.muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    
    elements.video.addEventListener('ended', function() {
        if (state.loopVideo) {
            elements.video.play();
        } else if (state.autoPlay) {
            loadRandomVideo();
        }
    });
    
    // 进度条点击事件
    document.querySelector('.progress-container').addEventListener('click', function(e) {
        const progressContainer = this;
        const clickPosition = e.pageX - progressContainer.getBoundingClientRect().left;
        const percent = clickPosition / progressContainer.offsetWidth;
        elements.video.currentTime = percent * elements.video.duration;
    });
    
    // 音量控制
    elements.volumeSlider.addEventListener('input', function() {
        elements.video.volume = this.value;
        elements.video.muted = (this.value === 0);
    });
}

// 播放/暂停控制
function togglePlay() {
    if (elements.video.paused) {
        elements.video.play();
    } else {
        elements.video.pause();
    }
}

// 静音控制
function toggleMute() {
    elements.video.muted = !elements.video.muted;
    if (elements.video.muted) {
        elements.volumeSlider.value = 0;
    } else {
        elements.volumeSlider.value = elements.video.volume;
    }
}

// 时间格式化
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

// 2. 全屏查看
function toggleFullscreen() {
    if (!state.currentVideoUrl) return;
    
    if (document.fullscreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
}

function enterFullscreen() {
    if (!state.currentVideoUrl) return;
    
    elements.fullscreenVideo.src = state.currentVideoUrl;
    elements.fullscreenOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // 复制播放状态
    if (!elements.video.paused) {
        elements.fullscreenVideo.play();
    }
    
    elements.fullscreenVideo.currentTime = elements.video.currentTime;
    
    document.addEventListener('keydown', handleFullscreenKeydown);
    
    // 尝试进入全屏模式
    if (elements.fullscreenOverlay.requestFullscreen) {
        elements.fullscreenOverlay.requestFullscreen();
    } else if (elements.fullscreenOverlay.webkitRequestFullscreen) {
        elements.fullscreenOverlay.webkitRequestFullscreen();
    } else if (elements.fullscreenOverlay.msRequestFullscreen) {
        elements.fullscreenOverlay.msRequestFullscreen();
    }
}

function exitFullscreen() {
    // 退出前保存播放状态
    elements.video.currentTime = elements.fullscreenVideo.currentTime;
    
    if (!elements.fullscreenVideo.paused) {
        elements.video.play();
    }
    
    elements.fullscreenOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleFullscreenKeydown);
    
    // 退出全屏模式
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function handleFullscreenKeydown(e) {
    if (e.key === 'Escape') exitFullscreen();
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (elements.fullscreenVideo.paused) {
            elements.fullscreenVideo.play();
        } else {
            elements.fullscreenVideo.pause();
        }
    }
}

// 3. 收藏功能
function toggleFavorite() {
    if (!state.currentVideoUrl) return;
    
    const favoriteIndex = state.favorites.findIndex(f => f.id === state.currentVideoId);
    
    if (favoriteIndex > -1) {
        state.favorites.splice(favoriteIndex, 1);
        showNotification('已取消收藏', 'fas fa-heart-broken');
    } else {
        state.favorites.unshift({
            id: state.currentVideoId,
            url: state.currentVideoUrl,
            timestamp: new Date().toLocaleString()
        });
        showNotification('收藏成功', 'fas fa-heart');
    }
    
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    loadFavorites();
    updateFavoriteButton();
    updateStats('favorites');
}

function updateFavoriteButton() {
    const isFavorited = state.favorites.some(f => f.id === state.currentVideoId);
    elements.favoriteIcon.className = isFavorited ? 'fas fa-heart' : 'far fa-heart';
    elements.favoriteBtn.innerHTML = `
        <i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i>
        <span>${isFavorited ? '已收藏' : '收藏'}</span>
    `;
}

function loadFavorites() {
    const container = elements.favoritesList;
    
    if (state.favorites.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; color: var(--text-muted); padding: 30px 20px;">
                <i class="far fa-heart" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
                暂无收藏
            </div>
        `;
        return;
    }
    
    container.innerHTML = state.favorites.slice(0, 5).map(fav => `
        <div class="content-item" onclick="loadVideoFromFavorite('${fav.url}', '${fav.id}')">
            <i class="fas fa-video" style="font-size: 24px; color: var(--accent);"></i>
            <div class="content-info">${fav.timestamp}</div>
            <button class="remove-btn" onclick="event.stopPropagation(); removeFavorite('${fav.id}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function loadVideoFromFavorite(url, id) {
    state.currentVideoUrl = url;
    state.currentVideoId = id;
    elements.video.src = url;
    elements.video.load();
    updateFavoriteButton();
}

function removeFavorite(id) {
    state.favorites = state.favorites.filter(f => f.id !== id);
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    loadFavorites();
    updateStats('favorites');
    updateFavoriteButton();
}

// 4. 分享功能
function showSharePanel() {
    if (!state.currentVideoUrl) return;
    elements.sharePanel.classList.add('active');
}

function hideSharePanel() {
    elements.sharePanel.classList.remove('active');
}

function shareToWeibo() {
    const text = encodeURIComponent('发现一个超美的小姐姐视频！');
    const url = encodeURIComponent(state.currentVideoUrl);
    window.open(`http://service.weibo.com/share/share.php?title=${text}&url=${url}`);
    updateStats('shares');
    hideSharePanel();
}

function shareToWeixin() {
    copyLink();
    showNotification('链接已复制，请在微信中粘贴分享', 'fab fa-weixin');
    hideSharePanel();
}

function shareToQQ() {
    const text = encodeURIComponent('发现一个超美的小姐姐视频！');
    const url = encodeURIComponent(state.currentVideoUrl);
    window.open(`http://connect.qq.com/widget/shareqq/index.html?title=${text}&url=${url}`);
    updateStats('shares');
    hideSharePanel();
}

function copyLink() {
    navigator.clipboard.writeText(state.currentVideoUrl).then(() => {
        showNotification('链接已复制到剪贴板', 'fas fa-link');
        updateStats('shares');
    }).catch(() => {
        showNotification('复制失败，请手动复制', 'fas fa-exclamation-triangle');
    });
}

// 5. 主题切换
function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    applyTheme();
}

function applyTheme() {
    document.body.setAttribute('data-theme', state.theme);
}

// 6. 视频质量选择
function setupQualitySelector() {
    document.querySelectorAll('.quality-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.quality-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.quality = btn.getAttribute('data-quality');
        });
    });
}

// 播放选项设置
function setupPlaybackOptions() {
    elements.autoPlay.checked = state.autoPlay;
    elements.loopVideo.checked = state.loopVideo;
    
    elements.autoPlay.addEventListener('change', function() {
        state.autoPlay = this.checked;
    });
    
    elements.loopVideo.addEventListener('change', function() {
        state.loopVideo = this.checked;
        elements.video.loop = this.checked;
    });
}

// 下载功能
function downloadVideo() {
    if (!state.currentVideoUrl) {
        showNotification('请先加载一个视频', 'fas fa-exclamation-triangle');
        return;
    }
    
    try {
        const link = document.createElement('a');
        link.href = state.currentVideoUrl;
        link.download = `小姐姐视频_${state.currentVideoId}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        updateStats('downloads');
        showNotification('开始下载', 'fas fa-download');
    } catch (error) {
        showNotification('下载失败，请右键保存', 'fas fa-exclamation-triangle');
    }
}

// 历史记录
function addToHistory() {
    const historyItem = {
        id: state.currentVideoId,
        url: state.currentVideoUrl,
        timestamp: new Date().toLocaleString()
    };
    
    state.history.unshift(historyItem);
    state.history = state.history.slice(0, 10);
    
    localStorage.setItem('history', JSON.stringify(state.history));
    loadHistory();
}

function loadHistory() {
    const container = elements.historyList;
    
    if (state.history.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; color: var(--text-muted); padding: 30px 20px;">
                <i class="fas fa-history" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
                暂无历史
            </div>
        `;
        return;
    }
    
    container.innerHTML = state.history.map(item => `
        <div class="content-item" onclick="loadVideoFromFavorite('${item.url}', '${item.id}')">
            <i class="fas fa-video" style="font-size: 24px; color: var(--accent);"></i>
            <div class="content-info">${item.timestamp}</div>
        </div>
    `).join('');
}

// 统计更新
function updateStats(type) {
    switch(type) {
        case 'views':
            state.stats.views++;
            elements.viewCount.textContent = state.stats.views;
            break;
        case 'downloads':
            state.stats.downloads++;
            elements.downloadCount.textContent = state.stats.downloads;
            break;
        case 'shares':
            state.stats.shares++;
            elements.shareCount.textContent = state.stats.shares;
            break;
        case 'favorites':
            elements.favoriteCount.textContent = state.favorites.length;
            break;
    }
    localStorage.setItem('stats', JSON.stringify(state.stats));
}

function loadStats() {
    elements.viewCount.textContent = state.stats.views;
    elements.downloadCount.textContent = state.stats.downloads;
    elements.shareCount.textContent = state.stats.shares;
    elements.favoriteCount.textContent = state.favorites.length;
}

// 工具函数
function showLoading() {
    elements.loading.style.display = 'block';
    elements.video.style.display = 'none';
    elements.error.style.display = 'none';
    elements.loadBtn.disabled = true;
    elements.downloadBtn.disabled = true;
}

function hideLoading() {
    elements.loading.style.display = 'none';
    elements.video.style.display = 'block';
    elements.loadBtn.disabled = false;
    elements.downloadBtn.disabled = false;
    
    // 自动播放
    if (state.autoPlay) {
        elements.video.play().catch(e => {
            console.log('自动播放被阻止:', e);
        });
    }
}

function showError() {
    elements.error.style.display = 'block';
    elements.video.style.display = 'none';
}

function showNotification(message, iconClass) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="${iconClass}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 400);
    }, 3000);
}

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            togglePlay();
            break;
        case 'KeyN':
            e.preventDefault();
            if (!elements.loadBtn.disabled) loadRandomVideo();
            break;
        case 'KeyF':
            e.preventDefault();
            toggleFavorite();
            break;
        case 'KeyD':
            e.preventDefault();
            downloadVideo();
            break;
        case 'KeyS':
            e.preventDefault();
            showSharePanel();
            break;
        case 'KeyT':
            e.preventDefault();
            toggleTheme();
            break;
        case 'KeyM':
            e.preventDefault();
            toggleMute();
            break;
        case 'Escape':
            hideSharePanel();
            if (document.fullscreenElement) {
                exitFullscreen();
            }
            break;
    }
});

// 点击外部关闭分享面板
document.addEventListener('click', function(e) {
    if (!elements.sharePanel.contains(e.target) && !e.target.closest('.btn') && !e.target.closest('.overlay-btn')) {
        hideSharePanel();
    }
});

// 页面加载完成后初始化
window.addEventListener('load', init);