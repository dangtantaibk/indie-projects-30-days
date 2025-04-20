// Xác nhận module đã được tải
console.log('temperatureConverter module loaded');

/**
 * Module chuyển đổi đơn vị nhiệt độ
 */
const temperatureConverter = {
    /**
     * Danh sách đơn vị nhiệt độ
     * Vì các đơn vị nhiệt độ có công thức chuyển đổi khác nhau,
     * nên chúng ta không sử dụng hệ số (factor) như các đơn vị khác
     */
    units: {
        c: { name: 'Celsius (°C)', premium: false },
        f: { name: 'Fahrenheit (°F)', premium: false },
        k: { name: 'Kelvin (K)', premium: false },
        r: { name: 'Rankine (°R)', premium: true },
        n: { name: 'Newton (°N)', premium: true },
        re: { name: 'Réaumur (°Ré)', premium: true },
        ro: { name: 'Rømer (°Rø)', premium: true },
        de: { name: 'Delisle (°De)', premium: true }
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
        
        // Nếu đơn vị nguồn và đích giống nhau, không cần chuyển đổi
        if (fromUnit === toUnit) {
            return value;
        }
        
        // Chuyển đổi từ đơn vị nguồn sang Celsius (đơn vị trung gian)
        let celsius;
        switch (fromUnit) {
            case 'c':
                celsius = value;
                break;
            case 'f':
                celsius = (value - 32) * 5/9;
                break;
            case 'k':
                celsius = value - 273.15;
                break;
            case 'r':
                celsius = (value - 491.67) * 5/9;
                break;
            case 'n':
                celsius = value * 100/33;
                break;
            case 're':
                celsius = value * 5/4;
                break;
            case 'ro':
                celsius = (value - 7.5) * 40/21;
                break;
            case 'de':
                celsius = 100 - value * 2/3;
                break;
            default:
                return null;
        }
        
        // Chuyển đổi từ Celsius sang đơn vị đích
        switch (toUnit) {
            case 'c':
                return celsius;
            case 'f':
                return celsius * 9/5 + 32;
            case 'k':
                return celsius + 273.15;
            case 'r':
                return (celsius + 273.15) * 9/5;
            case 'n':
                return celsius * 33/100;
            case 're':
                return celsius * 4/5;
            case 'ro':
                return celsius * 21/40 + 7.5;
            case 'de':
                return (100 - celsius) * 3/2;
            default:
                return null;
        }
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
        
        // Lấy tên đơn vị
        const getShortName = (unitCode) => {
            const match = this.units[unitCode].name.match(/\(([^)]+)\)/);
            return match ? match[1] : unitCode.toUpperCase();
        };
        
        const fromName = getShortName(fromUnit);
        const toName = getShortName(toUnit);
        
        // Định nghĩa các công thức chuyển đổi phổ biến
        const formulas = {
            'c-f': `${toName} = ${fromName} × 9/5 + 32`,
            'f-c': `${toName} = (${fromName} - 32) × 5/9`,
            'c-k': `${toName} = ${fromName} + 273.15`,
            'k-c': `${toName} = ${fromName} - 273.15`,
            'f-k': `${toName} = (${fromName} - 32) × 5/9 + 273.15`,
            'k-f': `${toName} = (${fromName} - 273.15) × 9/5 + 32`,
            // Thêm các công thức đặc biệt cho các đơn vị premium
            'c-r': `${toName} = (${fromName} + 273.15) × 9/5`,
            'r-c': `${toName} = (${fromName} - 491.67) × 5/9`,
            'c-n': `${toName} = ${fromName} × 33/100`,
            'n-c': `${toName} = ${fromName} × 100/33`,
            'c-re': `${toName} = ${fromName} × 4/5`,
            're-c': `${toName} = ${fromName} × 5/4`,
            'c-ro': `${toName} = ${fromName} × 21/40 + 7.5`,
            'ro-c': `${toName} = (${fromName} - 7.5) × 40/21`,
            'c-de': `${toName} = (100 - ${fromName}) × 3/2`,
            'de-c': `${toName} = 100 - ${fromName} × 2/3`
        };
        
        // Trả về công thức tương ứng nếu có
        const formulaKey = `${fromUnit}-${toUnit}`;
        return formulas[formulaKey] || `Chuyển đổi từ ${fromName} sang ${toName}`;
    }
};

// Gán vào window
window.temperatureConverter = temperatureConverter;

// Nếu chạy trong Node.js, export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = temperatureConverter;
}