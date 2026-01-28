document.addEventListener("DOMContentLoaded", () => {
    // --- DOM Elements ---
    const cakeGif = document.getElementById("cakeGif");
    const popupWindow = document.getElementById("popupWindow");
    const popupContent = document.getElementById("popupContent");

    const voiceNote = document.getElementById("voiceNote");
    const playButton = document.getElementById("playButton");
    const closeBtn = document.getElementById("closeBtn");
    const surpriseBtn = document.getElementById("surpriseBtn");
    const lockedMessage = document.getElementById("lockedMessage");
    const voiceProgressBar = document.getElementById("voiceProgressBar");
    const voiceTime = document.getElementById("voiceTime");

    const bgMusic = document.getElementById("oh");
    const musicBtn = document.getElementById("musicBtn");

    const countdownEl = document.getElementById("countdown");
    const typewriterEl = document.getElementById("typewriter");

    const slide = document.getElementById("slide");

    const memoryQuestionEl = document.getElementById("memoryQuestion");
    const memoryFeedbackEl = document.getElementById("memoryFeedback");

    const finalGifLink = document.getElementById("finalGifLink"); // NEW

    const maps = [
        "https://www.google.com/maps/embed?pb=!4v1767774687928!6m8!1m7!1sqjIOYIB_OujEayuPBsUXzw!2m2!1d54.10768613335556!2d159.9851103911956!3f93.44184358199071!4f36.55819411358391!5f1.1065099421335651",
        "https://www.google.com/maps/embed?pb=!4v1767776522007!6m8!1m7!1sCAoSLEFGMVFpcE02Z2dwSFk3UzlQUkVXMHhya3dNVTB2dE83UG1xNDNJUWhiTV94!2m2!1d43.7832745612107!2d144.3124974986362!3f173.61681100620956!4f-2.2664889671150803!5f0.7820865974627469",
        "https://www.google.com/maps/embed?pb=!4v1767778389908!6m8!1m7!1sCAoSLEFGMVFpcE5NZUJkVDdIbXktR1ROTnlBa3kxSWZIeHh0THJiT3pGYUx5QWl4!2m2!1d50.70760689211924!2d4.289669853032678!3f16.35!4f3.450000000000003!5f0.7820865974627469",
        "https://www.google.com/maps/embed?pb=!4v1767778484598!6m8!1m7!1sEfbVA6jzxMkAAAQ7LwOTxw!2m2!1d62.04464795882912!2d129.6241284429345!3f284.16908070457873!4f-24.663824262789092!5f0.7820865974627469",
        "https://www.google.com/maps/embed?pb=!4v1767778569079!6m8!1m7!1sjSiHYOytVDMAAAQIt04LdA!2m2!1d49.98274918243075!2d20.05448614134913!3f133.19!4f8.989999999999995!5f0.4000000000000002",
        "https://www.google.com/maps/embed?pb=!4v1767778620699!6m8!1m7!1ss3FnKTrZWhG_xk_97KZr0A!2m2!1d69.20794114556811!2d-51.16312198207455!3f245.56!4f-13.5!5f0.4000000000000002",
        "https://www.google.com/maps/embed?pb=!4v1767778653552!6m8!1m7!1skJPO1zlKRtMAAAQZLDcQIQ!2m2!1d68.50904688685114!2d27.48180793176623!3f327.98!4f23.72!5f0.4000000000000002",
        "https://www.google.com/maps/embed?pb=!4v1767778888141!6m8!1m7!1sebD0tfckmx0M63FdVsQeCw!2m2!1d-36.84211890042714!2d174.764817313202!3f83.50406391649241!4f-9.395703213249533!5f0.4000000000000002"
    ];

    function changeMap(index) {
        const iframe = document.getElementById("mapFrame");
        if (maps[index]) iframe.src = maps[index];
    }
    window.changeMap = changeMap;

    function burstConfetti(times = 1) {
        for (let i = 0; i < times; i++) {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ffffff', '#ff9ecb', '#ff4d4d']
            });
        }
    }

    // --- COUNTDOWN ---
    const birthday = new Date("January 29, 2026 00:05:00").getTime();
    const countdownTimer = setInterval(() => {
        const diff = birthday - Date.now();
        if (diff <= 0) {
            countdownEl.textContent = "🎉 IT’S YOUR BDAYYYYYYYY 🎉";
            burstConfetti();
            clearInterval(countdownTimer);
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        countdownEl.textContent = `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);

    // --- MUSIC ---
    musicBtn.addEventListener("click", () => {
        if (!voiceNote.paused) {
            voiceNote.pause();
            playButton.textContent = "Play 💖";
        }
        if (bgMusic.paused) {
            bgMusic.play().catch(() => {});
            musicBtn.textContent = "⏸ Pause Music";
        } else {
            bgMusic.pause();
            musicBtn.textContent = "🎵 Play Music";
        }
    });

    let popupOpened = false;

    // --- POPUP ---
    cakeGif.addEventListener("click", () => {
        burstConfetti();
        if (!popupOpened) {
            popupOpened = true;
            popupWindow.classList.add("show");

            // Hide secret message at start
            lockedMessage.style.display = "none";
            surpriseBtn.disabled = true;
            surpriseBtn.classList.remove("highlight");

            startTyping();
        }
    });

    closeBtn.addEventListener("click", () => {
        popupWindow.classList.remove("show");
        voiceNote.pause();
        voiceNote.currentTime = 0;
        playButton.textContent = "Play 💖";
        voiceProgressBar.style.width = "0%";
        voiceTime.textContent = "0:00 / 0:00";
        lockedMessage.style.display = "none";
        surpriseBtn.disabled = true;
        surpriseBtn.classList.remove("highlight");
    });

    function startTyping() {
        const letter =
            "Lmao..I'm still sick so my voice will be weird.\n" +
            "But oh well, I tried....\n" +
            "Also send me the back side of your credit card...";

        typewriterEl.textContent = "";
        let charIndex = 0;
        const typing = setInterval(() => {
            typewriterEl.textContent += letter[charIndex];
            charIndex++;
            if (charIndex >= letter.length) clearInterval(typing);
        }, 45);
    }

    // --- VOICE NOTE ---
    playButton.addEventListener("click", () => {
        if (!bgMusic.paused) {
            bgMusic.pause();
            musicBtn.textContent = "🎵 Play Music";
        }
        if (voiceNote.paused) {
            voiceNote.play().catch(() => {});
            playButton.textContent = "Pause 💖";
        } else {
            voiceNote.pause();
            playButton.textContent = "Play 💖";
        }
    });

    voiceNote.addEventListener("timeupdate", () => {
        if (!voiceNote.duration) return;
        const percent = (voiceNote.currentTime / voiceNote.duration) * 100;
        voiceProgressBar.style.width = percent + "%";
        voiceTime.textContent =
            formatTime(voiceNote.currentTime) + " / " +
            formatTime(voiceNote.duration);
    });

    // Secret message ONLY shows after voice ends
    voiceNote.addEventListener("ended", () => {
        lockedMessage.style.display = "block";
        surpriseBtn.disabled = false;
        // Ensure the button goes back to pink
        surpriseBtn.style.backgroundColor = "#ff9ecb"; 
        surpriseBtn.classList.add("highlight");
        if (bgMusic.paused) {
            bgMusic.play().catch(() => {});
            musicBtn.textContent = "⏸ Pause Music";
        }
    });

    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    }

    // --- SLIDESHOW ---
    const photos = [
        "assets/images/photoa.png",
        "assets/images/photob.png",
        "assets/images/photoc.png",
        "assets/images/photod.png",
        "assets/images/photoe.png",
    ];

    let slideIndex = 0;
    setInterval(() => {
        slide.style.opacity = 0;
        setTimeout(() => {
            slideIndex = (slideIndex + 1) % photos.length;
            slide.src = photos[slideIndex];
            slide.style.opacity = 1;
        }, 500);
    }, 3000);

    // --- MEMORY GAME ---
    const memoryQuestions = [
        { q: "Who is the smarter one?", correct: 0, response: "Duh obviously its me 🙄" },
        { q: "Who always rage-bait the other?", correct: 1, response: "And I hate you for that.(not)" },
        { q: "Who carries the games?", correct: 0, response: "Obviously me. No debate." },
        { q: "Who makes all the funny jokes??", correct: 0, response: "I've got golden humour fr" },
        { q: "Who is more likely to be arrested?", correct: 1, response: "Tsk tsk.." },
        { q: "Who is richer?", correct: 1, response: "Yes, you are...........NOT." },
        { q: "Who will always sleep late?", correct: 1, response: "YOU REALLY NEED TO GET MORE SLEEP" },
        { q: "Who will leave first?", correct: 0, response: ". . ." }
    ];

    let memoryIndex = 0;
    let memoryScore = 0;

    function answerMemory(choice) {
        const current = memoryQuestions[memoryIndex];
        if (choice === current.correct) {
            memoryFeedbackEl.textContent = "✔ " + current.response;
            memoryScore++;
            burstConfetti();
        } else {
            memoryFeedbackEl.textContent = "✖ Nah. Capper. 😒";
        }
        memoryIndex++;
        setTimeout(loadMemoryQuestion, 1500);
    }

    function loadMemoryQuestion() {
        const total = memoryQuestions.length;
        if (memoryIndex >= total) {
            const ratio = memoryScore / total;
            if (ratio >= 0.75) {
                memoryQuestionEl.textContent =
                    "No way, You actually know the truthhhhh! Ig you deserved this present after all.";
                memoryFeedbackEl.innerHTML = `Score: ${memoryScore} / ${total}<br>I'm surprisedd.`;
                burstConfetti(3);
            } else if (ratio >= 0.5) {
                memoryQuestionEl.textContent = "BRUH";
                memoryFeedbackEl.innerHTML = `Score: ${memoryScore} / ${total}<br>Well, if only you had followed the truths`;
                burstConfetti(2);
            } else {
                memoryQuestionEl.textContent =
                    "Tsk, this is why I HATE YOUUU >:< ";
                memoryFeedbackEl.innerHTML = `Score: ${memoryScore} / ${total}<br>Broski's an opp.`;
            }
            return;
        }
        memoryQuestionEl.textContent = memoryQuestions[memoryIndex].q;
        memoryFeedbackEl.textContent = "";
    }

    window.answerMemory = answerMemory;
    loadMemoryQuestion();

    // --- STORY GAME ---
    window.storyChoice = function (choice) {
        const storyText = document.getElementById("storyText");
        const choices = document.querySelector("#storyGame .choices");
        if (choice === "yeah") {
            storyText.textContent =
                "You like it!!!!! ( ` ω ´ ) I'm so gladddd." +
                "Honestly it's because a part of me want you to feel special too (cuz u a special-needs kid)." +
                "Okay, kiddin. But, you do mean the world to me...or that's what I think lmao.";
            burstConfetti();
            burstConfetti();
        } else {
            storyText.textContent =
                "You don't like it? You must be lying through your teeth right now, dumbass. You should be ashamed!!!!!";
        }
        choices.innerHTML = "<p>💭 I wonder how long we can stay as good frieendddos.</p>";
    };

    // --- SURPRISE BUTTON ---
    surpriseBtn.addEventListener("click", () => {
        if (surpriseBtn.disabled) return;
        burstConfetti(2);
        alert("I'm gonna hit you ╰(*´︶`*)╯");
    });

    // --- FINAL GIF ---
    finalGifLink.addEventListener("click", (e) => {
        e.preventDefault(); // prevent page jump
        burstConfetti(3);
        alert("BE HAPPY FOR THE REST OF THE DAY OKAYYY 🎁");
    });
});
