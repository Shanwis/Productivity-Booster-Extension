const toggleBtn = document.getElementById("toggleBtn")

chrome.storage.local.get("enabled", ({enabled}) => {
    if(enabled === undefined) enabled = true;
    updateButton(enabled);
});

function updateButton(enabled){
    toggleBtn.textContent = enabled ? "Turn OFF" : "Turn ON";
}

toggleBtn.addEventListener("click",() => {
    chrome.storage.local.get("enabled", ({enabled}) => {
        const newState = !enabled;
        chrome.storage.local.set({enabled:newState});
        updateButton(newState);
    });
});