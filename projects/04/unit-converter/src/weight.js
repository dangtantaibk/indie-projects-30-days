// Xác nhận module đã được tải
console.log('weightConverter module loaded');

// filepath: /Users/taidang/Documents/indie-projects-30-days/projects/04/unit-converter/src/converters/weight.js
/**
 * Module chuyển đổi đơn vị khối lượng
 */
const weightConverter = {
    /**
     * Danh sách đơn vị khối lượng và tỷ lệ chuyển đổi tương ứng với kilogam (kg)
     */
    units: {
        // Đơn vị cơ bản
        kg: { name: 'Kilogam (kg)', factor: 1, premium: false },
        g: { name: 'Gam (g)', factor: 0.001, premium: false },
        mg: { name: 'Miligam (mg)', factor: 0.000001, premium: false },
        
        // Hệ đo lường Anh-Mỹ
        lb: { name: 'Pound (lb)', factor: 0.45359237, premium: false },
        oz: { name: 'Ounce (oz)', factor: 0.028349523125, premium: false },
        
        // Các đơn vị khác
        t: { name: 'Tấn', factor: 1000, premium: false },
        ct: { name: 'Carat', factor: 0.0002, premium: true },
        gr: { name: 'Grain', factor: 0.00006479891, premium: true },
        st: { name: 'Stone', factor: 6.35029318, premium: true },
        ton_us: { name: 'Tấn Mỹ', factor: 907.18474, premium: true },
        ton_uk: { name: 'Tấn Anh', factor: 1016.0469088, premium: true }
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
        
        // Chuyển đổi từ đơn vị nguồn sang đơn vị cơ bản (kg)
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
        if (fromUnit === 'kg') {
            return `${fromName} × ${this.units[toUnit].factor === 1 ? 1 : 1 / this.units[toUnit].factor} = ${toName}`;
        } else if (toUnit === 'kg') {
            return `${fromName} × ${this.units[fromUnit].factor} = ${toName}`;
        } else {
            // Chuyển đổi thông qua đơn vị cơ bản
            return `${fromName} × ${this.units[fromUnit].factor} ÷ ${this.units[toUnit].factor} = ${toName}`;
        }
    }
};

// Gán vào window
window.weightConverter = weightConverter;

// Nếu chạy trong Node.js, export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = weightConverter;
}