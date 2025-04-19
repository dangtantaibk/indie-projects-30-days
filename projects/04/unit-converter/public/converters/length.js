/**
 * Length Converter Module
 * Handles conversions between different length units
 */

const lengthConverter = {
    units: [
        { id: 'mm', name: 'Millimeter (mm)' },
        { id: 'cm', name: 'Centimeter (cm)' },
        { id: 'm', name: 'Meter (m)' },
        { id: 'km', name: 'Kilometer (km)' },
        { id: 'in', name: 'Inch (in)' },
        { id: 'ft', name: 'Foot (ft)' },
        { id: 'yd', name: 'Yard (yd)' },
        { id: 'mi', name: 'Mile (mi)' }
    ],

    // Conversion to base unit (meters)
    toBase: function(value, unit) {
        switch(unit) {
            case 'mm': return value * 0.001;
            case 'cm': return value * 0.01;
            case 'm': return value;
            case 'km': return value * 1000;
            case 'in': return value * 0.0254;
            case 'ft': return value * 0.3048;
            case 'yd': return value * 0.9144;
            case 'mi': return value * 1609.344;
            default: return value;
        }
    },

    // Conversion from base unit (meters) to target unit
    fromBase: function(value, unit) {
        switch(unit) {
            case 'mm': return value / 0.001;
            case 'cm': return value / 0.01;
            case 'm': return value;
            case 'km': return value / 1000;
            case 'in': return value / 0.0254;
            case 'ft': return value / 0.3048;
            case 'yd': return value / 0.9144;
            case 'mi': return value / 1609.344;
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