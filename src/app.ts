import startGame from './game'
import startMath from './math'
const VISIT_KEY = "NUM_VISITS";
window.onload = () => {

    let path = window.location.pathname;
    let mathStarted = false;
    switch (path) {
        case "/":

            // I know you can use Cookies too but decided to do it in a way I"m more used to.
            let numVisits = localStorage.getItem(VISIT_KEY);
            let newVisitCount = 0;
            if(numVisits !== null){
                newVisitCount = parseInt(numVisits) + 1;
            }else {
                newVisitCount = 1;
            }

            localStorage.setItem(VISIT_KEY,newVisitCount.toString());
            document.write(`Hello! You've visited ${newVisitCount} times`);
            break;

            // resets visitor counter
        case "/reset":
            localStorage.setItem(VISIT_KEY,"0");
            window.location.href = "/";
            break;

        case "/game":
            startGame();
            break;

        case "/math":
            startMath();
            mathStarted = true;
            break;

    }

    // math is special - do extra tests
    if(window.location.pathname.search("/math") !== 1){
         if(!mathStarted){
            startMath();
        }
    }
};