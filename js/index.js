const tabs = document.querySelectorAll(".tab");
const inputs = document.querySelectorAll(".checkinp");
let tabsbutton = document.querySelectorAll(".tabsbtn");
let tableContent = document.querySelectorAll(".dash-content");

inputs.forEach((input) => {
    input.addEventListener("DOMContentLoaded", inputChecker(input));
    input.addEventListener("input", () => {
        inputChecker(input);
    });
});
function inputChecker(input) {
    input.setAttribute("value", input.value);
}

(function () {
    const box = document.querySelector(".tabwrapper");
    let isMouseDown = false;
    let startX;
    let scrollLeft;

    box.addEventListener("mousedown", (e) => {
        isMouseDown = true;
        startX = e.pageX - box.offsetLeft;
        scrollLeft = box.scrollLeft;
    });

    box.addEventListener("mouseleave", () => {
        isMouseDown = false;
    });

    box.addEventListener("mouseup", () => {
        isMouseDown = false;
    });

    box.addEventListener("mousemove", (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - box.offsetLeft;
        const walk = (x - startX) * 3; // Adjust the sensitivity of scrolling
        box.scrollLeft = scrollLeft - walk;
    });

    // For touch events on mobile
    box.addEventListener("touchstart", (e) => {
        isMouseDown = true;
        startX = e.touches[0].pageX - box.offsetLeft;
        scrollLeft = box.scrollLeft;
    });

    box.addEventListener("touchend", () => {
        isMouseDown = false;
    });

    box.addEventListener("touchmove", (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - box.offsetLeft;
        const walk = (x - startX) * 3; // Adjust the sensitivity of scrolling
        box.scrollLeft = scrollLeft - walk;
    });
})();

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
    });
});
tabsbutton.forEach((tab) => {
    tab.addEventListener("click", () => {
        let res = tab.getAttribute("data-tabs");
        const contentx = document.querySelector(`#data-${res}`);
        console.log(contentx);

        tabsbutton.forEach((t) => t.classList.remove("active"));
        tableContent.forEach((t) => {
            t.classList.remove("show");
        });
        tab.classList.add("active");
        contentx.classList.add("show");
        const tabActivatedEvent = new Event("myTabActivated");
        contentx.dispatchEvent(tabActivatedEvent);
    });
});

tableContent.forEach((contentx) => {
    contentx.addEventListener("myTabActivated", () => {
        const dataTable = $(contentx).find("table.display").DataTable();
        dataTable.columns.adjust().draw();
    });
});

// DUe scroll
