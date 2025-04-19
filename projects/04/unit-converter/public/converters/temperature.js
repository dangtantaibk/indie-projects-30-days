/**
 * Temperature Converter Module
 * Handles conversions between different temperature units
 */

const temperatureConverter = {
    units: [
        { id: 'c', name: 'Celsius (°C)' },
        { id: 'f', name: 'Fahrenheit (°F)' },
        { id: 'k', name: 'Kelvin (K)' },
    ],

    // Temperature conversions are special and don't use a simple base unit system
    // Each conversion needs to be implemented specifically
    convert: function(value, fromUnit, toUnit) {
        if (isNaN(value)) return '0';
        
        value = parseFloat(value);
        
        // Same unit, no conversion needed
        if (fromUnit === toUnit) {
            return this.formatResult(value);
        }
        
        let result;
        
        // Convert from source to target
        switch(fromUnit) {
            case 'c':
                if (toUnit === 'f') {
                    result = (value * 9/5) + 32;
                } else if (toUnit === 'k') {
                    result = value + 273.15;
                }
                break;
            case 'f':
                if (toUnit === 'c') {
                    result = (value - 32) * 5/9;
                } else if (toUnit === 'k') {
                    result = (value - 32) * 5/9 + 273.15;
                }
                break;
            case 'k':
                if (toUnit === 'c') {
                    result = value - 273.15;
                } else if (toUnit === 'f') {
                    result = (value - 273.15) * 9/5 + 32;
                }
                break;
            default:
                result = value;
        }
        
        return this.formatResult(result);
    },
    
    // Format result to appropriate decimal places
    formatResult: function(value) {
        // For temperature, generally 2 decimal places is sufficient
        return value.toFixed(2);
    }
};