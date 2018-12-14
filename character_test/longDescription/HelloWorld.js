function checkAPIVersion() {
    var context;
    var msgbox = document.getElementById('msg-box');

    if (!window.external) {
        msgbox.innerHTML = 'Getting ChemDraw API object failed';
    }
    
    try {
        // Try the Windows way
        context = window.external.GetSharedContext();
    }
    catch (err) {
        // Try the Mac way
        context = ChemDraw.Context.GetSharedContext();
    }

    if (!context) {
        msgbox.innerHTML = 'Getting ChemDrawAPI Context failed';
    }

    var apiVersion = context.GetAPIVersion();
    msgbox.innerHTML = 'ChemDraw API Version is ' + apiVersion;
}
