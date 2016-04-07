require("babel/register");
var store = require("./src/init/store.js");

var state = store.getState();

var isClean = true;

var checkValue = function(input, expectedValue, variableName) {
  if (input !== expectedValue) {
      console.log("BAD INITIAL VALUE:", variableName, input, "expected to be:", expectedValue)
      isClean = false;
  }
};

checkValue(state.battleRequests.showRequest, false, "state.battleRequests.showRequest");
checkValue(state.playerData.xp, 0, "state.playerData.xp");
checkValue(state.game.gameArea, "title", "state.game.gameArea");
checkValue(state.game.isAllowingMusic, true, "state.game.isAllowingMusic");
checkValue(state.game.transitionOverlayOpacity, 1, "state.game.transitionOverlayOpacity");
checkValue(state.game.showOnboardingPopup, true, "state.game.showOnboardingPopup");




if (isClean) {
    console.log("SUCCESS! YOU'RE GOOD TO GO!")
} else {
    console.log("You are NOT okay to push the bundle up, if this is for real people")
}
