function DO_STORY_CHECKING() {
    const x = PLR_data
    const xx = PLR_data.PRE_PRESTIGE_UPG_DATA
    const upgradeElement = document.getElementById('PRE-P-UPG-002');
    if (xx['PRE-P-UPG-001'].CURRENT_LEVEL.gt(0)) {
        document.getElementById('PRE-P-UPG-002').classList.remove('hidden')
    }
    if (xx['PRE-P-UPG-001'].CURRENT_LEVEL.eq(xx['PRE-P-UPG-001'].MAX_LEVEL)) {
        document.getElementById('MAIN_TAB').classList.remove('hidden')
        document.getElementById('CYCLE_TAB').classList.remove('hidden')
    }
}