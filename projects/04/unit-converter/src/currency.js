// Xác nhận module đã được tải
console.log('currencyConverter module loaded');

// filepath: /Users/taidang/Documents/indie-projects-30-days/projects/04/unit-converter/src/converters/currency.js
/**
 * Module chuyển đổi tiền tệ
 */
const currencyConverter = {
    /**
     * Danh sách đơn vị tiền tệ và tỷ giá quy đổi với USD
     * (Tỷ giá ví dụ, trong thực tế cần cập nhật từ API)
     */
    units: {
        // Tiền tệ phổ biến
        usd: { name: 'USD (US Dollar)', factor: 1, symbol: '$', premium: false },
        eur: { name: 'EUR (Euro)', factor: 1.09, symbol: '€', premium: false },
        gbp: { name: 'GBP (British Pound)', factor: 1.28, symbol: '£', premium: false },
        jpy: { name: 'JPY (Japanese Yen)', factor: 0.0068, symbol: '¥', premium: false },
        cny: { name: 'CNY (Chinese Yuan)', factor: 0.14, symbol: '¥', premium: false },
        vnd: { name: 'VND (Vietnamese Dong)', factor: 0.000041, symbol: '₫', premium: false },
        
        // Tiền tệ khác (Premium)
        aud: { name: 'AUD (Australian Dollar)', factor: 0.66, symbol: 'A$', premium: true },
        cad: { name: 'CAD (Canadian Dollar)', factor: 0.73, symbol: 'C$', premium: true },
        chf: { name: 'CHF (Swiss Franc)', factor: 1.13, symbol: 'Fr', premium: true },
        sgd: { name: 'SGD (Singapore Dollar)', factor: 0.74, symbol: 'S$', premium: true },
        krw: { name: 'KRW (South Korean Won)', factor: 0.00074, symbol: '₩', premium: true },
        inr: { name: 'INR (Indian Rupee)', factor: 0.012, symbol: '₹', premium: true },
        thb: { name: 'THB (Thai Baht)', factor: 0.028, symbol: '฿', premium: true },
    },
    
    /**
     * Lấy danh sách các đơn vị có sẵn
     * @param {boolean} isPremium Người dùng có phải là premium không
     * @returns {Object} Danh sách đơn vị
     */
    getAvailableUnits: function(isPremium = false) {
        if (isPremium) {
            return this.units;
        }
        
        // Chỉ trả về các đơn vị không phải premium
        return Object.entries(this.units)
            .filter(([code, unit]) => !unit.premium)
            .reduce((acc, [code, unit]) => {
                acc[code] = unit;
                return acc;
            }, {});
    },
    
    /**
     * Chuyển đổi giá trị từ đơn vị nguồn sang đơn vị đích
     * @param {number} value Giá trị cần chuyển đổi
     * @param {string} fromUnit Mã đơn vị nguồn
     * @param {string} toUnit Mã đơn vị đích
     * @returns {number|null} Giá trị sau khi chuyển đổi hoặc null nếu không thể chuyển đổi
     */
    convert: function(value, fromUnit, toUnit) {
        // Kiểm tra xem các đơn vị có tồn tại không
        if (!this.units[fromUnit] || !this.units[toUnit]) {
            return null;
        }
        
        // Chuyển đổi từ đơn vị nguồn sang USD (đơn vị trung gian)
        const usd = value * this.units[fromUnit].factor;
        
        // Chuyển đổi từ USD sang đơn vị đích
        return usd / this.units[toUnit].factor;
    },
    
    /**
     * Định dạng số tiền theo đơn vị tiền tệ
     * @param {number} value Giá trị cần định dạng
     * @param {string} unit Mã đơn vị tiền tệ
     * @returns {string} Chuỗi biểu diễn số tiền
     */
    formatCurrency: function(value, unit) {
        if (!this.units[unit]) {
            return value.toString();
        }
        
        const symbol = this.units[unit].symbol;
        const currencyCode = unit.toUpperCase();
        
        // Sử dụng Intl.NumberFormat để định dạng tiền tệ nếu trình duyệt hỗ trợ
        if (typeof Intl !== 'undefined') {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: currencyCode,
                currencyDisplay: 'symbol',
                minimumFractionDigits: 2,
                maximumFractionDigits: 4
            }).format(value);
        }
        
        // Nếu trình duyệt không hỗ trợ Intl, sử dụng cách định dạng đơn giản
        const formattedValue = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return `${symbol}${formattedValue}`;
    },
    
    /**
     * Lấy công thức chuyển đổi
     * @param {string} fromUnit Mã đơn vị nguồn
     * @param {string} toUnit Mã đơn vị đích
     * @returns {string} Công thức chuyển đổi
     */
    getFormula: function(fromUnit, toUnit) {
        if (!this.units[fromUnit] || !this.units[toUnit]) {
            return 'Không có công thức';
        }
        
        if (fromUnit === toUnit) {
            return 'Không cần chuyển đổi, giá trị giữ nguyên';
        }
        
        const fromName = fromUnit.toUpperCase();
        const toName = toUnit.toUpperCase();
        const fromFactor = this.units[fromUnit].factor;
        const toFactor = this.units[toUnit].factor;
        
        // Công thức chi tiết hơn cho đổi tiền tệ
        const rate = fromFactor / toFactor;
        const rateFormatted = rate.toFixed(4);
        
        return `${fromName} → ${toName} (Tỷ giá: 1 ${fromName} = ${rateFormatted} ${toName})`;
    },
    
    /**
     * Phương thức cập nhật tỷ giá từ API (giả định)
     * Trong thực tế, sẽ gọi API từ các dịch vụ như exchangeratesapi.io, openexchangerates.org, v.v.
     */
    updateRates: function() {
        // Giả định cập nhật từ API trong môi trường thực tế
        console.log('Đang cập nhật tỷ giá...');
        
        // Trong thực tế, có thể sử dụng API như:
        // fetch('https://api.exchangeratesapi.io/latest?base=USD')
        //     .then(response => response.json())
        //     .then(data => {
        //         for (const [currency, rate] of Object.entries(data.rates)) {
        //             if (this.units[currency.toLowerCase()]) {
        //                 this.units[currency.toLowerCase()].factor = rate;
        //             }
        //         }
        //         console.log('Tỷ giá đã được cập nhật');
        //     })
        //     .catch(error => console.error('Lỗi khi cập nhật tỷ giá:', error));
        
        // Giả định đã cập nhật xong sau 1 giây
        setTimeout(() => {
            console.log('Tỷ giá đã được cập nhật');
        }, 1000);
    }
};

// Gán vào window
window.currencyConverter = currencyConverter;

// Nếu chạy trong Node.js, export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = currencyConverter;
}