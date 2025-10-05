// Jest Unit Tests for Risk Scoring Function

const { calculateRiskScore } = require('../script.js');

describe('Risk Score Calculation', () => {
    
    // Helper to create test device
    const createDevice = (type, overrides = {}) => ({
        type: type || 'vehicle',
        online: true,
        ...overrides
    });
    
    test('should return low risk for safe conditions', () => {
        const device = {
            type: 'vehicle',
            city: 'İzmir',
            speed: 50,
            battery: 80,
            online: true
        };
        
        const result = calculateRiskScore(device, 0);
        
        expect(result.level).toBe('low');
        expect(result.score).toBeLessThan(25);
    });
    
    test('should return medium risk for moderate conditions', () => {
        const vehicle = {
            city: 'Bursa',
            speed: 75,
            battery: 45,
            online: true
        };
        
        const result = calculateRiskScore(vehicle, 1);
        
        expect(result.level).toBe('medium');
        expect(result.score).toBeGreaterThanOrEqual(25);
        expect(result.score).toBeLessThan(50);
    });
    
    test('should return high risk for dangerous conditions', () => {
        const vehicle = {
            city: 'Konya',
            speed: 95,
            battery: 35,
            online: true
        };
        
        const result = calculateRiskScore(vehicle, 2);
        
        expect(result.level).toBe('high');
        expect(result.score).toBeGreaterThanOrEqual(50);
        expect(result.score).toBeLessThan(75);
    });
    
    test('should return critical risk for extreme conditions', () => {
        const vehicle = {
            city: 'Erzurum',
            speed: 110,
            battery: 15,
            online: false
        };
        
        const result = calculateRiskScore(vehicle, 3);
        
        expect(result.level).toBe('critical');
        expect(result.score).toBeGreaterThanOrEqual(75);
        expect(result.score).toBeLessThanOrEqual(100);
    });
    
    test('should increase risk score with high weather risk', () => {
        const vehicleLowWeather = {
            city: 'İzmir',
            speed: 60,
            battery: 70,
            online: true
        };
        
        const vehicleHighWeather = {
            city: 'Erzurum',
            speed: 60,
            battery: 70,
            online: true
        };
        
        const lowWeatherScore = calculateRiskScore(vehicleLowWeather, 0);
        const highWeatherScore = calculateRiskScore(vehicleHighWeather, 0);
        
        expect(highWeatherScore.score).toBeGreaterThan(lowWeatherScore.score);
    });
    
    test('should increase risk score with high speed', () => {
        const lowSpeedVehicle = {
            city: 'Ankara',
            speed: 50,
            battery: 70,
            online: true
        };
        
        const highSpeedVehicle = {
            city: 'Ankara',
            speed: 110,
            battery: 70,
            online: true
        };
        
        const lowSpeedScore = calculateRiskScore(lowSpeedVehicle, 0);
        const highSpeedScore = calculateRiskScore(highSpeedVehicle, 0);
        
        expect(highSpeedScore.score).toBeGreaterThan(lowSpeedScore.score);
    });
    
    test('should increase risk score with low battery', () => {
        const highBatteryVehicle = {
            city: 'Ankara',
            speed: 60,
            battery: 85,
            online: true
        };
        
        const lowBatteryVehicle = {
            city: 'Ankara',
            speed: 60,
            battery: 15,
            online: true
        };
        
        const highBatteryScore = calculateRiskScore(highBatteryVehicle, 0);
        const lowBatteryScore = calculateRiskScore(lowBatteryVehicle, 0);
        
        expect(lowBatteryScore.score).toBeGreaterThan(highBatteryScore.score);
    });
    
    test('should increase risk score when vehicle is offline', () => {
        const onlineVehicle = {
            city: 'Ankara',
            speed: 60,
            battery: 70,
            online: true
        };
        
        const offlineVehicle = {
            city: 'Ankara',
            speed: 60,
            battery: 70,
            online: false
        };
        
        const onlineScore = calculateRiskScore(onlineVehicle, 0);
        const offlineScore = calculateRiskScore(offlineVehicle, 0);
        
        expect(offlineScore.score).toBeGreaterThan(onlineScore.score);
    });
    
    test('should increase risk score with threat count', () => {
        const vehicle = {
            city: 'Ankara',
            speed: 60,
            battery: 70,
            online: true
        };
        
        const noThreatsScore = calculateRiskScore(vehicle, 0);
        const withThreatsScore = calculateRiskScore(vehicle, 3);
        
        expect(withThreatsScore.score).toBeGreaterThan(noThreatsScore.score);
        expect(withThreatsScore.score - noThreatsScore.score).toBe(30);
    });
    
    test('should not exceed maximum score of 100', () => {
        const vehicle = {
            city: 'Erzurum',
            speed: 120,
            battery: 5,
            online: false
        };
        
        const result = calculateRiskScore(vehicle, 10);
        
        expect(result.score).toBeLessThanOrEqual(100);
    });
    
    test('should return consistent results for same input', () => {
        const vehicle = {
            city: 'İstanbul',
            speed: 70,
            battery: 60,
            online: true
        };
        
        const result1 = calculateRiskScore(vehicle, 1);
        const result2 = calculateRiskScore(vehicle, 1);
        
        expect(result1.score).toBe(result2.score);
        expect(result1.level).toBe(result2.level);
    });
    
    test('should handle unknown city gracefully', () => {
        const vehicle = {
            city: 'BilinmeyenŞehir',
            speed: 60,
            battery: 70,
            online: true
        };
        
        expect(() => {
            calculateRiskScore(vehicle, 0);
        }).not.toThrow();
        
        const result = calculateRiskScore(vehicle, 0);
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(result.score).toBeLessThanOrEqual(100);
    });
    
    test('should handle boundary conditions correctly', () => {
        // Test speed boundaries
        const vehicle1 = { city: 'Ankara', speed: 60, battery: 70, online: true };
        const vehicle2 = { city: 'Ankara', speed: 61, battery: 70, online: true };
        
        const score1 = calculateRiskScore(vehicle1, 0);
        const score2 = calculateRiskScore(vehicle2, 0);
        
        expect(score1.score).toBeGreaterThanOrEqual(0);
        expect(score2.score).toBeGreaterThanOrEqual(0);
        
        // Test battery boundaries
        const vehicle3 = { city: 'Ankara', speed: 60, battery: 20, online: true };
        const vehicle4 = { city: 'Ankara', speed: 60, battery: 19, online: true };
        
        const score3 = calculateRiskScore(vehicle3, 0);
        const score4 = calculateRiskScore(vehicle4, 0);
        
        expect(score4.score).toBeGreaterThan(score3.score);
    });
});
