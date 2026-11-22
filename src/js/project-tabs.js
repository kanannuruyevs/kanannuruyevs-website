document.addEventListener('DOMContentLoaded', () => {
    const tabs = Array.from(document.querySelectorAll('[data-project-tab]'));
    const panels = Array.from(document.querySelectorAll('[data-project-panel]'));

    if (tabs.length === 0 || panels.length === 0) return;

    const activateTab = (activeTab, moveFocus = false) => {
        const activeCategory = activeTab.dataset.projectTab;

        tabs.forEach(tab => {
            const isActive = tab === activeTab;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', String(isActive));
            tab.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach(panel => {
            panel.hidden = panel.dataset.projectPanel !== activeCategory;
        });

        if (moveFocus) activeTab.focus();
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateTab(tab));
        tab.addEventListener('keydown', event => {
            let nextIndex;

            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                nextIndex = (index + 1) % tabs.length;
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                nextIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (event.key === 'Home') {
                nextIndex = 0;
            } else if (event.key === 'End') {
                nextIndex = tabs.length - 1;
            } else {
                return;
            }

            event.preventDefault();
            activateTab(tabs[nextIndex], true);
        });
    });
});
