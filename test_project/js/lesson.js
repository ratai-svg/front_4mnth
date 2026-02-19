const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

const converter = (changedInput) => {
    const request = new XMLHttpRequest();
    request.open("GET", "../data/converter.json");
    request.setRequestHeader("Content-type", "application/json");
    request.send();

    request.onload = () => {
        if (request.status !== 200) {
            console.error("Ошибка при загрузке JSON:", request.status);
            return;
        }

        const data = JSON.parse(request.response);
        const usdRate = data.usd;
        const eurRate = data.eur;

        if (changedInput === "som") {
            usdInput.value = (somInput.value / usdRate).toFixed(2);
            eurInput.value = (somInput.value / eurRate).toFixed(2);
        } else if (changedInput === "usd") {
            somInput.value = (usdInput.value * usdRate).toFixed(2);
            eurInput.value = ((usdInput.value * usdRate) / eurRate).toFixed(2);
        } else if (changedInput === "eur") {
            somInput.value = (eurInput.value * eurRate).toFixed(2);
            usdInput.value = ((eurInput.value * eurRate) / usdRate).toFixed(2);
        }
    };
};

somInput.addEventListener("input", () => converter("som"));
usdInput.addEventListener("input", () => converter("usd"));
eurInput.addEventListener("input", () => converter("eur"));

const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabContentItems = document.querySelectorAll(".tab_content_item");
const tabContentItemsParent = document.querySelector(".tab_content_items");
let currentTabIndex = 0;
let tabSliderIntervalId = null;

const hideTabContent = () => {
    tabContentBlocks.forEach((block) => {
        block.classList.remove("tab_content_block_active");
    });

    tabContentItems.forEach((item) => {
        item.classList.remove("tab_content_item_active");
    });
};

const showTabContent = (index = 0) => {
    tabContentBlocks[index].classList.add("tab_content_block_active");
    tabContentItems[index].classList.add("tab_content_item_active");
};

const switchTab = () => {
    currentTabIndex = (currentTabIndex + 1) % tabContentBlocks.length;
    hideTabContent();
    showTabContent(currentTabIndex);
};

const startAutoTabSlider = () => {
    tabSliderIntervalId = setInterval(switchTab, 5000);
};

const restartAutoTabSlider = () => {
    clearInterval(tabSliderIntervalId);
    startAutoTabSlider();
};

if (tabContentBlocks.length && tabContentItems.length) {
    hideTabContent();
    showTabContent(currentTabIndex);
    startAutoTabSlider();
}

tabContentItemsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (!target.classList.contains("tab_content_item")) {
        return;
    }

    tabContentItems.forEach((item, index) => {
        if (target === item) {
            currentTabIndex = index;
            hideTabContent();
            showTabContent(currentTabIndex);
            restartAutoTabSlider();
        }
    });
});

const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal_close");
const modalOpenButton = document.querySelector("#btn-get");

const openModal = () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
};

const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
};

modalCloseButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
modalOpenButton.addEventListener("click", openModal);

const showModalByScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 2) {
        openModal();
        window.removeEventListener("scroll", showModalByScroll);
    }
};

window.addEventListener("scroll", showModalByScroll);
setTimeout(openModal, 10000);
