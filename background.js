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

chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(rule => rule.id),
    addRules: rules
});