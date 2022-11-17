
const defaultConfig = Object.freeze({
    'M': 0,
    'L': -90,
    'R': 90
});

export class DegreeCommandService {
    private static instance = new DegreeCommandService();

    static getInstance(): DegreeCommandService {
        return DegreeCommandService.instance;
    }
    private constructor(){
    }
    
    getConfig() {
        return defaultConfig;
    }

}

