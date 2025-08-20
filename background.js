const rules = [
    {
        "id": 1,
        "priority": 1,
        "action": {
            "type": "redirect",
            "redirect": { "url": "https://www.youtube.com" }
        },
        "condition": {
            "urlFilter": "*://*.youtube.com/shorts/*",
            "resourceTypes": ["main_frame"] // Corrected typo here
        }
    },
    {
        "id": 2,
        "priority": 1,
        "action": {
            "type": "redirect",
            "redirect": { "url": "https://www.instagram.com" }
        },
        "condition": {
            "urlFilter": "*://*.instagram.com/reels/*",
            "resourceTypes": ["main_frame"]
        }
    },
    {
        "id": 3,
        "priority": 1, // It's fine for priorities to be the same
        "action": {
            "type": "redirect",
            "redirect": { "url": "https://www.instagram.com" }
        },
        "condition": {
            "urlFilter": "*://*.instagram.com/explore/*",
            "resourceTypes": ["main_frame"]
        }
    }
];

function applyRules(enabled){
    if(enabled){
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: rules.map(rule => rule.id),
            addRules: rules
        });
        chrome.tabs.query({active:true, currentWindow: true}, (tabs) => {
            let url = tabs[0].url;
            if(url.includes("youtube.com/shorts/")) {
                chrome.tabs.update(tabs[0].id, {url: "https://www.youtube.com"});
            }
            if(url.includes("instagram.com/reels/") || url.includes("instagram.com/explore/")) {
                chrome.tabs.update(tabs[0].id, {url: "https://www.instagram.com"});
            }
        });
        
    }else{
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: rules.map(rule => rule.id),
            addRules: []
        });
    }
}

chrome.storage.onChanged.addListener((changes,area) => {
    if(area === "local" && "enabled" in changes) {
        const enabled = changes.enabled.newValue;
        applyRules(enabled);
    }
});


chrome.storage.local.get("enabled", ({enabled}) => {
    if (enabled === undefined) enabled = true;
    applyRules(enabled);
});