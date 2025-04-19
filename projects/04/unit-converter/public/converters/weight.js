/**
 * Weight Converter Module
 * Handles conversions between different weight units
 */

const weightConverter = {
    units: [
        { id: 'mg', name: 'Milligram (mg)' },
        { id: 'g', name: 'Gram (g)' },
        { id: 'kg', name: 'Kilogram (kg)' },
        { id: 'oz', name: 'Ounce (oz)' },
        { id: 'lb', name: 'Pound (lb)' },
        { id: 't', name: 'Metric Ton (t)' },
        { id: 'st', name: 'Stone (st)' },
    ],

    // Conversion to base unit (grams)
    toBase: function(value, unit) {
        switch(unit) {
            case 'mg': return value * 0.001;
            case 'g': return value;
            case 'kg': return value * 1000;
            case 'oz': return value * 28.3495;
            case 'lb': return value * 453.592;
            case 't': return value * 1000000;
            case 'st': return value * 6350.29;
            default: return value;
        }
    },

    // Conversion from base unit (grams) to target unit
    fromBase: function(value, unit) {
        switch(unit) {
            case 'mg': return value / 0.001;
            case 'g': return value;
            case 'kg': return value / 1000;
            case 'oz': return value / 28.3495;
            case 'lb': return value / 453.592;
            case 't': return value / 1000000;
            case 'st': return value / 6350.29;
            default: return value;
        }
    },

    // Convert from one unit to another
    convert: function(value, fromUnit, toUnit) {
        if (isNaN(value)) return '0';
        
        const baseValue = this.toBase(parseFloat(value), fromUnit);
        const result = this.fromBase(baseValue, toUnit);
        
        return this.formatResult(result);
    },
    
    // Format result to appropriate decimal places
    formatResult: function(value) {
        // Small numbers: show more decimal places
        if (Math.abs(value) < 0.01) return value.toFixed(6);
        // Medium numbers: show moderate decimal places
        else if (Math.abs(value) < 1) return value.toFixed(4);
        // Large integers: show no decimal places
        else if (Math.abs(value) >= 1000 && Number.isInteger(value)) return value.toFixed(0);
        // Default: show 2 decimal places
        else return value.toFixed(2);
    }
};