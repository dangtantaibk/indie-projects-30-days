// Xác nhận module đã được tải
console.log('UI module loaded');

/**
 * UI Module
 * Chứa các hàm để quản lý giao diện người dùng
 */
const UI = {
    // Các thành phần DOM
    elements: {
        categoryButtons: null,
        sourceUnit: null,
        targetUnit: null,
        sourceValue: null,
        targetValue: null,
        swapButton: null,
        copyButton: null,
        clearButton: null,
        formulaDisplay: null,
        formula: null,
        historyList: null,
        clearHistoryButton: null,
        premiumModal: null,
        openPremiumButton: null,
        closeModalButton: null,
        darkModeToggle: null
    },

    // Lưu trữ trạng thái ứng dụng
    state: {
        currentCategory: 'length',
        isPremiumUser: false,
        isDarkMode: false,
        historyItems: []
    },

    /**
     * Khởi tạo UI
     */
    init: function() {
        this.cacheElements();
        this.bindEvents();
        this.loadState();
        this.setCurrentCategory('length'); // Mặc định hiển thị chuyển đổi chiều dài
        
        // Hiệu ứng ban đầu cho tiêu đề
        this.animateTitle();
        
        // Hiển thị lịch sử chuyển đổi
        this.updateHistoryList();

        // Kiểm tra nếu dark mode được lưu trong state
        if (this.state.isDarkMode) {
            this.enableDarkMode();
        }

        // Thêm toggle dark mode nếu user là premium
        if (this.state.isPremiumUser) {
            this.addDarkModeToggle();
        }

        // Animation cho các phần tử khi trang load
        this.animateElementsOnLoad();
    },

    /**
     * Khởi tạo animation khi trang load
     */
    animateElementsOnLoad: function() {
        // Animation cho converter container
        setTimeout(() => {
            const container = document.querySelector('.converter-container');
            container.classList.add('scale-in');
        }, 800);

        // Animation cho history section
        setTimeout(() => {
            const historySection = document.querySelector('.history-section');
            historySection.classList.add('fade-in');
        }, 1200);
    },

    /**
     * Lấy tham chiếu đến các phần tử DOM
     */
    cacheElements: function() {
        this.elements.categoryButtons = document.querySelectorAll('.category-selector button');
        this.elements.sourceUnit = document.getElementById('sourceUnit');
        this.elements.targetUnit = document.getElementById('targetUnit');
        this.elements.sourceValue = document.getElementById('sourceValue');
        this.elements.targetValue = document.getElementById('targetValue');
        this.elements.swapButton = document.getElementById('swapButton');
        this.elements.copyButton = document.getElementById('copyButton');
        this.elements.clearButton = document.getElementById('clearButton');
        this.elements.formulaDisplay = document.getElementById('formulaDisplay');
        this.elements.formula = document.getElementById('formula');
        this.elements.historyList = document.getElementById('historyList');
        this.elements.clearHistoryButton = document.getElementById('clearHistoryButton');
        this.elements.premiumModal = document.getElementById('premiumModal');
        this.elements.openPremiumButton = document.getElementById('openPremium');
        this.elements.closeModalButton = document.querySelector('.close-button');
        this.elements.darkModeToggle = document.getElementById('darkModeToggle');
    },

    /**
     * Thiết lập các sự kiện cho các phần tử giao diện
     */
    bindEvents: function() {
        // Sự kiện khi chuyển đổi danh mục
        this.elements.categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                this.setCurrentCategory(category);
                this.animateButton(button);
            });
        });

        // Sự kiện khi thay đổi giá trị đầu vào
        this.elements.sourceValue.addEventListener('input', () => {
            this.updateConversion();
            this.animateTargetValueChange();
        });
        
        // Sự kiện khi thay đổi đơn vị
        this.elements.sourceUnit.addEventListener('change', () => {
            this.updateConversion();
            this.elements.sourceUnit.classList.add('bounce');
            setTimeout(() => {
                this.elements.sourceUnit.classList.remove('bounce');
            }, 750);
        });

        this.elements.targetUnit.addEventListener('change', () => {
            this.updateConversion();
            this.elements.targetUnit.classList.add('bounce');
            setTimeout(() => {
                this.elements.targetUnit.classList.remove('bounce');
            }, 750);
        });
        
        // Sự kiện khi nhấn nút hoán đổi
        this.elements.swapButton.addEventListener('click', () => this.swapUnits());
        
        // Sự kiện khi nhấn nút sao chép
        this.elements.copyButton.addEventListener('click', () => this.copyResult());
        
        // Sự kiện khi nhấn nút xóa
        this.elements.clearButton.addEventListener('click', () => this.clearInputs());
        
        // Sự kiện khi nhấn nút xóa lịch sử
        this.elements.clearHistoryButton.addEventListener('click', () => this.clearHistory());

        // Sự kiện cho modal premium
        this.elements.openPremiumButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal();
        });
        
        this.elements.closeModalButton.addEventListener('click', () => this.closeModal());
        
        // Đóng modal khi click bên ngoài
        window.addEventListener('click', (e) => {
            if (e.target === this.elements.premiumModal) {
                this.closeModal();
            }
        });

        // Toggle dark mode nếu có
        if (this.elements.darkModeToggle) {
            this.elements.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        }

        // Thêm sự kiện focus cho input
        this.elements.sourceValue.addEventListener('focus', () => {
            this.elements.sourceValue.parentElement.classList.add('shimmer');
        });

        this.elements.sourceValue.addEventListener('blur', () => {
            this.elements.sourceValue.parentElement.classList.remove('shimmer');
        });
    },

    /**
     * Thêm toggle dark mode cho người dùng premium
     */
    addDarkModeToggle: function() {
        // Kiểm tra xem toggle đã tồn tại chưa
        if (!document.getElementById('darkModeToggle')) {
            const footerP = document.querySelector('.app-footer p');
            const darkModeToggle = document.createElement('button');
            darkModeToggle.id = 'darkModeToggle';
            darkModeToggle.className = 'dark-mode-toggle';
            darkModeToggle.title = this.state.isDarkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối';
            darkModeToggle.innerHTML = this.state.isDarkMode ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
            
            footerP.appendChild(document.createTextNode(' | '));
            footerP.appendChild(darkModeToggle);

            // Thêm CSS cho nút toggle
            const style = document.createElement('style');
            style.textContent = `
                .dark-mode-toggle {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--primary-color);
                    font-size: 1rem;
                    padding: 2px 5px;
                    border-radius: 50%;
                    transition: all var(--transition-speed);
                    vertical-align: middle;
                }
                
                .dark-mode-toggle:hover {
                    background-color: rgba(58, 134, 255, 0.1);
                    transform: rotate(15deg);
                }
                
                .dark-mode .dark-mode-toggle {
                    color: #ffd166;
                }
                
                .dark-mode .dark-mode-toggle:hover {
                    background-color: rgba(255, 209, 102, 0.1);
                }
            `;
            document.head.appendChild(style);
            
            // Cập nhật tham chiếu
            this.elements.darkModeToggle = darkModeToggle;
            
            // Thêm sự kiện
            this.elements.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        }
    },

    /**
     * Bật chế độ tối
     */
    enableDarkMode: function() {
        document.body.classList.add('dark-mode');
        this.state.isDarkMode = true;
        
        // Cập nhật toggle nếu có
        if (this.elements.darkModeToggle) {
            this.elements.darkModeToggle.title = 'Chuyển sang chế độ sáng';
            this.elements.darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        this.saveState();
    },

    /**
     * Tắt chế độ tối
     */
    disableDarkMode: function() {
        document.body.classList.remove('dark-mode');
        this.state.isDarkMode = false;
        
        // Cập nhật toggle nếu có
        if (this.elements.darkModeToggle) {
            this.elements.darkModeToggle.title = 'Chuyển sang chế độ tối';
            this.elements.darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        this.saveState();
    },

    /**
     * Chuyển đổi giữa chế độ sáng và tối
     */
    toggleDarkMode: function() {
        if (this.state.isDarkMode) {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
        
        // Animation cho chuyển đổi
        document.querySelector('.app-container').classList.add('animate-swing');
        setTimeout(() => {
            document.querySelector('.app-container').classList.remove('animate-swing');
        }, 1000);
    },

    /**
     * Thiết lập danh mục hiện tại và cập nhật giao diện
     * @param {string} category Danh mục được chọn
     */
    setCurrentCategory: function(category) {
        // Cập nhật danh mục hiện tại
        this.state.currentCategory = category;
        
        // Cập nhật trạng thái các nút danh mục
        this.elements.categoryButtons.forEach(button => {
            if (button.dataset.category === category) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // Cập nhật các đơn vị dựa trên danh mục được chọn
        this.updateUnitSelectors();
        
        // Cập nhật kết quả chuyển đổi
        this.updateConversion();
        
        // Hiệu ứng cho container chuyển đổi
        const container = document.querySelector('.converter-container');
        container.classList.remove('animate__fadeIn');
        void container.offsetWidth; // Trigger reflow để reset animation
        container.classList.add('animate__fadeIn');
    },

    /**
     * Cập nhật các select chọn đơn vị dựa trên danh mục hiện tại
     */
    updateUnitSelectors: function() {
        // Xác định converter phù hợp với danh mục
        let converter;
        switch (this.state.currentCategory) {
            case 'length': converter = lengthConverter; break;
            case 'weight': converter = weightConverter; break;
            case 'temperature': converter = temperatureConverter; break;
            case 'currency': converter = currencyConverter; break;
            default: converter = lengthConverter;
        }
        
        // Lấy danh sách đơn vị có sẵn
        const units = converter.getAvailableUnits(this.state.isPremiumUser);
        
        console.log('Selected category:', this.state.currentCategory);
        console.log('Available units:', units);
        
        // Lưu lại đơn vị đã chọn (nếu có)
        const sourceSelected = this.elements.sourceUnit.value;
        const targetSelected = this.elements.targetUnit.value;
        
        // Xóa tất cả options hiện tại
        this.elements.sourceUnit.innerHTML = '';
        this.elements.targetUnit.innerHTML = '';
        
        // Thêm các options mới dựa trên đơn vị có sẵn
        for (const [code, unit] of Object.entries(units)) {
            // Tạo options cho đơn vị nguồn
            const sourceOption = document.createElement('option');
            sourceOption.value = code;
            sourceOption.textContent = unit.name;
            if (unit.premium) {
                sourceOption.className = 'premium-option';
                sourceOption.textContent += ' ⭐';
            }
            this.elements.sourceUnit.appendChild(sourceOption);
            
            // Tạo options cho đơn vị đích
            const targetOption = document.createElement('option');
            targetOption.value = code;
            targetOption.textContent = unit.name;
            if (unit.premium) {
                targetOption.className = 'premium-option';
                targetOption.textContent += ' ⭐';
            }
            this.elements.targetUnit.appendChild(targetOption);
        }
        
        // Khôi phục lại đơn vị đã chọn nếu vẫn còn trong danh sách
        if (sourceSelected && units[sourceSelected]) {
            this.elements.sourceUnit.value = sourceSelected;
        } else {
            // Đặt giá trị mặc định
            const codes = Object.keys(units);
            if (codes.length > 0) {
                this.elements.sourceUnit.value = codes[0];
            }
        }
        
        if (targetSelected && units[targetSelected]) {
            this.elements.targetUnit.value = targetSelected;
        } else {
            // Đặt giá trị mặc định khác với đơn vị nguồn
            const codes = Object.keys(units);
            if (codes.length > 1) {
                this.elements.targetUnit.value = codes[1];
            } else if (codes.length > 0) {
                this.elements.targetUnit.value = codes[0];
            }
        }

        // Thêm CSS cho premium options
        const style = document.getElementById('premium-option-styles');
        if (!style) {
            const styleElement = document.createElement('style');
            styleElement.id = 'premium-option-styles';
            styleElement.textContent = `
                .premium-option {
                    color: var(--secondary-color);
                    font-weight: 500;
                }
                
                .dark-mode .premium-option {
                    color: #ff5e78;
                }
            `;
            document.head.appendChild(styleElement);
        }
    },

    /**
     * Cập nhật kết quả chuyển đổi dựa trên giá trị và đơn vị hiện tại
     */
    updateConversion: function() {
        // Lấy giá trị đầu vào
        const value = parseFloat(this.elements.sourceValue.value);
        
        // Kiểm tra giá trị nhập vào có hợp lệ không
        if (isNaN(value)) {
            this.elements.targetValue.value = '';
            this.elements.formula.textContent = '';
            this.elements.formula.classList.remove('shimmer');
            return;
        }
        
        // Lấy các đơn vị đã chọn
        const fromUnit = this.elements.sourceUnit.value;
        const toUnit = this.elements.targetUnit.value;
        
        // Xác định converter phù hợp với danh mục
        let converter;
        switch (this.state.currentCategory) {
            case 'length': converter = lengthConverter; break;
            case 'weight': converter = weightConverter; break;
            case 'temperature': converter = temperatureConverter; break;
            case 'currency': converter = currencyConverter; break;
            default: converter = lengthConverter;
        }
        
        // Thực hiện chuyển đổi
        const convertedValue = converter.convert(value, fromUnit, toUnit);
        
        // Hiển thị kết quả
        if (convertedValue !== null) {
            // Hiệu ứng trước khi hiển thị kết quả
            this.elements.targetValue.classList.add('shimmer');
            this.elements.formula.classList.add('shimmer');
            
            // Định dạng kết quả dựa trên loại chuyển đổi
            if (this.state.currentCategory === 'currency') {
                this.elements.targetValue.value = convertedValue.toFixed(4);
            } else {
                const precision = convertedValue >= 1000 || convertedValue < 0.01 ? 6 : 4;
                this.elements.targetValue.value = convertedValue.toFixed(precision);
            }
            
            // Hiển thị công thức chuyển đổi
            this.elements.formula.textContent = converter.getFormula(fromUnit, toUnit);
            
            // Xóa hiệu ứng shimmer sau 1 giây
            setTimeout(() => {
                this.elements.targetValue.classList.remove('shimmer');
                this.elements.formula.classList.remove('shimmer');
            }, 1000);
            
            // Thêm vào lịch sử chuyển đổi
            if (value !== 0) {
                this.addToHistory(value, fromUnit, convertedValue, toUnit, this.state.currentCategory);
            }
        } else {
            this.elements.targetValue.value = 'Lỗi';
            this.elements.formula.textContent = 'Không thể chuyển đổi';
            this.elements.formula.classList.remove('shimmer');
        }
    },

    /**
     * Tạo hiệu ứng animation khi thay đổi giá trị đích
     */
    animateTargetValueChange: function() {
        const targetValueInput = this.elements.targetValue;
        
        // Thêm hiệu ứng pulse nếu có giá trị
        if (targetValueInput.value) {
            targetValueInput.classList.add('pulse');
            setTimeout(() => {
                targetValueInput.classList.remove('pulse');
            }, 1500);
        }
    },

    /**
     * Hoán đổi đơn vị nguồn và đích
     */
    swapUnits: function() {
        // Hoán đổi giá trị của hai select đơn vị
        const temp = this.elements.sourceUnit.value;
        this.elements.sourceUnit.value = this.elements.targetUnit.value;
        this.elements.targetUnit.value = temp;
        
        // Nếu đã có giá trị đầu vào, cập nhật kết quả chuyển đổi
        this.updateConversion();
        
        // Thêm hiệu ứng xoay cho nút swap
        this.elements.swapButton.classList.add('rotate-180');
        this.elements.swapButton.classList.add('bounce');
        
        setTimeout(() => {
            this.elements.swapButton.classList.remove('rotate-180');
            this.elements.swapButton.classList.remove('bounce');
        }, 750);

        // Hiệu ứng cho các input container
        const sourceWrapper = this.elements.sourceUnit.parentElement;
        const targetWrapper = this.elements.targetUnit.parentElement;
        
        sourceWrapper.classList.add('animate__animated', 'animate__fadeIn');
        targetWrapper.classList.add('animate__animated', 'animate__fadeIn');
        
        setTimeout(() => {
            sourceWrapper.classList.remove('animate__animated', 'animate__fadeIn');
            targetWrapper.classList.remove('animate__animated', 'animate__fadeIn');
        }, 1000);
    },

    /**
     * Sao chép kết quả vào clipboard
     */
    copyResult: function() {
        // Kiểm tra nếu có kết quả
        if (this.elements.targetValue.value) {
            navigator.clipboard.writeText(this.elements.targetValue.value)
                .then(() => {
                    // Hiệu ứng khi sao chép thành công
                    const originalText = this.elements.copyButton.innerHTML;
                    this.elements.copyButton.innerHTML = '<i class="fas fa-check"></i> Đã sao chép!';
                    this.elements.copyButton.classList.add('bounce');
                    
                    setTimeout(() => {
                        this.elements.copyButton.innerHTML = originalText;
                        this.elements.copyButton.classList.remove('bounce');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Không thể sao chép: ', err);
                });
        }
    },

    /**
     * Xóa giá trị nhập và kết quả
     */
    clearInputs: function() {
        // Hiệu ứng cho nút
        this.elements.clearButton.classList.add('bounce');
        
        // Animation cho khi xóa
        if (this.elements.sourceValue.value || this.elements.targetValue.value) {
            this.elements.sourceValue.classList.add('animate__animated', 'animate__fadeOut');
            this.elements.targetValue.classList.add('animate__animated', 'animate__fadeOut');
            
            setTimeout(() => {
                this.elements.sourceValue.value = '';
                this.elements.targetValue.value = '';
                this.elements.formula.textContent = '';
                
                // Loại bỏ classes animation
                this.elements.sourceValue.classList.remove('animate__animated', 'animate__fadeOut');
                this.elements.targetValue.classList.remove('animate__animated', 'animate__fadeOut');
                
                // Thêm animation fadeIn
                this.elements.sourceValue.classList.add('animate__animated', 'animate__fadeIn');
                this.elements.targetValue.classList.add('animate__animated', 'animate__fadeIn');
                
                // Focus vào input đầu vào
                this.elements.sourceValue.focus();
                
                // Loại bỏ animation fadeIn sau khi hoàn thành
                setTimeout(() => {
                    this.elements.sourceValue.classList.remove('animate__animated', 'animate__fadeIn');
                    this.elements.targetValue.classList.remove('animate__animated', 'animate__fadeIn');
                    this.elements.clearButton.classList.remove('bounce');
                }, 500);
            }, 300);
        } else {
            this.elements.clearButton.classList.remove('bounce');
        }
    },

    /**
     * Thêm một chuyển đổi vào lịch sử
     * @param {number} fromValue Giá trị nguồn
     * @param {string} fromUnit Đơn vị nguồn
     * @param {number} toValue Giá trị đích
     * @param {string} toUnit Đơn vị đích
     * @param {string} category Danh mục chuyển đổi
     */
    addToHistory: function(fromValue, fromUnit, toValue, toUnit, category) {
        // Kiểm tra xem mục đã tồn tại chưa (tránh trùng lặp khi người dùng nhập cùng một giá trị nhiều lần)
        const isDuplicate = this.state.historyItems.some(item => 
            item.fromValue === fromValue && 
            item.fromUnit === fromUnit && 
            item.toUnit === toUnit && 
            item.category === category
        );
        
        if (isDuplicate) {
            return;
        }
        
        // Chỉ lưu tối đa 10 mục lịch sử
        if (this.state.historyItems.length >= 10) {
            this.state.historyItems.pop(); // Xóa mục cũ nhất
        }
        
        // Định dạng kết quả dựa trên loại chuyển đổi
        let formattedResult;
        if (category === 'currency') {
            formattedResult = currencyConverter.formatCurrency(toValue, toUnit);
        } else {
            formattedResult = toValue.toString();
        }
        
        // Thêm mục mới vào đầu danh sách
        this.state.historyItems.unshift({
            fromValue,
            fromUnit,
            toValue,
            toUnit,
            category,
            timestamp: new Date().getTime()
        });
        
        // Cập nhật giao diện hiển thị lịch sử
        this.updateHistoryList();
        
        // Lưu lịch sử vào localStorage
        this.saveState();
    },

    /**
     * Cập nhật danh sách lịch sử chuyển đổi
     */
    updateHistoryList: function() {
        // Xóa tất cả các mục hiện tại
        this.elements.historyList.innerHTML = '';
        
        // Nếu không có lịch sử, hiển thị thông báo
        if (this.state.historyItems.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'Chưa có lịch sử chuyển đổi';
            emptyMessage.className = 'empty-history';
            this.elements.historyList.appendChild(emptyMessage);
            return;
        }
        
        // Thêm các mục lịch sử vào danh sách
        this.state.historyItems.forEach((item, index) => {
            const listItem = document.createElement('li');
            
            // Xác định converter phù hợp với danh mục
            let converter;
            switch (item.category) {
                case 'length': converter = lengthConverter; break;
                case 'weight': converter = weightConverter; break;
                case 'temperature': converter = temperatureConverter; break;
                case 'currency': converter = currencyConverter; break;
                default: converter = lengthConverter;
            }
            
            // Tạo nội dung cho mục lịch sử
            let fromUnitName = converter.units[item.fromUnit]?.name || item.fromUnit;
            let toUnitName = converter.units[item.toUnit]?.name || item.toUnit;
            
            let categoryIcon;
            switch (item.category) {
                case 'length': categoryIcon = 'fa-ruler'; break;
                case 'weight': categoryIcon = 'fa-weight-hanging'; break;
                case 'temperature': categoryIcon = 'fa-temperature-high'; break;
                case 'currency': categoryIcon = 'fa-coins'; break;
                default: categoryIcon = 'fa-exchange-alt';
            }
            
            listItem.innerHTML = `
                <span class="history-content">
                    <i class="fas ${categoryIcon} history-icon"></i>
                    ${item.fromValue} ${fromUnitName} = 
                    <strong>${item.toValue.toFixed(4)} ${toUnitName}</strong>
                </span>
                <span class="history-time">
                    ${this.formatTimestamp(item.timestamp)}
                </span>
            `;
            
            // Thêm hiệu ứng fade-in cho mục mới nhất
            if (index === 0) {
                listItem.className = 'fade-in';
            }
            
            // Thêm các sự kiện
            listItem.addEventListener('click', () => {
                // Thiết lập lại trạng thái chuyển đổi khi click vào mục lịch sử
                this.setCurrentCategory(item.category);
                
                this.elements.sourceValue.value = item.fromValue;
                this.elements.sourceUnit.value = item.fromUnit;
                this.elements.targetUnit.value = item.toUnit;
                
                // Cập nhật lại kết quả
                this.updateConversion();
                
                // Hiệu ứng cho mục được chọn
                listItem.classList.add('pulse');
                setTimeout(() => {
                    listItem.classList.remove('pulse');
                }, 1000);
            });
            
            this.elements.historyList.appendChild(listItem);
        });

        // Thêm CSS cho biểu tượng danh mục trong lịch sử
        const style = document.getElementById('history-icon-styles');
        if (!style) {
            const styleElement = document.createElement('style');
            styleElement.id = 'history-icon-styles';
            styleElement.textContent = `
                .history-icon {
                    color: var(--primary-color);
                    margin-right: 8px;
                    font-size: 0.9rem;
                    opacity: 0.8;
                }
                
                .history-list li {
                    cursor: pointer;
                }
                
                .history-list li:hover .history-icon {
                    transform: scale(1.2);
                    opacity: 1;
                }
            `;
            document.head.appendChild(styleElement);
        }
    },

    /**
     * Định dạng timestamp thành văn bản thời gian tương đối
     * @param {number} timestamp Unix timestamp
     * @returns {string} Chuỗi thời gian tương đối
     */
    formatTimestamp: function(timestamp) {
        const now = new Date().getTime();
        const diff = now - timestamp;
        
        if (diff < 60000) { // Dưới 1 phút
            return 'Vừa xong';
        } else if (diff < 3600000) { // Dưới 1 giờ
            const minutes = Math.floor(diff / 60000);
            return `${minutes} phút trước`;
        } else if (diff < 86400000) { // Dưới 1 ngày
            const hours = Math.floor(diff / 3600000);
            return `${hours} giờ trước`;
        } else {
            const date = new Date(timestamp);
            return date.toLocaleDateString();
        }
    },

    /**
     * Xóa toàn bộ lịch sử chuyển đổi
     */
    clearHistory: function() {
        if (this.state.historyItems.length === 0) return;
        
        // Hiệu ứng fade out cho các mục lịch sử
        const historyItems = this.elements.historyList.querySelectorAll('li');
        historyItems.forEach((item, index) => {
            // Xóa dần dần từng mục với thời gian trễ khác nhau
            setTimeout(() => {
                item.classList.add('animate__animated', 'animate__fadeOut');
            }, index * 100);
        });
        
        // Xóa thực sự sau khi animation kết thúc
        setTimeout(() => {
            this.state.historyItems = [];
            this.updateHistoryList();
            this.saveState();
            
            // Hiệu ứng cho nút
            this.elements.clearHistoryButton.classList.add('bounce');
            setTimeout(() => {
                this.elements.clearHistoryButton.classList.remove('bounce');
            }, 750);
        }, historyItems.length * 100 + 300);
    },

    /**
     * Mở modal premium
     */
    openModal: function() {
        this.elements.premiumModal.style.display = 'flex';
        // Sử dụng class CSS thay vì trực tiếp trong JS
        setTimeout(() => {
            document.querySelector('.modal-content').classList.add('active');
        }, 10);

        // Thêm hiệu ứng cho các mục trong modal
        const features = document.querySelectorAll('.premium-features li');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.classList.add('animate__animated', 'animate__fadeInLeft');
            }, 200 + index * 150);
        });

        // Hiệu ứng nút premium
        setTimeout(() => {
            document.querySelector('.premium-button').classList.add('bounce');
        }, 200 + features.length * 150);
    },

    /**
     * Đóng modal premium
     */
    closeModal: function() {
        document.querySelector('.modal-content').classList.remove('active');
        setTimeout(() => {
            this.elements.premiumModal.style.display = 'none';
            
            // Reset các animation
            const features = document.querySelectorAll('.premium-features li');
            features.forEach(feature => {
                feature.classList.remove('animate__animated', 'animate__fadeInLeft');
            });
            
            document.querySelector('.premium-button').classList.remove('bounce');
        }, 300);
    },

    /**
     * Lưu trạng thái vào localStorage
     */
    saveState: function() {
        const stateToSave = {
            isPremiumUser: this.state.isPremiumUser,
            isDarkMode: this.state.isDarkMode,
            historyItems: this.state.historyItems
        };
        
        localStorage.setItem('unitConverterState', JSON.stringify(stateToSave));
    },

    /**
     * Tải trạng thái từ localStorage
     */
    loadState: function() {
        const savedState = localStorage.getItem('unitConverterState');
        
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            this.state.isPremiumUser = parsedState.isPremiumUser || false;
            this.state.isDarkMode = parsedState.isDarkMode || false;
            this.state.historyItems = parsedState.historyItems || [];
        }

        // Cho mục đích demo, tạm thời enable premium
        // Xóa dòng này nếu muốn người dùng phải nâng cấp thực sự
        // this.state.isPremiumUser = true;
    },

    /**
     * Tạo hiệu ứng cho tiêu đề
     */
    animateTitle: function() {
        const icon = document.querySelector('.app-header h1 i');
        
        // Thêm hiệu ứng cho biểu tượng trong tiêu đề
        setInterval(() => {
            icon.classList.add('animate__flip');
            
            setTimeout(() => {
                icon.classList.remove('animate__flip');
            }, 1000);
        }, 5000);
        
        // Thêm hiệu ứng hover cho tiêu đề
        const title = document.querySelector('.app-header h1');
        
        title.addEventListener('mouseenter', () => {
            icon.classList.add('animate__animated', 'animate__rubberBand');
        });
        
        title.addEventListener('mouseleave', () => {
            setTimeout(() => {
                icon.classList.remove('animate__animated', 'animate__rubberBand');
            }, 1000);
        });
    },

    /**
     * Tạo hiệu ứng cho nút khi được nhấp
     * @param {HTMLElement} button Nút cần animation
     */
    animateButton: function(button) {
        button.classList.add('bounce');
        setTimeout(() => {
            button.classList.remove('bounce');
        }, 750);
    }
};

// Gán vào window
window.UI = UI;

// Hiệu ứng ripple cho các nút
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .category-selector button, 
        .action-button,
        .clear-history-button,
        .premium-button,
        .swap-button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    const buttons = document.querySelectorAll('.category-selector button, .action-button, .clear-history-button, .premium-button, .swap-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});