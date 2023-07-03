var grid = document.querySelector('.payment-options');
grid.onclick = rowCol;
console.log("girdiii")
/*
Callback function rowCol() passes the Event Object...
if the clicked element (e.target) .matches() class .item...
get the clicked element's (ie .item) .closest() element .gridcontainer and
add/remove class .col or .row
*/
function startRow(e) {
  console.log("girdi")
  if (e.target.matches('.bill-corporate')) {
    e.target.closest('.payment-options').classList.toggle('row4');

  }
  else if(e.target.matches('.bill-personal')){
    e.target.closest('.payment-options').classList.toggle('row3');
  }
  return false;
}
