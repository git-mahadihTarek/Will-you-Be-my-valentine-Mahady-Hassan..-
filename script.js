/* ============================= */
/*        VERSION CHECK          */
/* ============================= */

(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json";

    try {
        const response = await fetch(versionUrl);

        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }

        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }

    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();


/* ============================= */
/*        MAIN LOGIC             */
/* ============================= */

document.addEventListener("DOMContentLoaded", function () {

    const yesButton = document.getElementById("yes");
    const noButton = document.getElementById("no");
    const yesNote = document.getElementById("yes-note");
    const yesMusic = document.getElementById("yes-music");

    let noClickCount = 0;
    let yesScale = 1;

    /* ---------- NO BUTTON BEHAVIOR ---------- */

    if (noButton) {
        noButton.addEventListener("click", function () {

            noClickCount++;

            const messages = [
                "Are you sure? ",
                "Really sure? 🥺",
                "Think again ",
                "Pookie please...",
                "Just think about it!",
                "If you say no, I will be really sad...",
                "I will be very sad...",
                "I will be very very very sad...",
                "Ok fine, I will stop asking...",
                "Just kidding, say yes please! ❤️"  
            ];

            noButton.innerText = messages[Math.min(noClickCount - 1, messages.length - 1)];

            // Increase Yes button size
            yesScale += 0.2;
            if (yesButton) {
                yesButton.style.transform = `scale(${yesScale})`;
            }
        });
    }

    /* ---------- YES BUTTON BEHAVIOR ---------- */

    if (yesButton) {
        yesButton.addEventListener("click", function () {

            // Show note
            if (yesNote) {
                yesNote.style.display = "block";
                yesNote.style.opacity = "0";
                yesNote.style.transition = "opacity 1s ease-in-out";

                setTimeout(() => {
                    yesNote.style.opacity = "1";
                }, 100);
            }

            // Play music
            if (yesMusic) {
                yesMusic.play().catch(error => {
                    console.log("Audio play blocked:", error);
                });
            }

            // Disable buttons
            yesButton.disabled = true;
            if (noButton) {
                noButton.disabled = true;
            }

            // Optional: small visual effect
            yesButton.style.transform = "scale(1.5)";
        });
    }

});
