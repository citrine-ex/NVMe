function DO_CURRENCY_FORMATTING(NTH) {
    return ` ★<sup>${NTH}</sup>`
}


function UPDATE_UI() {
    let xPPU = PLR_data.PRE_PRESTIGE_UPG_DATA
    POINT_TXT.textContent = FORMATTER(PLR_data.POINTS_ARRAY.POINTS.CURRENT['I'])
    POINT_PS_TXT.textContent = FORMATTER(PLR_data.POINTS_ARRAY.PER_SECOND['I'])

    UPDATE_UPG_INFO(
    'PRE-P-UPG-001', 'I',
    `${xPPU['PRE-P-UPG-001'].NAME} <br>
    LCRT${FORMATTER(xPPU['PRE-P-UPG-001'].CURRENT_LEVEL, 0)} / LMAX${FORMATTER(xPPU['PRE-P-UPG-001'].MAX_LEVEL, 0)} <br>
    ${xPPU['PRE-P-UPG-001'].DESCRIPTION + FORMATTER(xPPU['PRE-P-UPG-001'].EFFECT_SCALE, 3)} <br>
    Currently: ${FORMATTER(xPPU['PRE-P-UPG-001'].BASE_EFFECT, 3) + DO_CURRENCY_FORMATTING('0')} / click <br>
    Requires: ${FORMATTER(xPPU['PRE-P-UPG-001'].BASE_COST, 3) + DO_CURRENCY_FORMATTING('0')}`, ``, true)

     UPDATE_UPG_INFO(
    'PRE-P-UPG-002', 'I',
    `${xPPU['PRE-P-UPG-002'].NAME} <br>
    LCRT${FORMATTER(xPPU['PRE-P-UPG-002'].CURRENT_LEVEL, 0)} / LMAX${FORMATTER(xPPU['PRE-P-UPG-002'].MAX_LEVEL, 0)} <br>
    ${xPPU['PRE-P-UPG-002'].DESCRIPTION + FORMATTER(xPPU['PRE-P-UPG-002'].EFFECT_SCALE, 3) + DO_CURRENCY_FORMATTING('0')} in second <br>
    Currently: ${FORMATTER(xPPU['PRE-P-UPG-002'].BASE_EFFECT, 3) + DO_CURRENCY_FORMATTING('0')} / per second <br>
    Requires: ${FORMATTER(xPPU['PRE-P-UPG-002'].BASE_COST, 3) + DO_CURRENCY_FORMATTING('0')}`,
    `- [ LOCKED ] - <br>
    Prerequisites follow as: <br>
    - Reach ${FORMATTER(new Decimal(125), 3) + DO_CURRENCY_FORMATTING('0')} <br>
    - Max out ${xPPU['PRE-P-UPG-001'].NAME}`, 
    () => {return PLR_data.POINTS_ARRAY.POINTS.BEST['I'].gte(125) && 
    xPPU['PRE-P-UPG-001'].CURRENT_LEVEL.eq(xPPU['PRE-P-UPG-001'].MAX_LEVEL)})
}

function SWITCH_TO(buttonElement) {
    // Get the tab ID from the data attribute
    const tabId = buttonElement.dataset.tabId;
  
    // Select all tab buttons
    const tabButtons = document.querySelectorAll('.T_BTNS');
  
    // Select all tab content divs
    const tabContents = document.querySelectorAll('.TAB');
  
    // Remove active class from all buttons and hide all tabs
    tabButtons.forEach(button => button.classList.remove('active'));
    tabContents.forEach(tab => tab.classList.add('hidden'));
  
    // Activate the clicked button and show the corresponding tab content
    buttonElement.classList.add('active');
    document.getElementById(tabId).classList.remove('hidden');
  }
  