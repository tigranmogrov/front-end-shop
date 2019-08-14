let cartCounter = 0;
let cartPrice = 0;
let cartCounterLabel = document.querySelector('#cart-counter');
let buttonsContainer = document.querySelector('.main-content');

let btnClickHandler = (e) => {
    let target = e.target;

    if (target.classList.contains('cart-btn')) {

        cartCounterLabel.innerHTML = `${++cartCounter}`;
        if (cartCounter === 1) cartCounterLabel.style.display = 'block';

        let restoreHTML = target.innerHTML;

        target.innerHTML = (() => {
            const mockData = target.parentElement.previousElementSibling.innerHTML;

            cartPrice += Math.round(+mockData.replace(/^\$(\d+)\s\D+(\d+).*$/gu, '$1.$2') * 100) / 100;
            return `Added ${cartPrice.toFixed(2)} $`;
           
        })();

        buttonsContainer.removeEventListener('click', btnClickHandler);

        setTimeout((elem, restore) => {
            elem.innerHTML = restore;
            buttonsContainer.addEventListener('click', btnClickHandler);
        }, 1000, target, restoreHTML);
    }
};

buttonsContainer.addEventListener('click', btnClickHandler);