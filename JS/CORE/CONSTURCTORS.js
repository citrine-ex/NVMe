/*function UPG_CALLER_CONSTRUCTOR(ID) {
    const info = PLR_data.UPGRADE_DATA[ID];
    const { TITLE, DESC, LEVEL, MAX_LEVEL, COST, COST_SCALE, COST_TYPE, THING_COST, EFFECT, EFFECT_SCALE, EFFECT_TYPE = () => {} } = info

    let TMP_EFFECT

    if (EFFECT_TYPE == 'add') {
        TMP_EFFECT = new Decimal(EFFECT).add(EFFECT_SCALE, LEVEL)
        PLR_data.UPGRADE_DATA[ID].EFFECT = TMP_EFFECT
    }  
}

function BUY_UPG(ID) {
    const info = PLR_data.UPGRADE_DATA[ID]
    const { LEVEL, MAX_LEVEL, COST, COST_SCALE, COST_TYPE, EFFECT, EFFECT_SCALE, EFFECT_TYPE = () => {} } = info

    let TMP_COST
    

    if (COST_TYPE == 'add') {
        TMP_COST = new Decimal(COST.add(COST_SCALE, LEVEL)).ceil()
        if (PLR_data.LEVEL.gte(COST) && LEVEL.lte(MAX_LEVEL)) {
            PLR_data.XP = new Decimal(0)
            PLR_data.LEVEL = PLR_data.LEVEL.sub(COST)
            
            PLR_data.UPGRADE_DATA[ID].LEVEL = PLR_data.UPGRADE_DATA[ID].LEVEL.add(1)

            PLR_data.UPGRADE_DATA[ID].COST = TMP_COST
            UPG_CALLER_CONSTRUCTOR(ID)
        } else {
            console.warn('not enough')
        }
    }
    else if (COST_TYPE == 'mul') {
        TMP_COST = new Decimal(COST).add(Decimal.mul(COST_SCALE, LEVEL.add(1)))
        if (PLR_data.LEVEL.gte(COST) && LEVEL.lte(MAX_LEVEL)) {
            PLR_data.XP = new Decimal(0)
            PLR_data.LEVEL = PLR_data.LEVEL.sub(COST)

            PLR_data.UPGRADE_DATA[ID].LEVEL = PLR_data.UPGRADE_DATA[ID].LEVEL.add(1)

            PLR_data.UPGRADE_DATA[ID].COST = TMP_COST
            UPG_CALLER_CONSTRUCTOR(ID)
        } else {
            console.warn('not enough')
        }
    }
    else if (COST_TYPE == 'pow') {
        TMP_COST = new Decimal(COST).mul(Decimal.pow(COST_SCALE, LEVEL.add(1)))
        if (PLR_data.LEVEL.gte(COST) && LEVEL.lte(MAX_LEVEL)) {
            PLR_data.XP = new Decimal(0)
            PLR_data.LEVEL = PLR_data.LEVEL.sub(COST)

            PLR_data.UPGRADE_DATA[ID].LEVEL = PLR_data.UPGRADE_DATA[ID].LEVEL.add(1)

            PLR_data.UPGRADE_DATA[ID].COST = TMP_COST
            UPG_CALLER_CONSTRUCTOR(ID)
        } else {
            console.warn('not enough')
        }
    } else { console.warn('no scale found') }
}

function DO_UPG_UI_UPD(ID) {
    const info = PLR_data.UPGRADE_DATA[ID];
    const { TITLE, DESC, LEVEL, MAX_LEVEL, COST, COST_SCALE, COST_TYPE, THING_COST, EFFECT, EFFECT_SCALE, EFFECT_TYPE = () => {} } = info

    document.getElementById(`${ID}-T`).textContent = TITLE
    document.getElementById(`${ID}-L`).textContent = 'L'+ FORMATTER(LEVEL, 0) + " / " + FORMATTER(MAX_LEVEL, 0)
    document.getElementById(`${ID}-D`).textContent = DESC + FORMATTER(EFFECT_SCALE, 3)
    document.getElementById(`${ID}-E`).textContent = 'Total Effect = ' + FORMATTER(EFFECT, 3) + ' ' +`+ ( ${FORMATTER(EFFECT_SCALE, 3)} )`
    document.getElementById(`${ID}-C`).textContent = 'Costs ' + FORMATTER(COST, 3) + ' ' + THING_COST
}*/

function BUY_UPG(ID, NTH) {
    const info = PLR_data.PRE_PRESTIGE_UPG_DATA[ID]
    const { 
        NAME, 
        DESCRIPTION, 
        CURRENT_LEVEL, 
        MAX_LEVEL, 
        BASE_COST, 
        COST_SCALE, 
        COST_TYPE, 
        BASE_EFFECT, 
        EFFECT_SCALE, 
        EFFECT_TYPE,
        UNLOCKED = () => {} } = info

    const x = PLR_data
    let TMP_COST, TMP_EFFECT
    function CALC_EFFECT(EFFECT_TYPE) {
    switch (EFFECT_TYPE) {
        case '+':
        TMP_EFFECT = new Decimal(BASE_EFFECT).add(EFFECT_SCALE, CURRENT_LEVEL)
        info.BASE_EFFECT = TMP_EFFECT
        break;

        default:
        break;
    }}
    function CALC_COST(COST_TYPE) {
        switch (COST_TYPE) {
            case '+':
            TMP_COST = new Decimal(BASE_COST).add(COST_SCALE, CURRENT_LEVEL)
            info.BASE_COST = TMP_COST
            break;
    
            default:
            break;
    }}
    switch (COST_TYPE) {
        case '+':
        TMP_EFFECT = new Decimal(BASE_EFFECT).add(BASE_EFFECT, CURRENT_LEVEL)
        if (UNLOCKED == true) {
            if (x.POINTS_ARRAY.POINTS.CURRENT[NTH].gte(BASE_COST)) {
                if (info.CURRENT_LEVEL.lt(MAX_LEVEL)) {
                CALC_COST('+')
                info.CURRENT_LEVEL = info.CURRENT_LEVEL.add(1)
                x.POINTS_ARRAY.POINTS.CURRENT[NTH] = x.POINTS_ARRAY.POINTS.CURRENT[NTH].sub(BASE_COST)
                CALC_EFFECT('+')
                MANUAL_STYLE_UPDATE(ID, NTH)
                }         
            }
        } else console.warn('not unlocked')      
        break;

        default:
        break;
    }
}

function MANUAL_STYLE_UPDATE(ID, NTH) {
    const info = PLR_data.PRE_PRESTIGE_UPG_DATA[ID];
    const { NAME, DESCRIPTION, CURRENT_LEVEL, MAX_LEVEL, BASE_COST, COST_SCALE, COST_TYPE, BASE_EFFECT, EFFECT_SCALE, EFFECT_TYPE, UNLOCKED = () => {} } = info

    const x = PLR_data;
    document.getElementById(`${ID}`).classList.toggle('maxed', CURRENT_LEVEL.eq(MAX_LEVEL) && UNLOCKED == true);
    document.getElementById(`${ID}`).classList.toggle('default', !CURRENT_LEVEL.eq(MAX_LEVEL)
    && x.POINTS_ARRAY.POINTS.CURRENT[NTH].gte(BASE_COST) && UNLOCKED == true);
    document.getElementById(`${ID}`).classList.toggle('lacking', CURRENT_LEVEL.lt(MAX_LEVEL)
    && x.POINTS_ARRAY.POINTS.CURRENT[NTH].lt(BASE_COST) && UNLOCKED == true);
    document.getElementById(`${ID}`).classList.toggle('locked', UNLOCKED == false)

    // there was a idea to subtract 1/8th of 1 to BASE_COST when comparing to values to
    // create a illusion when using deltaTime or doing stuff manually
}

function UPDATE_UPG_INFO(ID, NTH, FULL_DISPLAY, LOCKED_DISPLAY, UNLOCK) {
    const info = PLR_data.PRE_PRESTIGE_UPG_DATA[ID];
    const { NAME, DESCRIPTION, CURRENT_LEVEL, MAX_LEVEL, BASE_COST, COST_SCALE, COST_TYPE, BASE_EFFECT, EFFECT_SCALE, EFFECT_TYPE = () => {} } = info;
  
    const x = PLR_data;
  
    MANUAL_STYLE_UPDATE(ID, NTH);
  
    if (typeof UNLOCK === 'function') {
      const CONDITIONAL_DISPLAY = UNLOCK();
      info.UNLOCKED = CONDITIONAL_DISPLAY;
  
      document.querySelector(`#${ID}-T`).innerHTML = CONDITIONAL_DISPLAY ? FULL_DISPLAY : LOCKED_DISPLAY;
      document.querySelector(`#${ID}-LC`).classList.toggle('hidden', UNLOCK);
      document.querySelector(`#${ID}-LTXT`).innerHTML = !CONDITIONAL_DISPLAY ? LOCKED_DISPLAY : '';
    } else {
      info.UNLOCKED = UNLOCK;
  
      document.querySelector(`#${ID}-T`).innerHTML = UNLOCK ? FULL_DISPLAY : LOCKED_DISPLAY;
      document.querySelector(`#${ID}-LC`).classList.toggle('hidden', UNLOCK);
      document.querySelector(`#${ID}-LTXT`).innerHTML = !UNLOCK ? LOCKED_DISPLAY : '';
    }
  }
  