window.addEventListener("DOMContentLoaded", () => {
    // Счётчик кол-ва товара ---------------------------------------------------------------
    const score = document.querySelector(".add-to-cart__score");
    const cartScore = document.querySelector(".header__cart-score");
    const plus = document.querySelector(".add-to-cart__plus");
    const minus = document.querySelector(".add-to-cart__minus");
    const addBtn = document.querySelector(".add-to-cart__add-btn");
    const goodsList = document.querySelector(".goods__list");
    const gallerySlides = document.querySelectorAll(".gallery__slides");
    const pageSlider = document.querySelector(".gallery__page-slider");
    const mainSlider = document.querySelector(".gallery__main-slider");
    // +1 к счётчику товаров по нажатию
    plus.addEventListener("click", () => {
        let scoreText = +score.value;
        score.value = ++scoreText;
    });
    // -1 к счётчику товаров по нажатию
    minus.addEventListener("click", () => {
        let scoreText = +score.value;
        if (scoreText > 1) {
            score.value = --scoreText;
        }
    });
    // Валидация счётчика товаров ---------------------------------------------------------------
    score.addEventListener("input", (e) => {
        const isNumber = /^\d*$/.test(e.target.value);
        if (!isNumber) {
            e.target.value = e.target.value.replace(/\D/g, "");
        }
    });
    score.addEventListener("blur", (e) => {
        if (!e.target.value || e.target.value == 0) {
            e.target.value = 1;
        } else {
            e.target.value = +e.target.value;
        }
    })
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
        let cost = +document.querySelector(".price__cost").textContent.slice(1,-3);
        goodsList.innerHTML =
            `<div class="goods__item">
                <div class="goods__picture">
                    <img class="goods__img" src="images/gallery/image-product-1.jpg" alt="product image">
                </div>
                <div class="goods__text">
                    <p class="goods__title">Fall Limited Edition Sneakers</p>
                    <div class="goods__price">
                        <p class="goods__start-cost">$${cost} x ${scoreText}</p>
                        <p class="goods__final-cost">$${cost*scoreText}</p>
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
        let scoreText = +score.value;
        let cartScoreText = +cartScore.textContent;
        cartScore.textContent = cartScoreText + scoreText;
        cartScore.style.display = "block";
        createGoodItem(cartScoreText + scoreText);
        const bin = document.querySelector(".goods__bin");
        bin.addEventListener("click", removeGoodItem);
        addCart();
    });
    // Галерея thubmnails ---------------------------------------------------------------
    const lastActiveThumbnail =
    {
        src: "http://127.0.0.1:5500/images/gallery/image-product-1.jpg",
        index: 0
    };
    // Выключение других активных thumbnail
    function offActiveThumbnails(arr,target,...activeClasses) {
        arr.forEach((i,index) => {
            if (i.children[0] != target) {
                i.classList.remove(activeClasses[0]);
                i.children[0].classList.remove(activeClasses[1]);
            } else {
                lastActiveThumbnail.index = index;
            }
        });
        return lastActiveThumbnail;
    }
    // Включение активного thumbnail
    function onActiveThumbnail(mainPhoto,target,...activeClasses) {
        mainPhoto.src = target.src;
        target.parentElement.classList.add(activeClasses[0]);
        target.classList.add(activeClasses[1]);
        lastActiveThumbnail.src = mainPhoto.src;
        return lastActiveThumbnail;
    }
    // Передача данных от одного слайдера другому
    function transferData(slider) {
        const galleryPhoto = slider.querySelector(".gallery__photo");
        const gallerySlides = Array.from(slider.querySelector(".gallery__slides").children);
        const lastTarget = gallerySlides[lastActiveThumbnail.index].children[0];
        galleryPhoto.src = lastActiveThumbnail.src;
        onActiveThumbnail(
            galleryPhoto,
            lastTarget,
            "gallery__min-img_type_active",
            "gallery__thumb_type_active"
        );
        offActiveThumbnails(
            gallerySlides,
            lastTarget,
            "gallery__min-img_type_active",
            "gallery__thumb_type_active"
        );
    }
    gallerySlides.forEach(item => {
        item.addEventListener("click", (e) => {
            const slider = item.parentElement;
            // Получение главного фото слайдера
            const galleryPhoto = slider.querySelector(".gallery__photo");
            const galleryChildren = Array.from(e.currentTarget.children);
            // Включение активного thumbnail
            if (e.target.classList.contains("gallery__thumb")){
                onActiveThumbnail(
                    galleryPhoto,
                    e.target,
                    "gallery__min-img_type_active",
                    "gallery__thumb_type_active"
                );
                offActiveThumbnails(
                    galleryChildren,
                    e.target,
                    "gallery__min-img_type_active",
                    "gallery__thumb_type_active"
                );
            }
        });
    });
    pageSlider.addEventListener("click", (e) => {
        if (e.target.classList.contains("gallery__photo")) {
            mainSlider.style.display = "block";
            const cross = mainSlider.querySelector(".gallery__cross");
            transferData(mainSlider);
            cross.addEventListener("click", () => {
                mainSlider.style.display = "";
                transferData(pageSlider);
            });
        }
    });
});
