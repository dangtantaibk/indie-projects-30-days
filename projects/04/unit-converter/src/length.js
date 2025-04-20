// Xác nhận module đã được tải
console.log('lengthConverter module loaded');

/**
 * Module chuyển đổi đơn vị chiều dài
 */
const lengthConverter = {
    /**
     * Danh sách đơn vị chiều dài và tỷ lệ chuyển đổi tương ứng với mét (m)
     */
    units: {
        // Đơn vị cơ bản
        m: { name: 'Mét (m)', factor: 1, premium: false },
        km: { name: 'Kilômét (km)', factor: 1000, premium: false },
        cm: { name: 'Centimét (cm)', factor: 0.01, premium: false },
        mm: { name: 'Milimét (mm)', factor: 0.001, premium: false },
        
        // Hệ đo lường Anh-Mỹ
        in: { name: 'Inch', factor: 0.0254, premium: false },
        ft: { name: 'Feet', factor: 0.3048, premium: false },
        yd: { name: 'Yard', factor: 0.9144, premium: false },
        mi: { name: 'Dặm (mi)', factor: 1609.344, premium: false },
        
        // Các đơn vị khác
        nm: { name: 'Nanomét (nm)', factor: 1e-9, premium: true },
        um: { name: 'Micrômét (μm)', factor: 1e-6, premium: true },
        dm: { name: 'Decimét (dm)', factor: 0.1, premium: true },
        hm: { name: 'Hectômét (hm)', factor: 100, premium: true },
        nmi: { name: 'Hải lý', factor: 1852, premium: true },
        ly: { name: 'Năm ánh sáng', factor: 9.461e+15, premium: true },
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
        
        // Chuyển đổi từ đơn vị nguồn sang đơn vị cơ bản (mét)
        const baseValue = value * this.units[fromUnit].factor;
        
        // Chuyển đổi từ đơn vị cơ bản sang đơn vị đích
        return baseValue / this.units[toUnit].factor;
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
        
        const fromName = this.units[fromUnit].name.split(' ')[0];
        const toName = this.units[toUnit].name.split(' ')[0];
        
        if (fromUnit === toUnit) {
            return `Không cần chuyển đổi, giá trị giữ nguyên`;
        }
        
        // Xây dựng công thức tùy thuộc vào các đơn vị
        if (fromUnit === 'm') {
            return `${fromName} × ${this.units[toUnit].factor === 1 ? 1 : 1 / this.units[toUnit].factor} = ${toName}`;
        } else if (toUnit === 'm') {
            return `${fromName} × ${this.units[fromUnit].factor} = ${toName}`;
        } else {
            // Chuyển đổi thông qua đơn vị cơ bản
            return `${fromName} × ${this.units[fromUnit].factor} ÷ ${this.units[toUnit].factor} = ${toName}`;
        }
    }
};

// Gán vào window
window.lengthConverter = lengthConverter;

// Nếu chạy trong Node.js, export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = lengthConverter;
}