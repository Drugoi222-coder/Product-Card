window.addEventListener("DOMContentLoaded", () => {
    // Счётчик кол-ва товара ---------------------------------------------------------------
    const score = document.querySelector(".add-to-cart__score");
    const cartScore = document.querySelector(".header__cart-score");
    const plus = document.querySelector(".add-to-cart__plus");
    const minus = document.querySelector(".add-to-cart__minus");
    const addBtn = document.querySelector(".add-to-cart__add-btn");
    const goodsList = document.querySelector(".goods__list");
    // +1 к счётчику товаров по нажатию
    plus.addEventListener("click", () => {
        let scoreText = +score.textContent;
        score.textContent = ++scoreText;
    });
    // -1 к счётчику товаров по нажатию
    minus.addEventListener("click", () => {
        let scoreText = +score.textContent;
        if (scoreText > 1) {
            score.textContent = --scoreText;
        }
    });
    // Включение счётчика корзины при загрузке страницы ---------------------------------------------------------------
    function addCartScore() {
        if (+cartScore.textContent > 0) {
            cartScore.style.display = "block";
        }
    }
    // Обнуление счётчика корзины ---------------------------------------------------------------
    function scoreToNull() {
        cartScore.textContent = 0;
        cartScore.style.display = "";
    }
    addCartScore();
    // Включение/выключение корзины с товарами ---------------------------------------------------------------
    const goods = document.querySelector(".goods");
    const cart = document.querySelector(".header__cart");
    // Выключение корзины
    function removeCart() {
        goods.classList.remove("goods_type_visible");
        setTimeout(() => {
            goods.classList.remove("goods_type_active");
        }, 300);
    }
    // Включение корзины
    function addCart() {
        goods.classList.add("goods_type_active");
        setTimeout(() => {
            goods.classList.add("goods_type_visible");
        }, 1);
    }
    // Включение/отключение корзины
    function toggleCart() {
        if (goods.classList.contains("goods_type_active")) {
            removeCart();
        } else {
            addCart();
        }
    }
    // Нахождение всех потомков элемента
    function getAllChildren(elem, arr = []) {
        for (let child of elem.children) {
            arr.push(child);
            getAllChildren(child, arr);
        }
        return arr;
    }
    // Включение корзины по нажатию на её иконку
    cart.addEventListener("click", toggleCart);
    // Выключение корзины, если клик был совершён вне корзины
    window.addEventListener("click", (e) => {
        if (e.target !== cart.children[0]) {
            const goodsChildren = getAllChildren(goods);
            if (
                goods.classList.contains("goods_type_active") &&
                e.target !== goods &&
                !goodsChildren.includes(e.target) &&
                e.target !== addBtn
            ) {
                removeCart();
            }
        }
    });
    // Добавление товаров в корзину ---------------------------------------------------------------
    // Функция создания товара
    function createGoodItem(scoreText = 4) {
        goodsList.innerHTML =
            `<div class="goods__item">
                <div class="goods__picture">
                    <img class="goods__img" src="images/gallery/image-product-1.jpg" alt="product image">
                </div>
                <div class="goods__text">
                    <p class="goods__title">Fall Limited Edition Sneakers</p>
                    <div class="goods__price">
                        <p class="goods__start-cost">$125.00 x ${scoreText}</p>
                        <p class="goods__final-cost">$375.00</p>
                    </div>
                </div>
                <div class="goods__bin">
                    <img class="goods__bin-img" src="images/header/bin.svg" alt="bin icon">
                </div>
            </div>`;
    }
    // Удаление товаров из корзины
    function removeGoodItem() {
        let emptyText = document.createElement("p");
        emptyText.classList.add("goods__empty");
        emptyText.textContent = "Your cart is empty";
        goodsList.textContent = "";
        goodsList.append(emptyText);
        scoreToNull();
    }
    // Добавление товара в корзину по клику на кнопку
    addBtn.addEventListener("click", () => {
        let scoreText = +score.textContent;
        let cartScoreText = +cartScore.textContent;
        cartScore.textContent = cartScoreText + scoreText;
        cartScore.style.display = "block";
        createGoodItem(cartScoreText + scoreText);
        const bin = document.querySelector('.goods__bin');
        bin.addEventListener("click", removeGoodItem);
        addCart();
    });
});
