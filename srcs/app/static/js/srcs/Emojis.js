import { getCookieJSONValue, setCookieJSONValue } from "./Cookies.js";
export const smileys = [
    "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
    "😋", "😎", "😍", "😘", "😗", "😙", "😚", "🙂", "🤗", "🤩",
    "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖",
    "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯",
    "😳", "🥵", "🥶", "😶", "😐", "😑", "😬", "🙄", "🤥", "😌",
    "😔", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "😵",
    "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😰", "😨", "😱", "😖",
    "😤", "😬", "🤯", "🥴", "🤩", "🤪", "😵", "🤡", "🥸", "💀",
    "👻", "😈", "👿", "🤠", "👽", "👾", "🤖", "🎃", "🎲"
];
export const RECENT_EMOJIS = "recentEmojis";
export const emojiShortcuts = {
    ":grinning:": "😀",
    ":grin:": "😁",
    ":joy:": "😂",
    ":rofl:": "🤣",
    ":smiley:": "😃",
    ":smile:": "😄",
    ":sweat_smile:": "😅",
    ":laughing:": "😆",
    ":wink:": "😉",
    ":blush:": "😊",
    ":yum:": "😋",
    ":sunglasses:": "😎",
    ":heart_eyes:": "😍",
    ":kissing_heart:": "😘",
    ":kissing:": "😗",
    ":kissing_smiling_eyes:": "😙",
    ":kissing_closed_eyes:": "😚",
    ":slight_smile:": "🙂",
    ":hugs:": "🤗",
    ":star_struck:": "🤩",
    ":smirk:": "😏",
    ":unamused:": "😒",
    ":disappointed:": "😞",
    ":pensive:": "😔",
    ":worried:": "😟",
    ":confused:": "😕",
    ":slight_frown:": "🙁",
    ":frowning:": "☹️",
    ":persevere:": "😣",
    ":confounded:": "😖",
    ":tired_face:": "😫",
    ":weary:": "😩",
    ":pleading_face:": "🥺",
    ":cry:": "😢",
    ":sob:": "😭",
    ":angry:": "😠",
    ":rage:": "😡",
    ":face_with_symbols_over_mouth:": "🤬",
    ":exploding_head:": "🤯",
    ":flushed:": "😳",
    ":hot_face:": "🥵",
    ":cold_face:": "🥶",
    ":no_mouth:": "😶",
    ":neutral_face:": "😐",
    ":expressionless:": "😑",
    ":grimacing:": "😬",
    ":roll_eyes:": "🙄",
    ":lying_face:": "🤥",
    ":relieved:": "😌",
    ":drooling_face:": "🤤",
    ":sleeping:": "😴",
    ":mask:": "😷",
    ":face_with_thermometer:": "🤒",
    ":face_with_head_bandage:": "🤕",
    ":nauseated_face:": "🤢",
    ":face_vomiting:": "🤮",
    ":sneezing_face:": "🤧",
    ":dizzy_face:": "😵",
    ":cowboy:": "🤠",
    ":partying_face:": "🥳",
    ":nerd_face:": "🤓",
    ":monocle_face:": "🧐",
    ":fearful:": "😨",
    ":scream:": "😱",
    ":clown:": "🤡",
    ":woozy_face:": "🥴",
    ":zany_face:": "🤪",
    ":robot:": "🤖",
    ":skull:": "💀",
    ":ghost:": "👻",
    ":smiling_imp:": "😈",
    ":imp:": "👿",
    ":alien:": "👽",
    ":space_invader:": "👾",
    ":jack_o_lantern:": "🎃"
};
export function emojisHandler() {
    let selector = document.querySelector(".emojiselector");
    let emojiwrapper = document.querySelector(".emojiwrapper");
    if (selector)
        selector.addEventListener("click", (e) => {
            if (emojiwrapper)
                emojiwrapper.style.display = "flex";
            else
                console.error("emojisHandler : element with classname emojiwrapper not found");
            selector.addEventListener("mouseover", (e) => {
                let len = smileys.length;
                let index = Math.floor(Math.random() * len);
                selector.innerHTML = smileys[index];
            });
        });
    else
        console.error("emojisHandler : element with classname emojiselector not found");
    if (emojiwrapper)
        emojiwrapper.addEventListener("mouseleave", (e) => {
            emojiwrapper.style.display = "none";
        });
    else
        console.error("emojisHandler : element with classname emojiwrapper not found");
}
function updateRecentEmojis() {
    let element = document.querySelector(".recentEmojis");
    if (element) {
        element.innerHTML = "";
        let smileySet = getRecentEmojis();
        smileySet.forEach((smiley) => addEmoji(smiley, element));
    }
    else
        console.error("updateRecentEmojis : element with classname recentEmojis not found");
}
function addEmoji(emoji, element) {
    let emo = document.createElement("div");
    emo.classList.add("emoji");
    emo.innerHTML = emoji;
    element.appendChild(emo);
    emo.addEventListener('click', (e) => {
        let chat_txt = document.getElementById('chat_text');
        if (chat_txt) {
            let target = e.target;
            if (target) {
                let emoji = target.innerHTML;
                chat_txt.value += emoji;
                setRecentEmojis(emoji);
                updateRecentEmojis();
            }
        }
    });
}
export function initEmojis() {
    let wrapper = document.createElement("div");
    wrapper.classList.add("emojiwrapper");
    wrapper.style.display = "none";
    let chatwrapper = document.querySelector(".chatwrapper");
    chatwrapper.appendChild(wrapper);
    let allEmojis = document.createElement("div");
    allEmojis.classList.add("allEmojis");
    let recentEmojisWrapper = document.createElement("div");
    recentEmojisWrapper.classList.add("recentEmojis");
    setEmojisElements(getRecentEmojis(), recentEmojisWrapper);
    setEmojisElements(smileys, allEmojis);
    emojisHandler();
}
function setEmojisElements(smileySet, element) {
    let emojiWrapper = document.querySelector(".emojiwrapper");
    emojiWrapper.appendChild(element);
    smileySet.forEach((smiley) => addEmoji(smiley, element));
}
function setRecentEmojis(emoji) {
    setCookieJSONValue(RECENT_EMOJIS, emoji, { length: 8 });
}
function getRecentEmojis() {
    return getCookieJSONValue(RECENT_EMOJIS);
}
