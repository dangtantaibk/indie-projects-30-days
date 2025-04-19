/**
 * Currency Converter Module
 * Handles conversions between different currency units
 * Uses exchangerate-api.com for real-time exchange rates
 */

const currencyConverter = {
    units: [
        { id: 'usd', name: 'US Dollar (USD)' },
        { id: 'eur', name: 'Euro (EUR)' },
        { id: 'gbp', name: 'British Pound (GBP)' },
        { id: 'jpy', name: 'Japanese Yen (JPY)' },
        { id: 'cny', name: 'Chinese Yuan (CNY)' },
        { id: 'inr', name: 'Indian Rupee (INR)' },
        { id: 'cad', name: 'Canadian Dollar (CAD)' },
        { id: 'aud', name: 'Australian Dollar (AUD)' },
    ],
    
    // Exchange rates with USD as base
    rates: {
        usd: 1,
        eur: 0.92,
        gbp: 0.81,
        jpy: 110.25,
        cny: 6.95,
        inr: 75.5,
        cad: 1.35,
        aud: 1.45
    },
    
    lastUpdated: null,
    
    // Fetch latest exchange rates from the API
    fetchRates: async function() {
        try {
            // For a real application, you would use an API key
            // Here we're just using a sample endpoint
            const response = await fetch('https://api.exchangerate.host/latest?base=USD');
            const data = await response.json();
            
            if (data && data.rates) {
                // Update our rates
                this.rates = {
                    usd: 1, // Base currency
                    eur: data.rates.EUR || this.rates.eur,
                    gbp: data.rates.GBP || this.rates.gbp,
                    jpy: data.rates.JPY || this.rates.jpy,
                    cny: data.rates.CNY || this.rates.cny,
                    inr: data.rates.INR || this.rates.inr,
                    cad: data.rates.CAD || this.rates.cad,
                    aud: data.rates.AUD || this.rates.aud
                };
                
                this.lastUpdated = new Date();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            return false;
        }
    },
    
    // Convert from one currency to another
    convert: function(value, fromUnit, toUnit) {
        if (isNaN(value)) return '0';
        
        value = parseFloat(value);
        
        // First convert to USD (base currency)
        const valueInUSD = value / this.rates[fromUnit];
        
        // Then convert from USD to target currency
        const result = valueInUSD * this.rates[toUnit];
        
        return this.formatResult(result);
    },
    
    // Format result to appropriate decimal places
    formatResult: function(value) {
        // For currency, show 2 decimal places as standard
        return value.toFixed(2);
    },
    
    // Check if rates need updating (more than 1 hour old)
    shouldUpdateRates: function() {
        if (!this.lastUpdated) return true;
        const oneHour = 60 * 60 * 1000; // ms
        return (new Date() - this.lastUpdated) > oneHour;
    }
};