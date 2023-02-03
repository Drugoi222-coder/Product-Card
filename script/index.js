window.addEventListener("DOMContentLoaded", () => {
    // Счётчик кол-ва товара
    const score = document.querySelector(".add-to-cart__score");
    const plus = document.querySelector(".add-to-cart__plus");
    const minus = document.querySelector(".add-to-cart__minus");
    plus.addEventListener("click", () => {
        let scoreText = +score.innerHTML;
        score.textContent = ++scoreText;
    });
    minus.addEventListener("click", () => {
        let scoreText = +score.innerHTML;
        if (scoreText > 0) {
            score.textContent = --scoreText;
        }
    });
    // Включение/выключение корзины с товарами
    const goods = document.querySelector(".goods");
    const cart = document.querySelector(".header__cart");
    function removeCart() {
        goods.classList.remove("goods_type_visible");
        setTimeout(() => {
            goods.classList.remove("goods_type_active");
        }, 300);
    }
    function toggleCart() {
        if (goods.classList.contains("goods_type_active")) {
            removeCart();
        } else {
            goods.classList.add("goods_type_active");
            setTimeout(() => {
                goods.classList.add("goods_type_visible");
            }, 1);
        }
    }
    cart.addEventListener("click", toggleCart);
    window.addEventListener("click", (e) => {
        if (e.target !== cart.children[0]) {
            const goodsChildren = Array.from(goods.children);
            if (
                goods.classList.contains("goods_type_active") &&
                e.target !== goods &&
                !goodsChildren.includes(e.target)
            ) {
                removeCart();
            }
        }
    });
});
