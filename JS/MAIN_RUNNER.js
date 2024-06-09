var diff = performance.now()
// mutable dataset, everything is dumped here usually
var PLR_data = {
    POINTS_ARRAY: {
        POINTS: {
            CURRENT: {
                'I': new Decimal(5),
                'II': new Decimal(0),
                'III': new Decimal(0),
                'IV': new Decimal(0),
                'V': new Decimal(0),
                'VI': new Decimal(0),
                'VII': new Decimal(0),
            },

            BEST: {
                'I': new Decimal(5),
                'II': new Decimal(0),
                'III': new Decimal(0),
                'IV': new Decimal(0),
                'V': new Decimal(0),
                'VI': new Decimal(0),
                'VII': new Decimal(0),
            },

            TOTAL: {
                'I': new Decimal(5),
                'II': new Decimal(0),
                'III': new Decimal(0),
                'IV': new Decimal(0),
                'V': new Decimal(0),
                'VI': new Decimal(0),
                'VII': new Decimal(0),
            }
        },

        PER_CLICK: {
            'I': new Decimal(0),
            'II': new Decimal(0),
            'III': new Decimal(0),
            'IV': new Decimal(0),
            'V': new Decimal(0),
            'VI': new Decimal(0),
            'VII': new Decimal(0),
        },

        PER_SECOND: {
            'I': new Decimal(0),
            'II': new Decimal(0),
            'III': new Decimal(0),
            'IV': new Decimal(0),
            'V': new Decimal(0),
            'VI': new Decimal(0),
            'VII': new Decimal(0),
        },
    },

    PRE_PRESTIGE_UPG_DATA: {
        'PRE-P-UPG-001': {
            NAME: 'Successor Mark I',
            DESCRIPTION: 'Increase reward of every succession by +',

            CURRENT_LEVEL: new Decimal(0),
            MAX_LEVEL: new Decimal(5),

            BASE_COST: new Decimal(5),
            COST_SCALE: new Decimal(10),
            COST_TYPE: '+',

            BASE_EFFECT: new Decimal(0),
            EFFECT_SCALE: new Decimal(1),
            EFFECT_TYPE: '+',

            UNLOCKED: true
        },
        'PRE-P-UPG-002': {
            NAME: 'Virtual Node Miner Mark I',
            DESCRIPTION: 'Automatically generate ',

            CURRENT_LEVEL: new Decimal(0),
            MAX_LEVEL: new Decimal(20),

            BASE_COST: new Decimal(25),
            COST_SCALE: new Decimal(30),
            COST_TYPE: '+',

            BASE_EFFECT: new Decimal(0),
            EFFECT_SCALE: new Decimal(3),
            EFFECT_TYPE: '+',

            UNLOCKED: true
        }
    }
}

function GAIN_CURRENCY(NTH, deltaTime) {
    const x = PLR_data
    const xx = PLR_data.PRE_PRESTIGE_UPG_DATA
    let AUTO_GEN_AM = new Decimal(0)

    AUTO_GEN_AM = AUTO_GEN_AM.add(xx['PRE-P-UPG-002'].BASE_EFFECT)
    PLR_data.POINTS_ARRAY.POINTS.CURRENT[NTH] = PLR_data.POINTS_ARRAY.POINTS.CURRENT[NTH]
    .add((AUTO_GEN_AM).mul(deltaTime))

    x.POINTS_ARRAY.PER_SECOND[NTH] = AUTO_GEN_AM
}

function MANUAL_GAIN_CURRENCY(NTH) {
    const x = PLR_data
    const xx = PLR_data.PRE_PRESTIGE_UPG_DATA
    let CLICK_AM = new Decimal(0)
    CLICK_AM = CLICK_AM.add(xx['PRE-P-UPG-001'].BASE_EFFECT)
    x.POINTS_ARRAY.POINTS.CURRENT[NTH] = x.POINTS_ARRAY.POINTS.CURRENT[NTH].add(CLICK_AM)
    
    
    x.POINTS_ARRAY.POINTS.BEST[NTH] = x.POINTS_ARRAY.POINTS.BEST[NTH].clampMin(x.POINTS_ARRAY.POINTS.CURRENT[NTH])

    x.POINTS_ARRAY.POINTS.TOTAL[NTH] = x.POINTS_ARRAY.POINTS.TOTAL[NTH].add(CLICK_AM)
}

function CALLER() {
    var time = performance.now()
    var deltaTime = (time - diff) / 1000
    diff = time

    GAIN_CURRENCY('I', deltaTime)
    DO_STORY_CHECKING()
    UPDATE_UI()
}
  
setInterval(CALLER, 125);
  


/*
let POT_LEVEL_SKIP_AM = new Decimal(PLR_data.XP.div(ACT_XP_REQ)).floor()
    if (PLR_data.XP.gte(PLR_data.XP_REQ)) {
        LEVEL_UP(1)
    if (POT_LEVEL_SKIP_AM.gte(THRESHOLD) ? PLR_data.LEVEL = PLR_data.LEVEL.add(Decimal.clampMax(POT_LEVEL_SKIP_AM, MAX_LEVEL_SKIP)) : PLR_data.LEVEL = PLR_data.LEVEL.add(1))

*/