/**
 * Main Application
 * Điểm khởi đầu của ứng dụng Unit Converter
 */

// Đảm bảo DOM đã tải xong trước khi khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo ứng dụng
    initApp();
});

/**
 * Khởi tạo ứng dụng
 */
function initApp() {
    // Kiểm tra chi tiết xem module nào bị thiếu
    const missingModules = [];
    
    if (!window.lengthConverter) missingModules.push('lengthConverter');
    if (!window.weightConverter) missingModules.push('weightConverter');
    if (!window.temperatureConverter) missingModules.push('temperatureConverter');
    if (!window.currencyConverter) missingModules.push('currencyConverter');
    if (!window.UI) missingModules.push('UI');
    
    if (missingModules.length > 0) {
        console.error('Các module sau chưa được tải đầy đủ:', missingModules.join(', '));
        displayError(`Ứng dụng không thể khởi tạo do thiếu module: ${missingModules.join(', ')}. Vui lòng tải lại trang.`);
        return;
    }
    
    // Hiệu ứng loading
    showLoadingScreen();
    
    // Cập nhật tỷ giá tiền tệ (nếu cần)
    updateCurrencyRates()
        .then(() => {
            // Khởi tạo giao diện người dùng
            UI.init();
            
            // Ẩn màn hình loading
            hideLoadingScreen();
        })
        .catch(error => {
            console.error('Lỗi khi khởi tạo ứng dụng:', error);
            hideLoadingScreen();
        });
        
    // Đăng ký service worker cho offline support (nếu có)
    registerServiceWorker();
}

/**
 * Cập nhật tỷ giá tiền tệ từ API
 * @returns {Promise<boolean>} Promise thông báo kết quả cập nhật
 */
async function updateCurrencyRates() {
    try {
        // Kiểm tra xem đã cập nhật trong ngày hôm nay chưa
        const lastUpdated = currencyConverter.lastUpdated;
        const now = new Date();
        
        // Nếu chưa cập nhật hoặc đã hơn 24 giờ từ lần cập nhật cuối, thực hiện cập nhật
        if (!lastUpdated || (now - lastUpdated) > 24 * 60 * 60 * 1000) {
            const updated = await currencyConverter.updateRates();
            
            // Thông báo kết quả cho user nếu cần
            if (!updated) {
                showNotification('Không thể cập nhật tỷ giá tiền tệ mới nhất', 'warning');
            } else {
                showNotification('Đã cập nhật tỷ giá tiền tệ mới nhất', 'success');
            }
            
            return updated;
        }
        
        return true;
    } catch (error) {
        console.error('Lỗi khi cập nhật tỷ giá tiền tệ:', error);
        return false;
    }
}

/**
 * Hiển thị màn hình loading trong khi ứng dụng khởi tạo
 */
function showLoadingScreen() {
    // Tạo phần tử loading nếu chưa tồn tại
    if (!document.getElementById('loadingScreen')) {
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loadingScreen';
        loadingScreen.className = 'loading-screen';
        
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <h2>Đang tải ứng dụng...</h2>
            </div>
        `;
        
        // Thêm CSS cho màn hình loading
        const style = document.createElement('style');
        style.textContent = `
            .loading-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.9);
                z-index: 9999;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: opacity 0.5s ease;
            }
            
            .loading-content {
                text-align: center;
            }
            
            .loading-spinner {
                border: 5px solid rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                border-top: 5px solid var(--primary-color, #4361ee);
                width: 50px;
                height: 50px;
                margin: 0 auto 20px auto;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(loadingScreen);
    } else {
        document.getElementById('loadingScreen').style.display = 'flex';
    }
}

/**
 * Ẩn màn hình loading khi ứng dụng đã sẵn sàng
 */
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

/**
 * Hiển thị thông báo cho người dùng
 * @param {string} message Nội dung thông báo
 * @param {string} type Loại thông báo ('success', 'warning', 'error')
 */
function showNotification(message, type = 'info') {
    // Tạo một thông báo mới
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} animate__animated animate__fadeInRight`;
    
    // Thiết lập nội dung thông báo
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getIconForType(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Thêm CSS cho thông báo
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
            }
            
            .notification {
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
                margin-bottom: 10px;
                padding: 15px;
                width: 300px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
            }
            
            .notification-content i {
                margin-right: 10px;
            }
            
            .notification-success {
                border-left: 4px solid var(--success-color, #4caf50);
            }
            
            .notification-success i {
                color: var(--success-color, #4caf50);
            }
            
            .notification-warning {
                border-left: 4px solid var(--warning-color, #ff9800);
            }
            
            .notification-warning i {
                color: var(--warning-color, #ff9800);
            }
            
            .notification-error {
                border-left: 4px solid #f44336;
            }
            
            .notification-error i {
                color: #f44336;
            }
            
            .notification-info {
                border-left: 4px solid #2196f3;
            }
            
            .notification-info i {
                color: #2196f3;
            }
            
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 20px;
                line-height: 1;
                padding: 0;
                color: #999;
            }
            
            .notification-close:hover {
                color: #333;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Tạo container nếu chưa tồn tại
    let container = document.querySelector('.notification-container');
    
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    // Thêm thông báo vào container
    container.appendChild(notification);
    
    // Xử lý sự kiện đóng thông báo
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.classList.remove('animate__fadeInRight');
        notification.classList.add('animate__fadeOutRight');
        
        setTimeout(() => {
            notification.remove();
            
            // Xóa container nếu không còn thông báo nào
            if (container.children.length === 0) {
                container.remove();
            }
        }, 500);
    });
    
    // Tự động ẩn thông báo sau 5 giây
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('animate__fadeInRight');
            notification.classList.add('animate__fadeOutRight');
            
            setTimeout(() => {
                notification.remove();
                
                // Xóa container nếu không còn thông báo nào
                if (container.children.length === 0) {
                    container.remove();
                }
            }, 500);
        }
    }, 5000);
}

/**
 * Lấy class biểu tượng dựa trên loại thông báo
 * @param {string} type Loại thông báo
 * @returns {string} Class biểu tượng FontAwesome
 */
function getIconForType(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'error': return 'fa-times-circle';
        default: return 'fa-info-circle';
    }
}

/**
 * Hiển thị thông báo lỗi
 * @param {string} message Nội dung thông báo lỗi
 */
function displayError(message) {
    const appContainer = document.querySelector('.app-container');
    
    if (appContainer) {
        // Tạo thông báo lỗi
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        
        errorDiv.innerHTML = `
            <div class="error-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <h3>Đã xảy ra lỗi</h3>
            <p>${message}</p>
            <button onclick="window.location.reload()">Tải lại trang</button>
        `;
        
        // Thêm CSS cho thông báo lỗi
        const style = document.createElement('style');
        style.textContent = `
            .error-message {
                background-color: #fff8f8;
                border: 1px solid #ffcdd2;
                border-radius: 8px;
                padding: 30px;
                text-align: center;
                margin: 20px 0;
            }
            
            .error-icon {
                color: #f44336;
                font-size: 48px;
                margin-bottom: 20px;
            }
            
            .error-message h3 {
                margin-bottom: 10px;
                color: #d32f2f;
            }
            
            .error-message button {
                background-color: #f44336;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 10px 20px;
                margin-top: 15px;
                cursor: pointer;
                font-weight: 500;
            }
            
            .error-message button:hover {
                background-color: #d32f2f;
            }
        `;
        
        document.head.appendChild(style);
        
        // Xóa nội dung hiện tại và hiển thị thông báo lỗi
        appContainer.innerHTML = '';
        appContainer.appendChild(errorDiv);
    } else {
        // Fallback nếu không tìm thấy app-container
        alert(`Lỗi: ${message}`);
    }
}

/**
 * Đăng ký service worker nếu trình duyệt hỗ trợ
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Trong ứng dụng thật, bạn sẽ cần tạo file service-worker.js
            // navigator.serviceWorker.register('/service-worker.js')
            //    .then(registration => {
            //        console.log('Service Worker đã được đăng ký thành công:', registration);
            //    })
            //    .catch(error => {
            //        console.error('Lỗi khi đăng ký Service Worker:', error);
            //    });
        });
    }
}