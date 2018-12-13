function checkAPIVersion() {
    ChemDrawAPI.window.resizeTo(500, 200);
    var msgbox = document.getElementById('msg-box');
    msgbox.innerHTML = 'Using ChemDraw API ' + ChemDrawAPI.version;
}
