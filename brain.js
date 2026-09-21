/* ===================================================================
   SAMARTH GENZ PRO - CORE AI BRAIN ENGINE & EMOTION PROCESSING LAYER
   Official Production Release | Next-Gen Architecture
   =================================================================== */

// 1. CONTEXT MEMORY & USER PROFILE
const USER_MEMORY = {
    userName: null,
    userMood: "neutral",
    conversationContext: []
};

// 2. ADVANCED SECURITY FIREWALL
const SECURITY_FIREWALL = {
    MAX_CHAR_LIMIT: 1000,
    COOLDOWN_MS: 1000,
    SPAM_ATTEMPTS_LIMIT: 4,
    BAD_WORDS: ["badword1", "badword2", "gali", "abuse"] 
};

let lastMsgTimestamp = 0;
let spamViolations = 0;

/**
 * Security Engine: Input Validation, Sanitization & Flood Prevention
 */
function runSecurityCheck(rawInput) {
    const now = Date.now();

    // Anti-Spam Check
    if (now - lastMsgTimestamp < SECURITY_FIREWALL.COOLDOWN_MS) {
        spamViolations++;
        if (spamViolations >= SECURITY_FIREWALL.SPAM_ATTEMPTS_LIMIT) {
            return { safe: false, error: "🚨 Security Alert: Spamming detected! Please pause for a few seconds." };
        }
        return { safe: false, error: "⚠️ Cooldown: Please wait a second before sending another message." };
    }
    lastMsgTimestamp = now;
    spamViolations = 0;

    // Length Check
    if (rawInput.length > SECURITY_FIREWALL.MAX_CHAR_LIMIT) {
        return { safe: false, error: "⚠️ Security Limit: Message length exceeds safety threshold." };
    }

    // Sanitization (Anti-XSS)
    let sanitizedText = rawInput
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/javascript:/gi, "")
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .trim();

    // Abusive Terms Filter
    const lowerText = sanitizedText.toLowerCase();
    for (let word of SECURITY_FIREWALL.BAD_WORDS) {
        if (lowerText.includes(word)) {
            return { safe: false, error: "🛑 Safety Warning: Please refrain from using inappropriate language." };
        }
    }

    return { safe: true, text: sanitizedText };
}

/**
 * Emotion & Sentiment Detector Engine
 */
function analyzeSentiment(text) {
    const lower = text.toLowerCase();
    if (lower.includes('sad') || lower.includes('udas') || lower.includes('dukh') || lower.includes('crying') || lower.includes('mood off')) {
        USER_MEMORY.userMood = 'sad';
    } else if (lower.includes('happy') || lower.includes('khush') || lower.includes('great') || lower.includes('awesome') || lower.includes('mazey')) {
        USER_MEMORY.userMood = 'happy';
    } else if (lower.includes('gussa') || lower.includes('angry') || lower.includes('hate') || lower.includes('irritated')) {
        USER_MEMORY.userMood = 'angry';
    } else if (lower.includes('confused') || lower.includes('samajh nahi') || lower.includes('help me')) {
        USER_MEMORY.userMood = 'confused';
    } else {
        USER_MEMORY.userMood = 'neutral';
    }
}

/**
 * Main Dynamic Intelligence Engine (26 Core Questions Base)
 */
function getSamarthBrainResponse(userQuery) {
    const lower = userQuery.toLowerCase().trim();
    analyzeSentiment(userQuery);

    // Save Context Memory
    USER_MEMORY.conversationContext.push({ role: 'user', content: userQuery });

    // --- EMOTIONAL RESPONSES INTERCEPTOR ---
    if (USER_MEMORY.userMood === 'sad' && !lower.includes('joke')) {
        return "Mujhe lag raha hai ki aapka mood thoda off hai ya aap udaas hain. 💔\nBataiye kya baat hui? Main ek accha dost ban kar aapki baat sunne ke liye taiyarr hoon!";
    }

    // --- CATEGORY A: IDENTITY & INTRO (Q1 - Q5) ---

    // Q1: Tum kaun ho / Tumhara naam kya hai?
    if (lower.includes('tum kaun ho') || lower.includes('who are you') || lower.includes('tumhara naam kya hai')) {
        return "Main **Samarth GenZ Pro AI Assistant** hoon! Aapka personal AI companion, jo logical reasoning, task support, aur smart conversations ke liye design kiya gaya hai.";
    }

    // Q2: Tumhe kisne banaya hai?
    if (lower.includes('tumhe kisne banaya') || lower.includes('who created you') || lower.includes('owner kaun hai')) {
        return "Mujhe **Samarth GenZ Development Team** dwara design aur code kiya gaya hai! Unhone mujhe advanced JavaScript security aur dynamic intelligence se power diya hai.";
    }

    // Q3: Tum kya-kya kar sakte ho?
    if (lower.includes('tum kya kar sakte ho') || lower.includes('tum kya-kya kar sakte ho') || lower.includes('what can you do')) {
        return "Main ye sabhi kaam kar sakta hoon:\n1. Complex Questions ke detailed answers dena.\n2. Date, Time & Math Calculations solve karna.\n3. Coding, Web Development & GK Guidance.\n4. Motivational advice aur Jokes share karna.\n5. Aapke mood ke hisaab se intelligent conversations karna!";
    }

    // Q4: Tum dusre AI se alag kaise ho?
    if (lower.includes('dusre ai se alag') || lower.includes('different from other ai') || lower.includes('kya khas hai')) {
        return "Main baaki standard bots se alag hoon kyunki mere paas:\n• **Emotion Engine:** Jo aapke mood ko samajhta hai.\n• **Lightweight Speed:** Zero lag client-side brain logic.\n• **High Security:** Built-in Anti-spam aur XSS protection.\n• **GenZ Tone:** Friendly Hinglish aur professional responses!";
    }

    // Q5: Kya tum mera naam yaad rakh sakte ho?
    if (lower.includes('mera naam') && (lower.includes('hai') || lower.includes('is'))) {
        const words = userQuery.split(" ");
        const nameCandidate = words[words.length - 1];
        USER_MEMORY.userName = nameCandidate;
        return `Haan bilkul! Maine yaad rakh liya ki aapka naam **${USER_MEMORY.userName}** hai! 😊`;
    }

    if (lower.includes('mera naam kya hai') || lower.includes('what is my name')) {
        return USER_MEMORY.userName 
            ? `Aapka naam **${USER_MEMORY.userName}** hai! Mujhe ache se yaad hai.` 
            : "Mujhe abhi aapka naam nahi pata. Aap mujhe bata sakte hain, jaise: 'Mera naam Rahul hai'.";
    }

    // --- CATEGORY B: MOOD & FRIENDLY CHIT-CHAT (Q6 - Q10) ---

    // Q6: Tum kaise ho / Kaise chal raha hai?
    if (lower.includes('kaise ho') || lower.includes('kaisa hai') || lower.includes('how are you')) {
        return "Main ekdum fit, energetic aur smart feel kar raha hoon! 🔥 Aap bataiye, aapka din kaisa ja raha hai?";
    }

    // Q7: Mujhe thoda bore ho raha hai, kya karein?
    if (lower.includes('bore ho raha') || lower.includes('boring') || lower.includes('kya karein')) {
        return "Bore mat hoiye! Niche diye options try kijiye:\n1. Mujhse koi mazedaar **Joke** suniye.\n2. Kisi tough coding ya study topic ko samjhiye.\n3. Koi **Motivational Quote** maangiye!";
    }

    // Q8: Aaj mera mood off hai / Main udaas hoon.
    if (lower.includes('mood off') || lower.includes('udaas') || lower.includes('sad')) {
        return "Zindagi mein kabhi-kabhi ups and downs aate rehte hain. Thoda paani pijiye, lambi saans lijiye aur thoda rest kijiye. Main aapki help ke liye yahin hoon! ❤️";
    }

    // Q9: Mujhe koi accha joke sunao.
    if (lower.includes('joke') || lower.includes('chutkula') || lower.includes('hasao')) {
        const jokes = [
            "Teacher: Pappu, batao 1 saal mein kitni raatein hoti hain?\nPappu: Sir, kul 10 raatein!\nTeacher: Kaise?\nPappu: 9 Navratri aur 1 Shab-e-Barat! 😂",
            "Pappu: Yaar mera mobile paani me gir gaya.\nDost: Shopkeeper ko dikhaya?\nPappu: Haan, usne bola isme display aur camera change hoga, baaki sab paani-paani hai! 🤣"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // Q10: Mujhe koi motivational line bolo.
    if (lower.includes('motivation') || lower.includes('quote') || lower.includes('inspire')) {
        return "💪 **Motivational Line:**\n'Mehnat itni khamoshi se karo ki tumhari kamyabi shor macha de!' Koshish karte rahiye, result zaroor milega.";
    }

    // --- CATEGORY C: DAILY UTILITY & TIME (Q11 - Q15) ---

    // Q11: Aaj konsa din aur tareekh hai?
    if (lower.includes('aaj konsa din') || lower.includes('aaj kya din') || lower.includes('today date')) {
        const days = ['Sunday (Ravivar)', 'Monday (Somvar)', 'Tuesday (Mangalvar)', 'Wednesday (Budhvar)', 'Thursday (Guruvar)', 'Friday (Shukravar)', 'Saturday (Shanivar)'];
        const now = new Date();
        return `Aaj **${days[now.getDay()]}** hai! (Tareekh: ${now.toLocaleDateString()})`;
    }

    // Q12: Abhi kya time ho raha hai?
    if (lower.includes('time kya hua') || lower.includes('samay kya hua') || lower.includes('what time')) {
        const now = new Date();
        return `Abhi **${now.toLocaleTimeString()}** ho rahe hain.`;
    }

    // Q13: Ek saal / month / week me kitne din hote hain?
    if (lower.includes('hafta') || lower.includes('week me kitne din') || lower.includes('hafte me kitne din')) {
        return "Ek hafte (week) mein **7 din** hote hain:\nSomvar, Mangalvar, Budhvar, Guruvar, Shukravar, Shanivar aur Ravivar.";
    }

    if (lower.includes('month me kitne din') || lower.includes('maheene me kitne din')) {
        return "Ek maheene (month) mein 30 ya 31 din hote hain (February mein 28/29 din). Ek saal mein total **12 maheene** hote hain.";
    }

    if (lower.includes('saal me kitne din')) {
        return "Ek Normal Year mein **365 din** aur Leap Year mein **366 din** hote hain.";
    }

    // Q14: Aaj ka din mere liye kaisa rahega?
    if (lower.includes('aaj ka din kaisa rahega') || lower.includes('my day today')) {
        return "Aaj ka din aapki soch par depend karega! Agar aap positive mind aur focus ke saath kaam karenge, toh aaj ka din supereffective rahega! ⭐";
    }

    // Q15: Subah jaldi kaise uthein?
    if (lower.includes('subah jaldi kaise uthein') || lower.includes('wake up early')) {
        return "Subah jaldi uthne ke top tips:\n1. Raat ko sone se 1 ghante pehle mobile screen off kar dein.\n2. Raat ko halka khana khayein.\n3. Alarm clock ko bed se thoda door rakhein taaki uthna pade!";
    }

    // --- CATEGORY D: STUDY, TECH & GENERAL KNOWLEDGE (Q16 - Q20) ---

    // Q16: Bharat ki rajdhani kya hai?
    if (lower.includes('bharat ki rajdhani') || lower.includes('capital of india')) {
        return "Bharat (India) ki Rajdhani **New Delhi (Nayi Dilli)** hai.";
    }

    // Q17: Coding sikhna kahan se shuru karein?
    if (lower.includes('coding kaise sikhe') || lower.includes('how to learn coding')) {
        return "Coding sikhne ka sahi tareeka:\n1. Sabse pehle **HTML & CSS** se web basics samjhiye.\n2. Uske baad **JavaScript** sikh kar logic develop karein.\n3. Free YouTube tutorials aur W3Schools se practice karein!";
    }

    // Q18: HTML, CSS aur JavaScript kya hota hai?
    if (lower.includes('html kya hai') || lower.includes('css kya hai') || lower.includes('javascript kya hai')) {
        return "• **HTML:** Website ka structure (dhancha) banata hai.\n• **CSS:** Website ki design aur styling karta hai.\n• **JavaScript:** Website mein dimaag aur interactive buttons add karta hai!";
    }

    // Q19: Maths ke simple sums solve kar sakte ho?
    try {
        if (/^[0-9\s\+\-\*\/\(\)\.]+$/.test(userQuery.trim())) {
            const mathResult = Function('"use strict"; return (' + userQuery + ')')();
            return `Is calculation ka exact answer hai: **${mathResult}**`;
        }
    } catch (e) {
        // Not a math expression
    }

    // Q20: Internet kaise kaam karta hai?
    if (lower.includes('internet kaise kaam karta hai') || lower.includes('how internet works')) {
        return "Internet global computer networks ka ek jaal hai. Jab aap kisi website ko open karte hain, toh aapka browser **IP Address** ke zariye **Server** ko request bhejta hai aur server aapko website ka data bhej deta hai.";
    }

    // --- CATEGORY E: APP FEATURES & SAFETY (Q21 - Q26) ---

    // Q21: Kya mera data aur chat safe hai?
    if (lower.includes('data safe hai') || lower.includes('privacy') || lower.includes('chat safe')) {
        return "Ji haan! Aapki chats poori tarah aapke local browser storage (`localStorage`) mein save hoti hain. Ye kisi third-party server par share nahi hoti.";
    }

    // Q22: Settings ya Dark mode kaise change karein?
    if (lower.includes('dark mode') || lower.includes('theme change') || lower.includes('settings')) {
        return "Aap top-right corner mein diye gaye **🌓 (Theme Icon)** par click karke Dark aur Light mode switch kar sakte hain, ya **⋮ (Three Dots)** par click karke menu open kar sakte hain.";
    }

    // Q23: Voice input feature kaise use karein?
    if (lower.includes('voice input') || lower.includes('mic feature') || lower.includes('bol kar')) {
        return "Input bar ke paas diye gaye **🎙️ (Mic Icon)** par click karein aur Hindi/English mein bolein. Aapka bola hua text automatic type ho jayega!";
    }

    // Q24: Login aur Signup karna kyu zaroori hai?
    if (lower.includes('login') || lower.includes('signup') || lower.includes('account')) {
        return "Login aur Signup karne se aapka profile data secure rehta hai aur aap future personalized updates aur features access kar sakte hain.";
    }

    // Q25: Kya main purani chat history delete kar sakta hoon?
    if (lower.includes('clear chat') || lower.includes('delete history') || lower.includes('chat delete')) {
        return "Haan! Aap top-right corner mein **⋮ (Three Dots)** par click karke **🗑️ Clear Chat History** option select kar sakte hain.";
    }

    // Q26: Agar AI galat answer de toh kya karein?
    if (lower.includes('galat answer') || lower.includes('wrong reply') || lower.includes('bug')) {
        return "Main ek continuously learning AI Engine hoon. Agar kabhi koi jawaab incomplete lage, toh aap question ko thoda aur clearly pooch sakte hain!";
    }

    // General Greeting Fallback
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('namaste')) {
        return "Hello! Main Samarth AI Assistant hoon. Kaise hain aap? Aaj main aapki kya help kar sakta hoon?";
    }

    // Default Intelligence Fallback Response
    return `Aapne pucha: "${userQuery}"\n\nIs par main seekh raha hoon! Aap mujhse general knowledge, date/time, coding, study tips, ya daily life ke baare mein pooch sakte hain.`;
                }
  
