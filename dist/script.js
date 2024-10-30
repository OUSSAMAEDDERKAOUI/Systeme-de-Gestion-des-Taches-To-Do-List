document.getElementById('openPopupBtn').onclick = function() {
    document.getElementById('popup').classList.remove('hidden');
};

document.getElementById('closeBtn').onclick = function() {
    document.getElementById('popup').classList.add('hidden');
};
