var checkList1 = document.getElementById('list1');
checkList1.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList1.classList.contains('visible'))
    checkList1.classList.remove('visible');
  else
    checkList1.classList.add('visible');
}
var checkList2 = document.getElementById('list2');
checkList2.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList2.classList.contains('visible'))
    checkList2.classList.remove('visible');
  else
    checkList2.classList.add('visible');
}